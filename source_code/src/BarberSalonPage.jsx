import React, { useState } from "react";

const barberSalons = {
  low: [
    {
      name: "Gentlemen's Barber",
      image: "https://i.pinimg.com/736x/17/6a/c8/176ac8f15cda4c82aa7ab11d01b08dda.jpg",
      rating: 4.2,
      specialty: "Classic Cuts",
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
      name: "Quick Trim",
      image: "https://www.esquireme.com/wp-content/uploads/sites/9/cloud/2024/03/12/QjIoyipj-CG_barbershop-the-space_v1-1200x675.jpg",
      rating: 4.0,
      specialty: "Affordable Haircuts",
      cities: [
        {
          name: "Dubai (Deira)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2697,55.3095",
        },
      ],
    },
    {
      name: "Clippers",
      image: "https://i.pinimg.com/736x/14/94/f9/1494f9fded1e3ff0d1df2a83249acf66.jpg",
      rating: 4.1,
      specialty: "No-Frills Barbering",
      cities: [
        {
          name: "Sharjah (Al Khan)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.3282,55.3933",
        },
      ],
    },
    {
      name: "Style Cut",
      image: "https://i.pinimg.com/736x/f3/20/d1/f320d183dddef3924c501c1bcf2b2b65.jpg",
      rating: 3.9,
      specialty: "Basic Styling",
      cities: [
        {
          name: "Ajman",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.4052,55.5136",
        },
      ],
    },
    {
      name: "City Barber",
      image: "https://images.fresha.com/locations/location-profile-images/1227805/4201089/87dba7a1-5b27-4968-aaf7-7337285985a3-BigCityBarberSalon-AE-Dubai-Dubai-Fresha.jpg?class=fallback",
      rating: 4.0,
      specialty: "Walk-Ins Welcome",
      cities: [
        {
          name: "Dubai (Bur Dubai)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2518,55.3003",
        },
      ],
    },
    {
      name: "Neat & Trim",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsGRy7xA1rv3Inw6xiCeh4vPPc5g8Cp8VkGg&s",
      rating: 4.1,
      specialty: "Quick Services",
      cities: [
        {
          name: "Abu Dhabi (Al Nahyan)",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.4822,54.3576",
        },
      ],
    },
  ],
  mid: [
    {
      name: "Chaps & Co",
      image: "https://www.chapsandco.com/us/wp-content/uploads/sites/15/2023/04/best-barbershop-in-new-york-chaps-and-co.jpg",
      rating: 4.6,
      specialty: "Premium Barbering",
      cities: [
        {
          name: "Dubai (Jumeirah)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2194,55.2512",
        },
        {
          name: "Abu Dhabi (Al Reem Island)",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.4931,54.3819",
        },
      ],
    },
    {
      name: "Slick",
      image: "https://i.pinimg.com/736x/f2/5f/e4/f25fe4d818492d66457d11ca4ed5ce18.jpg",
      rating: 4.5,
      specialty: "Modern Styles",
      cities: [
        {
          name: "Dubai (DIFC)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2093,55.2743",
        },
      ],
    },
    {
      name: "The Art of Shaving",
      image: "https://d2zdpiztbgorvt.cloudfront.net/us/images/182473/cover_155601549139.jpeg",
      rating: 4.4,
      specialty: "Traditional Shaves",
      cities: [
        {
          name: "Dubai (Mall of Emirates)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.1195,55.2015",
        },
      ],
    },
    {
      name: "Nomad Barber",
      image: "https://scontent.fbey14-1.fna.fbcdn.net/v/t1.6435-9/201103798_329385568743986_4406425387920417669_n.jpg?stp=dst-jpg_p180x540_tt6&_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=_x9B-ydKV4EQ7kNvwGalkSM&_nc_oc=AdkIj_XamLPkE_XxXZerxWmP5p4TZuQcwcSvo4os39ulOL8u4NcDJSPizsC5T0g2qLs&_nc_zt=23&_nc_ht=scontent.fbey14-1.fna&_nc_gid=TdS3lSbeP4fxETjejXv6zw&oh=00_AfL2-LUYwJgzaNEVJv4JCYavKzhzn95otdwqIJsxSPKOLQ&oe=684322C2",
      rating: 4.5,
      specialty: "Beard Grooming",
      cities: [
        {
          name: "Dubai (Al Quoz)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.1432,55.2194",
        },
      ],
    },
    {
      name: "Saints & Sinners",
      image: "https://i.pinimg.com/736x/7f/8b/47/7f8b47f01e096e3d98aeff51deac4680.jpg",
      rating: 4.3,
      specialty: "Hipster Styles",
      cities: [
        {
          name: "Abu Dhabi (Yas Island)",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.4847,54.6057",
        },
      ],
    },
    {
      name: "Truefitt & Hill",
      image: "https://cdn.shopify.com/s/files/1/0807/9265/0048/files/Truefitt-and-Hill-Store-3.jpg",
      rating: 4.7,
      specialty: "Luxury Grooming",
      cities: [
        {
          name: "Dubai (Downtown)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.1972,55.2744",
        },
      ],
    },
  ],
  high: [
    {
      name: "The Grooming Company",
      image: "https://www.arabianbusiness.com/wp-content/uploads/sites/3/cloud/2024/06/13/1847-grooming-lounge.jpg",
      rating: 4.9,
      specialty: "VIP Services",
      cities: [
        {
          name: "Dubai (Palm Jumeirah)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.1216,55.1530",
        },
      ],
    },
    {
      name: "Bulldog Barber",
      image: "https://s3-media0.fl.yelpcdn.com/bphoto/LKZ1cPrix3FaHjBkbE8GfA/1000s.jpg",
      rating: 4.8,
      specialty: "Celebrity Stylists",
      cities: [
        {
          name: "Dubai (DIFC)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2093,55.2743",
        },
      ],
    },
    {
      name: "1847",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c6/f8/43/our-beautifully-thought.jpg?w=900&h=500&s=1",
      rating: 4.9,
      specialty: "Bespoke Grooming",
      cities: [
        {
          name: "Abu Dhabi (Saadiyat)",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.5293,54.4339",
        },
      ],
    },
    {
      name: "The Refinery",
      image: "https://static.wixstatic.com/media/1ba4b6_4cf6913a0e294971977c565936d62834~mv2.jpg/v1/fill/w_320,h_569,al_t,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/1ba4b6_4cf6913a0e294971977c565936d62834~mv2.jpg",
      rating: 4.8,
      specialty: "Executive Services",
      cities: [
        {
          name: "Dubai (Business Bay)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.1864,55.2765",
        },
      ],
    },
    {
      name: "The Lounge",
      image: "https://content3.jdmagicbox.com/comp/anantnag/q1/9999p1932.1932.230910111938.e9q1/catalogue/the-lounge-anantnag-restaurants-gnuamym6ie.jpg",
      rating: 4.7,
      specialty: "Private Suites",
      cities: [
        {
          name: "Dubai (Jumeirah)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2194,55.2512",
        },
      ],
    },
    {
      name: "Manhattan's",
      image: "https://www.morecravings.com/_next/image?url=https%3A%2F%2Fcache.marriott.com%2Fis%2Fimage%2Fmarriotts7prod%2Fxr-auhxr-champagne-sabering-41400-12229%3ASquare&w=3840&q=75",
      rating: 4.9,
      specialty: "Luxury Experience",
      cities: [
        {
          name: "Abu Dhabi (Al Maryah Island)",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.4931,54.3819",
        },
      ],
    },
  ],
};

