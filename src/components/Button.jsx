import Container from "./Container";

function Button({ label, type = "submit", clickHandler, className = "", ...props }) {
  return (
    <Container className="rounded-md">
      <button
        className={`w-full h-10 border-none outline-none bg-blue-500 text-white text-base rounded-md transition cursor-pointer hover:bg-blue-600 ${className}`}
        type={type}
        onClick={clickHandler}
        {...props}
      >
        {label}
      </button>
    </Container>
  );
}

export default Button;
