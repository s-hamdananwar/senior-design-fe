export function validateDateData(testInput: any): true | string {
  // If it's a Date object, convert to MM/DD/YYYY
  if (testInput instanceof Date) {
    const month = (testInput.getMonth() + 1).toString().padStart(2, "0");
    const day = testInput.getDate().toString().padStart(2, "0");
    const year = testInput.getFullYear();
    testInput = `${month}/${day}/${year}`;
  }
  // If it's an ISO string from an <input type="date"> (yyyy-MM-dd), convert it
  else if (
    typeof testInput === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(testInput)
  ) {
    const [year, month, day] = testInput.split("-");
    testInput = `${month}/${day}/${year}`;
  }

  const testString = String(testInput);
  console.log("Final test string:", testString);
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
  return dateRegex.test(testString)
    ? true
    : `Invalid date format: expected MM/DD/YYYY, got "${testString}"`;
}
