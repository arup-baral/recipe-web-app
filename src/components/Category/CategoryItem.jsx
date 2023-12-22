function CategoryItem({
  title,
  imageUrl,
  className = "",
  ...props
}) {
  return (
    <div
      className={`h-60 flex flex-col items-center justify-center rounded-lg cursor-pointer ${className}`}
      {...props}
    >
      <div className="w-full h-2/3 rounded-t-lg flex justify-center items-center">
        <img
          className="w-full h-full object-cover rounded-t-lg"
          src={imageUrl}
          alt={`${title}.jpg`}
        />
      </div>
      <div className="bg-slate-100 w-full h-1/3 rounded-b-lg py-1 px-2 relative">
        <span className="font-semibold text-sm flex">{title}</span>
        <span className="font-semibold text-xs text-center flex absolute bottom-1.5 right-3 hover:text-blue-700">View details</span>
      </div>

    </div>
  );
}

export default CategoryItem;
