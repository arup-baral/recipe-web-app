import Container from "./Container";

function Item({
  imageUrl,
  title,
  category,
  area,
  ingredients,
  videoLink,
  className = "",
  ...props
}) {
  return (
    <Container
      className={`items-center justify-center bg-slate-200 py-2 rounded-xl cursor-pointer transition-all hover:bg-slate-300 ${className}`}
      style={{
        height: "240px",
      }}
      title="Click to view details"
      {...props}
    >
      <div className="w-1/5 h-full flex items-center justify-center mx-3">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full rounded-md object-fill"
        />
      </div>
      <div className="w-4/5 h-full flex items-center justify-start mr-3">
        <ul className="w-full h-full list-none flex flex-col justify-evenly items-start text-base px-2">
          <li>Title: {title}</li>
          <li>Category: {category}</li>
          <li>Meal area: {area}</li>
          {ingredients && <li>Ingredients: {ingredients}</li>}
          <li className="italic font-semibold">{videoLink ? "Video is available✅" : "Video is not available😓"}</li>
        </ul>
      </div>
    </Container>
  );
}

export default Item;
