import { useCallback, useEffect, useState } from "react";
import {
  Container,
  SelectLimitBox,
  PageButton,
  ViewItems,
} from "../components/index";
import SearchBox from "../components/SearchBox";
import { fetchItems } from "../apiCalls/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import {setQueryMeal} from "../store/meal.categorySlice";

function ViewItemsPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState(useSelector((state) => state.mealCategory.query));
  const [items, setItems] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [totalItems, setTotalItems] = useState();

  const limitOptions = [5, 10, 15, 20];

  const setData = (promise) => {
    if (promise) {
      promise.then((mealData) => {
        if (mealData) {
          setItems(mealData["data"]);
          setPageNo(mealData["page"]);
          setLimit(mealData["limit"]);
          setPrevPage(mealData["previousPage"]);
          setNextPage(mealData["nextPage"]);
          setTotalItems(mealData["totalItems"]);
        }
      });
    }
  };

  const submitHandler = () => {
    if (query && query.length > 0) {
      try {
        setLoading(true);
        dispatch(setQueryMeal(query));
        const promise = fetchItems(query);
        setData(promise);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    }
  };

  const getResults = useCallback(() => {
    try {
      // console.log("another");
      setLoading(true);
      const promise = fetchItems(query, pageNo, limit);
      setData(promise);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }, [pageNo, limit]);

  useEffect(() => {
    getResults();
  }, [getResults]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    // root
    <Container className="flex-col px-4">
      {/* search box */}
      <SearchBox
        value={query}
        onValueChange={(value) => {
          setQuery(value);
        }}
        onSubmit={submitHandler}
      />

      {items && items.length > 0 && (
        <Container className="flex-col">
          {/* header */}
          <Container className="items-center justify-between">
            <div>
              <p>Total results: {totalItems}</p>
              <p>Page no.: {pageNo}</p>
            </div>
            <div>
              <SelectLimitBox
                label="Items per page:"
                limit={limit}
                onLimitChange={(value) => setLimit(value)}
                options={limitOptions}
              />
            </div>
          </Container>

          {/* main */}
          <Container>
            <ViewItems items={items} />
          </Container>

          {/* footer */}
          <Container className="justify-between items-center">
            <PageButton
              type="button"
              label="< Previous Page"
              isAvailable={prevPage}
              clickHandler={() => setPageNo((prev) => prev - 1)}
            />
            <PageButton
              type="button"
              label="Next Page >"
              isAvailable={nextPage}
              clickHandler={() => setPageNo((prev) => prev + 1)}
            />
          </Container>
        </Container>
      )}
    </Container>
  );
}

export default ViewItemsPage;
