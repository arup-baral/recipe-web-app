import { Link, useNavigate } from "react-router-dom";
import { Container, InputBox, Button } from "../index";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import display from "../../display";
import auth from "../../appwrite/auth";
import { setLogIn } from "../../store/authSlice";

function Login() {
    const {register, handleSubmit} = useForm();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginHandler = async (data) => {
      try {
        setLoading(true);
        const session = await auth.logIn(data);
        if(session) {
          const userData = await auth.getUser();
          if(userData) dispatch(setLogIn(userData));
          navigate("/");
        }
      } catch (error) {
        display(error.message);
      } finally {
        setLoading(false);
      }
    };

  return (
    <Container className="h-screen bg-gray-600 flex-col justify-center items-center">
      <div className="w-1/3 bg-slate-100 px-5 py-4 rounded-xl flex flex-col justify-center items-center">
        <Container className="flex-col items-center justify-center text-center mb-10">
          <div className="">LOGO</div>
          <h2 className="mb-1">Log in to your account</h2>
          <Link to="/signup" className="no-underline text-gray-500 hover:text-gray-700">
            {`Don't have an account? Sign Up`}
          </Link>
        </Container>
        <form
          onSubmit={handleSubmit(loginHandler)}
          className="w-full h-full flex flex-col mb-2"
        >
          <InputBox
            className="mb-5"
            label="Email"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: true,
            })}
          />
          <InputBox
            className="mb-5"
            label="Password"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
            })}
          />
          <Button label="Log In" />
        </form>
      </div>
      {loading && <h2 className="m-2">Loading...</h2>}
    </Container>
  );
}

export default Login;
