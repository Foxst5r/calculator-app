import { expect, test } from "vitest";
import {
  calculate,
  detectClose,
  detectDigit,
  tokenizer,
  infixToPostfix,
  calculatePostfix,
} from "../calc";
import { Token, TokenType } from "../token";

test("it should tokenize string correctly", () => {
  const str = "1+2";
  const res = tokenizer(str);
  const expected = [
    new Token("1", TokenType.DIGITS, 1),
    new Token("+", TokenType.PLUS, 2),
    new Token("2", TokenType.DIGITS, 3),
  ];

  expect(res).toStrictEqual(expected);
});

test("detect close correctly", () => {
  const str = ")";
  const res = detectClose(str, 0);

  const expected = new Token(")", TokenType.CLOSE_PARANTHESES, 1);

  expect(res).toStrictEqual(expected);
});

test("Does infix to postfix and then calculates the postfix correctly", () => {
  const infix = [
    new Token("3", TokenType.DIGITS, 1),
    new Token("+", TokenType.PLUS, 2),
    new Token("10", TokenType.DIGITS, 3),
    new Token("/", TokenType.DIVIDE, 4),
    new Token("(", TokenType.OPEN_PARANTHESES, 5),
    new Token("2", TokenType.DIGITS, 6),
    new Token("+", TokenType.PLUS, 7),
    new Token("3", TokenType.DIGITS, 8),
    new Token(")", TokenType.CLOSE_PARANTHESES, 9),
  ];
  const postfix = infixToPostfix(infix);
  const result = calculatePostfix(postfix);

  const expected = 5;

  expect(result).toStrictEqual(expected);
});

test("Calculate inputted string correctly", () => {
  let str = "1+2";
  let result = calculate(str);
  let expected = 3;

  expect(result).toBe(expected);

  str = "1-1.5";
  result = calculate(str);
  expected = -0.5;

  expect(result).toBe(expected);

  str = "2-1.5";
  result = calculate(str);
  expected = 0.5;

  expect(result).toBe(expected);

  str = "1-(10/20)*4";
  result = calculate(str);
  expected = -1;

  expect(result).toBe(expected);
});

test("Decimal numbers detection correctly", () => {
  let str = "0.5";
  let result = detectDigit(str, 0);
  let expected = new Token("0.5", TokenType.DIGITS, 3);

  expect(result).toStrictEqual(expected);
});
