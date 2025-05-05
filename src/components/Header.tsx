import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isAuthRoute = ["/login", "/signup", "/forgot-password"].includes(
    location.pathname
  );

  return (
    <header className="absolute top-0 right-0 p-3 sm:p-4 flex items-center gap-2 sm:gap-4 z-10">
      {!isAuthRoute && (
        <>
          <Link
            to="/login"
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-background-elevated text-gray-300 hover:text-white transition-colors text-sm sm:text-base inline-block"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-primary text-white font-medium hover:bg-primary-hover transition-colors text-sm sm:text-base inline-block"
          >
            Sign Up
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
