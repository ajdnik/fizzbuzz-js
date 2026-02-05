# FizzBuzz Benchmark

[![Benchmark](https://github.com/ajdnik/fizzbuzz-js/actions/workflows/benchmark.yml/badge.svg)](https://github.com/ajdnik/fizzbuzz-js/actions/workflows/benchmark.yml)

Benchmarking different FizzBuzz implementations in JavaScript to compare performance characteristics of various optimization strategies.

## Implementations

| Implementation | Description |
|----------------|-------------|
| **Naive** | Classic approach using string concatenation |
| **Least Common Multiple** | Uses modulo checks for 3, 5, and 15 |
| **Optimized Modulo** | Nested conditionals to minimize modulo operations |
| **Array Pre-allocation** | Pre-allocated array with optimized modulo checks |
| **Tail Recursion + Trampolining** | Avoids stack overflow with trampoline pattern |
| **Loop Unrolling** | Loop unrolling exploiting the 15-iteration FizzBuzz cycle |

## Requirements

- Node.js 18 or later

## Usage

Install dependencies:

```bash
npm install
```

Run the benchmark:

```bash
npm run benchmark
```

Run the tests:

```bash
npm test
```

## CI

This project includes a GitHub Actions workflow that runs benchmarks across multiple Node.js versions (18, 20, 22, 24, 25) and displays results in the Actions summary page.
