import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import OAuth from "../components/OAuth.jsx";
import { CustomToastService } from "../shared/message.service.js";
import axios from "axios";
import SessionService from "../shared/masterData.service.js";
import { signInSuccess } from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const validationErrors = validate(formData); // Perform validation
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setLoading(false);
        return;
      } else {
        setErrors({});
      }

      let request = {
        email: formData.email,
        password: formData.password,
      };

      await axios.post("/auth/signin", request).then((response) => {
        if (response.status === 200) {
          CustomToastService.success(response.data.message);
          dispatch(signInSuccess(response.data.user));
          setFormData({});
          setLoading(false);
          SessionService.set("userId", response.data.user._id);
          SessionService.set("role", response.data.user.role);
          SessionService.set("token", response.data.token);
          if (response.data.user.role == "Driver") {
            navigate("/");
          } else if (response.data.user.role == "Admin") {
            // navigate("/dashboard");
            window.location.href = "/dashboard";
          }
        }
      });
    } catch (error) {
      if (error.response.data.message) {
        CustomToastService.error(error.response.data.message);
      }
      setLoading(false);
    }
  };

  const validate = (data) => {
    const errors = {};
    if (!data.email || data.email === "") {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="min-h-screen pt-20 bg-slate-200">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left side */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-green-500 #057A55-500 to-gray-500 rounded-lg text-white">
              personal
            </span>
            drivers
          </Link>
          <p className="text-sm mt-5 pt-5">
            This is a demo project. You can sign in with email and password or
            with Google.
          </p>
        </div>

        {/* Right side */}
        <div className="flex-1">
          <form
            className="flex flex-col gap-3 w-full px-4"
            onSubmit={handleSubmit}
          >
            <div>
              <Label value="Your email" />
              <TextInput
                type="text"
                placeholder="Your email"
                id="email"
                onChange={handleChange}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>

            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Your password"
                id="password"
                onChange={handleChange}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>

            <Button
              className="bg-gradient-to-r from-green-500 to-gray-500 text-white"
              type="submit"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5 w-full px-4 py-2">
            <span>Dont have an account?</span>
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
