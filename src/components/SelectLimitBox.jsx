import { useId } from "react";

function SelectLimitBox({
  label,
  limit,
  onLimitChange,
  options = [],
}) {
  const id = useId();
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        className="w-24 h-6 rounded bg-blue-500 text-white text-sm font-bold flex"
        value={limit}
        onChange={(e) => onLimitChange(Number.parseInt(e.target.value))}
      >
        {options.map((value) => (
            <option key={value} value={value}>
                {value}
            </option>
        ))}
      </select>
    </div>
  );
}

export default SelectLimitBox;
