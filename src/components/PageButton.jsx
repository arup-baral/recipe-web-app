

function PageButton({ type = "button", label, clickHandler, isAvailable }) {
  return (
    <button
      className="w-32 h-14 outline-none border text-sm text-center cursor-pointer rounded"
      type={type}
      onClick={clickHandler}
      disabled={!isAvailable}
    >
      {label}
    </button>
  );
}

export default PageButton;
