import React, { useState } from "react";

const restaurants = {
  low: [
    {
      name: "KFC",
      image: "https://i.pinimg.com/736x/d1/ff/a3/d1ffa31bc2781ce679e246540d165b11.jpg",
      rating: 5,
      cuisine: "Fast Food",
      cities: [
        {
          name: "Dubai",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.1972,55.2744",
        },
        {
          name: "Abu Dhabi",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.4539,54.3773",
        },
      ],
    },
    {
      name: "Karachi Grill Restaurant",
      image: "https://i.pinimg.com/736x/02/0a/45/020a4532c731d33e5a439964d1001e31.jpg",
      rating: 4.9,
      cuisine: "Indian Food",
      cities: [
        {
          name: "Dubai",
          link: "https://www.google.com/maps/dir/?api=1&destination=25.1972,55.2744",
        },
        {
          name: "Abu Dhabi",
          link: "https://www.google.com/maps/dir/?api=1&destination=24.4539,54.3773",
        },
      ],
    },
    {
        name: "Puffin Chimney Cakes, Best Gelato, Churros",
        image: "data:image/jpeg;base64,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",
        rating: 4,
        cuisine: "Dessert, European",
        cities: [
          {
            name: "Dubai",
            link: "https://www.google.com/maps/dir/?api=1&destination=25.1972,55.2744",
          },
          {
            name: "Abu Dhabi",
            link: "https://www.google.com/maps/dir/?api=1&destination=24.4539,54.3773",
          },
        ],
      },
      {
        name: "Al Mallah",
        image: "https://www.dhowcruiseindubai.com/blog/wp-content/uploads/2015/10/Al-Mallah.jpg",
        rating: 4.2,
        cuisine: "Lebanese",
        cities: [
          {
            name: "Dubai",
            link: "https://www.google.com/maps/dir/?api=1&destination=25.239003,55.288650",
          },
          
        ],
      },
      {
        name: "Bu Qtair",
        image: "https://images.wanderon.in/blogs/new/2024/07/about-bu-qtair-restaurant.jpg",
        rating: 4.1,
        cuisine: "Seafood",
        cities: [
          {
            name: "Dubai",
            link: "https://www.google.com/maps/dir/?api=1&destination=25.143889,55.192222",
          },
        
        ],
      },
      {
        name: "Bait El Khetyar - Najdah",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeTDUkJ4tJdsog1gkxqGEAkY2O-2GvvBzC7Loj3MGiFbKYp0xpbIzkKIz-vsKeFyVW8cE&usqp=CAU",
        rating: 4.4,
        cuisine: "Lebanese",
        cities: [
          
          {
            name: "Abu Dhabi",
            link: "https://www.google.com/maps/dir/?api=1&destination=24.4955,54.3703",
          },
        ],
      },
      {
        name: "Meylas Emirati Restaurant - Al Muneera",
        image: "https://b.zmtcdn.com/data/pictures/7/5702097/1fde2dfe3d12f3b9e9e2f46228f268d1.jpg",
        rating: 4.2,
        cuisine: "Emairati",
        cities: [
       
          {
            name: "Abu Dhabi",
            link: " https://www.google.com/maps/dir/?api=1&destination=24.4437,54.6003",
          },
        ],
      },
      {
        name: "Fen Café & Restaurant - Al Mureijah",
        image: "https://b.zmtcdn.com/data/pictures/0/5600270/6617b065da0c1044265604931e100a7b_featured_v2.jpg",
        rating: 4.6,
        cuisine: "International",
        cities: [
          {
            name: "Sharjah",
            link: "https://www.google.com/maps/dir/?api=1&destination=25.3575,55.3851",
          },
         
        ],
      },
      {
        name: "The Greek Boys",
        image: "https://scontent.fbey2-2.fna.fbcdn.net/v/t1.6435-9/141759267_3697032013714873_1298541183330426035_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=aA9vAUrmhEoQ7kNvwELj8wK&_nc_oc=Adk-NW_UFRSSRNA5iQvrnFRDGgQpWtlNahv1jsPFAL92ZsmciZX1WmSEDvQd8v3zQN0&_nc_zt=23&_nc_ht=scontent.fbey2-2.fna&_nc_gid=1tiyLIMcevElkmi67Rx1uQ&oh=00_AfGgInTKt1vHeb_JNQ1iPhq04-bE73GNGodOwfM_HHjTKg&oe=683CC090",
        rating: 4.8,
        cuisine: "Greek",
        cities: [
          {
            name: "Ajman",
            link: "https://www.google.com/maps/dir/?api=1&destination=25.4052,55.5136",
          },
          
        ],
      },
  ],
  mid: [
    {
      name: " Glow",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/36/38/f5/glow-shisha-lounge-serving.jpg?w=900&h=500&s=1",
      rating: 5,
      cuisine: "International",
      cities: [
        {
          name: "Abo Dhabi",
          link: "https://www.google.com/maps/dir/?api=1&destination=Glow+-+Poolside+Sports+Bar,+Abu+Dhabi",
        },
      ],
    },
    {
        name: " Yasmina Restaurant",
        image: "https://b.zmtcdn.com/data/pictures/6/5602616/d4130218a8cae555824175093eb5fc47_featured_v2.jpg",
        rating: 4.9,
        cuisine: "Seafood, International",
        cities: [
          {
            name: "Sharjah",
            link: "https://www.google.com/maps/dir/?api=1&destination=Yasmina+Restaurant,+Sharjah",
          },
        ],
      },
      {
        name: "Thai Gate",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/e5/bd/aa/thai-gate-university.jpg?w=900&h=500&s=1",
        rating: 4.9,
        cuisine: "Thai",
        cities: [
          {
            name: "Sharjah",
            link: "https://www.google.com/maps/dir/?api=1&destination=Thai+Gate,+Sharjah",
          },
        ],
      },
      {
        name: "Pickl",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE8jlNzKnFBWfsER9dSTeT9SSSz7L7VRBhJw&s",
        rating: 4.5,
        cuisine: "American ",
        cities: [
          {
            name: "Dubai",
            link: "https://www.google.com/maps/dir/?api=1&destination=Pickl,+Dubai",
          },
          {
            name: "Abu Dhabi",
            link: "https://www.google.com/maps/dir/?api=1&destination=Pickl,+Abu+Dhabi",
          },
          {
            name: "Sharjah",
            link: "https://www.google.com/maps/dir/?api=1&destination=Pickl,+Sharjah",
          },
        ],
      },
      {
        name: "Almayass",
        image: "https://lh5.googleusercontent.com/proxy/5zrREFsPQNyQthbsZ6NsvV0T1Eb2K6hYnXks49ym_ZeZj7GnvSbtzSDbcZWfR3b6DO7F7q67Sy4bDgMSUTix3gwgGejlkA",
        rating: 4.5,
        cuisine: "Armenian-Lebanese",
        cities: [
          {
            name: "Abu Dhabi",
            link: "https://www.google.com/maps/dir/?api=1&destination=Almayass,+Abu+Dhabi",
          },
        ],
      },
      {
        name: "Meylas Emirati Restaurant",
        image: "https://b.zmtcdn.com/data/pictures/7/5702097/1fde2dfe3d12f3b9e9e2f46228f268d1.jpg",
        rating: 4.2,
        cuisine: "Emirati",
        cities: [
          {
            name: "Abo Dhabi",
            link: "https://www.google.com/maps/dir/?api=1&destination=Meylas+Emirati+Restaurant,+Abu+Dhabi",
          },
        ],
      },
  ],
  high: [
    {
      name: "Ossiano",
      image: "https://i0.wp.com/eatweekguide.com/wp-content/uploads/2023/10/img_8209-1.jpg?fit=1920%2C1280&ssl=1",
      rating: 5,
      cuisine: "Seafood ",
      cities: [
        {
          name: "Dubai",
          link: "https://www.google.com/maps/dir/?api=1&destination=Ossiano,+Atlantis+The+Palm,+Dubai",
        },
      ],
    },
    {
        name: "Row on 45 ",
        image: "https://www.rowon45dubai.com/resourcefiles/home-second-snippet/wine-cellar-row-on-45.jpg",
        rating: 5,
        cuisine: "Contemporary European ",
        cities: [
          {
            name: "Dubai",
            link: "https://www.google.com/maps/dir/?api=1&destination=Row+on+45,+Grosvenor+House,+Dubai",
          },
        ],
      },
      {
        name: "La Dame de Pic",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/6f/8c/87/bar.jpg?w=900&h=500&s=1",
        rating: 5,
        cuisine: "Modern French ",
        cities: [
          {
            name: "Dubai",
            link: "https://www.google.com/maps/dir/?api=1&destination=25.1304,55.1198https://www.google.com/maps/dir/?api=1&destination=La+Dame+de+Pic,+One%26Only+One+Za%27abeel,+Dubai",
          },
        ],
      },
      {
        name: "Talea by Antonio Guida",
        image: "https://images.otstatic.com/prod1/47440087/3/huge.png",
        rating: 5,
        cuisine: "Italian ",
        cities: [
          {
            name: "Abu Dhabi",
            link: "https://www.google.com/maps/dir/?api=1&destination=Talea+by+Antonio+Guida,+Emirates+Palace,+Abu+Dhabi",
          },
          
        ],
      },
      {
        name: "99 Sushi Bar",
        image: "https://axwwgrkdco.cloudimg.io/v7/__gmpics3__/f5cc37fb18cf4883b673f434b8d3deba.jpeg?width=1000",
        rating: 5,
        cuisine: "Japanese",
        cities: [
          {
            name: "Abu Dhabi",
            link: "https://www.google.com/maps/dir/?api=1&destination=99+Sushi+Bar,+The+Galleria,+Abu+Dhabi",
          },
          
        ],
      },
      {
        name: "Estiatorio Milos",
        image: "https://www.estiatoriomilos.com/wp-content/uploads/2024/08/MBS-Milos-04-1-Large.jpeg",
        rating: 5,
        cuisine: "Greek ",
        cities: [
          {
            name: "Dubia",
            link: "https://www.google.com/maps/dir/?api=1&destination=Estiatorio+Milos,+Atlantis+The+Royal,+Dubai",
          },
          
        ],
      },
  ],
};

