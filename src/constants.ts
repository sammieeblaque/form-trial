import { FieldValues, UseFormReturn } from "react-hook-form";

export enum Gender {
  female = "female",
  male = "male",
  other = "other",
}

export interface IFormInput {
  firstName: string;
  lastName: string;
}
// intersect with IFieldProps to ensure all fields are compatible with form inputs
export interface IField {
  name: string;
  type: string;
  label: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export interface IFormBuilder<T extends FieldValues> {
  fields: IField[];
  onSubmit: (data: T) => void;
  submitButtonText?: string;
  className?: string;
  formClassName?: string;
  fieldClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  form: UseFormReturn<T>;
  defaultValues?: Partial<T>;
  children?: React.ReactNode;
}

export interface IFieldProps {
  name: string;
  type: string;
  label: string;
  required: boolean;
  min?: number;
  max?: number;
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
}

export const formSchema = {
  title: "User Registration Form",
  fields: [
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      required: true,
      placeholder: "Enter your first name",
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      required: true,
      placeholder: "Enter your last name",
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "Enter your email",
    },
    {
      name: "age",
      type: "number",
      label: "Age",
      required: true,
      min: 18,
      max: 100,
      placeholder: "Enter your age",
    },
    {
      name: "country",
      type: "select",
      label: "Country",
      required: true,
      options: [
        { value: "", label: "Select a country" },
        { value: "us", label: "United States" },
        { value: "uk", label: "United Kingdom" },
        { value: "ca", label: "Canada" },
        { value: "ng", label: "Nigeria" },
      ],
    },
    {
      name: "bio",
      type: "textarea",
      label: "Bio",
      required: false,
      placeholder: "Tell us about yourself",
      rows: 4,
    },
    {
      name: "newsletter",
      type: "checkbox",
      label: "Subscribe to newsletter",
      required: false,
    },
    {
      name: "gender",
      type: "radio",
      label: "Gender",
      required: true,
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
    },
  ],
};
