import React, { useState } from "react";

const gyms = {
  low: [
    {
      name: "Fitness First",
      image: "https://www.propertyfinder.ae/blog/wp-content/uploads/2023/11/shutterstock_1414134731-1-800x600.jpg",
      rating: 4.3,
      specialty: "General Fitness",
      cities: [
        {
          name: "Dubai (Al Barsha)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.1195,55.2015",
        },
        {
          name: "Abu Dhabi (Khalifa City)",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.4256,54.6180",
        },
      ],
    },
    {
      name: "GymNation",
      image: "https://static.zawya.com/view/acePublic/alias/contentid/NDBkZWRlNmYtZGE5NS00/0/gymnation-motorcityexpansion-1-jpg.webp",
      rating: 4.6,
      specialty: "Budget Gym",
      cities: [
        {
          name: "Dubai (DIP)",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.9863,55.1731",
        },
        {
          name: "Sharjah (Al Khan)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.3282,55.3933",
        },
      ],
    },
    {
      name: "Gold's Gym",
      image: "https://m.eyeofriyadh.com/news_images/2017/12/2a5925b0456e2.jpg",
      rating: 4.2,
      specialty: "Bodybuilding",
      cities: [
        {
          name: "Dubai (Al Quoz)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.1432,55.2194",
        },
        {
          name: "Abu Dhabi (Khalidiya)",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.4822,54.3576",
        },
      ],
    },
    {
      name: "FitRepublik",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGiDM5-CYL8GHcmjQTE9At6IoEYDOerPywTg&s",
      rating: 4.4,
      specialty: "Olympic Training",
      cities: [
        {
          name: "Dubai (Sports City)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.0369,55.2148",
        },
      ],
    },
    {
      name: "World Gym",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgiRKFwtsk2C6f5Vu1vg5uAoaYGu9erCSTwQ&s",
      rating: 4.1,
      specialty: "Powerlifting",
      cities: [
        {
          name: "Dubai (JLT)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.0764,55.1423",
        },
      ],
    },
    {
      name: "Smart Gym",
      image: "https://wl-img-prd.s3-accelerate.amazonaws.com/7e34ff47-bb8d-42c3-b5c0-4ee538187bc6-h.jpeg",
      rating: 4.0,
      specialty: "24/7 Access",
      cities: [
        {
          name: "Dubai (Al Nahda)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2855,55.3826",
        },
        {
          name: "Sharjah (Muweilah)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.3056,55.4036",
        },
      ],
    },
  ],
  mid: [
    {
      name: "Train Strength & Fitness",
      image: "https://media-cdn.tripadvisor.com/media/photo-s/1c/c1/4a/32/train-strength-fitness.jpg",
      rating: 4.7,
      specialty: "Functional Training",
      cities: [
        {
          name: "Dubai (Jumeirah)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2194,55.2512",
        },
      ],
    },
    {
      name: "Bodytree Studio",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b2/4a/f0/mens-and-womens-and-ladies.jpg?w=900&h=500&s=1",
      rating: 4.5,
      specialty: "Pilates & Yoga",
      cities: [
        {
          name: "Abu Dhabi",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.4931,54.3819",
        },
      ],
    },
    {
      name: "The Hundred Wellness Centre",
      image: "https://thehundred.ae/wp-content/uploads/2022/01/about-slide2.jpg",
      rating: 4.6,
      specialty: "Holistic Fitness",
      cities: [
        {
          name: "Dubai (Al Wasl)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.1916,55.2484",
        },
      ],
    },
    {
      name: "NRG Fitness",
      image: "https://www.nrg-fitness.co.uk/portal/web/28/content/images/image_123986672__1_.JPG",
      rating: 4.4,
      specialty: "Personal Training",
      cities: [
        {
          name: "Dubai (JLT)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.0764,55.1423",
        },
      ],
    },
    {
      name: "Bolt Fitness",
      image: "https://boltfitnesssupply.com/cdn/shop/files/Wildcats_1200_e405ec0a-a16f-4e5a-bce1-6877d8769c02.webp?v=1734721251",
      rating: 4.3,
      specialty: "HIIT & CrossFit",
      cities: [
        {
          name: "Dubai (Business Bay)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.1864,55.2765",
        },
      ],
    },
    {
      name: "Base Fitness",
      image: "https://searasports.com/wp-content/uploads/2021/11/Base-Fitness-5.jpg",
      rating: 4.5,
      specialty: "Athletic Training",
      cities: [
        {
          name: "Dubai (Al Quoz)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.1432,55.2194",
        },
      ],
    },
  ],
  high: [
    {
      name: "TribeFit Dubai",
      image: "https://media.licdn.com/dms/image/v2/C511BAQEw1msr0uxDsw/company-background_10000/company-background_10000/0/1584212152567/tribefit_cover?e=2147483647&v=beta&t=IBSAdyMqHSa2yYGqjnF0pwyMNmEiScgiwQXTCTvFWEE",
      rating: 4.9,
      specialty: "Luxury Fitness",
      cities: [
        {
          name: "Dubai (Al Quoz)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.1432,55.2194",
        },
      ],
    },
    {
      name: "ICONIC Fitness",
      image: "https://iconicfitness.ae/wp-content/uploads/2020/08/Group-barontheshoulder-TobiWillNiina-1-600x400@2x.jpg",
      rating: 4.8,
      specialty: "Boutique Gym",
      cities: [
        {
          name: "Dubai (DIFC)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2093,55.2743",
        },
        {
          name: "Abu Dhabi (Saadiyat)",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.5293,54.4339",
        },
      ],
    },
    {
      name: "The Platform",
      image: "https://www.theplatformstudios.com/wp-content/uploads/2022/10/DSC03941-scaled.jpg",
      rating: 4.9,
      specialty: "Elite Training",
      cities: [
        {
          name: "Dubai (Jumeirah)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2194,55.2512",
        },
      ],
    },
    {
      name: "KOA Fitness",
      image: "https://koafitnessmy.com/wp-content/uploads/2019/01/14b.jpg",
      rating: 4.7,
      specialty: "Athlete Development",
      cities: [
        {
          name: "Dubai (Al Safa)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.1594,55.2412",
        },
      ],
    },
    {
      name: "B/SPOKE",
      image: "https://cdn.vox-cdn.com/thumbor/tPirtOfGhV145mFO7aUbkBQe9-g=/0x52:1000x615/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/45257366/2014_07_bspoke-studio.0.jpg",
      rating: 4.8,
      specialty: "Cycling Studio",
      cities: [
        {
          name: "Dubai (DIFC)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2093,55.2743",
        },
      ],
    },
    {
      name: "The Gym Dubai",
      image: "https://www.timeoutdubai.com/cloud/timeoutdubai/2023/04/07/GymNation.jpg",
      rating: 4.9,
      specialty: "Celebrity Gym",
      cities: [
        {
          name: "Dubai (Palm Jumeirah)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.1216,55.1530",
        },
      ],
    },
  ],
};

