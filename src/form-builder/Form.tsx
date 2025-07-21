/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Controller,
  FieldValues,
  useForm,
  Control,
  FieldErrors,
} from "react-hook-form";
import { formSchema, type IFieldProps } from "../constants";
import { getValidationRules } from "./utils";
import Field from "./Field";
import { useTranslation } from "react-i18next";

export const FormBuilderRenderer = ({
  field,
  control,
  errors,
}: {
  field: IFieldProps;
  control: Control<FieldValues, any, FieldValues>;
  errors: FieldErrors<FieldValues>;
}) => {
  const renderField = (field: IFieldProps) => {
    const baseClasses =
      "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
    const errorClasses = errors[field.name] ? "border-red-500" : "";

    switch (field.type) {
      case "text":
      case "email":
        return (
          // <Controller
          //   name={field.name}
          //   control={control}
          //   rules={getValidationRules(field)}
          //   render={({ field: { onChange, value, onBlur } }) => (
          //     <input
          //       type={field.type}
          //       placeholder={field.placeholder}
          //       onChange={onChange}
          //       onBlur={onBlur}
          //       value={value || ""}
          //       className={`${baseClasses} ${errorClasses}`}
          //     />
          //   )}
          // />
          <Field
            name={field.name}
            label={field.label}
            required={field.required}
            type={field.type}
            control={control}
            errors={errors}
          />
        );

      case "number":
        return (
          <Controller
            name={field.name}
            control={control}
            rules={getValidationRules(field)}
            render={({ field: { onChange, value, onBlur } }) => (
              <input
                type="number"
                placeholder={field.placeholder}
                min={field.min}
                max={field.max}
                onChange={(e) =>
                  onChange(e.target.value ? Number(e.target.value) : "")
                }
                onBlur={onBlur}
                value={value || ""}
                className={`${baseClasses} ${errorClasses}`}
              />
            )}
          />
        );

      case "select":
        return (
          <Controller
            name={field.name}
            control={control}
            rules={getValidationRules(field)}
            render={({ field: { onChange, value, onBlur } }) => (
              <select
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
                className={`${baseClasses} ${errorClasses}`}
              >
                {field?.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          />
        );

      case "textarea":
        return (
          <Controller
            name={field.name}
            control={control}
            rules={getValidationRules(field)}
            render={({ field: { onChange, value, onBlur } }) => (
              <textarea
                placeholder={field.placeholder}
                rows={field.rows || 3}
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
                className={`${baseClasses} ${errorClasses} resize-vertical`}
              />
            )}
          />
        );

      case "checkbox":
        return (
          <Controller
            name={field.name}
            control={control}
            rules={getValidationRules(field)}
            render={({ field: { onChange, value, onBlur } }) => (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={value || false}
                  onChange={(e) => onChange(e.target.checked)}
                  onBlur={onBlur}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  {field.label}
                </label>
              </div>
            )}
          />
        );

      case "radio":
        return (
          <Controller
            name={field.name}
            control={control}
            rules={getValidationRules(field)}
            render={({ field: { onChange, value, onBlur } }) => (
              <div className="space-y-2">
                {field?.options?.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      id={`${field.name}-${option.value}`}
                      value={option.value}
                      checked={value === option.value}
                      onChange={(e) => onChange(e.target.value)}
                      onBlur={onBlur}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label
                      htmlFor={`${field.name}-${option.value}`}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          />
        );

      default:
        return <div>Unsupported field type: {field.type}</div>;
    }
  };

  return (
    <div className="mb-6">
      {field.type !== "checkbox" && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {renderField(field)}

      {errors[field.name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[field.name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

const JsonformBuilder = () => {
  const { t, i18n } = useTranslation();

  const getDefaultValues = (schema: any) => {
    const defaults: Record<string, any> = {};
    schema?.fields?.forEach((field: any) => {
      switch (field.type) {
        case "checkbox":
          defaults[field.name] = false;
          break;
        case "number":
          defaults[field.name] = "";
          break;
        case "select":
          defaults[field.name] = field.options?.[0]?.value || "";
          break;
        case "radio":
          defaults[field.name] = "";
          break;
        default:
          defaults[field.name] = "";
      }
    });
    return defaults;
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: getDefaultValues(formSchema.fields),
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
        {formSchema.fields.map((field) => (
          <FormBuilderRenderer
            key={field.name}
            field={field}
            control={control}
            errors={errors}
          />
        ))}
        <button
          onClick={() => changeLanguage("en-US")}
          className="cursor-pointer"
        >
          English
        </button>{" "}
        <button
          onClick={() => changeLanguage("es-ES")}
          className="cursor-pointer"
        >
          Español
        </button>
        <div className="flex space-x-4 pt-6">
          <button
            onClick={handleSubmit(onSubmit)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {t("Submit")}
          </button>

          <button
            onClick={onReset}
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            {t("Reset")}
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
