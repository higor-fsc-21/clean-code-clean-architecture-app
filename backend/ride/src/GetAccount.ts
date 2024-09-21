import AccountRepository from "./AccountRepository";

export default class GetAccount {
  constructor(readonly accountDAO: AccountRepository) {}

  async execute(accountId: string) {
    const account = await this.accountDAO.getAccountById(accountId);
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
