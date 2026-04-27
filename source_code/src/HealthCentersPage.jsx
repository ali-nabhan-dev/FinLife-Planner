import React, { useState } from "react";

const healthCenters = {
  low: [
    {
      name: "Al Qassimi Hospital",
      image: "https://www.ehs.gov.ae/images/c054190e/full.aspx",
      rating: 4.2,
      specialty: "General Hospital",
      cities: [
        {
          name: "Sharjah",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.3375,55.4121",
        },
      ],
    },
    {
      name: "Rashid Hospital",
      image: "https://res.cloudinary.com/protenders/image/upload/s--65SYNNlR--/c_limit,dpr_auto,f_auto,fl_progressive:semi,q_auto:eco,w_auto:100/4ed5a0d53eab9e2d27c9f769a847990e.jpg",
      rating: 4.3,
      specialty: "Trauma Center",
      cities: [
        {
          name: "Dubai",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2403,55.3043",
        },
      ],
    },
    {
      name: "Sheikh Khalifa General Hospital",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8PctBMj1ohEQisIb1BaU6hQQE5VZ69SFTTw&s",
      rating: 4.1,
      specialty: "General Hospital",
      cities: [
        {
          name: "Umm Al Quwain",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.5653,55.5532",
        },
      ],
    },
    {
      name: "Al Kuwait Hospital",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5Yb9WJo7dY-RCnXP1gZ-QPK1qR5eE7NspQ&s",
      rating: 4.0,
      specialty: "General Hospital",
      cities: [
        {
          name: "Dubai",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2657,55.3215",
        },
      ],
    },
    {
      name: "Al Rahba Hospital",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcmF9Nh_5olkDS3tZot6fVGIslnOQWA6rnBg&s",
      rating: 4.0,
      specialty: "General Hospital",
      cities: [
        {
          name: "Abu Dhabi",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.4783,54.3583",
        },
      ],
    },
  ],
  mid: [
    {
      name: "Medcare Hospital",
      image: "https://www.medcare.ae/fileadmin/user_upload/Safaopt.jpg",
      rating: 4.5,
      specialty: "Multi-specialty",
      cities: [
        {
          name: "Sharjah",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.3056,55.4036",
        },
        {
          name: "Dubai",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2048,55.2708",
        },
      ],
    },
    {
      name: "NMC Royal Hospital",
      image: "https://static-cdn.nmc.ae/strapi/NMC_Royal_hospital_Khalifa_City_6694157de1.jpg",
      rating: 4.6,
      specialty: "Multi-specialty",
      cities: [
        {
          name: "Dubai",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.0319,55.2136",
        },
        {
          name: "Abu Dhabi",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.4437,54.4186",
        },
      ],
    },
    {
      name: "Zulekha Hospital",
      image: "https://zulekhaeducation.org/wp-content/uploads/2023/03/zulekha-healthcare-1.jpg",
      rating: 4.4,
      specialty: "Multi-specialty",
      cities: [
        {
          name: "Dubai",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2675,55.3319",
        },
        {
          name: "Sharjah",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.3275,55.3936",
        },
      ],
    },
    {
      name: "Aster Hospital",
      image: "https://www.asterhospitals.ae/fileadmin/user_upload/Image__1_-min__1___1_.jpeg",
      rating: 4.5,
      specialty: "Multi-specialty",
      cities: [
        {
          name: "Dubai",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2486,55.3119",
        },
        {
          name: "Sharjah",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.3056,55.4036",
        },
      ],
    },
  ],
  high: [
    {
      name: "Cleveland Clinic Abu Dhabi",
      image: "https://my.clevelandclinic.org/-/scassets/images/org/locations/wayfinding/cleveland-clinic-abu-dhabi?mw=430&hash=0836012461AA3CC866899505D1A0C797532F6D09",
      rating: 4.8,
      specialty: "Specialty Care",
      cities: [
        {
          name: "Abu Dhabi",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.4847,54.3594",
        },
      ],
    },
    {
      name: "American Hospital Dubai",
      image: "https://www.healthtrip.com/_next/image?url=https%3A%2F%2Fd3fzwscyjtgllx.cloudfront.net%2Fhospitals%2Fimages%2F39C7eI7BLCyctzSQ6bzR8hrI1746527841112.jpeg&w=1200&q=60",
      rating: 4.7,
      specialty: "Multi-specialty",
      cities: [
        {
          name: "Dubai",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2403,55.3043",
        },
      ],
    },
    {
      name: "King's College Hospital London - Dubai",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdqoNQIFVjnJ2JZyFENY06tTBwyGu0Wk57Ug&s",
      rating: 4.7,
      specialty: "Specialty Care",
      cities: [
        {
          name: "Dubai",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.0972,55.1753",
        },
      ],
    },
    {
      name: "Mediclinic City Hospital",
      image: "https://mediclinic.scene7.com/is/image/mediclinic/CCC:1-1?_ck=1616198690644&wid=525&hei=525&dpr=off",
      rating: 4.6,
      specialty: "Multi-specialty",
      cities: [
        {
          name: "Dubai",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2219,55.2847",
        },
      ],
    },
    {
      name: "Burjeel Medical City",
      image: "https://burjeel.com/wp-content/uploads/2023/01/BMC-mobile.jpg",
      rating: 4.8,
      specialty: "Specialty Care",
      cities: [
        {
          name: "Abu Dhabi",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.4437,54.4186",
        },
      ],
    },
  ],
};

const budgetLabels = {
  low: "Public Hospitals",
  mid: "Private Hospitals",
  high: "Premium Healthcare"
};

const HealthCentersPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      } else if (i - 0.5 <= rating) {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="half-star" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="50%" stopColor="#FACC15" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path fill="url(#half-star)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      }
    }
    return stars;
  };
  
  const getBudgetHealthCenters = () => {
    if (activeTab === "all") {
      return Object.entries(healthCenters);
    }
    return [[activeTab, healthCenters[activeTab]]];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Healthcare Facilities in UAE
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the best hospitals and health centers across the UAE for your medical needs.
          </p>
        </header>
        
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-md">
            <button 
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === "all" 
                ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md" 
                : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            {Object.keys(healthCenters).map(budget => (
              <button 
                key={budget}
                onClick={() => setActiveTab(budget)}
                className={`px-6 py-2 rounded-md transition-all ${
                  activeTab === budget 
                  ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {budgetLabels[budget]}
              </button>
            ))}
          </div>
        </div>
        
        {getBudgetHealthCenters().map(([budgetLevel, centers]) => (
          <div key={budgetLevel} className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md mr-4">
                {budgetLevel === "low" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                {budgetLevel === "mid" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                )}
                {budgetLevel === "high" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {budgetLabels[budgetLevel]}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {centers.map((center, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={center.image}
                      alt={center.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-2xl font-bold text-white">{center.name}</h3>
                      <p className="text-gray-200 text-sm">{center.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        {renderStars(center.rating)}
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {center.rating.toFixed(1)} / 5.0
                      </span>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-3">
                      <h4 className="text-gray-600 text-sm font-medium mb-1">Available Locations:</h4>
                      <div className="space-y-2">
                        {center.cities.map((city, i) => (
                          <a
                            key={i}
                            href={city.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-700 hover:text-blue-500 transition-colors group"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>{city.name}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthCentersPage;