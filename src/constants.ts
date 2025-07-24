import { FieldValues, UseFormReturn } from "react-hook-form";
import formDataItems from "./data.json";

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
  control: UseFormReturn<FieldValues>["control"];
  errors: UseFormReturn<FieldValues>["formState"]["errors"];
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
  maxSize?: number; // in MB
  accept?: string; // file types
  multiple?: boolean; // for file inputs
  defaultValue?: string | number | boolean | FileList | null;
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
    {
      name: "avatar",
      type: "file",
      label: "Profile Picture",
      required: false,
      accept: "image/*",
      maxSize: 5, // MB
      multiple: false,
    },
    {
      name: "documents",
      type: "file",
      label: "Supporting Documents",
      required: false,
      accept: ".pdf,.doc,.docx",
      maxSize: 10, // MB
      multiple: true,
    },
  ],
};

export interface IFormDataProp {
  category: string;
  items: {
    key: string;
    type: string;
    label: string;
    validation?: { max?: number; min?: number; required?: boolean };
    placeholder?: string;
    options?: { value: string; label: string }[];
    sub_category?: string;
    submission?: { value: string | number | boolean };
  };
}
export interface IFormDataProps {
  category: string;
  items: {
    key: string;
    type: string;
    label: string;
    validation?: { max?: number; min?: number; required?: boolean };
    placeholder?: string;
    options?: { value: string; label: string }[];
    sub_category?: string;
    submission?: { value: string | number | boolean };
  }[];
}

export const company_details: IFormDataProps = {
  category: "COMPANY_INFORMATION",
  items: [
    {
      key: "legal_name",
      type: "text",
      label: "Legal Business Name",
      validation: { max: 255, min: 4, required: true },
      placeholder: "--Enter business name--",
      sub_category: "TELL_US_MORE_ABOUT_YOUR_BUSINESS",
      submission: { value: "Bergnaum Group" },
    },
    {
      key: "registered_address",
      type: "text",
      label: "Registered Address",
      validation: { max: 255, min: 4, required: true },
      placeholder: "--Enter address--",
      sub_category: "TELL_US_MORE_ABOUT_YOUR_BUSINESS",
      submission: { value: "22554 Windler Forks" },
    },
    {
      key: "other_affliated_entities",
      type: "select",
      label: "Other affiliated Entities",
      options: [
        { value: "", label: "Select an option" },
        { value: "Parent Company", label: "Parent Company" },
        { value: "Subsidiaries", label: "Subsidiaries" },
        { value: "Joint Ventures", label: "Joint Ventures" },
        { value: "Financial Institutions", label: "Financial Institutions" },
        { value: "NGOs", label: "NGOs" },
      ],
      validation: { required: true },
      placeholder: "--select option--",
      sub_category: "TELL_US_MORE_ABOUT_YOUR_BUSINESS",
      submission: { value: "Parent Company" },
    },
    {
      key: "country_of_incorporation",
      type: "text",
      label: "Country of Incorporation",
      validation: { max: 255, min: 4, required: true },
      placeholder: "--Enter country of incorporation--",
      sub_category: "TELL_US_MORE_ABOUT_YOUR_BUSINESS",
    },
    {
      key: "registraion_number_tax_id",
      type: "text",
      label: "Registration Number/Tax ID",
      validation: { max: 20, min: 10, required: true },
      placeholder: "Enter your registration number or tax ID",
      sub_category: "TELL_US_MORE_ABOUT_YOUR_BUSINESS",
    },
    {
      key: "company_registration_number",
      type: "text",
      label: "Company Registration Number",
      validation: { max: 30, min: 10, required: true },
      placeholder: "Enter your company registration number",
      sub_category: "TELL_US_MORE_ABOUT_YOUR_BUSINESS",
    },
    {
      key: "nature_of_business",
      type: "select",
      label: "Nature of Business",
      options: [
        { value: "", label: "Select an option" },
        { value: "Sole Proprietorship", label: "Sole Proprietorship" },
        { value: "Limited Liability", label: "Limited Liability" },
      ],
      validation: { required: true },
      placeholder: "Select an option",
      sub_category: "TELL_US_MORE_ABOUT_YOUR_BUSINESS",
    },
    {
      key: "website_url",
      type: "text",
      label: "Website URL (optional)",
      validation: { max: 100, min: 10, required: false },
      placeholder: "Enter your website URL",
      sub_category: "TELL_US_MORE_ABOUT_YOUR_BUSINESS",
    },
    {
      key: "date_of_establishment",
      type: "date",
      label: "Date of Establishment",
      validation: { required: true },
      sub_category: "TELL_US_MORE_ABOUT_YOUR_BUSINESS",
      placeholder: "Select date of establishment",
      submission: { value: "2025-09-12" },
    },
    // {
    //   key: "type_of_product_services_offered",
    //   type: "select",
    //   label: "Type of Products/Services Offered",
    //   options: [
    //     { value: "", label: "Select an option" },
    //     { value: "Real Estate", label: "Real Estate" },
    //     { value: "Betting", label: "Betting" },
    //     { value: "Oil and Gas", label: "Oil and Gas" },
    //     { value: "Financial Technology", label: "Financial Technology" },
    //     { value: "Traveling Agency", label: "Traveling Agency" },
    //     { value: "Consultant", label: "Consultant" },
    //     { value: "Manufacturing", label: "Manufacturing" },
    //     { value: "Agriculture", label: "Agriculture" },
    //     { value: "Mechanized Family", label: "Mechanized Family" },
    //   ],
    //   validation: { required: true },
    //   placeholder: "Select an option",
    //   sub_category: "TELL_US_MORE_ABOUT_YOUR_BUSINESS",
    // },
    // {
    //   key: "primary_contact_name",
    //   type: "text",
    //   label: "Primary Contact Name",
    //   validation: { max: 255, min: 4, required: true },
    //   sub_category: "BUSINESS_CONTACT",
    // },
    // {
    //   key: "primary_contact_email",
    //   type: "email",
    //   label: "Primary Contact Email",
    //   validation: { max: 255, min: 4, required: true },
    //   sub_category: "BUSINESS_CONTACT",
    // },
    // {
    //   key: "primary_contact_phone",
    //   type: "text",
    //   label: "Primary Contact Phone",
    //   validation: { max: 255, min: 4, required: true },
    //   sub_category: "BUSINESS_CONTACT",
    // },
    // {
    //   key: "bank_name",
    //   type: "text",
    //   label: "Bank Name",
    //   validation: { max: 255, min: 4, required: true },
    //   sub_category: "BANK_DETAILS",
    // },
    // {
    //   key: "account_number",
    //   type: "text",
    //   label: "Account Number",
    //   validation: { max: 255, min: 4, required: true },
    //   sub_category: "BANK_DETAILS",
    // },
  ],
};

