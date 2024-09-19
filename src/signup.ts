import { AccountDataBase } from "./abstractions/account";
import { validateCpf } from "./validateCpf";

export class SignUp {
  constructor(readonly accountDAO: AccountDataBase) {
    this.accountDAO = accountDAO;
  }

  public async execute(input: any): Promise<any> {
    const account = await this.accountDAO.getAccountByEmail(input.email);
    if (account) return "Account already exists";
    if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/))
      throw new Error("Invalid name");
    if (!input.email.match(/^(.+)@(.+)$/)) throw new Error("Invalid email");
    if (!validateCpf(input.cpf)) throw new Error("Invalid CPF");
    if (input.isDriver && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/))
      throw new Error("Invalid car plate");
    const accountId = await this.accountDAO.saveAccount(input);
    return { accountId };
  }
}
