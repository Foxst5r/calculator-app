export enum TokenType {
  DIGITS,
  PLUS,
  MINUS,
  MULTIPLY,
  DIVIDE,
  OPEN_PARANTHESES,
  CLOSE_PARANTHESES,
  ERROR,
}
//DIGITS
export class Token {
  value: string;
  tokenType: TokenType;
  lastIDX: number;
  //Default constructor
  constructor(
    value: string = "",
    tokenType: TokenType = TokenType.ERROR,
    lastIDX: number = -1,
  ) {
    this.value = value;
    this.tokenType = tokenType;
    this.lastIDX = lastIDX;
  }
  //Copy Constructor
  public getValue(): string {
    return this.value;
  }
  public getTokenType(): TokenType {
    return this.tokenType;
  }
  public getLastIDX(): number {
    return this.lastIDX;
  }

  public precedence(): number {
    if (
      this.tokenType === TokenType.PLUS ||
      this.tokenType === TokenType.MINUS
    ) {
      return 1;
    } else if (
      this.tokenType === TokenType.MULTIPLY ||
      this.tokenType === TokenType.DIVIDE
    ) {
      return 2;
    } else {
      return 0;
    }
  }

  public isOperator(): boolean {
    return (
      this.tokenType === TokenType.PLUS ||
      this.tokenType === TokenType.MINUS ||
      this.tokenType === TokenType.DIVIDE ||
      this.tokenType === TokenType.MULTIPLY
    );
  }
}
