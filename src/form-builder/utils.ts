/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFieldProps, IFormDataProp } from "../constants";

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

  if (field.type === "file") {
    rules.validate = {
      fileSize: (files: any) => {
        if (!files || (Array.isArray(files) && files.length === 0)) return true;
        const fileList = Array.isArray(files) ? files : [files];
        const maxSizeBytes = (field.maxSize || 10) * 1024 * 1024; // Convert MB to bytes

        for (const file of fileList) {
          if (file.size > maxSizeBytes) {
            return `File size must be less than ${field.maxSize || 10}MB`;
          }
        }
        return true;
      },
      fileType: (files: any) => {
        if (!files || (Array.isArray(files) && files.length === 0)) return true;
        if (!field.accept) return true;

        const fileList = Array.isArray(files) ? files : [files];
        const acceptedTypes = field.accept
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
            return `File type not supported. Accepted types: ${field.accept}`;
          }
        }
        return true;
      },
    };
  }

  return rules;
};
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

  // if (field.items?.type === "file") {
  //   rules.validate = {
  //     fileSize: (files: any) => {
  //       if (!files || (Array.isArray(files) && files.length === 0)) return true;
  //       const fileList = Array.isArray(files) ? files : [files];
  //       const maxSizeBytes = (field.items.validation?.maxSize || 10) * 1024 * 1024; // Convert MB to bytes

  //       for (const file of fileList) {
  //         if (file.size > maxSizeBytes) {
  //           return `File size must be less than ${field.items.validation?.maxSize || 10}MB`;
  //         }
  //       }
  //       return true;
  //     },
  //     fileType: (files: any) => {
  //       if (!files || (Array.isArray(files) && files.length === 0)) return true;
  //       if (!field.accept) return true;

  //       const fileList = Array.isArray(files) ? files : [files];
  //       const acceptedTypes = field.accept
  //         .split(",")
  //         .map((type) => type.trim());

  //       for (const file of fileList) {
  //         const isValidType = acceptedTypes.some((acceptedType) => {
  //           if (acceptedType.startsWith(".")) {
  //             return file.name
  //               .toLowerCase()
  //               .endsWith(acceptedType.toLowerCase());
  //           } else if (acceptedType.includes("/*")) {
  //             const [type] = acceptedType.split("/");
  //             return file.type.startsWith(type + "/");
  //           } else {
  //             return file.type === acceptedType;
  //           }
  //         });

  //         if (!isValidType) {
  //           return `File type not supported. Accepted types: ${field.accept}`;
  //         }
  //       }
  //       return true;
  //     },
  //   };
  // }

  return rules;
};
