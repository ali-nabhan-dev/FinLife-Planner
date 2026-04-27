import React, { useState } from "react";

const shoppingCenters = {
  low: [
    {
      name: "Al Ghurair Centre",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/13/ee/c2/al-ghurair-centre.jpg?w=1200&h=-1&s=1",
      rating: 4.0,
      specialty: "Affordable Shopping",
      cities: [
        {
          name: "Dubai (Deira)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2697,55.3095",
        }
      ]
    },
    {
      name: "BurJuman Centre",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/BurJuman%2C_2007_%2805%29.JPG",
      rating: 4.2,
      specialty: "Mid-Range Brands",
      cities: [
        {
          name: "Dubai (Bur Dubai)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2518,55.3003",
        }
      ]
    },
    {
      name: "Mall of the Emirates",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/f4/14/1c/mall-largejpg.jpg?w=600&h=400&s=1",
      rating: 4.5,
      specialty: "Ski Dubai + Shopping",
      cities: [
        {
          name: "Dubai (Al Barsha)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.1195,55.2015",
        }
      ]
    },
    {
      name: "Abu Dhabi Mall",
      image: "https://www.abudhabi-mall.com/images/logo/Abu_Dhabi_mall.jpg",
      rating: 4.1,
      specialty: "Department Stores",
      cities: [
        {
          name: "Abu Dhabi",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.4822,54.3576",
        }
      ]
    },
    {
      name: "Sharjah City Centre",
      image: "https://www.sharjahupdate.com/wp-content/uploads/2016/11/City-Centre-Sharjah-660-660x330.jpg",
      rating: 4.0,
      specialty: "Family Shopping",
      cities: [
        {
          name: "Sharjah",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.3056,55.4036",
        }
      ]
    },
    {
      name: "Ajman City Centre",
      image: "https://www.citycentreajman.com/assets/CCAjman.webp",
      rating: 3.9,
      specialty: "Local Brands",
      cities: [
        {
          name: "Ajman",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.4052,55.5136",
        }
      ]
    }
  ],
  mid: [
    {
      name: "Dubai Festival City Mall",
      image: "https://www.propertynews.ae/wp-content/uploads/2022/11/Dubai-Festival-City-Festival-Bay-3-new-1-1-1.jpg",
      rating: 4.4,
      specialty: "Waterfront Shopping",
      cities: [
        {
          name: "Dubai (Festival City)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2219,55.3743",
        }
      ]
    },
    {
      name: "Yas Mall",
      image: "https://ik.imagekit.io/mecsrweb/images/photos/main/bc2ee6cdb46fd2b9f10bea5f057558e4.jpeg",
      rating: 4.5,
      specialty: "Entertainment Hub",
      cities: [
        {
          name: "Abu Dhabi (Yas Island)",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.4847,54.6057",
        }
      ]
    },
    {
      name: "Mirdif City Centre",
      image: "https://www.visitdubai.com/-/media/gathercontent/poi/c/city-centre-mirdif/fallback-image/city-centre-mirdif-01.jpg",
      rating: 4.3,
      specialty: "Family Entertainment",
      cities: [
        {
          name: "Dubai (Mirdif)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2219,55.4243",
        }
      ]
    },
    {
      name: "The Galleria Al Maryah Island",
      image: "https://www.etihad.com/content/dam/eag/etihadairways/etihadcom/Global/destinations/etihad-flights/uae/abu-dhabi/p2-e-a/the-galleria-mall/galleria-mall-facade-header-mob.jpg?imwidth=414&imdensity=2.625",
      rating: 4.6,
      specialty: "Luxury Shopping",
      cities: [
        {
          name: "Abu Dhabi",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.4931,54.3819",
        }
      ]
    },
    {
      name: "Nakheel Mall",
      image: "https://www.nakheelmall.ae/uploads/sliders/0972af7cceaacf0b2069512130063306.jpg",
      rating: 4.2,
      specialty: "Palm Views",
      cities: [
        {
          name: "Dubai (Palm Jumeirah)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.1216,55.1530",
        }
      ]
    },
    {
      name: "City Centre Me'aisem",
      image: "https://www.citycentremeaisem.com/assets/CCMeaisem.webp",
      rating: 4.1,
      specialty: "Community Mall",
      cities: [
        {
          name: "Dubai (Dubailand)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.0369,55.2148",
        }
      ]
    }
  ],
  high: [
    {
      name: "The Dubai Mall",
      image: "https://www.visitdubai.com/-/media/gathercontent/poi/t/the-dubai-mall/fallback-image/the-dubai-mall-poi-shutterstock.jpg",
      rating: 4.8,
      specialty: "World's Largest Mall",
      cities: [
        {
          name: "Dubai (Downtown)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.1972,55.2744",
        }
      ]
    },
    {
      name: "Mall of the Emirates",
      image: "https://www.visitdubai.com/-/media/images/leisure/campaigns/dsf/dsf-header-02-dtcm.jpg",
      rating: 4.7,
      specialty: "Luxury Brands",
      cities: [
        {
          name: "Dubai (Al Barsha)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.1195,55.2015",
        }
      ]
    },
    {
      name: "Yas Mall",
      image: "https://i.pinimg.com/1200x/70/26/44/702644fb50fdfd37a0a9b3813fdbbb9c.jpg",
      rating: 4.6,
      specialty: "High-End Retail",
      cities: [
        {
          name: "Abu Dhabi (Yas Island)",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.4847,54.6057",
        }
      ]
    },
    {
      name: "The Galleria Al Maryah Island",
      image: "https://i.pinimg.com/1200x/8c/db/cd/8cdbcd315cfeed52a2396a139ea7a969.jpg",
      rating: 4.7,
      specialty: "Designer Boutiques",
      cities: [
        {
          name: "Abu Dhabi",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.4931,54.3819",
        }
      ]
    },
    {
      name: "Dubai Marina Mall",
      image: "https://i.pinimg.com/736x/68/63/82/686382fedf819ccb7816c12c17629209.jpg",
      rating: 4.5,
      specialty: "Waterfront Luxury",
      cities: [
        {
          name: "Dubai (Marina)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.0764,55.1423",
        }
      ]
    },
    {
      name: "Wafi Mall",
      image: "https://i.pinimg.com/736x/70/f3/ec/70f3ecfc4c454549dc90e4d5e359ec48.jpg",
      rating: 4.4,
      specialty: "Egyptian-Themed Luxury",
      cities: [
        {
          name: "Dubai (Oud Metha)",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.2279,55.3353",
        }
      ]
    }
  ]
};

const budgetLabels = {
  low: "Budget Shopping (Local Brands)",
  mid: "Premium Malls (Mixed Retail)",
  high: "Luxury Destinations (Designer Brands)"
};

const ShoppingCentersPage = () => {
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
  
  const getBudgetCenters = () => {
    if (activeTab === "all") {
      return Object.entries(shoppingCenters);
    }
    return [[activeTab, shoppingCenters[activeTab]]];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            UAE Shopping Centers Directory
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover {Object.values(shoppingCenters).flat().length}+ premier shopping destinations across all Emirates
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
              All Malls
            </button>
            {Object.keys(shoppingCenters).map(budget => (
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
        
        {getBudgetCenters().map(([budgetLevel, centers]) => (
          <div key={budgetLevel} className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md mr-4">
                {budgetLevel === "low" && "🛍️"}
                {budgetLevel === "mid" && "✨"}
                {budgetLevel === "high" && "💎"}
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
                        e.target.src = "https://via.placeholder.com/400x300?text=Shopping+Mall";
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
                        <span className="ml-1 text-xs text-gray-500">({Math.floor(Math.random() * 5000) + 500} reviews)</span>
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

export default ShoppingCentersPage;