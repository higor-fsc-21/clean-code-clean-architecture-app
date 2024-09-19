import crypto from "crypto";
import pgp from "pg-promise";
import { AccountDataBase } from "./abstractions/account";

export class AccountDAO implements AccountDataBase {
  constructor() {}

  public async getAccountByEmail(email: string) {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [account] = await connection.query(
      "select * from ccca.account where email = $1",
      [email]
    );
    await connection.$pool.end();
    return account;
  }

  public async saveAccount(input: any) {
    const accountId = crypto.randomUUID();
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");

    await connection.query(
      "insert into ccca.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        accountId,
        input.name,
        input.email,
        input.cpf,
        input.carPlate,
        !!input.isPassenger,
        !!input.isDriver,
        input.password,
      ]
    );
    await connection.$pool.end();
    return accountId;
  }

  public async getAccountById(id: string) {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [account] = await connection.query(
      "select * from ccca.account where account_id = $1",
      [id]
    );
    await connection.$pool.end();
    return account;
  }
}
