import { useEffect, useState } from "react";
import Container from "./Container";
import Item from "./Item";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMealId } from "../store/meal.categorySlice";

function ViewItems({ items = [], className = "", ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ingredient, setIngredient] = useState([]);

  useEffect(() => {
    items.forEach((item) => {
      let ingr = [];
      for (let i = 1; i <= 20; i++) {
        if (item[`strIngredient${i}`]) {
          ingr.push(item[`strIngredient${i}`] + ": " + item[`strMeasure${i}`] + ", ");
        }
      }
      setIngredient((prev) => [...prev, ingr]);
    });
  }, [items]);

  return (
    <Container
      className={`flex-col items-start justify-center gap-8 py-1 ${className}`}
      {...props}
    >
      {items.map((item, index) => (
        <Item
          key={index}
          imageUrl={item["strMealThumb"]}
          title={item["strMeal"]}
          category={item["strCategory"]}
          area={item["strArea"]}
          ingredients={ingredient[index]}
          videoLink={item["strYoutube"]}
          onClick={() => {
            dispatch(setMealId(Number.parseInt(item["idMeal"])));
            navigate(`${item["strMeal"]}`);
          }}
        />
      ))}
    </Container>
  );
}

export default ViewItems;
