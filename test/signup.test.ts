import pgp from "pg-promise";
import { AccountDAO } from "../src/AccountDAO";
import { SignUp } from "../src/SignUp";
import { GetAccount } from "../src/GetAccount";
import { AccountMemory } from "../src/AccountMemory";

describe("SignUP | Unit", () => {
  let account: any;
  // const accountDependency = new AccountDAO();
  const accountDependency = new AccountMemory();
  const signup = new SignUp(accountDependency);
  const getAccount = new GetAccount(accountDependency);

  beforeEach(() => {
    account = {
      cpf: "70112982409",
      name: "Higor Felype da Silva Carvalho",
      email: `felype.cet.15${Math.random()}@gmail.com`,
      carPlate: "ABC1234",
      password: "pwd-1234",
      isDriver: true,
      isPassenger: false,
    };
  });

  describe("when calling the signup with right data", () => {
    it("should create a new account successfully", async () => {
      const response = await signup.execute(account);
      expect(response.accountId).toBeDefined();
      const responseAccount = await getAccount.execute(response.accountId);
      expect(responseAccount.cpf).toBe(account.cpf);
      expect(responseAccount.name).toBe(account.name);
      expect(responseAccount.email).toBe(account.email);
      expect(responseAccount.password).toBe(account.password);
    });
  });

  describe("when calling the signup with wrong data", () => {
    describe("and the user account already exists", () => {
      it(`should throw an error Account already exists`, async () => {
        try {
          await signup.execute(account);
          await signup.execute(account);
        } catch (error: any) {
          const message = error?.response?.data?.message;
          expect(message).toBe("Account already exists");
        }
      });
    });

    describe("and the user cpf is invalid", () => {
      it(`should throw an error code -1`, async () => {
        await expect(() =>
          signup.execute({ ...account, cpf: "1324" })
        ).rejects.toThrow(new Error("Invalid CPF"));
      });
    });

    describe("and the user name is invalid", () => {
      it(`should throw an error code -3`, async () => {
        await expect(() =>
          signup.execute({ ...account, name: "Hi1234" })
        ).rejects.toThrow(new Error("Invalid name"));
      });
    });

    describe("and the user email is invalid", () => {
      it(`should throw an error code -2`, async () => {
        await expect(() =>
          signup.execute({ ...account, email: "Hi1234" })
        ).rejects.toThrow(new Error("Invalid email"));
      });
    });

    describe("and the user car plate is invalid", () => {
      it(`should throw an error code -5`, async () => {
        await expect(() =>
          signup.execute({ ...account, carPlate: "Hi1234" })
        ).rejects.toThrow(new Error("Invalid car plate"));
      });
    });
  });
});
