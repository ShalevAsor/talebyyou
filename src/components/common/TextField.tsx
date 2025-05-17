// import React from "react";

// interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label: string;
//   error?: string;
//   helperText?: string;
//   id?: string; // Make id explicitly available in props
// }

// /**
//  * Reusable text input component with error handling
//  */
// export const TextField: React.FC<TextFieldProps> = ({
//   label,
//   error,
//   helperText,
//   className,
//   id, // Extract id from props
//   ...props
// }) => {
//   // Generate a unique ID if one isn't provided
//   const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

//   return (
//     <div className="mb-4">
//       <label
//         htmlFor={inputId}
//         className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
//       >
//         {label}
//       </label>
//       <input
//         id={inputId}
//         className={`w-full p-2 border rounded-md ${
//           error ? "border-red-500" : "border-gray-300"
//         } ${className || ""}`}
//         {...props}
//       />
//       {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
//       {helperText && !error && (
//         <p className="mt-1 text-sm text-gray-500">{helperText}</p>
//       )}
//     </div>
//   );
// };
import React from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  id?: string;
}

/**
 * Reusable text input component with error handling
 */
export const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  helperText,
  className,
  id,
  required,
  ...props
}) => {
  // Generate a unique ID if one isn't provided
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="mb-4">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={inputId}
        className={`w-full p-2 border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        } ${className || ""}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={
          error
            ? `${inputId}-error`
            : helperText
            ? `${inputId}-helper`
            : undefined
        }
        required={required}
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1 text-sm text-red-500"
          role="alert"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};
