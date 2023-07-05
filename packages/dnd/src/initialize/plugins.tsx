import React from "react";

interface IPlugin {
  render: () => Promise<JSX.Element>;
}

type PluginMode = "sync" | "async";

export class Plugin implements IPlugin {
  public loader: () => Promise<unknown>;
  public mode: PluginMode;
  constructor(loader: () => Promise<unknown>, mode: PluginMode) {
    this.loader = loader;
    this.mode = mode;
  }

  async render() {
    const splitCode = (await this.loader()) as any;
    return <splitCode.default />;
  }
}
