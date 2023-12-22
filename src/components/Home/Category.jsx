function Category({ label, className = "", ...props }) {
  return (
    <div
      className={`w-fit h-fit px-5 py-2 rounded-full flex text-center text-sm cursor-pointer bg-gray-300 hover:bg-gray-400 transition-all ${className}`}
      {...props}
    >
      {label}
    </div>
  );
}

export default Category;
