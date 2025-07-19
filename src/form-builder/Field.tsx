/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from "react-hook-form";
import { IField } from "../constants";

const Field: React.FC<IField> = ({
  name,
  label,
  required,
  type,
  control,
  errors,
}) => {
  return (
    <div className="mb-4">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={type || "text"}
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
