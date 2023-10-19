const assert = require("assert");
const { average, isEmpty, isSet, roundPrecisely } = require("../src");

let totalTests = 0;
let passedTests = 0;

function logTestResult(result, message, error) {
  totalTests++;
  if (result) {
    passedTests++;
    console.log(`\x1b[32m${message} - PASSED\x1b[0m`); // Vert pour PASSED
  } else {
    console.log(`\x1b[31m${message} - FAILED\x1b[0m`); // Rouge pour FAILED
    if (error) console.error(error);
  }
}

function tryTest(message, testFunction, expectedValue, expectedError) {
  try {
    const result = testFunction();
    assert.strictEqual(result, expectedValue);
    logTestResult(true, message);
  } catch (error) {
    if (error instanceof assert.AssertionError) {
      logTestResult(false, message, error.message);
    } else if (expectedError && error.message === expectedError) {
      // Si une erreur est levée et qu'elle correspond à l'erreur attendue
      logTestResult(true, message);
    } else {
      logTestResult(false, message, `Unexpected error: ${error.message}`);
    }
  }
}

// TEST for the average function
console.log("\x1b[90m\x1b[1m--- TEST for the average function ---\x1b[0m");

tryTest("Test with array of numbers", () => average([1, 3, 4, 5]), 3.25);
tryTest(
  "Test with array of numbers and string",
  () => average([1, 3, 4, 5, "5"]),
  3.6
);
tryTest(
  "Test with array of decimal (rounded on 2 digits)",
  () => average([1, 3, 4, 5.5], 2),
  3.38
);
tryTest(
  "Test with array of decimal (rounded off)",
  () => average([1, 3, 4, 5.5], 0),
  3.375
);
tryTest(
  "Test with mixed types",
  () => average([1, 3, 4, 5, true, [], "ok"]),
  null,
  "The array must contain only numbers"
);
tryTest(
  "Test with empty array",
  () => average([]),
  null,
  "The array is empty or it's not an array"
);

// TEST for the isEmpty function
console.log("\n\x1b[90m\x1b[1m--- TEST for the isEmpty function ---\x1b[0m");
tryTest("Test with empty array", () => isEmpty([]), true);
tryTest("Test with non-empty array", () => isEmpty([1, 2, 3]), false);
tryTest(
  "Test with string",
  () => isEmpty("test"),
  null,
  "The argument is not an array"
);
tryTest(
  "Test with number",
  () => isEmpty(1),
  null,
  "The argument is not an array"
);
tryTest(
  "Test with NaN",
  () => isEmpty(NaN),
  null,
  "The argument is not an array"
);

// TEST for the isSet function
console.log("\n\x1b[90m\x1b[1m--- TEST for the isSet function ---\x1b[0m");
tryTest("Test with string", () => isSet("test"), true);
tryTest("Test with number", () => isSet(1), true);
tryTest("Test with NaN", () => isSet(NaN), false);
tryTest("Test with null", () => isSet(null), false);
tryTest("Test with undefined", () => isSet(undefined), false);
tryTest("Test with empty string", () => isSet(""), false);
tryTest("Test with 0", () => isSet(0), false);
tryTest("Test with false", () => isSet(false), false);

// TEST for the roundPrecisely function
console.log(
  "\n\x1b[90m\x1b[1m--- TEST for the roundPrecisely function ---\x1b[0m"
);
tryTest("Test with 1.2345 and 2", () => roundPrecisely(1.2345, 2), 1.23);
tryTest("Test with 1.235 and 2", () => roundPrecisely(1.235, 2), 1.24);
tryTest("Test with 1.2345 and 3", () => roundPrecisely(1.2345, 3), 1.235);
tryTest("Test with 1.2345 and 4", () => roundPrecisely(1.2345, 4), 1.2345);
tryTest("Test with 1.2345 and 5", () => roundPrecisely(1.2345, 5), 1.2345);
tryTest("Test with 1.2345 and 6", () => roundPrecisely(1.2345, 6), 1.2345);
tryTest("Test with 1.2345 and 0", () => roundPrecisely(1.2345, 0), 1);
tryTest("Test with 2387 and -1", () => roundPrecisely(2387, -1), 2390);
tryTest("Test with 2387 and -2", () => roundPrecisely(2387, -2), 2400);
tryTest("Test with 2387 and -3", () => roundPrecisely(2387, -3), 2000);
tryTest("Test with 2387 and -4", () => roundPrecisely(2387, -4), 0);
