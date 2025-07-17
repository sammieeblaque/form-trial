import { IFieldProps } from "../constants";

export const getValidationRules = (field: IFieldProps) => {
  const rules: { [key: string]: unknown } = {};

  if (field.required) {
    rules.required = `${field.label} is required`;
  }

  if (field.type === "email") {
    rules.pattern = {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    };
  }

  if (field.type === "number") {
    if (field.min !== undefined) {
      rules.min = {
        value: field.min,
        message: `Minimum value is ${field.min}`,
      };
    }
    if (field.max !== undefined) {
      rules.max = {
        value: field.max,
        message: `Maximum value is ${field.max}`,
      };
    }
  }

  return rules;
};
