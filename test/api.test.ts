import axios from "axios";
import pgp from "pg-promise";

const url = "http://localhost:3000/signup";
const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
const validAccount = {
  cpf: "70112982409",
  name: "Higor Felype da Silva Carvalho",
  email: "felype.cet.15@gmail.com",
  carPlate: "ABC1234",
  password: "pwd-1234",
  isDriver: true,
  isPassenger: false,
};

describe("SignUP | Unit", () => {
  let account: any;

  beforeAll(() => {
    account = validAccount;
  });

  afterEach(() => {
    connection.query("delete from ccca.account where cpf = $1", account.cpf);
  });

  afterAll(() => {
    connection.$pool.end();
  });

  describe("when calling the signup with right data", () => {
    it("should create a new account successfully", async () => {
      const { data } = await axios.post(url, account);
      const [createdAccount] = await connection.query(
        "select * from ccca.account where cpf = $1",
        account.cpf
      );
      expect(createdAccount?.cpf).toBe(account.cpf);
      expect(data?.accountId).toBeDefined();
    });
  });

  describe("when calling the signup with wrong data", () => {
    describe("and the user account already exists", () => {
      it(`should throw an error Account already exists`, async () => {
        try {
          await axios.post(url, account);
          await axios.post(url, account);
        } catch (error: any) {
          const message = error?.response?.data?.message;
          expect(message).toBe("Account already exists");
        }
      });
    });

    describe("and the user cpf is invalid", () => {
      it(`should throw an error code -1`, async () => {
        try {
          await axios.post(url, { ...account, cpf: "1234" });
        } catch (error: any) {
          const message = error?.response?.data?.message;
          expect(message).toBe("Invalid CPF");
        }
      });
    });

    describe("and the user name is invalid", () => {
      it(`should throw an error code -3`, async () => {
        try {
          await axios.post(url, { ...account, name: "Hi1234" });
        } catch (error: any) {
          const message = error?.response?.data?.message;
          expect(message).toBe("Invalid name");
        }
      });
    });

    describe("and the user email is invalid", () => {
      it(`should throw an error code -2`, async () => {
        try {
          await axios.post(url, { ...account, email: "Hi1234" });
        } catch (error: any) {
          const message = error?.response?.data?.message;
          expect(message).toBe("Invalid email");
        }
      });
    });

    describe("and the user car plate is invalid", () => {
      it(`should throw an error code -5`, async () => {
        try {
          await axios.post(url, { ...account, carPlate: "Hi1234" });
        } catch (error: any) {
          const message = error?.response?.data?.message;
          expect(message).toBe("Invalid car plate");
        }
      });
    });
  });
});
