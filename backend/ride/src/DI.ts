export class Registry {
  private dependencies: Map<string, any>;

  constructor() {
    this.dependencies = new Map();
  }

  public register<T>(name: string, dependency: T): void {
    this.dependencies.set(name, dependency);
  }

  public inject<T>(name: string): T {
    return this.dependencies.get(name);
  }
}
