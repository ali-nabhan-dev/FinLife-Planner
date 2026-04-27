import React from "react";

const Pricing = () => {
    const plans = [
        {
            name: "Free",
            price: "$0",
            features: ["Basic budgeting", "Expense tracking", "Limited reports"],
            buttonText: "Get Started",
            popular: false,
        },
        {
            name: "Pro",
            price: "$9.99/mo",
            features: ["All Free features", "Advanced analytics", "Custom categories", "Sync bank accounts"],
            buttonText: "Start Free Trial",
            popular: true,
        },
        {
            name: "Premium",
            price: "$99.99/yr",
            features: ["All Pro features", "Priority support", "Multi-user access", "Early feature access"],
            buttonText: "Go Premium",
            popular: false,
        },
    ];

    return (
        <div className="text-center py-16 px-4 sm:px-8 bg-gray-50 font-sans min-h-screen flex flex-col justify-center">
            <div className="pricing-header mb-16">
                <h2 className="text-5xl sm:text-6xl mb-4 text-gray-800 font-bold">Choose Your Plan</h2>
                <p className="text-2xl sm:text-3xl text-gray-600 max-w-3xl mx-auto">
                    Simple and transparent pricing for every budget.
                </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
                {plans.map((plan, index) => (
                    <div 
                        key={index} 
                        className={`relative bg-white rounded-2xl p-8 w-full sm:w-96 shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl ${
                            plan.popular ? "border-4 border-blue-500" : "border-2 border-gray-200"
                        }`}
                    >
                        {plan.popular && (
                            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-bold whitespace-nowrap">
                                Most Popular
                            </span>
                        )}
                        <div className="card-header mb-8">
                            <h3 className="text-4xl mb-4 text-gray-800 font-bold">{plan.name}</h3>
                            <p className="text-5xl text-blue-500 font-bold">{plan.price}</p>
                        </div>
                        <ul className="features-list mb-8 text-left space-y-4">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="text-xl text-gray-700 flex items-start">
                                    <span className="text-blue-500 mr-3 text-2xl">✔</span> 
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <button
                            className={`w-full py-5 px-6 text-xl font-bold text-white rounded-xl transition-colors duration-300 ${
                                plan.popular
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        >
                            {plan.buttonText}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;