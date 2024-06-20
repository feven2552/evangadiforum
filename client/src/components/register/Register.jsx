import React, { useContext, useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { appState } from "../../App";

function Register({ dispatch }) {
  const { user, setIslogedin, islogedin } = useContext(appState);
  const navigator = useNavigate();
  const usernameDoc = useRef();
  const firstnameDoc = useRef();
  const lastnameDoc = useRef();
  const emailDoc = useRef();
  const passwordDoc = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameValue = usernameDoc.current.value;
    const firstValue = firstnameDoc.current.value;
    const lastValue = lastnameDoc.current.value;
    const emailValue = emailDoc.current.value;
    const passValue = passwordDoc.current.value;
    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      setErrorMessage("Please provide all required information");
      return;
    }
    try {
      const { data } = await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      setSuccessMessage("Registration successful");
      localStorage.setItem("token", data.token);
      navigator("/home");
      setIslogedin(true);
    } catch (error) {
      setErrorMessage("Something went wrong");
      console.log(error.response);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <section className="mt-8 ">
        <h3 className="text-center font-medium mb-2 ">Join the network</h3>
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        <p className="from-neutral-600 text-sm text-center mb-3">
          Already have an account?{"  "}
          <Link
            onClick={() => dispatch({ type: "login" })}
            href=""
            className="text-amber-500 "
          >
            Sign in
          </Link>
        </p>
        <form className="ml-6" onSubmit={handleSubmit}>
          <div>
            <input
              className="border  w-11/12 py-2 pl-1 inputs mb-3 text-sm"
              ref={emailDoc}
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="flex gap-2  w-11/12 ">
            <input
              className="border w-full py-2 pl-1 inputs mb-3 text-sm"
              ref={firstnameDoc}
              type="text"
              placeholder="First Name"
            />
            <input
              className="border  w-full py-2 pl-1 inputs mb-3 text-sm"
              ref={lastnameDoc}
              type="text"
              placeholder="Last Name"
            />
          </div>
          <div>
            <input
              className="border  w-11/12 py-2 pl-1 inputs mb-3 text-sm"
              ref={usernameDoc}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="relative">
            <input
              className="border  w-11/12 py-2 pl-1 inputs mb-3 text-sm pr-10" // Added pr-10 for padding
              ref={passwordDoc}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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
              className="border  w-11/12 py-2 pl-1  mb-3 text-white bg-blue-600 rounded-md"
              type="submit"
            >
              Agree and Join
            </button>
          </div>
        </form>
        <p className="text-xs text-center mt-4 mb-2">
          I agree to the <span className="text-amber-500">privacy policy</span>{" "}
          and <span className="text-amber-500">terms of service</span>
        </p>
        <Link
          onClick={() => dispatch({ type: "login" })}
          className="text-amber-500 text-xs ml-36 mb-6 textcenter"
        >
          Already have an account?
        </Link>
      </section>
    </>
  );
}

export default Register;
