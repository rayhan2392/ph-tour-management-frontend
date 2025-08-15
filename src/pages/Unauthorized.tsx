import { Link } from "react-router";



const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md w-full">
        <h1 className="text-7xl font-bold text-red-500">403</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Unauthorized Access
        </h2>
        <p className="mt-2 text-gray-600">
          You don’t have permission to view this page.  
          Please check your credentials or go back to the homepage.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
