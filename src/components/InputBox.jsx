import { forwardRef, useId } from "react";
import Container from "./Container";

const InputBox = forwardRef(function InputBox({
  label,
  type = "text",
  placeholder,
  className = "",
  ...props
}, ref) {
  const id = useId();
  return (
    <Container className={`flex-col items-start ${className}`}>
      {label && <label htmlFor={id}>{`${label}:`}</label>}
      <input
        className="w-full h-9 border-none rounded-md text-sm px-2 focus:outline-gray-200"
        id={id}
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    </Container>
  );
});

export default InputBox;
