export interface AccountDataBase {
  saveAccount(input: any): Promise<string>;
  getAccountById(id: string): Promise<any>;
  getAccountByEmail(email: string): Promise<any>;
}
