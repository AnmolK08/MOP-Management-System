import React from 'react'

// Menu Section Component
const MenuItemCard = ({ imageUrl, title, description }) => (
    <div className="flex flex-col gap-3 sm:gap-4 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow">
        <div 
            className="w-full h-48 sm:h-56 bg-cover bg-center" 
            style={{ 
                backgroundImage: `url("${imageUrl}")`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        ></div>
        <div className="p-4 sm:p-5">
            <p className="text-stone-900 text-lg sm:text-xl font-semibold leading-snug line-clamp-2">{title}</p>
            <p className="text-stone-600 text-sm sm:text-base font-normal leading-relaxed mt-1 sm:mt-2 line-clamp-3">{description}</p>
        </div>
    </div>
);

const Menu = () => {
    const menuData = {
        "Monday": [
            {
                imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeQL0qN83dd8Qpd_m-rsBThtQHId46c-mwolCTNRiqc9oZRRmyRCOC9h84bh1_UYeKG0-Vbn_i2OxArL3ivw0d2KfdPhFXIlbmyF1WW2-oYWatY5tmgFRrsR2qRdOI2w1cXlpH5nkHK6fYoEfYsWO6mWISl2Tt85xr47EBOyT-D2Uw90jjwWgkB-6XJg8SW6lkciJun2QgUBv6D5lTfcCQwjqk6X24ejOhXk6IHXE90msvgUVSKXWEDmS16WZRd0u20l6DecpJ04s6",
                title: "Lunch: Chicken Curry with Rice",
                description: "A classic Indian dish with tender chicken in a rich, flavorful sauce."
            },
            {
                imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnd3WcWl2QJ5AkqvGHdEsYAyffqn3iR6vHBDsHThZzOdXdIM4girfWiNAycm6t5UrRDEZZ_aIkqLgUu644WAzq8vtrpKmpIliQDidlVBMazJN6jNhv6m9BksjpS_rhOcVVEr-r2kNdR04VMr_QcdFvtqM7-7AfDJ5m9_SYJe1PHq3QpgqU7I9RkZ_WXbST1BbLDJqiWXy8PJ9wo7q4aA_ZtYTWReyFlIm5QbOVyN7advxR11YZlc4ngpcRCMMuV4PA-3aO76aBR6rv",
                title: "Dinner: Vegetable Stir-Fry with Noodles",
                description: "A healthy and satisfying stir-fry with a variety of fresh vegetables."
            },
            {
                imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPawwK2dPp9oYHVNOXfxrOxD-dQzKI01wRW4v0CjHvdCoEQG-sI-GN5xuLyBYCghFLWyndrd43Cv1E8oKq54hhb0yunb3v3ysGs8uLOkhpuGXVqOgDO-r-yqY2P94rvJi3lyVFI2Y9WwHT2Rinlic-aw_KMxyYttZYGhqHFd21CLwJpC1p2t32lQuVC-ueaR5iPduVw8IsGNCyi1_N2fp2Krhovi_SDinN7gXbkIx2Um2wEPHx6bFx0STzZYUIxJ8Yxj_yoFGIrzI2",
                title: "Breakfast: Oatmeal with Fruits and Nuts",
                description: "A nutritious and delicious way to start your day with a mix of textures and flavors."
            }
        ],
        "Tuesday": [
            {
                imageUrl: "https://source.unsplash.com/800x600/?indian-breakfast",
                title: "Breakfast: Masala Dosa",
                description: "Crispy fermented rice crepe served with potato filling and coconut chutney."
            },
            {
                imageUrl: "https://source.unsplash.com/800x600/?indian-curry",
                title: "Lunch: Dal Makhani with Naan",
                description: "Creamy black lentils slow-cooked with butter and spices, served with fresh naan."
            },
            {
                imageUrl: "https://source.unsplash.com/800x600/?biryani",
                title: "Dinner: Vegetable Biryani",
                description: "Fragrant rice cooked with mixed vegetables and aromatic spices."
            }
        ],
        "Wednesday": [
            {
                imageUrl: "https://source.unsplash.com/800x600/?eggs-toast",
                title: "Breakfast: Eggs Benedict",
                description: "Poached eggs on toasted English muffins with hollandaise sauce."
            },
            {
                imageUrl: "https://source.unsplash.com/800x600/?pasta",
                title: "Lunch: Penne Arrabbiata",
                description: "Spicy tomato sauce with garlic and red chili, tossed with penne pasta."
            },
            {
                imageUrl: "https://source.unsplash.com/800x600/?grilled-chicken",
                title: "Dinner: Grilled Chicken",
                description: "Herb-marinated chicken with roasted vegetables and quinoa."
            }
        ],
        "Thursday": [
            {
                imageUrl: "https://source.unsplash.com/800x600/?smoothie-bowl",
                title: "Breakfast: Acai Bowl",
                description: "Fresh fruit smoothie bowl topped with granola and berries."
            },
            {
                imageUrl: "https://source.unsplash.com/800x600/?sushi",
                title: "Lunch: Sushi Platter",
                description: "Assorted sushi rolls with wasabi and pickled ginger."
            },
            {
                imageUrl: "https://source.unsplash.com/800x600/?steak",
                title: "Dinner: Grilled Steak",
                description: "Premium cut steak with garlic mashed potatoes and asparagus."
            }
        ],
        "Friday": [
            {
                imageUrl: "https://source.unsplash.com/800x600/?pancakes",
                title: "Breakfast: Blueberry Pancakes",
                description: "Fluffy pancakes with fresh blueberries and maple syrup."
            },
            {
                imageUrl: "https://source.unsplash.com/800x600/?salad",
                title: "Lunch: Mediterranean Salad",
                description: "Fresh greens with feta, olives, and balsamic dressing."
            },
            {
                imageUrl: "https://source.unsplash.com/800x600/?fish",
                title: "Dinner: Grilled Salmon",
                description: "Fresh salmon with lemon herb sauce and wild rice."
            }
        ],
        "Saturday": [
            {
                imageUrl: "https://source.unsplash.com/800x600/?avocado-toast",
                title: "Breakfast: Avocado Toast",
                description: "Sourdough toast with smashed avocado, eggs, and microgreens."
            },
            {
                imageUrl: "https://source.unsplash.com/800x600/?burger",
                title: "Lunch: Gourmet Burger",
                description: "Angus beef burger with caramelized onions and truffle aioli."
            },
            {
                imageUrl: "https://source.unsplash.com/800x600/?pizza",
                title: "Dinner: Artisanal Pizza",
                description: "Wood-fired pizza with fresh mozzarella and basil."
            }
        ],
        "Sunday": [
            {
                imageUrl: "https://source.unsplash.com/800x600/?french-toast",
                title: "Breakfast: French Toast",
                description: "Brioche French toast with berries and whipped cream."
            },
            {
                imageUrl: "https://source.unsplash.com/800x600/?roast-chicken",
                title: "Lunch: Sunday Roast",
                description: "Roasted chicken with Yorkshire pudding and vegetables."
            },
            {
                imageUrl: "https://source.unsplash.com/800x600/?pasta-seafood",
                title: "Dinner: Seafood Pasta",
                description: "Linguine with mixed seafood in white wine sauce."
            }
        ]
    };

    const days = Object.keys(menuData);
    const [selectedDay, setSelectedDay] = React.useState("Monday");

    return (
        <section className="py-16 sm:py-24 px-4 bg-stone-50" id="menu">
            <h2 className="text-stone-900 text-4xl font-bold leading-tight tracking-tight text-center mb-12">This Week's Menu</h2>
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-center border-b border-stone-200 mb-8">
                    <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {days.map((day) => (
                            <button 
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`flex flex-col items-center justify-center px-6 pb-3 pt-2 border-b-2 ${day === selectedDay ? 'border-b-[#ec6d13] text-[#ec6d13]' : 'border-b-transparent text-stone-500 hover:text-[#ec6d13] hover:border-b-[#ec6d13]/50 transition-colors'}`}
                            >
                                <p className="text-lg font-semibold leading-normal whitespace-nowrap">{day}</p>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {menuData[selectedDay].map((item, index) => (
                        <MenuItemCard key={index} {...item} />
                    ))}
                </div>
            </div>
            <div className="mt-8 text-center">
                <p className="text-sm sm:text-base text-stone-600">
                    * Menu items may vary based on seasonal availability
                </p>
            </div>
        </section>
    );
};

export default Menu