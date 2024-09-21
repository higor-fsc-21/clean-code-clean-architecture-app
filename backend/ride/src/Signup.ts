import AccountRepository from "./AccountRepository";
import MailerGateway from "./MailerGateway";
import Account from "./Account";
import { Registry } from "./DI";

// anemic model (transaction script) -> object oriented design
export default class Signup {
  private accountRepository?: AccountRepository;
  private mailerGateway?: MailerGateway;

  // Dependency Inversion Principle - DIP
  constructor(registry: Registry) {
    this.mailerGateway = registry.inject("mailerGateway");
    this.accountRepository = registry.inject("accountRepository");
  }

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
