export default class Cpf {
  private cpf: string;
  private static CPF_VALID_LENGTH = 11;
  private static FIRST_DIGIT_FACTOR = 10;
  private static SECOND_DIGIT_FACTOR = 11;

  constructor(cpf: string) {
    if (!Cpf.validate(cpf)) throw new Error("Invalid cpf");
    this.cpf = cpf;
  }

  public getValue() {
    return this.cpf;
  }

  static validate(cpf: string) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== Cpf.CPF_VALID_LENGTH) return false;
    if (Cpf.allDigitsTheSame(cpf)) return false;
    const digit1 = Cpf.calculateDigit(cpf, Cpf.FIRST_DIGIT_FACTOR);
    const digit2 = Cpf.calculateDigit(cpf, Cpf.SECOND_DIGIT_FACTOR);
    return `${digit1}${digit2}` === Cpf.extractDigit(cpf);
  }

  private static allDigitsTheSame(cpf: string) {
    const [firstDigit] = cpf;
    return [...cpf].every((digit) => digit === firstDigit);
  }

  private static calculateDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  private static extractDigit(cpf: string) {
    return cpf.slice(9);
  }
}
