// 1. Naive Implementation
export const fizzBuzzNaive = (N) => {
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

// 2. Least Common Multiple
export const fizzBuzzLCM = (N) => {
  const arr = [];
  for (let i = 1; i <= N; i++) {
    if (i % 15 === 0) arr.push("FizzBuzz");
    else if (i % 3 === 0) arr.push("Fizz");
    else if (i % 5 === 0) arr.push("Buzz");
    else arr.push(i);
  }
  return arr;
};

// 3. Optimize Modulo Checks
export const fizzBuzzModulo = (N) => {
  const arr = [];
  for (let i = 1; i <= N; i++) {
    if (i % 3 == 0) {
      if (i % 5 == 0) arr.push("FizzBuzz");
      else arr.push("Fizz");
    } else if (i % 5 == 0) arr.push("Buzz");
    else arr.push(i);
  }
  return arr;
};

// 4. Array Pre-allocation
export const fizzBuzzPreallocated = (N) => {
  const arr = new Array(N);
  for (let i = 0; i < N; i++) {
    const num = i + 1;
    if (num % 3 == 0) {
      if (num % 5 == 0) arr[i] = "FizzBuzz";
      else arr[i] = "Fizz";
    } else if (num % 5 == 0) arr[i] = "Buzz";
    else arr[i] = num;
  }
  return arr;
};

// 5. Loop Unrolling
export const fizzBuzzUnrolled = (N) => {
  const arr = new Array(N);
  let i = 1;
  while (i <= N - 15) {
    arr[i-1] = i; arr[i] = i+1; arr[i+1] = "Fizz"; 
    arr[i+2] = i+3; arr[i+3] = "Buzz"; arr[i+4] = "Fizz";
    arr[i+5] = i+6; arr[i+6] = i+7; arr[i+7] = "Fizz";
    arr[i+8] = "Buzz"; arr[i+9] = i+10; arr[i+10] = "Fizz";
    arr[i+11] = i+12; arr[i+12] = i+13;
    arr[i+13] = "FizzBuzz";
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

// 6. Tail Recursion + Trampolining
const trampoline = (fn) => (...args) => {
  let result = fn(...args);
  while (typeof result === 'function') {
    result = result();
  }
  return result;
}

const _fizzBuzzInternal = (n, current = 1, arr = new Array(n)) => {
  if (current > n) return arr;

  if (current % 3 == 0) {
    if (current % 5 == 0) arr[current - 1] = "FizzBuzz";
    else arr[current - 1] = "Fizz";
  } else if (current % 5 == 0) arr[current - 1] = "Buzz";
  else arr[current - 1] = current;

  return () => _fizzBuzzInternal(n, current + 1, arr);
}

export const fizzBuzzRecursive = trampoline(_fizzBuzzInternal);

