// Reusable input field with label and error display
// Used in the reviews form for the name and email fields

interface InputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  name?: string;
  required?: boolean;
}

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  name,
  required,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-semibold text-white/70">
          {label} {required && <span className="text-yellow-400">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          w-full px-4 py-2.5
          bg-white/8 border rounded-full
          text-white placeholder-white/30
          font-medium text-sm
          transition-colors duration-150
          ${error ? 'border-red-500' : 'border-white/15 hover:border-white/30'}
        `}
        style={{ background: 'rgba(255,255,255,0.06)' }}
      />
      {error && (
        <span className="text-red-400 text-xs font-medium">{error}</span>
      )}
    </div>
  );
}
