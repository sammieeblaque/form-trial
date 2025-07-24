/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import {
  // IFieldProps,
  IFormDataProp,
} from "../constants";
import { useTranslation } from "react-i18next";
// import { getValidationRules } from "./utils";
// import Field from "./Field";
import { getNewValidationRules } from "./utils";
// import { FilePreview } from "./FilePreview";

export const FormBuilderRenderer = ({
  field,
  control,
  errors,
}: {
  field: IFormDataProp["items"];
  control: Control<FieldValues, any, FieldValues>;
  errors: FieldErrors<FieldValues>;
}) => {
  const { t } = useTranslation();
  const renderField = (field: IFormDataProp["items"]) => {
    const baseClasses =
      "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
    const errorClasses = errors[field.key] ? "border-red-500" : "";

    switch (field.type) {
      case "text":
      case "email":
        return (
          <Controller
            name={field.key}
            control={control}
            rules={getNewValidationRules(field)}
            render={({ field: { onChange, value, onBlur } }) => (
              <input
                type={field.type}
                placeholder={field.placeholder}
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
                className={`${baseClasses} ${errorClasses}`}
              />
            )}
          />
          //   <Field
          //     name={field.key}
          //     label={field.label}
          //     required={field.validation?.required}
          //     type={field.type}
          //     control={control}
          //     errors={errors}
          //   />
        );

      case "number":
        return (
          <Controller
            name={field.key}
            control={control}
            rules={getNewValidationRules(field)}
            render={({ field: { onChange, value, onBlur } }) => (
              <input
                type="number"
                placeholder={field.placeholder}
                min={field?.validation?.min}
                max={field.validation?.max}
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
            name={field.key}
            control={control}
            rules={getNewValidationRules(field)}
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
            name={field.key}
            control={control}
            rules={getNewValidationRules(field)}
            render={({ field: { onChange, value, onBlur } }) => (
              <textarea
                placeholder={field.placeholder}
                // rows={field.rows || 3}
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
            name={field.key}
            control={control}
            rules={getNewValidationRules(field)}
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
            name={field.key}
            control={control}
            rules={getNewValidationRules(field)}
            render={({ field: { onChange, value, onBlur } }) => (
              <div className="space-y-2">
                {field?.options?.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      id={`${field.label}-${option.value}`}
                      value={option.value}
                      checked={value === option.value}
                      onChange={(e) => onChange(e.target.value)}
                      onBlur={onBlur}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label
                      htmlFor={`${field.label}-${option.value}`}
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

      case "date":
        return (
          <Controller
            name={field.key}
            control={control}
            rules={getNewValidationRules(field)}
            render={({ field: { onChange, value, onBlur } }) => (
              <input
                type="date"
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
                className={`${baseClasses} ${errorClasses}`}
              />
            )}
          />
        );

      //   case "file":
      //     return (
      //       <Controller
      //         name={field.key}
      //         control={control}
      //         //  rules={getValidationRules(field)}
      //         render={({ field: { onChange, value, onBlur } }) => {
      //           const handleFileChange = (e: any) => {
      //             const files = Array.from(e.target.files);
      //             if (field.multiple) {
      //               onChange(files);
      //             } else {
      //               onChange(files[0] || null);
      //             }
      //           };

      //           const handleRemoveFile = (index: number | null) => {
      //             if (field.multiple && index !== null) {
      //               const newFiles = Array.isArray(value) ? [...value] : [];
      //               newFiles.splice(index, 1);
      //               onChange(newFiles.length > 0 ? newFiles : null);
      //             } else {
      //               onChange(null);
      //             }
      //           };

      //           return (
      //             <div>
      //               <input
      //                 type="file"
      //                 accept={field.accept}
      //                 multiple={field.multiple}
      //                 onChange={handleFileChange}
      //                 onBlur={onBlur}
      //                 className={`${baseClasses} ${errorClasses} file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
      //               />
      //               <FilePreview
      //                 files={value}
      //                 onRemove={handleRemoveFile}
      //                 multiple={field.multiple}
      //               />
      //               {field.maxSize && (
      //                 <p className="mt-1 text-xs text-gray-500">
      //                   Maximum file size: {field.maxSize}MB
      //                 </p>
      //               )}
      //               {field.accept && (
      //                 <p className="mt-1 text-xs text-gray-500">
      //                   Accepted formats: {field.accept}
      //                 </p>
      //               )}
      //             </div>
      //           );
      //         }}
      //       />
      //     );

      default:
        return <div>Unsupported field type: {field.type}</div>;
    }
  };

  return (
    <div className="mb-6">
      {field.type !== "checkbox" && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t(field.label)}
          {field.validation?.required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
      )}

      {renderField(field)}

      {errors[field.key] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[field.key]?.message?.toString()}
        </p>
      )}
    </div>
  );
};
