import express from "express";
import { SignUp } from "./SignUp";
import { AccountDAO } from "./AccountDAO";
import { GetAccount } from "./GetAccount";

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
  try {
    const accountDAO = new AccountDAO();
    const signup = new SignUp(accountDAO);
    const result = await signup.execute(req.body);
    res.json(result);
  } catch (e: any) {
    res.status(422).json({ message: e.message });
  }
});

app.get("/account/:accountId", async (req, res) => {
  const accountDAO = new AccountDAO();
  const getAccount = new GetAccount(accountDAO);
  const account = await getAccount.execute(req.params.accountId);
  return account;
});

app.listen(3000);
