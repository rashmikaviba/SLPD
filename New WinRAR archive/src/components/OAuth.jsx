import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { CustomToastService } from "../shared/message.service";
import SessionService from "../shared/masterData.service";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/user.birthday.read");
    provider.addScope("https://www.googleapis.com/auth/user.gender.read");

    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        if (data.status === "new user") {
          CustomToastService.success(data.message);
        } else {
          CustomToastService.success(data.message);
          dispatch(signInSuccess(data.user));
          SessionService.set("userId", data.user._id);
          SessionService.set("role", data.user.role);
          SessionService.set("token", data.token);
          if (data.user.role == "Driver") {
            navigate("/");
          } else if (data.user.role == "Admin") {
            window.location.href = "/dashboard";
          }
        }
      } else {
        CustomToastService.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      className="bg-gradient-to-r from-green-500 to-gray-500 text-white"
      type="button"
      outline={false}
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}
