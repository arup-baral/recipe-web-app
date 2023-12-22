import axios from "axios";
import { useCallback, useEffect, useState } from "react";

async function fetchItems(query, pageNo = 1, limit = 10) {
  const controller = new AbortController();
  let data = {};
  try {
    if (query && query.length > 0) {
      const res = await axios.get(
        `/api/v1/public/meals?page=${pageNo}&limit=${limit}&query=${query}`,
        {
          signal: controller.signal,
        }
      );
      const root = await res.data;
      data = root["data"];
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request cancelled: " + error.message);
      return;
    }
  } finally {
    controller.abort();
  }
  return data;
}

function useFetchCategories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const root = await res.data;
      setCategories(root["categories"]);
    } catch (e) {
      setError("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return { categories, error, loading };
}

function useFetchRandomItems(pageNo) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getItems = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        `/api/v1/public/meals/meal/meals?page=${pageNo}`
      );
      const root = await res.data;
      setItems((prev) => [...prev, ...root["data"]]);
    } catch (error) {
      setError("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  }, [pageNo]);

  useEffect(() => {
    getItems();
  }, [pageNo, getItems]);

  return { items, error, loading };
}

function useFetchItemsFilterByCategory(category) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        const root = await res.data;
        setData(root["meals"]);
      } catch (error) {
        setError("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [category]);

  return { data, error, loading };
}

function useFetchItemDetailsById(id) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        if (id != 0) {
          const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          const root = res.data;
          setData(root["meals"][0]);
        }
      } catch (error) {
        setError("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return {data, error, loading};
}

export {
  fetchItems,
  useFetchCategories,
  useFetchRandomItems,
  useFetchItemsFilterByCategory,
  useFetchItemDetailsById,
};
