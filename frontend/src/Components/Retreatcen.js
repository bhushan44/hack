import React from "react";

function Retreatcen() {
  return (
    <div className="flex flex-wrap p-5 max-w-4xl mx-auto border border-gray-300 rounded-lg bg-white">
      {/* Image Section */}
      <div className="flex-1 p-2 mb-4">
        <img
        //   src={}
          alt="Retreat Center"
          className="w-full rounded-lg"
        />
      </div>
      {/* Main Information Section */}
      <div className="flex-2 p-2 mb-4">
        <h2 className="text-2xl text-gray-800 mb-2">AST YOGA@</h2>
        <div className="mb-2">
          <span className="text-gray-600 text-sm">Location</span>
          <h4 className="text-lg text-gray-600">bhimavaram</h4>
        </div>
        <div className="mb-2">
          <span className="text-gray-600 text-sm">Date</span>
          <div className="flex items-center">
            <h4 className="text-lg text-gray-600">jan</h4>
            <button className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">More</button>
          </div>
        </div>
        <div className="mb-2">
          <p className="text-gray-600 text-base">tis is locted in bhimavaram</p>
          <div className="mt-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
              Additional details <span>@</span>
            </button>
          </div>
        </div>
      </div>
      {/* Pricing and Reviews Section */}
      <div className="flex-1 p-2 text-center">
        <h2 className="text-2xl text-gray-800 mb-2">FROM</h2>
        <div className="text-4xl text-pink-600 mb-2">
          <span>$</span><span>1700</span>
        </div>
        <div className="text-gray-600 mb-2">
          <span>*</span><span>FREE Cancellation</span>
        </div>
        <div className="flex items-center justify-center mb-2">
          <h3 className="text-2xl text-green-600 mr-2">4.5</h3>
          <span className="text-gray-600">^^^</span>
          <span className="text-gray-600 ml-2">
            9<span> reviews</span>
          </span>
        </div>
        <div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mx-1">More</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800 mx-1">Book</button>
        </div>
      </div>
    </div>
  );
}

export default Retreatcen;
