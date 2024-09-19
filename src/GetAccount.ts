import { AccountDataBase } from "./abstractions/account";

export class GetAccount {
  constructor(readonly accountDAO: AccountDataBase) {
    this.accountDAO = accountDAO;
  }

  async execute(accountId: string) {
    return await this.accountDAO.getAccountById(accountId);
  }
}
