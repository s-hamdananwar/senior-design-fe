export function validateData(
  testString: string,
  dataSetName: string | null
): true | string {
  if (dataSetName == "MissingOrInvalidEmails") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(testString)) {
      return true;
    } else {
      return "Please enter a valid email address (ex: user@example.com)";
    }
  } else if (dataSetName == "InvalidPhoneNumbers") {
    const phoneRegex = /^\+?[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (phoneRegex.test(testString)) {
      return true;
    } else {
      return "Please enter a valid phone number address (ex: 402-444-4444)";
    }
  } else if (dataSetName == "ParentMissingSalutations") {
    const salutationRegex = /^(Mr\.|Ms\.|Mrs\.|Dr\.|Prof\.)$/;
    if (salutationRegex.test(testString)) {
      return true;
    } else {
      return "Please enter a valid salutation (ex: Mr., Mrs., Ms.)";
    }
  }
  return "No Table Found";
}
