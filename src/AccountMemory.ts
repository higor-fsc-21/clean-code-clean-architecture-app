import { AccountDataBase } from "./abstractions/account";
import crypto from "crypto";

export class AccountMemory implements AccountDataBase {
  private accounts: any[] = [];

  constructor() {}

  getAccountByEmail(email: string): Promise<any> {
    const account = this.accounts.find((account) => account.email === email);
    return Promise.resolve(account);
  }
  getAccountById(id: string): Promise<any> {
    const account = this.accounts.find((account) => account.id === id);
    return Promise.resolve(account);
  }
  saveAccount(input: any): Promise<string> {
    const id = crypto.randomUUID();
    this.accounts.push({ ...input, id });
    return Promise.resolve(id);
  }
}
