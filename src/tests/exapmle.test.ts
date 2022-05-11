import { calculator, div, mult, sub, sum } from "./exapmle";

test("sum", () => {
  const a: number = 10;

  const b: number = 5;

  const result = sum(a, b);

  expect(result).toBe(15);
});

test("div", () => {
  expect(div(10, 5)).toBe(2);
});

test("mult", () => {
  expect(mult(10, 5)).toBe(50);
});

test("sub", () => {
  expect(sub(10, 5)).toBe(5);
});

test("calc", () => {
  const a: number = 10;

  const b: number = 5;

  expect(calculator(a, b, { type: "sum" })).toBe(15);
  expect(calculator(a, b, { type: "div" })).toBe(2);
  expect(calculator(a, b, { type: "mult" })).toBe(50);
  expect(calculator(a, b, { type: "sub" })).toBe(5);
});
