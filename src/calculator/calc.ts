import { Token, TokenType } from "./token.ts";

function isDigit(ch: string): boolean {
  if ((ch >= "0" && ch <= "9") || ch == ".") {
    return true;
  }
  return false;
}

export function detectDigit(input: string, startIDX: number): Token {
  const ch = input[startIDX];
  if (!isDigit(ch)) {
    return new Token(input, TokenType.ERROR, input.length);
  }
  let digits = "";
  let i = startIDX;

  for (; i < input.length; i++) {
    if (isDigit(input[i])) {
      digits += input[i];
    } else {
      break;
    }
  }
  return new Token(digits, TokenType.DIGITS, i);
}

export function detectPlus(input: string, startIDX: number): Token {
  if (input[startIDX] !== "+") {
    return new Token(input, TokenType.ERROR, input.length);
  }
  return new Token("+", TokenType.PLUS, startIDX + 1);
}

export function detectMinus(input: string, startIDX: number): Token {
  if (input[startIDX] !== "-") {
    return new Token(input, TokenType.ERROR, input.length);
  }
  return new Token("-", TokenType.MINUS, startIDX + 1);
}

export function detectMultiply(input: string, startIDX: number): Token {
  if (input[startIDX] !== "*") {
    return new Token(input, TokenType.ERROR, input.length);
  }
  return new Token("*", TokenType.MULTIPLY, startIDX + 1);
}

export function detectDivide(input: string, startIDX: number): Token {
  if (input[startIDX] !== "/") {
    return new Token(input, TokenType.ERROR, input.length);
  }
  return new Token("/", TokenType.DIVIDE, startIDX + 1);
}

export function detectOpen(input: string, startIDX: number): Token {
  if (input[startIDX] !== "(") {
    return new Token(input, TokenType.ERROR, input.length);
  }
  return new Token("(", TokenType.OPEN_PARANTHESES, startIDX + 1);
}

export function detectClose(input: string, startIDX: number): Token {
  if (input[startIDX] !== ")") {
    return new Token(input, TokenType.ERROR, input.length);
  }
  return new Token(")", TokenType.CLOSE_PARANTHESES, startIDX + 1);
}

export function tokenizer(input: string): Token[] {
  const tokenList: Token[] = [];

  for (let i = 0; i < input.length; ) {
    if (input[i].match(/\d/)) {
      const token = detectDigit(input, i);
      i = token.getLastIDX();
      tokenList.push(token);
    } else if (input[i] === "+") {
      const token = detectPlus(input, i);
      i = token.getLastIDX();
      tokenList.push(token);
    } else if (input[i] === "-") {
      const token = detectMinus(input, i);
      i = token.getLastIDX();
      tokenList.push(token);
    } else if (input[i] === "*") {
      const token = detectMultiply(input, i);
      i = token.getLastIDX();
      tokenList.push(token);
    } else if (input[i] === "/") {
      const token = detectDivide(input, i);
      i = token.getLastIDX();
      tokenList.push(token);
    } else if (input[i] === "(") {
      const token = detectOpen(input, i);
      i = token.getLastIDX();
      tokenList.push(token);
    } else if (input[i] === ")") {
      const token = detectClose(input, i);
      i = token.getLastIDX();
      tokenList.push(token);
    } else i++;
  }
  return tokenList;
}

export function infixToPostfix(infix: Token[]): Token[] {
  const st: Token[] = [];
  const postfix: Token[] = [];

  for (const token of infix) {
    if (token.getTokenType() === TokenType.DIGITS) {
      postfix.push(token);
    } else if (token.getTokenType() === TokenType.OPEN_PARANTHESES) {
      st.push(token);
    } else if (token.getTokenType() === TokenType.CLOSE_PARANTHESES) {
      while (st.length > 0) {
        const top = st[st.length - 1];
        if (top.getTokenType() !== TokenType.OPEN_PARANTHESES) {
          postfix.push(top);
          st.pop();
        } else {
          st.pop();
          break;
        }
      }
    } else {
      while (
        st.length > 0 &&
        token.precedence() <= st[st.length - 1].precedence()
      ) {
        const top = st.pop()!;
        postfix.push(top);
      }
      st.push(token);
    }
  }
  while (st.length > 0) {
    const top = st.pop()!;
    postfix.push(top);
  }
  return postfix;
}

export function printToken(tokenList: Token[]): void {
  for (const token of tokenList) {
    console.log(`${token.getValue()}, ${token.getTokenType()}`);
  }
}

export function calculatePostfix(postfix: Token[]): number {
  const st: Token[] = [];
  for (const token of postfix) {
    if (token.getTokenType() === TokenType.DIGITS) {
      st.push(token);
    } else {
      const value1 = parseFloat(st.pop()!.getValue());
      const value2 = parseFloat(st.pop()!.getValue());
      let value3: number;
      switch (token.getTokenType()) {
        case TokenType.PLUS:
          value3 = value2 + value1;
          break;
        case TokenType.MINUS:
          value3 = value2 - value1;
          break;
        case TokenType.MULTIPLY:
          value3 = value2 * value1;
          break;
        case TokenType.DIVIDE:
          value3 = value2 / value1;
          break;
        default:
          throw new Error("ERROR");
      }
      st.push(new Token(value3.toString(), TokenType.DIGITS, 0));
    }
  }
  return parseFloat(st.pop()!.getValue());
}

export function calculate(str: string): number {
  const tokenList = tokenizer(str);
  const postFix = infixToPostfix(tokenList);
  const answer = calculatePostfix(postFix);
  return answer;
}
