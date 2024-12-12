export function validateData(
  testString: string,
  dataSetName: string | null
): true | string {
  if (
    dataSetName === "MissingOrInvalidEmails" ||
    dataSetName === "ParentDuplicatedEmails"
  ) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(testString)
      ? true
      : "Please enter a valid email address (ex: user@example.com)";
  } else if (
    dataSetName === "InvalidPhoneNumbers" ||
    dataSetName === "ParentMissingPhoneNumber"
  ) {
    const phoneRegex = /^\+?[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    return phoneRegex.test(testString)
      ? true
      : "Please enter a valid phone number (ex: 402-444-4444)";
  } else if (dataSetName === "ParentMissingSalutations") {
    const salutationRegex = /^(Mr\.|Ms\.|Mrs\.|Dr\.|Prof\.)$/;
    return salutationRegex.test(testString)
      ? true
      : "Please enter a valid salutation (ex: Mr., Mrs., Ms.)";
  } else if (
    dataSetName === "InvalidAddress" ||
    dataSetName === "ParentNoFamilyName"
  ) {
    return typeof testString === "string"
      ? true
      : "Please enter a valid string";
  } else if (
    dataSetName === "InvalidDates" ||
    dataSetName === "StudentMissingBirthdate" ||
    dataSetName === "StudentMissingEnrollDate"
  ) {
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/[0-9]{4}$/;
    return dateRegex.test(testString)
      ? true
      : "Please enter a valid date in the format MM/DD/YYYY";
  } else if (dataSetName === "InvalidSSN") {
    const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
    return ssnRegex.test(testString)
      ? true
      : "Please enter a valid SSN (ex: 123-45-6789)";
  } else if (dataSetName === "ParentBlankRelationships") {
    const relationships = [
      "Father",
      "Mother",
      "Grandfather",
      "Grandmother",
      "Brother",
      "Sister",
      "Guardian",
      "Stepfather",
      "Stepmother",
      "Other",
    ];
    return relationships.includes(testString)
      ? true
      : "Please enter a valid relationship (ex: Father, Mother, Guardian)";
  } else if (dataSetName === "ParentStateAbbrvNotValid") {
    const states = [
      "AL",
      "AK",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DE",
      "FL",
      "GA",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MD",
      "MA",
      "MI",
      "MN",
      "MS",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "NC",
      "ND",
      "OH",
      "OK",
      "OR",
      "PA",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VT",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY",
    ];
    return states.includes(testString)
      ? true
      : "Please enter a valid US state abbreviation (ex: NE, TX, CA)";
  } else if (dataSetName === "StaffMissingOccupation") {
    const occupations = [
      "Teacher",
      "Principal",
      "Counselor",
      "Nurse",
      "Librarian",
      "Coach",
      "Administrator",
    ];
    return occupations.includes(testString)
      ? true
      : "Please enter a common occupation (ex: Teacher, Principal)";
  } else if (dataSetName === "StudentMissingGender") {
    const genders = ["male", "female", "other"];
    return genders.includes(testString.toLowerCase())
      ? true
      : "Please enter a valid gender (male, female, or other)";
  }
  return "No Table Found";
}
