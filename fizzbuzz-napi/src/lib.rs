use napi::*;
use napi_derive::napi;
use std::fmt::Write;

#[derive(Debug, Clone, PartialEq)]
enum FizzBuzzValue {
    Number(i32),
    Fizz,
    Buzz,
    FizzBuzz,
}

#[inline]
fn classify(n: i32) -> FizzBuzzValue {
    if n % 15 == 0 {
        FizzBuzzValue::FizzBuzz
    } else if n % 3 == 0 {
        FizzBuzzValue::Fizz
    } else if n % 5 == 0 {
        FizzBuzzValue::Buzz
    } else {
        FizzBuzzValue::Number(n)
    }
}

fn fizz_buzz_core(n: i32) -> Vec<FizzBuzzValue> {
    (1..=n).map(classify).collect()
}

// 1. Standard napi-rs approach
#[napi]
pub fn fizz_buzz_rust(env: Env, n: i32) -> Result<JsObject> {
    let n_usize = n as usize;
    let mut arr = env.create_array_with_length(n_usize)?;

    for (i, val) in fizz_buzz_core(n).into_iter().enumerate() {
        match val {
            FizzBuzzValue::FizzBuzz => {
                arr.set_element(i as u32, env.create_string("FizzBuzz")?)?
            }
            FizzBuzzValue::Fizz => arr.set_element(i as u32, env.create_string("Fizz")?)?,
            FizzBuzzValue::Buzz => arr.set_element(i as u32, env.create_string("Buzz")?)?,
            FizzBuzzValue::Number(num) => {
                arr.set_element(i as u32, env.create_int32(num)?)?
            }
        }
    }

    Ok(arr)
}

