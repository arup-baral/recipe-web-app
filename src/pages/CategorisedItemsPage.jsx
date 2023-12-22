import { Container } from "../components/index";
import { useSelector, useDispatch } from "react-redux";
import { setMealId } from "../store/meal.categorySlice";
import { useFetchItemsFilterByCategory } from "../apiCalls/apiCalls";
import { CategoryItem } from "../components/index";
import { useNavigate } from "react-router-dom";

function CategorisedItemsPage() {
  const categoryName = useSelector((state) => state.mealCategory.category);
  const { data, error, loading } = useFetchItemsFilterByCategory(categoryName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (error) {
    return <h2>{error}</h2>;
  }
  return (
    <Container className="min-h-screen flex-wrap justify-center">
      {loading && <h2>Loading...</h2>}
      {data &&
        data.map((item) => (
          <CategoryItem
            key={item["idMeal"]}
            title={item["strMeal"]}
            imageUrl={item["strMealThumb"]}
            className="m-3"
            onClick={() => {
              dispatch(setMealId(item["idMeal"]));
              navigate(`${item["strMeal"]}`);
            }}
            style={{
              width: "23%"
            }}
          />
        ))}
    </Container>
  );
}

export default CategorisedItemsPage;
