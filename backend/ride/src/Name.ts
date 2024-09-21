export default class Name {
  private name: string;

  constructor(name: string) {
    if (!name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new Error("Invalid name");
    this.name = name;
  }

  public getValue() {
    return this.name;
  }
}
