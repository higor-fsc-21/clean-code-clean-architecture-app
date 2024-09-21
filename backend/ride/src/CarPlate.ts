export default class CarPlate {
  private carPlate: string;

  constructor(carPlate: string) {
    if (!carPlate.match(/[A-Z]{3}[0-9]{4}/))
      throw new Error("Invalid car plate");
    this.carPlate = carPlate;
  }

  public getValue() {
    return this.carPlate;
  }
}
