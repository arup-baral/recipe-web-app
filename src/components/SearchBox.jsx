import Container from "./Container";

function SearchBox({
  value,
  onValueChange,
  onSubmit,
  className = "",
  ...props
}) {
  return (
    <Container className="justify-center items-center py-5">
      <div className="search-box">
        <input
          className={`h-9 w-full border-none outline-none px-2 pt-0.5 pb-1 rounded-s-md text-sm bg-gray-100 focus:bg-gray-50 ${className}`}
          type="text"
          placeholder="Search meals..."
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          {...props}
        />
        <input
          className="h-9 w-fit px-2 py-1 outline-none border-none rounded-e-md cursor-pointer text-white text-sm bg-blue-500 hover:bg-blue-600"
          type="submit"
          value={"Search"}
          onClick={onSubmit}
        />
      </div>
    </Container>
  );
}

export default SearchBox;