export const company_directors: IFormDataProps = {
  category: "DIRECTORS_OWNERS",
  items: [
    {
      key: "legal_name",
      type: "text",
      label: "Legal Business Name",
      validation: { max: 255, min: 4, required: true },
      placeholder: "--Enter business name--",
      sub_category: "TELL_US_MORE_ABOUT_YOUR_BUSINESS",
      submission: { value: "Bergnaum Group" },
    },
    {
      key: "registered_address",
      type: "text",
      label: "Registered Address",
      validation: { max: 255, min: 4, required: true },
      placeholder: "--Enter address--",
      sub_category: "TELL_US_MORE_ABOUT_YOUR_BUSINESS",
      submission: { value: "22554 Windler Forks" },
    },
    {
      key: "other_affliated_entities",
      type: "select",
      label: "Other affiliated Entities",
      options: [
        { value: "", label: "Select an option" },
        { value: "Parent Company", label: "Parent Company" },
        { value: "Subsidiaries", label: "Subsidiaries" },
        { value: "Joint Ventures", label: "Joint Ventures" },
        { value: "Financial Institutions", label: "Financial Institutions" },
        { value: "NGOs", label: "NGOs" },
      ],
      validation: { required: true },
      placeholder: "--select option--",
      sub_category: "TELL_US_MORE_ABOUT_YOUR_BUSINESS",
      submission: { value: "Parent Company" },
    },
    {
      key: "country_of_incorporation",
      type: "text",
      label: "Country of Incorporation",
      validation: { max: 255, min: 4, required: true },
      placeholder: "--Enter country of incorporation--",
      sub_category: "TELL_US_MORE_ABOUT_YOUR_BUSINESS",
    },
    {
      key: "registraion_number_tax_id",
      type: "text",
      label: "Registration Number/Tax ID",
      validation: { max: 20, min: 10, required: true },
      placeholder: "Enter your registration number or tax ID",
      sub_category: "TELL_US_MORE_ABOUT_YOUR_BUSINESS",
    },
    {
      key: "company_registration_number",
      type: "text",
      label: "Company Registration Number",
      validation: { max: 30, min: 10, required: true },
      placeholder: "Enter your company registration number",
      sub_category: "TELL_US_MORE_ABOUT_YOUR_BUSINESS",
    },
    {
      key: "nature_of_business",
      type: "select",
      label: "Nature of Business",
      options: [
        { value: "", label: "Select an option" },
        { value: "Sole Proprietorship", label: "Sole Proprietorship" },
        { value: "Limited Liability", label: "Limited Liability" },
      ],
      validation: { required: true },
      placeholder: "Select an option",
      sub_category: "TELL_US_MORE_ABOUT_YOUR_BUSINESS",
    },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const groupedForms = {} as Record<string, any>;

formDataItems.data.general.forEach((section) => {
  groupedForms[section.category] = section.items;
});

// Group fields by sub_category from the imported JSON
export const groupedFields = Object.values(groupedForms)
  .flat()
  .reduce<Record<string, IFormDataProps["items"]>>((acc, item) => {
    const category = item.sub_category || "OTHER";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

export const formatSectionTitle = (title: string) => {
  return title
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

export const steps = [
  {
    id: "company-info",
    title: "Company Information",
    description: "Basic company details",
    category: "COMPANY_INFORMATION",
  },
  {
    id: "directors-owners",
    title: "Directors & Owners Info",
    description: "Key personnel information",
    category: "DIRECTOR_SHARE_HOLDER",
  },
  {
    id: "kyc-documents",
    title: "KYC Documents",
    description: "Required documentation",
    category: "KYC_DOCUMENT",
  },
  {
    id: "review",
    title: "Review",
    description: "Review and submit",
    category: "REVIEW",
  },
];

export const routeSteps = [
  {
    id: "company-info",
    title: "Company Information",
    description: "Basic company details",
    route: "/compliance/company-information",
    section: "companyInfo",
  },
  {
    id: "directors-owners",
    title: "Directors & Owners Info",
    description: "Key personnel information",
    route: "/compliance/directors-owners",
    section: "directorsOwners",
  },
  {
    id: "kyc-documents",
    title: "KYC Documents",
    description: "Required documentation",
    route: "/compliance/kyc-documents",
    section: "kycDocuments",
  },
  {
    id: "review",
    title: "Review",
    description: "Review and submit",
    route: "/compliance/review",
    section: "review",
  },
];