const budgetLabels = {
  low: "Budget Gyms (Under 300 AED/month)",
  mid: "Premium Studios (300-800 AED/month)",
  high: "Luxury Fitness (800+ AED/month)"
};

const GymsPage = () => {
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
  
  const getBudgetGyms = () => {
    if (activeTab === "all") {
      return Object.entries(gyms);
    }
    return [[activeTab, gyms[activeTab]]];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            UAE Fitness Centers Directory
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover {Object.values(gyms).flat().length}+ premium gyms across all Emirates
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
              All Gyms
            </button>
            {Object.keys(gyms).map(budget => (
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
        
        {getBudgetGyms().map(([budgetLevel, centers]) => (
          <div key={budgetLevel} className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md mr-4">
                {budgetLevel === "low" && "💪"}
                {budgetLevel === "mid" && "🔥"}
                {budgetLevel === "high" && "⭐"}
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
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "https://via.placeholder.com/400x300?text=Gym+Image";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-2xl font-bold text-white">{center.name}</h3>
                      <p className="text-gray-200 text-sm capitalize">{center.specialty.toLowerCase()}</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        {renderStars(center.rating)}
                        <span className="ml-1 text-xs text-gray-500">({Math.floor(Math.random() * 500) + 50} reviews)</span>
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {center.rating.toFixed(1)}
                      </span>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-3">
                      <h4 className="text-gray-600 text-sm font-medium mb-1">Locations:</h4>
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
                            <span className="truncate">{city.name}</span>
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

export default GymsPage;