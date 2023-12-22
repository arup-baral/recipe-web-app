import { Link, useNavigate } from "react-router-dom";
import { Container, InputBox, Button } from "../index";
import display from "../../display";
import { useForm } from "react-hook-form";
import auth from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import {setLogIn} from "../../store/authSlice";
import { useState } from "react";

function SignUp() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupHandler = async (data) => {
    try {
      setLoading(true);
      const session =  await auth.createUser(data);
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
          <h2 className="mb-1">Sign up to create account</h2>
          <Link to="/login" className="no-underline text-gray-500 hover:text-gray-700">Already have an account? Sign In</Link>
        </Container>
        <form
          onSubmit={handleSubmit(signupHandler)}
          className="w-full h-full flex flex-col mb-2"
        >
          <InputBox
            className="mb-5"
            label="Full Name"
            type="text"
            placeholder="Full Name"
            {...register("name", {
              required: true,
            })}
          />
          <InputBox
            className="mb-5"
            label="Email"
            type="email"
            placeholder="example@example.com"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
                    value
                  ) || "Email adress is not valid",
              },
            })}
          />
          <InputBox
            className="mb-5"
            label="Password"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 8,
              validate: {
                matchPattern: (value) =>
                  /(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/g.test(
                    value
                  ) ||
                  "Password should contain at least 1-upper case, 1-lower case, 1-digit and 1-special character",
              },
            })}
          />
          <Button label="Sign Up" />
        </form>
      </div>
      {loading && <h2 className="m-2">Loading...</h2>}
    </Container>
  );
}

export default SignUp;