const budgetLabels = {
  low: "Budget (50-150 AED)",
  mid: "Premium (150-400 AED)",
  high: "Luxury (400+ AED)"
};

const BarberSalonPage = () => {
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
  
  const getBudgetSalons = () => {
    if (activeTab === "all") {
      return Object.entries(barberSalons);
    }
    return [[activeTab, barberSalons[activeTab]]];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            UAE Barber & Salon Directory
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover {Object.values(barberSalons).flat().length}+ top grooming destinations across all Emirates
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
              All Salons
            </button>
            {Object.keys(barberSalons).map(budget => (
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
        
        {getBudgetSalons().map(([budgetLevel, salons]) => (
          <div key={budgetLevel} className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md mr-4">
                {budgetLevel === "low" && "✂️"}
                {budgetLevel === "mid" && "💈"}
                {budgetLevel === "high" && "🪒"}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {budgetLabels[budgetLevel]}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {salons.map((salon, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={salon.image}
                      alt={salon.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "https://via.placeholder.com/400x300?text=Salon+Image";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-2xl font-bold text-white">{salon.name}</h3>
                      <p className="text-gray-200 text-sm capitalize">{salon.specialty.toLowerCase()}</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        {renderStars(salon.rating)}
                        <span className="ml-1 text-xs text-gray-500">({Math.floor(Math.random() * 300) + 50} reviews)</span>
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {salon.rating.toFixed(1)}
                      </span>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-3">
                      <h4 className="text-gray-600 text-sm font-medium mb-1">Locations:</h4>
                      <div className="space-y-2">
                        {salon.cities.map((city, i) => (
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

export default BarberSalonPage;