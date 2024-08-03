"use client";
import React from "react";

function MainComponent() {
  const [currentPage, setCurrentPage] = React.useState("signin");
  const [selectedPlatform, setSelectedPlatform] = React.useState(null);
  const [predictionValue, setPredictionValue] = React.useState(1.0);
  const [isPredicting, setIsPredicting] = React.useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    setCurrentPage("platformSelection");
  };

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
    setCurrentPage("predictor");
  };

  const startPrediction = async () => {
    setIsPredicting(true);
    try {
      const response = await fetch("https://your-backend-api.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hour: [new Date().getHours()],
          day_of_week: [new Date().getDay()],
          day_of_month: [new Date().getDate()],
          month: [new Date().getMonth() + 1],
          is_weekend: [new Date().getDay() >= 5 ? 1 : 0],
          rolling_mean: [0.5],  // Placeholder values
          rolling_std: [0.1],   // Placeholder values
          rolling_max: [1],     // Placeholder values
          rolling_min: [0],     // Placeholder values
          prev_result_1: [1],   // Placeholder values
          prev_result_2: [0],   // Placeholder values
          prev_result_3: [1],   // Placeholder values
        }),
      });
      const data = await response.json();
      setPredictionValue(data.prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
    setIsPredicting(false);
  };

  const renderSignInPage = () => (
    <div className="p-4">
      <button className="text-2xl mb-4">
        <i className="fas fa-arrow-left"></i>
      </button>
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <img
          src="/aviator-logo.png"
          alt="Aviator Predictor v1.0 logo"
          className="w-24 h-24 mb-4"
        />
        <h1 className="text-[#ff3333] text-2xl font-bold mb-8">
          Aviator Predictor v1.0
        </h1>
        <form className="w-full max-w-sm" onSubmit={handleSignIn}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full bg-[#333333] text-white p-3 rounded"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full bg-[#333333] text-white p-3 rounded"
            />
            <button className="absolute right-3 top-3 text-gray-400">
              <i className="fas fa-eye"></i>
            </button>
          </div>
          <div className="mb-4 text-right">
            <a href="#" className="text-[#ff3333]">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-[#ff3333] text-white p-3 rounded mb-4"
          >
            Sign In
          </button>
        </form>
        <p className="text-gray-400">
          Don't have an account?{" "}
          <a href="#" className="text-[#ff3333]">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );

  const renderPlatformSelectionPage = () => (
    <div className="bg-black min-h-screen p-4">
      <button
        className="text-2xl mb-4 text-white"
        onClick={() => setCurrentPage("signin")}
      >
        <i className="fas fa-arrow-left"></i>
      </button>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div
          className="bg-white p-4 rounded"
          onClick={() => handlePlatformSelect("1win")}
        >
          <img
            src="/1win-logo.png"
            alt="1win logo"
            className="w-full h-12 object-contain"
          />
        </div>
        <div
          className="bg-white p-4 rounded"
          onClick={() => handlePlatformSelect("1xbet")}
        >
          <img
            src="/1xbet-logo.png"
            alt="1XBET logo"
            className="w-full h-12 object-contain"
          />
        </div>
        <div
          className="bg-[#0000ff] p-4 rounded"
          onClick={() => handlePlatformSelect("most")}
        >
          <img
            src="/most-logo.png"
            alt="MOST logo"
            className="w-full h-12 object-contain"
          />
        </div>
        <div
          className="bg-[#800080] p-4 rounded"
          onClick={() => handlePlatformSelect("hollywoodbets")}
        >
          <img
            src="/hollywoodbets-logo.png"
            alt="Hollywoodbets logo"
            className="w-full h-12 object-contain"
          />
        </div>
        <div
          className="bg-white p-4 rounded"
          onClick={() => handlePlatformSelect("spribe")}
        >
          <img
            src="/spribe-logo.png"
            alt="SPRIBE logo"
            className="w-full h-12 object-contain"
          />
        </div>
        <div
          className="bg-[#000080] p-4 rounded"
          onClick={() => handlePlatformSelect("roobet")}
        >
          <img
            src="/roobet-logo.png"
            alt="ROOBET logo"
            className="w-full h-12 object-contain"
          />
        </div>
      </div>
    </div>
  );

  const renderPredictorPage = () => (
    <div className="bg-[#1a1a1a] min-h-screen flex flex-col items-center justify-center p-4 relative">
      <button
        className="absolute top-4 left-4 text-2xl text-white"
        onClick={() => {
          setPredictionValue(1.0);
          setCurrentPage("platformSelection");
        }}
      >
        <i className="fas fa-arrow-left"></i>
      </button>
      <div className="absolute top-10 left-4 right-4 flex justify-between text-[#ff3333] text-sm font-bold">
        <span>Predictions</span>
        <span>Rate</span>
      </div>
      <div className="absolute top-16 left-4 right-4 flex justify-between text-white text-sm">
        <span>116</span>
        <span>98%</span>
      </div>
      <img
        src="/aviator-logo.png"
        alt="Aviator Predictor v1.0 logo"
        className="w-24 h-24 mb-4"
      />
      <h1 className="text-[#ff3333] text-2xl font-bold mb-8">
        Aviator Predictor v1.0
      </h1>
      <div className="text-white text-6xl font-bold mb-8">
        {predictionValue.toFixed(2)}x
      </div>
      <button
        className="w-full max-w-sm bg-[#ff3333] text-white p-3 rounded mb-4"
        onClick={startPrediction}
        disabled={isPredicting}
      >
        {isPredicting ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          "Start Prediction"
        )}
      </button>
      <a href="#" className="text-[#ff3333]">
        Join our telegram channel
      </a>
    </div>
  );

  return (
    <div className="bg-[#1a1a1a] min-h-screen text-white font-roboto">
      {currentPage === "signin" && renderSignInPage()}
      {currentPage === "platformSelection" && renderPlatformSelectionPage()}
      {currentPage === "predictor" && renderPredictorPage()}
    </div>
  );
}

export default MainComponent;
