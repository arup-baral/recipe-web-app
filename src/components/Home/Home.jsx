import { useCallback, useEffect, useRef, useState } from "react";
import { Container, Item } from "../index";
import { useFetchRandomItems } from "../../apiCalls/apiCalls";
import { useDispatch } from "react-redux";
import { setMealId } from "../../store/meal.categorySlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const [page, setPage] = useState(1);
  const { items, error, loading } = useFetchRandomItems(page);
  const refLoader = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) setPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver);
    if (refLoader.current) observer.observe(refLoader.current);
  }, [handleObserver]);

  return (
    <Container className="flex-col p-3">
      <Container className="flex-wrap items-center justify-center gap-5">
        {items.map((item, index) => (
          <Item
            key={index}
            imageUrl={item["strMealThumb"]}
            title={item["strMeal"]}
            category={item["strCategory"]}
            area={item["strArea"]}
            videoLink={item["strYoutube"]}
            style={{
              width: '32%'
            }}
            onClick={() => {
              dispatch(setMealId(Number.parseInt(item["idMeal"])));
              navigate(`category/${item["strCategory"]}/${item["strMeal"]}`);
            }}
          />
        ))}
      </Container>
      {loading && <h2>Loading...</h2> }
      {error && <h2>{error}</h2>}
      <div ref={refLoader}></div>
    </Container>
  );
}

export default Home;
