
import { useNavigate } from "react-router-dom";

const SuccessPaymentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600">Payment Successful! ✅</h1>
        <p className="text-gray-700 mt-2">Thank you for your payment. Your transaction was successful.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default SuccessPaymentPage;
