import CategoryItem from "./Category/CategoryItem";

function FavouriteItem({
  title,
  imageUrl,
  deleteHandler,
  viewHandler,
  className = "",
}) {
  return (
    <div className={`h-fit rounded-lg relative ${className}`}>
      <button
        className="bg-red-600 text-white text-xl border-none px-1 rounded absolute right-1 top-1 cursor-pointer hover:bg-red-700"
        onClick={deleteHandler}
        title="remove"
      >
        🗑
      </button>
      <CategoryItem title={title} imageUrl={imageUrl} onClick={viewHandler} />
    </div>
  );
}

export default FavouriteItem;
