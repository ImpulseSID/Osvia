import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-auto">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 opacity-10 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md bg-background-elevated bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg border border-gray-800 p-6 md:p-8 z-10">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-5">
          Welcome Back to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            Osvia
          </span>
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 bg-background border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-background border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center mb-2 sm:mb-0">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 bg-background border-gray-700 rounded focus:ring-primary"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm text-gray-300"
              >
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-md transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
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

export default Login;
