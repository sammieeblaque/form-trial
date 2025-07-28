/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import {
  company_details,
  // formatSectionTitle,
  // formData,
  formSchema,
  // groupedFields,
  IFormDataProps,
} from "../constants";
import { FormBuilderRenderer } from "./FormRenderer";

// File preview component

const JsonformBuilder = <T extends IFormDataProps>({ data }: { data: T }) => {
  const getDefaultValues = (schema: IFormDataProps["items"]) => {
    const defaults: Record<string, any> = {};
    schema?.forEach((field: any) => {
      switch (field.type) {
        case "checkbox":
          defaults[field.key] = false;
          break;
        case "number":
          defaults[field.key] = "";
          break;
        case "select":
          defaults[field.key] = field.options?.[0]?.value || "";
          break;
        case "radio":
          defaults[field.key] = "";
          break;
        case "file":
          defaults[field.key] = field.validation?.multiple ? [] : null;
          break;
        default:
          defaults[field.key] = "";
      }
    });
    return defaults;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: getDefaultValues(company_details.items),
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully! Check console for data.");
  };

  const onReset = () => {
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {formSchema.title}
      </h1>

      <div className="space-y-6">
        {data.items.map((field) => (
          <FormBuilderRenderer
            key={field.key}
            field={field}
            control={control}
            errors={errors}
          />
        ))}

        {/* {Object.entries(groupedFields).map(([sectionTitle, fields]) => (
          <div key={sectionTitle} className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              {formatSectionTitle(sectionTitle)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => (
                <FormBuilderRenderer
                  key={field.key}
                  field={field}
                  control={control}
                  errors={errors}
                />
              ))}
            </div>
          </div>
        ))} */}

        <div className="flex space-x-4 pt-6">
          <button
            onClick={handleSubmit(onSubmit)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Submit
          </button>

          <button
            onClick={onReset}
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* <div className="mt-8 p-4 bg-gray-50 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Form Schema Structure:</h3>
        <pre className="text-sm text-gray-600 overflow-x-auto">
          {JSON.stringify(formSchema, null, 2)}
        </pre>
      </div> */}
    </div>
  );
};

export default JsonformBuilder;
