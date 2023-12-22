import { Link } from "react-router-dom";
import { Container } from "../index";
import { useDispatch } from "react-redux";
import { setQueryMeal } from "../../store/meal.categorySlice";

function SearchItemButton() {
  const dispatch = useDispatch();
  return (
    <Container className="justify-center items-center py-1">
      <Link
        to={`viewitems`}
        className="no-underline transition-all bg-blue-600 hover:bg-blue-700 text-white text-center text-sm rounded-md px-20 py-2 mx-auto"
        onClick={() => dispatch(setQueryMeal(""))}
      >
        Search item
      </Link>
    </Container>
  );
}

export default SearchItemButton;
