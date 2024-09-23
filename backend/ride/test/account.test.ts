import Account from "../src/Account";

test("Deve criar a conta de um passageiro", async function () {
  const account = Account.create(
    `john.doe${Math.random()}@gmail.com`,
    "John Doe",
    "97456321558",
    false,
    true,
    "",
    "pwdMock123"
  );

  expect(account.getAccountId()).toBeDefined();
});

test("Não deve criar a conta de um passageiro com nome inválido", async function () {
  await expect(() =>
    Account.create(
      `john.doe${Math.random()}@gmail.com`,
      "John",
      "97456321558",
      false,
      true,
      "",
      "pwdMock123"
    )
  ).toThrow(new Error("Invalid name"));
});

test("Não deve criar a conta de um passageiro com cpf inválido", async function () {
  await expect(() =>
    Account.create(
      `john.doe${Math.random()}@gmail.com`,
      "John Doe",
      "97456321",
      false,
      true,
      "",
      "pwdMock123"
    )
  ).toThrow(new Error("Invalid cpf"));
});

test("Não deve criar a conta de um passageiro com email inválido", async function () {
  await expect(() =>
    Account.create(
      `john.doe`,
      "John Doe",
      "97456321558",
      false,
      true,
      "",
      "pwdMock123"
    )
  ).toThrow(new Error("Invalid email"));
});

test("Não deve criar a conta com a placa do carro inválida", async function () {
  await expect(() =>
    Account.create(
      `john.doe${Math.random()}@gmail.com`,
      "John Doe",
      "97456321558",
      true,
      true,
      "1234",
      "pwdMock123"
    )
  ).toThrow(new Error("Invalid car plate"));
});
