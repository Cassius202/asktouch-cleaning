interface FieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
}

export const InputField = ({ label, id, value, onChange, required }: FieldProps) => (
  <div className="relative">
    <input
      type="text"
      id={id}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder=" "
      className="peer w-full h-max pt-5 pb-2 px-4 border border-gray-300 rounded-lg text-gray-900 bg-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
    />
    <label
      htmlFor={id}
      className="absolute left-4 top-4 text-gray-500 transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-600 peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-emerald-600"
    >
      {label}
    </label>
  </div>
);

export const TextAreaField = ({ label, id, value, onChange, required }: FieldProps) => (
  <div className="relative">
    <textarea
      id={id}
      required={required}
      rows={3}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder=" "
      className="peer w-full pt-5 pb-2 px-4 min-h-30 border border-gray-300 rounded-lg text-gray-900 bg-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
    />
    <label
      htmlFor={id}
      className="absolute left-4 top-4 text-gray-500 transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-600 peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-emerald-600"
    >
      {label}
    </label>
  </div>
);