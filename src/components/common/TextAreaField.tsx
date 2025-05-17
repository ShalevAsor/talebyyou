interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
  showCharacterCount?: boolean;
}

/**
 * Reusable text area component with error handling and character count
 */
export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  error,
  helperText,
  className,
  maxLength,
  value,
  showCharacterCount = true,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        className={`w-full p-2 border rounded-md resize-none ${
          error ? "border-red-500" : "border-gray-300"
        } ${className || ""}`}
        maxLength={maxLength}
        value={value}
        {...props}
      />
      <div className="flex justify-between mt-1">
        <div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {helperText && !error && (
            <p className="text-sm text-gray-500">{helperText}</p>
          )}
        </div>
        {maxLength && showCharacterCount && (
          <p className="text-xs text-gray-500 ml-auto">
            {value ? String(value).length : 0}/{maxLength} characters
          </p>
        )}
      </div>
    </div>
  );
};
