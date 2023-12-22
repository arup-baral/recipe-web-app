import { Category, Container } from "../index";
import { useFetchCategories } from "../../apiCalls/apiCalls";
import { useDispatch } from "react-redux";
import { setCategory } from "../../store/meal.categorySlice";
import { useNavigate } from "react-router-dom";

function CategoryCollection() {
  const { categories, error, loading } = useFetchCategories();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container className="justify-center items-center flex-wrap p-2">
      {loading && <h2>Category of meals</h2>}
      {error && <h1>{error}</h1>}
      {categories.map((category) => (
        <Category
          key={category["idCategory"]}
          label={category["strCategory"]}
          className="m-1"
          onClick={() => {
            dispatch(setCategory(category["strCategory"].toLowerCase()));
            navigate(`/category/${category["strCategory"]}/`);
          }}
        />
      ))}
    </Container>
  );
}

export default CategoryCollection;
