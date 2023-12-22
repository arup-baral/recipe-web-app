import { useDispatch, useSelector } from "react-redux";
import {Container} from "../components/index";
import { useCallback, useEffect, useState } from "react";
import service from "../appwrite/service";
import FavouriteItem from "../components/FavouriteItem";
import { useNavigate } from "react-router-dom";
import { setMealId } from "../store/meal.categorySlice";
import display from "../display";

function MyMealsPage() {
  const [meals, setMeals] = useState([]);
  const [total, setTotal] = useState(0);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getMeals = useCallback(async () => {
    try {
      const mealsList = await service.getMealsList(userData.$id);
      if(mealsList) {
        setMeals(mealsList.documents);
        setTotal(mealsList.total);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getMeals();
  }, [total ,getMeals]);

  return (
    <Container
    className="flex-wrap justify-center items-center gap-8 px-3 py-10"
    >

      {
        meals.map((meal) => (
          <FavouriteItem
            key={meal["mealId"]}
            className=" w-1/4"
            title={meal["title"]}
            imageUrl={meal["featuredImage"]}
            viewHandler={() => {
              dispatch(setMealId(meal["mealId"]));
              navigate(meal["title"]);
            }}
            deleteHandler={async () => {
              const status = await service.deleteMeal(`${userData.$id}-${meal["mealId"]}`);
              if(status) {
                display("Succesfully removed");
                setTotal(prev => prev - 1);
              }
            }}
          />
        ))
      }
    </Container>
  )
}

export default MyMealsPage;