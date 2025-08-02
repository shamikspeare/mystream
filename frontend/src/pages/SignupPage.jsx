import { useState } from "react";
import { Link } from "react-router";
import signupPageImg from "../images/signupPage.png";

import useSignUp from "../hooks/useSignup";


function SignUpPage() {

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });


  const { isPending, error, signupMutation } = useSignUp(); //importing hook to call api


  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/*entire border*/}
      <div className="border border-accent/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">

        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center justify-start gap-2">
            <span className="text-4xl font-bold  font-roboto text-primary">
              MyStream
            </span>
          </div>

          {/* ERROR MESSAGE IF ANY */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}


          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-secondary">Create an Account</h2>
                  <p className="text-sm text-secondary/90">Join MyStream and connect with your friends</p>
                </div>

                <div className="space-y-3">
                  {/* Full Name */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-secondary/90">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="your name"
                      className="input border-accent/25 w-full"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required />
                  </div>

                  {/* Email */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-secondary/90">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="yourname@gmail.com"
                      className="input border-accent/25 w-full"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required />
                  </div>

                  {/* Password */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-secondary/90">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      className="input border-accent/25 w-full"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required />
                    <p className="text-xs opacity-70 mt-1">
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  {/* Checkbox */}
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox checkbox-sm" required />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">terms of service</span> and{" "}
                        <span className="text-primary hover:underline">privacy policy</span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full ">
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>


              </div>
            </form>
          </div>
        </div>


        {/* SIGNUP FORM - RIGHT SIDE */}
        <div className="hidden lg:block w-full lg:w-1/2 relative">
          <img src={signupPageImg} alt="Language connection illustration" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
