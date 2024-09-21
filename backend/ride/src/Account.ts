import CarPlate from "./CarPlate";
import Cpf from "./Cpf";
import Email from "./Email";
import Name from "./Name";
import UUID from "./UUID";

// Design Pattern: Facade
// exposes a simple interface and delegates the complex logic to other classes
export default class Account {
  private cpf: Cpf;
  private name: Name;
  private email: Email;
  private accountId: UUID;
  private carPlate?: CarPlate;
  private password: string;

  constructor(
    accountId: string,
    email: string,
    name: string,
    cpf: string,
    readonly isDriver: boolean,
    readonly isPassenger: boolean,
    carPlate: string,
    password: string
  ) {
    this.cpf = new Cpf(cpf);
    this.password = password;
    this.name = new Name(name);
    this.email = new Email(email);
    this.accountId = new UUID(accountId);
    if (isDriver) this.carPlate = new CarPlate(carPlate);
  }

  // static factory method
  static create(
    email: string,
    name: string,
    cpf: string,
    isDriver: boolean,
    isPassenger: boolean,
    carPlate: string,
    password: string
  ) {
    const accountId = UUID.create();
    return new Account(
      accountId.getValue(),
      email,
      name,
      cpf,
      isDriver,
      isPassenger,
      carPlate,
      password
    );
  }

  getAccountId(): string {
    return this.accountId.getValue();
  }

  getEmail(): string {
    return this.email.getValue();
  }

  getName(): string {
    return this.name.getValue();
  }

  getCpf(): string {
    return this.cpf.getValue();
  }

  getCarPlate(): string {
    return this.carPlate?.getValue() || "";
  }

  getPassword(): string {
    return this.password;
  }
}
