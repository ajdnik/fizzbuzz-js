import { run, bench, group } from 'mitata';

// Number of elements to process 
const N = 10_000;

// 1. Naive FizzBuzz Implementation
const fizzBuzzNaive = () => {
  const arr = [];
  for (let i = 1; i <= N; i++) {
    let output = '';
    if (i % 3 === 0) output += 'Fizz';
    if (i % 5 === 0) output += 'Buzz';
    if (output === '') arr.push(i);
    else arr.push(output);
  }
  return arr;
};

// 2. Least Common Multiple Check
const fizzBuzzLCM = () => {
  const arr = [];
  for (let i = 1; i <= N; i++) {
    if (i % 3 === 0) arr.push("Fizz");
    else if (i % 5 === 0) arr.push("Buzz");
    else if (i % 15 === 0) arr.push("FizzBuzz");
    else arr.push(i);
  }
  return arr;
};

// 3. LCM With Ordering
const fizzBuzzLCMOrdered = () => {
  const arr = [];
  for (let i = 1; i <= N; i++) {
    if (i % 15 === 0) arr.push("FizzBuzz");
    else if (i % 3 === 0) arr.push("Fizz");
    else if (i % 5 === 0) arr.push("Buzz");
    else arr.push(i);
  }
  return arr;
};

// 4. Optimize Modulo Checks
const fizzBuzzModulo = () => {
  const arr = [];
  for (let i = 1; i <= N; i++) {
    if (i % 3 == 0) {
      if (i % 5 == 0) {
        arr.push("FizzBuzz");
      } else {
        arr.push("Fizz");
      }
    } else if (i % 5 == 0) {
      arr.push("Buzz");
    } else {
      arr.push(i);
    }
  }
  return arr;
};

// 5. Functional (Map)
const fizzBuzzMap = () => {
  return Array.from({ length: N }, (_, i) => {
    const num = i + 1;
    if (i % 15 === 0) return "FizzBuzz";
    else if (i % 3 === 0) return "Fizz";
    else if (i % 5 === 0) return "Buzz";
    return num;
  });
};

// 6. Tail Recussion
const fizzBuzzTailRec = (n, current = 1, acc = []) => {
  if (current > n) return acc;

  let val;
  if (current % 15 === 0) val = "FizzBuzz";
  else if (current % 3 === 0) val = "Fizz";
  else if (current % 5 === 0) val = "Buzz";
  else val = current;
  acc.push(val);

  return fizzBuzzTailRec(n, current + 1, acc);
}

// 7. Tail Recursion + Trampolining
const trampoline = (fn) => (...args) => {
  let result = fn(...args);
  while (typeof result === 'function') {
    result = result();
  }
  return result;
}

const _fizzBuzzInternal = (n, current = 1, acc = []) => {
  if (current > n) return acc;

  let val;
  if (current % 15 === 0) val = "FizzBuzz";
  else if (current % 3 === 0) val = "Fizz";
  else if (current % 5 === 0) val = "Buzz";
  else val = current;
  acc.push(val);

  return () => _fizzBuzzInternal(n, current + 1, acc);
}

const fizzBuzzTailRecTrampolined = trampoline(_fizzBuzzInternal);

// 8. Pattern Unrolling + Pre-allocation
const fizzBuzzUnrolled = () => {
  const arr = new Array(N);
  let i = 1;
  while (i <= N - 15) {
    arr[i-1] = i; arr[i] = i+1; arr[i+1] = "Fizz"; 
    arr[i+2] = i+3; arr[i+3] = "Buzz"; arr[i+4] = "Fizz";
    arr[i+5] = i+6; arr[i+6] = i+7; arr[i+7] = "Fizz";
    arr[i+8] = "Buzz"; arr[i+9] = i+10; arr[i+10] = "Fizz";
    arr[i+11] = i+12; arr[i+12] = i+13; arr[i+13] = i+14;
    arr[i+14] = "FizzBuzz";
    i += 15;
  }
  while (i <= N) {
    if (i % 15 === 0) arr[i-1] = "FizzBuzz";
    else if (i % 3 === 0) arr[i-1] = "Fizz";
    else if (i % 5 === 0) arr[i-1] = "Buzz";
    else arr[i-1] = i;
    i++;
  }
  return arr;
};

group('FizzBuzz Optimization Race', () => {
  bench('Naive Implementation', () => fizzBuzzNaive());
  bench('Least Common Multiple', () => fizzBuzzLCM());
  bench('Least Common Multiple + Ordering', () => fizzBuzzLCMOrdered());
  bench('Optimize Modulu Checks', () => fizzBuzzModulo());
  bench('Functional (Map)', () => fizzBuzzMap());
  bench('Tail Recursion', () => fizzBuzzTailRec(N));
  bench('Tail Recursion + Trampolining', () => fizzBuzzTailRecTrampolined(N));
  bench('Unrolled (Pre-alloc + Loop Unrolling)', () => fizzBuzzUnrolled());
});

await run();
