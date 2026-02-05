# FizzBuzz Benchmark

[![Benchmark](https://github.com/ajdnik/fizzbuzz-js/actions/workflows/benchmark.yml/badge.svg)](https://github.com/ajdnik/fizzbuzz-js/actions/workflows/benchmark.yml)

Benchmarking different FizzBuzz implementations in JavaScript (and Rust via napi-rs) to compare performance characteristics of various optimization strategies.

## Implementations

| # | Implementation | Description |
|---|----------------|-------------|
| 1 | **Naive** | Classic approach using string concatenation |
| 2 | **Least Common Multiple** | Uses modulo checks for 3, 5, and 15 |
| 3 | **Optimized Modulo** | Nested conditionals to minimize modulo operations |
| 4 | **Array Pre-allocation** | Pre-allocated array with optimized modulo checks |
| 5 | **Loop Unrolling** | Loop unrolling exploiting the 15-iteration FizzBuzz cycle |
| 6 | **Tail Recursion + Trampolining** | Avoids stack overflow with trampoline pattern |
| 7 | **Domain-Specific Language** | Composable chain of divisibility checks using continuation passing |
| 8 | **Rust napi-rs** | Native Rust addon returning a JS array via N-API |
| 9 | **Rust napi-rs (JSON.parse)** | Native Rust addon returning JSON, parsed on the JS side |

## Requirements

- Node.js 20 or later
- Rust toolchain (for building the napi-rs addon)

## Usage

Install dependencies:

```bash
npm install
```

Build the Rust napi addon:

```bash
npm run build:rust
```

Run the benchmark:

```bash
npm run benchmark
```

Run the JavaScript tests:

```bash
npm test
```

Run the Rust tests:

```bash
npm run test:rust
```

## CI

This project includes a GitHub Actions workflow that runs benchmarks across multiple runtimes:

- **Node.js** — versions 20, 22, 24, 25
- **Bun** — latest
- **Deno** — latest

Results are collected and displayed in the Actions summary page.
