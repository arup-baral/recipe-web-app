import { useEffect, useState } from "react";
import "./App.css";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import auth from "./appwrite/auth";
import { setLogIn, setLogOut } from "./store/authSlice";

function App() {
  // function getFlagEmoji(countryCode) {
  //   const codePoints = countryCode
  //     .toUpperCase()
  //     .split('')
  //     .map(char =>  127397 + char.charCodeAt());
  //   return String.fromCodePoint(...codePoints);
  // }

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    auth
      .getUser()
      .then((userData) => {
        if (userData) {
          dispatch(setLogIn(userData));
        } else {
          dispatch(setLogOut());
        }
      })
      .finally(() => setLoading(false));
  });

  if(loading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
