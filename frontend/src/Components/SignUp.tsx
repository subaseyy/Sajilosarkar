import SignUpPage from "./SignUpPage/SignUpPage";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const SignUp: React.FC = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  if (username && token) {
    return (
      <>
        <Navbar />
        <div className="min-h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign Up
              </h2>
            </div>
            <form
              className="mt-8 space-y-6"
              onSubmit={(e) => e.preventDefault()}
            ></form>

            <div className="text-center">
              <p className="text-lg text-green-600">
                You are already logged in.
              </p>
              <NavLink
                to="/"
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go to Home
              </NavLink>
            </div>
          </div>
        </div>
        <Footer />

      </>
    );
  }

  return (
    <>
      <Navbar />
      <SignUpPage />
      <Footer />
    </>
  );
};

export default SignUp;
