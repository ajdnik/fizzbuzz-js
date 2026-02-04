# FizzBuzz Benchmark

Benchmarking different FizzBuzz implementations in JavaScript to compare performance characteristics of various optimization strategies.

## Implementations

| Implementation | Description |
|----------------|-------------|
| **Naive** | Classic approach using string concatenation |
| **Least Common Multiple** | Uses modulo checks for 3, 5, and 15 |
| **LCM + Ordering** | LCM with optimized condition ordering (15 first) |
| **Optimized Modulo** | Nested conditionals to minimize modulo operations |
| **Functional (Map)** | Uses `Array.from` with mapping function |
| **Tail Recursion** | Recursive implementation with accumulator |
| **Tail Recursion + Trampolining** | Avoids stack overflow with trampoline pattern |
| **Unrolled** | Pre-allocated array with loop unrolling (15-iteration pattern) |

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

## CI

This project includes a GitHub Actions workflow that runs benchmarks across multiple Node.js versions (18, 20, 22, 24, 25) and displays results in the Actions summary page.

## License

ISC