// 2. JSON serialization
#[napi]
pub fn fizz_buzz_rust_json(n: i32) -> String {
    let values = fizz_buzz_core(n);
    let mut result = String::with_capacity(n as usize * 6);
    result.push('[');
    for (i, val) in values.into_iter().enumerate() {
        if i > 0 {
            result.push(',');
        }
        match val {
            FizzBuzzValue::FizzBuzz => result.push_str("\"FizzBuzz\""),
            FizzBuzzValue::Fizz => result.push_str("\"Fizz\""),
            FizzBuzzValue::Buzz => result.push_str("\"Buzz\""),
            FizzBuzzValue::Number(num) => {
                let _ = write!(result, "{}", num);
            }
        }
    }
    result.push(']');
    result
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn classify_number() {
        assert_eq!(classify(1), FizzBuzzValue::Number(1));
        assert_eq!(classify(2), FizzBuzzValue::Number(2));
        assert_eq!(classify(4), FizzBuzzValue::Number(4));
        assert_eq!(classify(7), FizzBuzzValue::Number(7));
    }

    #[test]
    fn classify_fizz() {
        for n in [3, 6, 9, 12, 18, 21, 24, 27, 33] {
            assert_eq!(classify(n), FizzBuzzValue::Fizz, "expected Fizz at {n}");
        }
    }

    #[test]
    fn classify_buzz() {
        for n in [5, 10, 20, 25, 35, 40, 50] {
            assert_eq!(classify(n), FizzBuzzValue::Buzz, "expected Buzz at {n}");
        }
    }

    #[test]
    fn classify_fizzbuzz() {
        for n in [15, 30, 45, 60, 75, 90] {
            assert_eq!(
                classify(n),
                FizzBuzzValue::FizzBuzz,
                "expected FizzBuzz at {n}"
            );
        }
    }

    #[test]
    fn core_empty() {
        assert_eq!(fizz_buzz_core(0), vec![]);
    }

    #[test]
    fn core_single() {
        assert_eq!(fizz_buzz_core(1), vec![FizzBuzzValue::Number(1)]);
    }

    #[test]
    fn core_full_cycle() {
        let expected = vec![
            FizzBuzzValue::Number(1),
            FizzBuzzValue::Number(2),
            FizzBuzzValue::Fizz,
            FizzBuzzValue::Number(4),
            FizzBuzzValue::Buzz,
            FizzBuzzValue::Fizz,
            FizzBuzzValue::Number(7),
            FizzBuzzValue::Number(8),
            FizzBuzzValue::Fizz,
            FizzBuzzValue::Buzz,
            FizzBuzzValue::Number(11),
            FizzBuzzValue::Fizz,
            FizzBuzzValue::Number(13),
            FizzBuzzValue::Number(14),
            FizzBuzzValue::FizzBuzz,
        ];
        assert_eq!(fizz_buzz_core(15), expected);
    }

    #[test]
    fn core_length() {
        assert_eq!(fizz_buzz_core(1000).len(), 1000);
    }

    #[test]
    fn core_two_cycles_boundaries() {
        let result = fizz_buzz_core(30);
        assert_eq!(result.len(), 30);
        assert_eq!(result[14], FizzBuzzValue::FizzBuzz); // 15
        assert_eq!(result[29], FizzBuzzValue::FizzBuzz); // 30
    }

    #[test]
    fn core_all_fizz_positions() {
        let result = fizz_buzz_core(100);
        let fizz_only = [3, 6, 9, 12, 18, 21, 24, 27, 33, 36, 39, 42, 48];
        for n in fizz_only {
            assert_eq!(result[n - 1], FizzBuzzValue::Fizz, "expected Fizz at {n}");
        }
    }

    #[test]
    fn core_all_buzz_positions() {
        let result = fizz_buzz_core(100);
        let buzz_only = [5, 10, 20, 25, 35, 40, 50, 55, 65, 70, 80, 85, 95, 100];
        for n in buzz_only {
            assert_eq!(result[n - 1], FizzBuzzValue::Buzz, "expected Buzz at {n}");
        }
    }

    #[test]
    fn core_all_fizzbuzz_positions() {
        let result = fizz_buzz_core(100);
        let fb = [15, 30, 45, 60, 75, 90];
        for n in fb {
            assert_eq!(
                result[n - 1],
                FizzBuzzValue::FizzBuzz,
                "expected FizzBuzz at {n}"
            );
        }
    }

    #[test]
    fn core_number_positions_are_numbers() {
        let result = fizz_buzz_core(15);
        let nums = [1, 2, 4, 7, 8, 11, 13, 14];
        for n in nums {
            assert_eq!(
                result[n - 1],
                FizzBuzzValue::Number(n as i32),
                "expected Number({n}) at position {n}"
            );
        }
    }

    #[test]
    fn json_empty() {
        assert_eq!(fizz_buzz_rust_json(0), "[]");
    }

    #[test]
    fn json_single() {
        assert_eq!(fizz_buzz_rust_json(1), "[1]");
    }

    #[test]
    fn json_two() {
        assert_eq!(fizz_buzz_rust_json(2), "[1,2]");
    }

    #[test]
    fn json_up_to_fizz() {
        assert_eq!(fizz_buzz_rust_json(3), "[1,2,\"Fizz\"]");
    }

    #[test]
    fn json_up_to_buzz() {
        assert_eq!(fizz_buzz_rust_json(5), "[1,2,\"Fizz\",4,\"Buzz\"]");
    }

    #[test]
    fn json_full_cycle() {
        assert_eq!(
            fizz_buzz_rust_json(15),
            "[1,2,\"Fizz\",4,\"Buzz\",\"Fizz\",7,8,\"Fizz\",\"Buzz\",11,\"Fizz\",13,14,\"FizzBuzz\"]"
        );
    }

    #[test]
    fn json_two_cycles() {
        let result = fizz_buzz_rust_json(30);
        assert!(result.starts_with('['));
        assert!(result.ends_with(']'));
        assert!(result.ends_with(",\"FizzBuzz\"]"));
    }

    #[test]
    fn json_is_valid_structure() {
        let json = fizz_buzz_rust_json(100);

        assert!(json.starts_with('['));
        assert!(json.ends_with(']'));

        let inner = &json[1..json.len() - 1];
        let mut count = 0;
        let mut in_string = false;
        for (i, ch) in inner.char_indices() {
            match ch {
                '"' => in_string = !in_string,
                ',' if !in_string => count += 1,
                _ => {}
            }

            if !in_string {
                assert_ne!(ch, ' ', "unexpected space at position {i}");
            }
        }

        assert_eq!(count + 1, 100);
    }

    #[test]
    fn json_large_n_element_count() {
        let json = fizz_buzz_rust_json(10_000);
        let inner = &json[1..json.len() - 1];
        let mut count = 0;
        let mut in_string = false;
        for ch in inner.chars() {
            match ch {
                '"' => in_string = !in_string,
                ',' if !in_string => count += 1,
                _ => {}
            }
        }
        assert_eq!(count + 1, 10_000);
    }
}