const budgetLabels = {
  low: "Budget-Friendly",
  mid: "Mid-Range",
  high: "Fine Dining"
};

const FoodRecommendationsPage = () => {
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
  
  const getBudgetRestaurants = () => {
    if (activeTab === "all") {
      return Object.entries(restaurants);
    }
    return [[activeTab, restaurants[activeTab]]];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Discover Culinary Experiences
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of restaurants across the UAE to find your next memorable dining experience.
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
            {Object.keys(restaurants).map(budget => (
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
        
        {getBudgetRestaurants().map(([budgetLevel, places]) => (
          <div key={budgetLevel} className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md mr-4">
                {budgetLevel === "low" && "$"}
                {budgetLevel === "mid" && "$$"}
                {budgetLevel === "high" && "$$$"}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {budgetLabels[budgetLevel]} Options
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {places.map((place, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-2xl font-bold text-white">{place.name}</h3>
                      <p className="text-gray-200 text-sm">{place.cuisine}</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        {renderStars(place.rating)}
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {place.rating.toFixed(1)} / 5.0
                      </span>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-3">
                      <h4 className="text-gray-600 text-sm font-medium mb-1">Available Locations:</h4>
                      <div className="space-y-2">
                        {place.cities.map((city, i) => (
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

export default FoodRecommendationsPage;