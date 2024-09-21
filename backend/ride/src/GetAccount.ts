import AccountRepository from "./AccountRepository";
import { inject } from "./DI";

export default class GetAccount {
  @inject("accountRepository")
  accountRepository?: AccountRepository;

  async execute(accountId: string) {
    const account = await this.accountRepository?.getAccountById(accountId);
    if (!account) throw new Error("Account not found");

    // DTO - Data Transfer Object
    return {
      cpf: account.getCpf(),
      name: account.getName(),
      email: account.getEmail(),
      isDriver: account.isDriver,
      carPlate: account.getCarPlate(),
      password: account.getPassword(),
      isPassenger: account.isPassenger,
      accountId: account.getAccountId(),
    };
  }
}
