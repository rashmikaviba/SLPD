import { Link, useNavigate } from "react-router-dom"; //
import { Button, FileInput, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import OAuth from "../components/OAuth";
import { CustomToastService } from "../shared/message.service";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.id === "profilePicture") {
      setFormData({ ...formData, [e.target.id]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    }
  };

  const convertToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
      fileReader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const validationErrors = validate(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setLoading(false);
        return;
      } else {
        setErrors({});
      }

      if (formData.password !== formData.confirmPassword) {
        CustomToastService.error("Confirm password does not match!");
        setLoading(false);
        return;
      }

      let convertedImage = "";
      if (formData.profilePicture) {
        if (formData.profilePicture.size > 1024 * 1024 * 2) {
          CustomToastService.error(
            "Profile picture size should be less than 2MB"
          );
          setLoading(false);
          return;
        }

        convertedImage = await convertToBase64(formData.profilePicture);
      }

      let request = {
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        email: formData.email,
        password: formData.password,
        role: "Driver",
      };

      if (convertedImage !== "") {
        request.profilePicture = convertedImage;
      }

      console.log(request);

      await axios.post("/auth/signup", request).then((response) => {
        if (response.status === 201) {
          CustomToastService.success(response.data.message);
          setFormData({});
          navigate("/signin");
          setLoading(false);
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
    if (!data.name || data.name === "") {
      errors.name = "Name is required";
    }
    if (!data.age || data.age === "") {
      errors.age = "Age is required";
    } else if (isNaN(data.age)) {
      errors.age = "Invalid Age";
    } else if (data.age < 18) {
      errors.age = "Minimum age is 18";
    } else if (data.age > 60) {
      errors.age = "Maximum age is 60";
    }
    if (!data.gender || data.gender === "0") {
      errors.gender = "Gender is required";
    }
    if (!data.email || data.email === "") {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.password) {
      errors.password = "Password is required";
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = "Password is required";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="min-h-screen pt-20 bg-slate-200">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/*left side*/}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-green-500 #057A55-500 to-gray-500 rounded-lg text-white">
              personal
            </span>
            drivers
          </Link>
          <p className="text-sm-mt-5 pt-5">
            this is demo project. you can sign up with email and password or
            with google.
          </p>
        </div>
        {/*right side*/}
        <div className="flex-1">
          <form
            className="flex flex-col gap-2 w-full px-4 "
            onSubmit={handleSubmit}
          >
            <div>
              <Label value="Full Name" />
              <TextInput
                type="text"
                placeholder="Full Name"
                id="name"
                onChange={handleChange}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <Label value="Age" />
                <TextInput
                  type="number"
                  placeholder="Age"
                  id="age"
                  onChange={handleChange}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                />
                {errors.age && (
                  <span className="text-red-500 text-sm">{errors.age}</span>
                )}
              </div>
              <div className="flex-1">
                <Label value="Gender" />
                <select
                  id="gender"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="0">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                {errors.gender && (
                  <span className="text-red-500 text-sm">{errors.gender}</span>
                )}
              </div>
            </div>

            <div>
              <Label value="Email" />
              <TextInput
                type="text"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <Label value="password" />
                <TextInput
                  type="password"
                  placeholder=" Password"
                  id="password"
                  onChange={handleChange}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="flex-1">
                <Label value="Confirm password" />
                <TextInput
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>

            <div>
              <Label value="Profile Picture" />
              <FileInput
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <Button
              //disabled={loading}
              className="bg-gradient-to-r from-green-500 to-gray-500 text-white"
              type="submit"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "signup"
              )}
            </Button>
            <OAuth />
          </form>

          <div className="flex gap-2 text-sm mt-5 w-full px-4 py-2">
            <span> Have an accout ?</span>
            <Link to="/signin" className="text-blue-500">
              signin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
