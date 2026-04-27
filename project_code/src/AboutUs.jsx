import React from 'react';
import { motion } from 'framer-motion';
import Twemoji from 'react-twemoji';

export default function AboutUsPage() {
  // Image URLs
  const footer ="https://i.pinimg.com/1200x/68/48/14/6848146498e2ca7067490110a79da9d8.jpg"
  const heroImage = 'src/images/hero.png';
  const sectionImage = "https://i.pinimg.com/736x/16/f2/22/16f222be2a76fdfbff594a3994a1c6dc.jpg";
  const worldMap = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Lebanon_%28orthographic_projection%29.svg/830px-Lebanon_%28orthographic_projection%29.svg.png";
  

  // Team member data with image URLs
  const team = [
    {
      name: "Ali Nabhan",
      position: "Founder",
      image: "src/images/ali.png",
      animationDelay: 0.1
    },
    {
      name: "Ibrahim Khalaf",
      position: "Founder",
      image: "src/images/ibr2.png",
      animationDelay: 0.2
    },
    {
      name: "Abdallah Hoteit",
      position: "Founder",
      image: "src/images/abd2.png",
      animationDelay: 0.3
    },
    {
      name: "Mohammad Bahri",
      position: "Founder",
      image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      animationDelay: 0.4
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Navigation Bar */}
      <nav className="absolute top-0 right-30 z-50 p-4">
        <div className="flex space-x-6">
          <a href="/" className="text-white hover:text-yellow-400 font-medium transition-colors">Home</a>
          <a href="/features" className="text-white hover:text-yellow-400 font-medium transition-colors">Features</a>
          <a href="/AboutUs" className="text-white hover:text-yellow-400 font-medium transition-colors">About Us</a>
          <a href="/pricing" className="text-white hover:text-yellow-400 font-medium transition-colors">Pricing</a>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative w-full h-80 md:h-170 overflow-hidden">
        <img
          src={heroImage}
          alt="Sustainable Future"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black opacity-40" />

        <div className="absolute inset-0 flex items-center px-4 md:px-8">
          <div className="max-w-lg text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              A PENY SAVED IS A PENY EARNED
            </h1>
            <p className="mb-6">
              We're doing our part in letting you able to organize you budget over dayes,monthes & future in perfect way.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              About FINLIFE Planner
            </h2>
            <p className="mb-4">
              At FINLIFE Planner, our mission is to help you take control of your finances, pay your bills on time, and achieve your financial goals with ease.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✔</span>Set your monthly budget to be able to organize your bills & be on time.
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✔</span>Have your day organized with getting best location recommendations. 
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✔</span>Set your future goals with best duration possible based on your budget.
              </li>
            </ul>
            <a
              href="#"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded"
            >
              Read More
            </a>
          </div>
          <div>
            <img
              src={sectionImage}
              alt="Energy Plant"
              className="rounded-lg shadow"
            />
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -5 }}
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-yellow-400">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.position}</p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* World Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto flex flex-col lg:flex-row items-center px-4 space-y-8 lg:space-y-0 lg:space-x-16">
          <img
            src={worldMap}
            alt="World Map"
            className="w-full lg:w-1/2 h-96 object-contain"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
           
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-2xl font-bold flex items-center justify-center text-yellow-500">
                <Twemoji options={{ className: 'inline-block h-8 w-8 mr-2' }}>
                  🇱🇧
                </Twemoji>
                
              </h3>
              <p>Based in Lebanon</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-2xl font-bold text-yellow-500">
              <Twemoji options={{ className: 'inline-block h-8 w-8 mr-2' }}>
  🌍
</Twemoji></h3>
              <p> Worldwide Available</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-2xl font-bold text-yellow-500"><Twemoji options={{ className: 'inline-block h-8 w-8 mr-2' }}>
  👥
</Twemoji></h3>
              <p>+500 Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA Section */}
      <section
        className="relative h-130 bg-cover bg-center"
        style={{ backgroundImage: `url('${footer}')` }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative container mx-auto h-full flex items-center px-4">
          <div className="max-w-md text-white">
            <h2 className="text-3xl font-bold mb-4">
            FINLIFE Planner For A Better Tomorrow
            </h2>
            <p className="mb-4">
             Get rid of your fears of financial failure and organize your life in an ideal way.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>Monthly Organizer
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>Daily Organizer
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>Future Goals
              </li>
            </ul>
            <a
              href="#Features"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded"
            >
              Discover More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}