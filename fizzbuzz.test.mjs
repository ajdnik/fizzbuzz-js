import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  fizzBuzzNaive,
  fizzBuzzLCM,
  fizzBuzzModulo,
  fizzBuzzPreallocation,
  fizzBuzzTailRecTrampolined,
  fizzBuzzUnrolled,
} from './fizzbuzz.mjs';

const implementations = [
  { name: 'Naive', fn: fizzBuzzNaive },
  { name: 'LCM', fn: fizzBuzzLCM },
  { name: 'Modulo', fn: fizzBuzzModulo },
  { name: 'Preallocation', fn: fizzBuzzPreallocation },
  { name: 'Tail Recursion + Trampolining', fn: fizzBuzzTailRecTrampolined },
  { name: 'Loop Unrolling', fn: fizzBuzzUnrolled },
];

for (const { name, fn } of implementations) {
  describe(`fizzBuzz - ${name}`, () => {
    it('should return an empty array for N=0', () => {
      const result = fn(0);
      assert.deepStrictEqual(result, []);
    });

    it('should return [1] for N=1', () => {
      const result = fn(1);
      assert.deepStrictEqual(result, [1]);
    });

    it('should return the number itself when not divisible by 3 or 5', () => {
      const result = fn(2);
      assert.strictEqual(result[0], 1);
      assert.strictEqual(result[1], 2);
    });

    it('should return "Fizz" for multiples of 3', () => {
      const result = fn(3);
      assert.strictEqual(result[2], 'Fizz');
    });

    it('should return "Buzz" for multiples of 5', () => {
      const result = fn(5);
      assert.strictEqual(result[4], 'Buzz');
    });

    it('should return "FizzBuzz" for multiples of 15', () => {
      const result = fn(15);
      assert.strictEqual(result[14], 'FizzBuzz');
    });

    it('should return correct results for N=15 (one full cycle)', () => {
      const result = fn(15);
      const expected = [
        1, 2, 'Fizz', 4, 'Buzz',
        'Fizz', 7, 8, 'Fizz', 'Buzz',
        11, 'Fizz', 13, 14, 'FizzBuzz',
      ];
      assert.deepStrictEqual(result, expected);
    });

    it('should return correct results for N=30 (two full cycles)', () => {
      const result = fn(30);
      assert.strictEqual(result.length, 30);
      assert.strictEqual(result[29], 'FizzBuzz');
      assert.strictEqual(result[14], 'FizzBuzz');
      assert.strictEqual(result[2], 'Fizz');
      assert.strictEqual(result[4], 'Buzz');
      assert.strictEqual(result[0], 1);
    });

    it('should return correct length for large N', () => {
      const result = fn(1000);
      assert.strictEqual(result.length, 1000);
    });

    it('should have "Fizz" at every multiple of 3 (not 15)', () => {
      const result = fn(100);
      const fizzes = [3, 6, 9, 12, 18, 21, 24, 27, 33, 36, 39, 42, 48];
      for (const i of fizzes) {
        assert.strictEqual(result[i - 1], 'Fizz', `Expected "Fizz" at position ${i}`);
      }
    });

    it('should have "Buzz" at every multiple of 5 (not 15)', () => {
      const result = fn(100);
      const buzzes = [5, 10, 20, 25, 35, 40, 50, 55, 65, 70, 80, 85, 95, 100];
      for (const i of buzzes) {
        assert.strictEqual(result[i - 1], 'Buzz', `Expected "Buzz" at position ${i}`);
      }
    });

    it('should have "FizzBuzz" at every multiple of 15', () => {
      const result = fn(100);
      const fizzbuzzes = [15, 30, 45, 60, 75, 90];
      for (const i of fizzbuzzes) {
        assert.strictEqual(result[i - 1], 'FizzBuzz', `Expected "FizzBuzz" at position ${i}`);
      }
    });

    it('should return numbers (not strings) for non-Fizz/Buzz values', () => {
      const result = fn(15);
      const numberPositions = [1, 2, 4, 7, 8, 11, 13, 14];
      for (const i of numberPositions) {
        assert.strictEqual(typeof result[i - 1], 'number', `Expected number at position ${i}`);
        assert.strictEqual(result[i - 1], i);
      }
    });
  });
}

describe('All implementations produce identical results', () => {
  for (const n of [0, 1, 5, 15, 16, 30, 100, 1000]) {
    it(`should all match for N=${n}`, () => {
      const reference = fizzBuzzNaive(n);
      for (const { name, fn } of implementations.slice(1)) {
        assert.deepStrictEqual(fn(n), reference, `${name} differs from Naive for N=${n}`);
      }
    });
  }
});
