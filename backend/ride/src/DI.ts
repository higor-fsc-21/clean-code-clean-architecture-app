export class Registry {
  private static instance: Registry;
  private dependencies: Map<string, any>;

  private constructor() {
    this.dependencies = new Map();
  }

  public register<T>(name: string, dependency: T): void {
    this.dependencies.set(name, dependency);
  }

  public inject<T>(name: string): T {
    return this.dependencies.get(name);
  }

  // Singleton pattern
  public static getInstance = () => {
    if (!this.instance) Registry.instance = new Registry();
    return Registry.instance;
  };
}

// decorator
export const inject = (name: string) => {
  return (target: any, propertyKey: string) => {
    target[propertyKey] = Registry.getInstance().inject(name);
  };
};
