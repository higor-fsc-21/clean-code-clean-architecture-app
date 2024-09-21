import pgp from "pg-promise";
import Account from "./Account";

// DAO (Data Access Object) -> Repository
// Port
export default interface AccountRepository {
  getAccountByEmail(email: string): Promise<Account | undefined>;
  getAccountById(accountId: string): Promise<Account>;
  saveAccount(account: Account): Promise<void>;
}

// Adapter
export class AccountRepositoryDatabase implements AccountRepository {
  async getAccountByEmail(email: string) {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [accountData] = await connection.query(
      "select * from ccca.account where email = $1",
      [email]
    );
    await connection.$pool.end();
    if (!accountData) return undefined;
    return new Account(
      accountData.account_id,
      accountData.email,
      accountData.name,
      accountData.cpf,
      accountData.is_driver,
      accountData.is_passenger,
      accountData.car_plate,
      accountData.password
    );
  }

  async saveAccount(account: Account) {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    await connection.query(
      "insert into ccca.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        account.getAccountId(),
        account.getName(),
        account.getEmail(),
        account.getCpf(),
        account.getCarPlate(),
        !!account.isPassenger,
        !!account.isDriver,
        account.getPassword(),
      ]
    );
    await connection.$pool.end();
  }

  async getAccountById(accountId: string) {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [accountData] = await connection.query(
      "select * from ccca.account where account_id = $1",
      [accountId]
    );
    await connection.$pool.end();
    return new Account(
      accountData.account_id,
      accountData.email,
      accountData.name,
      accountData.cpf,
      accountData.is_driver,
      accountData.is_passenger,
      accountData.car_plate,
      accountData.password
    );
  }
}

// Adapter
export class AccountRepositoryMemory implements AccountRepository {
  accounts: any[];

  constructor() {
    this.accounts = [];
  }

  async getAccountByEmail(email: string): Promise<any> {
    return this.accounts.find((account: any) => account.email === email);
  }

  async getAccountById(accountId: string): Promise<any> {
    return this.accounts.find(
      (account: any) => account.accountId === accountId
    );
  }

  async saveAccount(account: any): Promise<any> {
    return this.accounts.push(account);
  }
}
