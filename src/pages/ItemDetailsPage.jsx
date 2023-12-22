import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container } from "../components";
import { useFetchItemDetailsById } from "../apiCalls/apiCalls";
import YouTube from "react-youtube";
import service from "../appwrite/service";
import display from "../display";

function ItemDetailsPage() {
  const user = useSelector((state) => state.auth);
  const mealId = useSelector((state) => state.mealCategory.mealId);
  const { data, error, loading } = useFetchItemDetailsById(mealId);

  let ingredient = [];
  for (let i = 1; i <= 20; i++) {
    if (data[`strIngredient${i}`]) {
      ingredient.push(
        data[`strIngredient${i}`] + ": " + data[`strMeasure${i}`]
      );
    }
  }

  const addMealtoFavourites = async () => {
    try {
      if (user.status) {
        const document = await service.addMeal({
          mealId: data["idMeal"],
          title: data["strMeal"],
          featuredImage: data["strMealThumb"],
          userId: user.userData.$id,
        });
        if (document) display(data["strMeal"] + " is added to favourites");
      } else {
        display("Please login to add meal");
      }
    } catch (error) {
      console.log(error);
      display("Meal was already added before");
    }
  };

  if (error) return <h2>{error}</h2>;

  if (loading) return <h2>…Loading</h2>;

  return (
    <>
      <Container className="w-fit justify-end px-8 py-2">
        <button
          className="bg-yellow-600 text-white px-3 py-2 border-none rounded cursor-pointer transition hover:bg-yellow-700"
          type="button"
          onClick={addMealtoFavourites}
        >
          Add to favourites
        </button>
      </Container>
      {data && (
        <Container className="flex-col pt-1 pb-3 px-6">
          <Container className="justify-center items-center mb-10">
            <Link
              className="w-1/3 h-80 flex no-underline m-auto"
              to={data["strMealThumb"]}
              target="_blank"
            >
              <img
                className="w-full h-full object-cover shadow-lg shadow-slate-400"
                src={data["strMealThumb"]}
                alt={data["strMeal"]}
              />
            </Link>
          </Container>
          <Container>
            <ul className="list-none flex flex-col gap-2.5">
              <li>
                <b>Title: </b>
                {data["strMeal"]}
              </li>
              <li>
                <b>Category: </b>
                {data["strCategory"]}
              </li>
              <li>
                <b>Meal area: </b>
                {data["strArea"]}
              </li>
              <li>
                <b>Ingredients: </b>
                <ol className="list-inside ">
                  {ingredient.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </li>
              <li>
                <b>Instruction: </b>
                {data["strInstructions"]}
              </li>
              <li>
                {data["strYoutube"] ? (
                  <Container className="justify-center">
                    <YouTube
                      videoId={String(data["strYoutube"]).slice(32)}
                      className="m-3"
                      opts={{
                        width: "500px",
                        height: "300px",
                        playerVars: {
                          autoplay: 0,
                          playsinline: 1,
                          rel: 0,
                        },
                      }}
                      onReady={(e) => e.target.pauseVideo()}
                      onError={(e) => console.log(e.target)}
                    />
                  </Container>
                ) : (
                  <h3 className="italic">Video is not available😓</h3>
                )}
              </li>
            </ul>
          </Container>
        </Container>
      )}
    </>
  );
}

export default ItemDetailsPage;
