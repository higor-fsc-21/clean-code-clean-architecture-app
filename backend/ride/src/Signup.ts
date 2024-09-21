import AccountRepository from "./AccountRepository";
import MailerGateway from "./MailerGateway";
import Account from "./Account";
import { inject } from "./DI";

// anemic model (transaction script) -> object oriented design
export default class Signup {
  @inject("accountRepository")
  private accountRepository?: AccountRepository;
  @inject("mailerGateway")
  private mailerGateway?: MailerGateway;

  async execute(input: any) {
    const accountData = await this.accountRepository?.getAccountByEmail(
      input.email
    );
    if (accountData) throw new Error("Duplicated account");
    const account = Account.create(
      input.email,
      input.name,
      input.cpf,
      input.isDriver,
      input.isPassenger,
      input.carPlate,
      input.password
    );
    await this.accountRepository?.saveAccount(account);
    await this.mailerGateway?.send(account.getEmail(), "Welcome!", "...");
    return { accountId: account.getAccountId() };
  }
}
