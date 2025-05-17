// import React from "react";

// interface SelectOption {
//   value: string;
//   label: string;
// }

// interface SelectFieldProps
//   extends React.SelectHTMLAttributes<HTMLSelectElement> {
//   label: string;
//   options: SelectOption[];
//   error?: string;
//   helperText?: string;
//   id?: string; // Make id explicitly available in props
// }

// /**
//  * Reusable select dropdown component with error handling
//  */
// export const SelectField: React.FC<SelectFieldProps> = ({
//   label,
//   options,
//   error,
//   helperText,
//   className,
//   id, // Extract id from props
//   ...props
// }) => {
//   // Generate a unique ID if one isn't provided
//   const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

//   return (
//     <div className="mb-4">
//       <label
//         htmlFor={selectId}
//         className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
//       >
//         {label}
//       </label>
//       <select
//         id={selectId}
//         className={`w-full p-2 border rounded-md ${
//           error ? "border-red-500" : "border-gray-300"
//         } ${className || ""}`}
//         {...props}
//       >
//         <option value="">Select {label}</option>
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
//       {helperText && !error && (
//         <p className="mt-1 text-sm text-gray-500">{helperText}</p>
//       )}
//     </div>
//   );
// };
import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  id?: string;
}

/**
 * Reusable select dropdown component with error handling
 */
export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  error,
  helperText,
  className,
  id,
  required,
  ...props
}) => {
  // Generate a unique ID if one isn't provided
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="mb-4">
      <label
        htmlFor={selectId}
        className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={selectId}
        className={`w-full p-2 border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        } ${className || ""}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={
          error
            ? `${selectId}-error`
            : helperText
            ? `${selectId}-helper`
            : undefined
        }
        required={required}
        {...props}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p
          id={`${selectId}-error`}
          className="mt-1 text-sm text-red-500"
          role="alert"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${selectId}-helper`} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};
