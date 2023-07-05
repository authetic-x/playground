import { INJECTABEL_SYMBOL } from "./constants";

interface IRegistryItem {
  key: string;
  target: Object;
  service: any;
}

class Container {
  private readonly _registry: IRegistryItem[] = [];
  private readonly _serviceCollection: Record<string, unknown> = {};

  createInstance(ctor: new (...args: unknown[]) => unknown) {
    if (this._serviceCollection[ctor.name]) {
      return this._serviceCollection[ctor.name];
    }

    const instance = Reflect.construct(ctor, []) as any;
    for (const injectedItem of this._registry) {
      if (injectedItem.target === instance.prototype) {
        if (
          !Reflect.getMetadata(
            INJECTABEL_SYMBOL,
            injectedItem.service.prototype
          )
        ) {
        } else {
          instance[injectedItem.key] = this.createInstance(
            injectedItem.service
          );
        }
      }
    }

    return instance;
  }

  register(registryItem: IRegistryItem) {
    // filter totally same item
    this._registry.push(registryItem);
  }
}

export const container = new Container();
