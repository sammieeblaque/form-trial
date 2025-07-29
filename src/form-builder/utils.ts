/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFormDataProp } from "../constants";

export const getNewValidationRules = (field: IFormDataProp["items"]) => {
  const rules: { [key: string]: unknown } = {};

  if (field?.validation?.required) {
    rules.required = `${field?.label} is required`;
  }

  if (field?.type === "email") {
    rules.pattern = {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    };
  }

  if (
    field?.type === "text" ||
    field?.type === "email" ||
    field?.type === "textarea"
  ) {
    if (field?.validation?.min !== undefined) {
      rules.minLength = {
        value: field.validation.min,
        message: `${field?.label} must be at least ${field.validation.min} characters long`,
      };
    }
    if (field?.validation?.max !== undefined) {
      rules.maxLength = {
        value: field.validation.max,
        message: `${field?.label} must not exceed ${field.validation.max} characters`,
      };
    }
  }

  if (field?.type === "number") {
    if (field?.validation?.min !== undefined) {
      rules.min = {
        value: field.validation.min,
        message: `Minimum value is ${field.validation.min}`,
      };
    }
    if (field?.validation?.max !== undefined) {
      rules.max = {
        value: field.validation.max,
        message: `Maximum value is ${field.validation.max}`,
      };
    }
  }

  if (field?.type === "file") {
    rules.validate = {
      fileSize: (files: any) => {
        if (!files || (Array.isArray(files) && files.length === 0)) return true;
        const fileList = Array.isArray(files) ? files : [files];
        const maxSizeBytes = (field?.validation?.maxSize || 10) * 1024 * 1024; // Convert MB to bytes

        for (const file of fileList) {
          if (file.size > maxSizeBytes) {
            return `File size must be less than ${
              field?.validation?.maxSize || 10
            }MB`;
          }
        }
        return true;
      },
      fileType: (files: any) => {
        if (!files || (Array.isArray(files) && files.length === 0)) return true;
        if (!field?.validation?.accept) return true;

        const fileList = Array.isArray(files) ? files : [files];
        const acceptedTypes = field?.validation?.accept
          .split(",")
          .map((type) => type.trim());

        for (const file of fileList) {
          const isValidType = acceptedTypes.some((acceptedType) => {
            if (acceptedType.startsWith(".")) {
              return file.name
                .toLowerCase()
                .endsWith(acceptedType.toLowerCase());
            } else if (acceptedType.includes("/*")) {
              const [type] = acceptedType.split("/");
              return file.type.startsWith(type + "/");
            } else {
              return file.type === acceptedType;
            }
          });

          if (!isValidType) {
            return `File type not supported. Accepted types: ${field.validation?.accept}`;
          }
        }
        return true;
      },
    };
  }

  return rules;
};
