import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-auto">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-500 opacity-10 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Signup Form */}
      <div className="w-full max-w-md bg-background-elevated bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg border border-gray-800 p-6 md:p-8 z-10">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-5">
          Create your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            Osvia
          </span>{" "}
          Account
        </h2>

        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                First Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-background border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="First name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-background border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Last name"
              />
            </div>
          </div>

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
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-background border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Confirm password"
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 bg-background border-gray-700 rounded focus:ring-primary"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-md transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Create Account
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
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

export default Signup;
