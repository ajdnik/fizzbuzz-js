import { run, bench, group } from 'mitata';
import {
  fizzBuzzNaive,
  fizzBuzzLCM,
  fizzBuzzModulo,
  fizzBuzzPreallocated,
  fizzBuzzUnrolled,
  fizzBuzzRecursive,
  fizzBuzzDSL,
} from './fizzbuzz.mjs';

// Number of elements to process 
const N = 10_000;

group('FizzBuzz Optimization Race', () => {
  bench('1. Naive Implementation', () => fizzBuzzNaive(N));
  bench('2. Least Common Multiple', () => fizzBuzzLCM(N));
  bench('3. Optimize Modulu Checks', () => fizzBuzzModulo(N));
  bench('4. Array Pre-allocation', () => fizzBuzzPreallocated(N));
  bench('5. Loop Unrolling', () => fizzBuzzUnrolled(N));
  bench('6. Tail Recursion + Trampolining', () => fizzBuzzRecursive(N));
  bench('7. Domain-Specific Language', () => fizzBuzzDSL(N));
});

await run();
