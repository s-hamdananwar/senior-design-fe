export function validateData(
  testString: string,
  dataSetName: string | null
): true | string {
  if (
    dataSetName === "MissingOrInvalidEmails" ||
    dataSetName === "ParentDuplicatedEmails" ||
    dataSetName === "email" ||
    dataSetName === "email2"
  ) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(testString)
      ? true
      : "Please enter a valid email address (ex: user@example.com)";
  } else if (
    dataSetName === "InvalidPhoneNumbers" ||
    dataSetName === "ParentMissingPhoneNumber" ||
    dataSetName === "homePhone" ||
    dataSetName === "cellPhone" ||
    dataSetName === "drPhone" ||
    dataSetName === "dentistPhone"
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
    dataSetName === "ParentNoFamilyName" ||
    dataSetName === "address1" ||
    dataSetName === "address2" ||
    dataSetName === "schoolCode" ||
    dataSetName === "ethnicity" ||
    dataSetName === "schoolId" ||
    dataSetName === "previousSchoolAddress" ||
    dataSetName === "drAddress" ||
    dataSetName === "suffix" ||
    dataSetName === "country" ||
    dataSetName === "city" ||
    dataSetName === "dentistAddress" ||
    dataSetName === "hospitalAddress"
  ) {
    return typeof testString === "string"
      ? true
      : "Please enter a valid string";
  } else if (
    dataSetName === "familyName" ||
    dataSetName === "familyNameSecond" ||
    dataSetName === "firstName" ||
    dataSetName === "middleName" ||
    dataSetName === "primarylanguage" ||
    dataSetName === "lastName" ||
    dataSetName === "nickName" ||
    dataSetName === "userName"
  ) {
    const nameRegex = /^([A-Za-z]+)$/;

    return nameRegex.test(testString) ? true : "Please enter a valid string";
  } else if (
    dataSetName === "locker1" ||
    dataSetName === "classOf" ||
    dataSetName === "zip" ||
    dataSetName === "gradeLevel" ||
    dataSetName === "classOf" ||
    dataSetName === "combination1"
  ) {
    const numberRegex = /^([0-9]+)$/;

    return numberRegex.test(testString) ? true : "Please enter a valid number";
  } else if (
    dataSetName === "InvalidDates" ||
    dataSetName === "StudentMissingBirthdate" ||
    dataSetName === "StudentMissingEnrollDates" ||
    dataSetName === "enrollDate" ||
    dataSetName === "withdrawDate" ||
    dataSetName === "graduationDate" ||
    dataSetName === "birthDate" ||
    dataSetName === "baptismDate" ||
    dataSetName === "communionDate" ||
    dataSetName === "reconciliationDate" ||
    dataSetName === "confirmationDate" ||
    dataSetName === "barmitzvahDate"
  ) {
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/[0-9]{4}$/;
    return dateRegex.test(testString)
      ? true
      : "Please enter a valid date in the format MM/DD/YYYY";
  } else if (dataSetName === "InvalidSSN" || dataSetName === "ssn") {
    const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
    return ssnRegex.test(testString)
      ? true
      : "Please enter a valid SSN (ex: 123-45-6789)";
  } else if (dataSetName === "ParentBlankRelationships") {
    const relationships = [
      "Grandparent",
      "Aunt",
      "Uncle",
      "Guardian",
      "Sister",
      "Brother",
      "Other",
    ];
    return relationships.includes(testString)
      ? true
      : "Please enter a valid relationship (ex: Father, Mother, Guardian)";
  } else if (
    dataSetName === "ParentStateAbbrvNotValid" ||
    dataSetName === "state" ||
    dataSetName === "baptismState" ||
    dataSetName === "communionState" ||
    dataSetName === "confirmationState" ||
    dataSetName === "reconciliationState" ||
    dataSetName === "barmitzvahState" ||
    dataSetName === "birthState" ||
    dataSetName === "publicschoolstate"
  ) {
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
  } else if (
    dataSetName === "StudentMissingGender" ||
    dataSetName === "gender"
  ) {
    const genders = ["male", "female", "other"];
    return genders.includes(testString.toLowerCase())
      ? true
      : "Please enter a valid gender (male, female, or other)";
  } else if (dataSetName === "status") {
    const status = ["active", "inactive"];
    return status.includes(testString.toLowerCase())
      ? true
      : "Please enter a valid status (active or inactive)";
  }
  return "No Table Found";
}
