import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
function Retreatcen({ data }) {
  const navigate=useNavigate()
  if (!data || !data.features || !data.styles || !data.skillLevel || !data.benefits || !data.program) {
    return <p>Loading...</p>;
  }
  console.log(data)
  return (
    <div className="flex flex-wrap p-5 max-w-4xl mx-auto border border-gray-300 rounded-lg bg-white">
      <div className="flex-1 p-2 mb-4">
        {data.images && data.images.length > 0 ? data.images.map((src,index)=>(
          <img
            src={src}
            alt="Retreat Center"
            className="w-full rounded-lg"
            key={index}
          />)
        ) : (
          <p>No image available</p>
        )}
      </div>
          <div className="flex-2 p-2 mb-4">
        <h2 className="text-2xl text-gray-800 mb-2">{data.name || 'No Name'}</h2>
        <div className="mb-2">
          {/* <span className="text-gray-600 text-sm">location</span> */}
          <CiLocationOn/>
          <h4 className="text-lg text-gray-600">{data.location || 'No Location'}</h4>
        </div>
        <div className="mb-2">
          <span className="text-gray-600 text-sm">Description</span>
          <p className="text-base text-gray-600">{data.description || 'No Description'}</p>
        </div>
        <div className="mb-2">
          <span className="text-gray-600 text-sm">Features</span>
          <ul className="list-disc pl-5 text-gray-600">
            {data.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="mb-2">
          <span className="text-gray-600 text-sm">Styles</span>
          <ul className="list-disc pl-5 text-gray-600">
            {data.styles.map((style, index) => (
              <li key={index}>{style}</li>
            ))}
          </ul>
        </div>
        <div className="mb-2">
          <span className="text-gray-600 text-sm">Skill Level</span>
          <ul className="list-disc pl-5 text-gray-600">
            {data.skillLevel.map((level, index) => (
              <li key={index}>{level}</li>
            ))}
          </ul>
        </div>
        <div className="mb-2">
          <span className="text-gray-600 text-sm">Benefits</span>
          <ul className="list-disc pl-5 text-gray-600">
            {data.benefits && data.benefits.length > 0 ? (
              data.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))
            ) : (
              <li>No benefits available</li>
            )}
          </ul>
        </div>
        <div className="mb-2">
          <span className="text-gray-600 text-sm">Program</span>
          <ul className="list-disc pl-5 text-gray-600">
            {data.program.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 p-2 text-center">
        <h2 className="text-2xl text-gray-800 mb-2">FROM</h2>
        <div className="text-4xl text-pink-600 mb-2">
          <span>$</span><span>{data.price}</span>
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
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800 mx-1" onClick={()=>{
            navigate("/")
          }}>Book</button>
        </div>
      </div>
    </div>
  );
}

export default Retreatcen;
