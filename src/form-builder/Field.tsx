/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useFormContext } from "react-hook-form";

export interface FieldProps {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  options?: string[];
}

const Field: React.FC<FieldProps> = ({ name, label, required, type }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mb-4">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={type || "text"}
            // label={label}
            className={`w-full border rounded-3xl p-2 ${
              errors[name] ? "border-red-500" : "border-gray-300"
            }`}
            name={label}
            placeholder={label}
            required={required}
          />
        )}
      />
      {errors[name] && (
        <p className="text-sm text-red-500">{(errors as any)[name]?.message}</p>
      )}
    </div>
  );
};

export default Field;
