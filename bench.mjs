import { run, bench, group } from 'mitata';
import {
  fizzBuzzNaive,
  fizzBuzzLCM,
  fizzBuzzModulo,
  fizzBuzzPreallocation,
  fizzBuzzTailRecTrampolined,
  fizzBuzzUnrolled,
} from './fizzbuzz.mjs';

// Number of elements to process 
const N = 10_000;

group('FizzBuzz Optimization Race', () => {
  bench('1. Naive Implementation', () => fizzBuzzNaive(N));
  bench('2. Least Common Multiple', () => fizzBuzzLCM(N));
  bench('3. Optimize Modulu Checks', () => fizzBuzzModulo(N));
  bench('4. Array Pre-allocation', () => fizzBuzzPreallocation(N));
  bench('5. Tail Recursion + Trampolining', () => fizzBuzzTailRecTrampolined(N));
  bench('6. Loop Unrolling', () => fizzBuzzUnrolled(N));
});

await run();
