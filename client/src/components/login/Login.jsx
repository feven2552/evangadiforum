import React, { useContext, useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { appState } from "../../App";

function Login({ dispatch }) {
  const { user, setIslogedin, islogedin } = useContext(appState);
  const navigator = useNavigate();
  const emailDoc = useRef();
  const passwordDoc = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValue = emailDoc.current.value;
    const passValue = passwordDoc.current.value;
    if (!emailValue || !passValue) {
      setErrorMessage("Please provide all required information");
      return;
    }
    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      setSuccessMessage("Login successful");
      localStorage.setItem("token", data.token);
      navigator("/home");
      setIslogedin(true);
      // console.log(data);
    } catch (error) {
      setErrorMessage(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <section className="mt-24">
        <h3 className="text-center font-medium mb-2">Login to Your account</h3>
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        <p className="from-neutral-600 text-sm text-center mb-3">
          Don't have an account?{"  "}
          <Link
            href=""
            className="text-amber-500  "
            onClick={() => dispatch({ type: "register" })}
          >
            Create a new account
          </Link>
        </p>
        <form className="ml-6" onSubmit={handleSubmit}>
          <div>
            <input
              className="border w-11/12 py-2 pl-1 inputs mb-3 text-sm"
              ref={emailDoc}
              type="text"
              placeholder="Your Email"
            />
          </div>
          <div className="relative">
            <input
              id="myInput"
              className="border  w-11/12 py-2 pl-1 inputs mb-3 text-sm pr-10" // Added pr-10 for padding
              ref={passwordDoc}
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
            />
            {showPassword ? (
              <FaRegEye
                className="absolute top-3 right-12 text-gray-600 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FaRegEyeSlash
                className="absolute top-3 right-12 text-gray-600 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          <div>
            <button
              className="text-white bg-orange-500 py-1 px-14 text-center ml-28 rounded-sm mb-4"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <Link
          onClick={() => dispatch({ type: "register" })}
          className=" text-sm  mb-3 text-amber-500 ml-40"
        >
          Create an account?
        </Link>
      </section>
    </>
  );
}

export default Login;
