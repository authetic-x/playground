import Koa = require("koa");
import createRouter = require("koa-router");
import koaBody = require("koa-body");
import {
  CONTROLLER_SYMBOL,
  METHOD_SYMBOL,
  PARAMS_SYMBOL,
} from "./di/constants";
import { Body, Controller, Get, Headers, inject, injectable, MethodMetadata, ParamMetadata, Post, Put, Query } from "./di/decorators";
import { container } from "./di/container";

const router = new createRouter();
const app = new Koa();

app.use(koaBody as any);

export function init(controllers: any[]) {
  controllers.forEach((controller) => {
    const controllerPath = Reflect.getOwnMetadata(
      CONTROLLER_SYMBOL,
      controller
    );
    const methodMetaData: MethodMetadata[] = Reflect.getOwnMetadata(
      METHOD_SYMBOL,
      controller.prototype
    );
    const paramMetaData: ParamMetadata[] = Reflect.getOwnMetadata(
      PARAMS_SYMBOL,
      controller.prototype
    );

    const instance = container.createInstance(controller);

    for (const methodMetaItem of methodMetaData) {
      const { key, path, method } = methodMetaItem;
      router[method](`${controllerPath}${path}`, (ctx: Koa.Context) => {
        const argList = paramMetaData
          .filter((paramMetaItem) => paramMetaItem.methodName === key)
          .sort((a, b) => a.index - b.index)
          .map((paramMetaItem) => paramMetaItem.fn(ctx));
        instance[key](...argList, ctx);
      });
    }
  });

  app.use(router.routes());
  return {
    app,
    router,
  };
}

@injectable()
export class AService {
  getData() {
    return 'data from AService'
  }
}

@injectable()
export class BService {
  getData() {
    return 'data from BService'
  }
}

@injectable()
export class CService {

  @inject()
  bService: BService | undefined

  getData() {
    return 'data from CService'
  }
}


@Controller('/a_controller')
export class AController {
  @inject()
  aService: AService | undefined

  @inject()
  bService: BService | undefined


  @inject()
  cService: CService | undefined

  @Post('/a_service')
  getAData(@Body() body, ctx) {
    console.log(body)
    const res = this.aService?.getData()
    ctx.response.body = res
  }

  @Get('/b_service')
  getBData(@Query() query, ctx) {
    console.log(query)
    const res = this.bService?.getData()
    ctx.response.body = res
  }

  @Put('/c_service')
  getCData(@Headers() headers, ctx) {
    console.log(headers)
    const res = this.cService?.bService?.getData()
    ctx.response.body = res
  }
}
