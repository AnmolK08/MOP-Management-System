import React from 'react'
import { CheckIcon } from './SvgIcons';


// Plans Section Component
const PlanCard = ({ title, price, features, isPopular, buttonVariant }) => {
    const cardClasses = isPopular
        ? "border-2 border-solid border-[#ec6d13] shadow-lg relative"
        : "border border-solid border-stone-200 shadow-sm hover:shadow-lg";
    
    const buttonClasses = buttonVariant === 'primary'
        ? "bg-[#ec6d13] text-white hover:bg-orange-600"
        : "bg-stone-100 text-stone-800 hover:bg-stone-200";

    return (
        <div className={`flex flex-1 flex-col gap-4 sm:gap-6 rounded-xl bg-white p-4 sm:p-6 md:p-8 transition-shadow ${cardClasses}`}>
            {isPopular && (
                <div className="absolute top-0 right-4 sm:right-8 -mt-4 bg-[#ec6d13] text-white px-3 py-1 text-xs sm:text-sm font-bold rounded-full">
                    Most Popular
                </div>
            )}
            <div className="flex flex-col gap-2">
                <h3 className="text-stone-900 text-xl sm:text-2xl font-bold leading-tight">{title}</h3>
                <p className="flex items-baseline gap-1 text-stone-900">
                    <span className="text-stone-900 text-4xl sm:text-5xl font-black leading-tight tracking-tighter">₹{price}</span>
                    <span className="text-stone-600 text-base sm:text-lg font-semibold leading-tight">/month</span>
                </p>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3 mt-2 sm:mt-4">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base font-normal text-stone-700">
                        <div className="text-[#ec6d13] flex-shrink-0"><CheckIcon /></div>
                        <span className="flex-1">{feature}</span>
                    </div>
                ))}
            </div>
            <button className={`flex min-w-[84px] w-full mt-auto max-w-full sm:max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 sm:h-12 px-4 sm:px-5 text-base sm:text-lg font-bold leading-normal tracking-[0.015em] transition-colors ${buttonClasses}`}>
                <span className="truncate">Choose Plan</span>
            </button>
        </div>
    );
};

const Plans = () => {
  const plansData = [
    {
      title: 'Lunch & Dinner',
      price: '3200',
      features: ['7 days a week', '2 meals a day', 'Variety of cuisines', 'Healthy ingredients', 'Free delivery'],
      isPopular: true,
      buttonVariant: 'primary'
    },
    {
      title: 'Breakfast, Lunch & Dinner',
      price: '3800',
      features: ['7 days a week', '3 meals a day', 'Customizable options', 'Dietary preferences', 'Free delivery'],
      isPopular: false,
      buttonVariant: 'primary'
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4" id="plans">
      <h2 className="text-stone-900 text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-center mb-8 sm:mb-12">Our Meal Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto px-2 sm:px-4">
        {plansData.map((plan, index) => (
          <PlanCard key={index} {...plan} />
        ))}
      </div>
    </section>
  );
};

export default Plans