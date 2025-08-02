import { useState } from 'react';
import useLogin from "../hooks/useLoginUser";
import { Link } from "react-router";
import loginPageImg from "../images/loginpage.png";

const LoginPage = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin(); //importing hook to call api

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

   return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="border border-accent/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center justify-start gap-2">
            <span className="text-4xl font-bold font-roboto text-primary">
              MyStream
            </span>
          </div>

          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className='w-full'>
            <form onSubmit={handleLogin}>
              <div className='space-y-4'>

                <div>
                  <h2 className='text-xl font-semibold text-secondary'>Welcome Back</h2>
                  <p className='text-sm text-secondary/90'>
                    Sign in to your account 
                  </p>
                </div>

                <div className='flex flex-col gap-3'>
                  <div className="form-control w-full space-y-1">
                    <label className="label">
                      <span className="label-text text-secondary/90">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="yourname@example.com"
                      className="input input-bordered w-full"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-control w-full space-y-1">
                    <label className="label">
                      <span className="label-text text-secondary/90">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="input input-bordered w-full"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-sm">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-primary hover:underline">
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

      {/* SIGNUP FORM - RIGHT SIDE */}
        <div className="hidden lg:block w-full lg:w-1/2 relative">
          <img src={loginPageImg} alt="Language connection illustration" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  )
}

export default LoginPage