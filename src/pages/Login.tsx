import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAppDispatch } from "../lib/hooks";
import { loginUser } from "../actions/userActions";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Loader from "../components/Loader";

const Login = () => {
  const { loading } = useSelector((state: RootState) => state.tokens);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = await dispatch(loginUser({ username, password }));
    if (payload.type === "user/login/fulfilled") {
      navigate("/home");
    }
  };

  return (
    <div className="mt-20">
      <div className="hero min-h-screen  bg-base-200">
        <div className="hero-content xs:flex-col flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6  md:max-w-lg">
              Welcome to our online art gallery! Dive into a world of creativity
              with captivating masterpieces from global artists. Whether you're
              an art enthusiast or a first-time visitor, our virtual sanctuary
              invites you to explore a diverse canvas of inspiration. Login now
              to embark on a personalized art experience that celebrates the
              beauty of human expression.
            </p>
          </div>
          <div className="card w-full lg:w-1/2 max-w-sm shadow-2xl bg-base-100 mt-4 lg:mt-0">
            <form
              className="card-body"
              onSubmit={(event) => handleLogin(event)}
            >
              {loading && (
                <div className="flex justify-center items-center">
                  <Loader />
                </div>
              )}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type=""
                  placeholder="username"
                  className="input input-bordered"
                  required
                  onChange={(event) => setUsername(event?.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  onChange={(event) => setPassword(event?.target.value)}
                />
                <label className="label">
                  <Link to="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <label className="label">
                <Link to="/register" className="label-text-alt link link-hover">
                  Don't have an account?, Register
                </Link>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
