import {
  fizzBuzzNaive,
  fizzBuzzLCM,
  fizzBuzzModulo,
  fizzBuzzPreallocated,
  fizzBuzzUnrolled,
  fizzBuzzRecursive,
  fizzBuzzDSL,
} from './fizzbuzz.mjs';

const functions = {
  fizzBuzzNaive,
  fizzBuzzLCM,
  fizzBuzzModulo,
  fizzBuzzPreallocated,
  fizzBuzzUnrolled,
  fizzBuzzRecursive,
  fizzBuzzDSL,
};

const name = process.argv[2];

if (!name || !functions[name]) {
  console.error(`Usage: node profile.mjs <functionName>\n`);
  console.error(`Available functions:`);
  for (const fn of Object.keys(functions)) {
    console.error(`  - ${fn}`);
  }
  process.exit(1);
}

const fn = functions[name];
const N = 10_000;
const ITERATIONS = 100_000;

console.log(`Executing ${name} with N=${N} for ${ITERATIONS} iterations...`);

for (let i = 0; i < ITERATIONS; i++) {
  fn(N);
}
