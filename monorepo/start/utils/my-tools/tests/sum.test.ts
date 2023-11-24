// tests/sum.test.js
import { sum } from "../src/sum";

test("测试sum方法", () => {
  const result = sum(10, 3);
  expect(result).toBe(13);
});