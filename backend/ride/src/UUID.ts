import crypto from "crypto";

export default class UUID {
  private uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }

  static create() {
    const uuid = crypto.randomUUID();
    return new UUID(uuid);
  }

  public getValue() {
    return this.uuid;
  }
}
