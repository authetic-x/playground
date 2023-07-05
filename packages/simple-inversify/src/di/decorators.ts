import "reflect-metadata";
import {
  CONTROLLER_SYMBOL,
  INJECTABEL_SYMBOL,
  METHOD_ENUM,
  METHOD_SYMBOL,
  PARAMS_SYMBOL,
} from "./constants";
import { container } from "./container";

export function injectable() {
  return function (target: Object) {
    Reflect.defineMetadata(INJECTABEL_SYMBOL, target, target);
  };
}

export function inject() {
  return function (target: Object, key: string) {
    const Service = Reflect.getMetadata("design:type", target, key);
    container.register({
      key,
      service: Service,
      target,
    });
  };
}

export function Controller(path: string) {
  return function (target: Object) {
    Reflect.defineMetadata(CONTROLLER_SYMBOL, path, target);
  };
}

export type MethodMetadata = {
  key: string;
  method: METHOD_ENUM;
  path: string;
};

export function createMethodDecorator(method: METHOD_ENUM) {
  return (path: string) => (target: Object, key: string) => {
    const methodMetadata = Reflect.getMetadata(METHOD_SYMBOL, target) || [];
    methodMetadata.push({
      key,
      method,
      path,
    });

    Reflect.defineMetadata(METHOD_SYMBOL, target, methodMetadata);
  };
}

export const All = createMethodDecorator(METHOD_ENUM.ALL);
export const Get = createMethodDecorator(METHOD_ENUM.GET);
export const Post = createMethodDecorator(METHOD_ENUM.POST);
export const Put = createMethodDecorator(METHOD_ENUM.PUT);
export const Delete = createMethodDecorator(METHOD_ENUM.DELETE);
export const Patch = createMethodDecorator(METHOD_ENUM.PATCH);
export const Head = createMethodDecorator(METHOD_ENUM.HEAD);

export type ParamMetadata = {
  fn: Function;
  methodName: string;
  index: number;
};

export function createParamDecorator(fn: Function) {
  return (target: Object, methodName: string, index: number) => {
    const paramMetadata = Reflect.getMetadata(PARAMS_SYMBOL, target) || [];
    paramMetadata.push({
      fn,
      index,
      methodName,
    });

    Reflect.defineMetadata(PARAMS_SYMBOL, paramMetadata, target);
  };
}

export const Ctx = () => createParamDecorator((ctx) => ctx);
export const Req = () => createParamDecorator((ctx) => ctx.req);
export const Res = () => createParamDecorator((ctx) => ctx.res);
export const Body = (key?: string) =>
  createParamDecorator((ctx) =>
    key ? ctx.request.body[key] : ctx.request.body
  );
export const Query = (key?: string) =>
  createParamDecorator((ctx) =>
    key ? ctx.request.query[key] : ctx.request.query
  );
export const Headers = (key?: string) =>
  createParamDecorator((ctx) =>
    key ? ctx.request.headers[key] : ctx.request.headers
  );
export const Request = Req;
export const Response = Res;
