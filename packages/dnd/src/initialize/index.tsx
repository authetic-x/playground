import { ReactNode } from "react";
import { Plugin } from "./plugins";

interface IInitializeController {
  register: (plugin: Plugin) => void;
  initialize: () => void;
}

export class InitializeController implements IInitializeController {
  private readonly _syncRegistry: Plugin[] = [];
  private readonly _asyncRegistry: Plugin[] = [];

  register(plugin: Plugin) {
    if (plugin.mode === "sync") {
      this._syncRegistry.push(plugin);
    } else {
      this._asyncRegistry.push(plugin);
    }
  }

  async initialize() {
    await Promise.all(this._syncRegistry.map((plugin) => plugin.render()));

    // add some load opportunity
    await Promise.all(this._asyncRegistry.map((plugin) => plugin.render()));
  }
}

const initializeController = new InitializeController();

initializeController.register(
  new Plugin(() => import("../components/panels"), "async")
);
initializeController.register(
  new Plugin(() => import("../components/editor"), "sync")
);
initializeController.register(
  new Plugin(() => import("../components/timeline"), "sync")
);

export { initializeController };
