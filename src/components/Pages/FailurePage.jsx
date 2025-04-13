import { useNavigate } from "react-router-dom";

const FailurePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600">Payment Failed ❌</h1>
        <p className="text-gray-700 mt-2">Something went wrong. Please try again later.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default FailurePage;
