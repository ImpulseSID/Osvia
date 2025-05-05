import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-blue-500 opacity-10 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2.5s" }}
        ></div>
      </div>

      {/* Logo */}
      <div className="mb-8 z-10">
        <Link to="/" className="flex flex-col items-center">
          <img src="/osvia.svg" alt="Osvia Logo" className="h-14 mb-4" />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            Osvia Music
          </h1>
        </Link>
      </div>

      {/* Forgot Password Form */}
      <div className="w-full max-w-md bg-background-elevated bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg border border-gray-800 p-8 z-10">
        <h2 className="text-2xl font-bold text-center mb-2">Reset Password</h2>
        <p className="text-gray-400 text-center mb-6">
          Enter your email address and we'll send you instructions to reset your
          password.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-background border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-md transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Send Reset Instructions
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Remember your password?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-800 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-2 border border-gray-700 rounded-full text-sm text-gray-300 hover:bg-gray-800 transition-colors"
          >
            Listen Anonymously
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
