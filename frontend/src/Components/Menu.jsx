import React from "react";
import monday1 from "../assets/monday1.webp";
import monday2 from "../assets/monday2.webp";
import monday3 from "../assets/monday3.webp";
import tues1 from "../assets/tues1.webp";
import tues2 from "../assets/tues2.webp";
import tues3 from "../assets/tues3.webp";
import wed1 from "../assets/wed1.webp";
import wed2 from "../assets/wed2.webp";
import wed3 from "../assets/wed3.webp";
import thur1 from "../assets/thur1.webp";
import thur2 from "../assets/thur2.webp";
import thur3 from "../assets/thur3.webp";
import fri1 from "../assets/fri1.webp";
import fri2 from "../assets/fri2.webp";
import fri3 from "../assets/fri3.webp";
import sat1 from "../assets/sat1.avif";
import sat2 from "../assets/sat2.webp";
import sat3 from "../assets/sat3.webp";
import sunday1 from "../assets/sunday1.webp";
import sunday2 from "../assets/sunday2.webp";
import sunday3 from "../assets/sunday3.webp";

const MenuItemCard = ({ imageUrl, title, description }) => (
  <div className="flex flex-col gap-3 sm:gap-4 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow">
    <div
      className="w-full h-48 sm:h-56 bg-cover bg-center"
      style={{
        backgroundImage: `url("${imageUrl}")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
    <div className="p-4 sm:p-5">
      <p className="text-stone-900 text-lg sm:text-xl font-semibold leading-snug line-clamp-2">{title}</p>
      <p className="text-stone-600 text-sm sm:text-base font-normal leading-relaxed mt-1 sm:mt-2 line-clamp-3">
        {description}
      </p>
    </div>
  </div>
);

const Menu = () => {
  const menuData = {
    Monday: [
      { imageUrl: monday1, title: "Breakfast: Sabji Paratha", description: "Stuffed parathas filled with spiced vegetables, served hot with curd and pickle." },
      { imageUrl: monday2, title: "Lunch: Seetafal, Daal Makhani", description: "A rich and creamy lentil curry, slow-cooked with butter and spices for that comforting homestyle taste." },
      { imageUrl: monday3, title: "Dinner: Rajma Alu, Tamatar", description: "Hearty kidney beans with potatoes in a tangy tomato gravy — a true North Indian classic." },
    ],
    Tuesday: [
      { imageUrl: tues1, title: "Breakfast: Poha", description: "Light and fluffy poha tossed with onions, peas, and a dash of lemon for freshness." },
      { imageUrl: tues2, title: "Lunch: Mix Veg, Dal Fry", description: "A homely lentil curry cooked with seasonal vegetables and tempered with garlic and ghee." },
      { imageUrl: tues3, title: "Dinner: Soya Chaap, Chole", description: "Soya chaap simmered in a spicy chickpea curry — protein-packed and flavorful." },
    ],
    Wednesday: [
      { imageUrl: wed1, title: "Breakfast: Alu Kachori Sabji", description: "Crispy fried bread stuffed with spiced potato filling, served with tangy chutney." },
      { imageUrl: wed2, title: "Lunch: Alu Tamatar Sabji, Dal", description: "Simple yet comforting — potato-tomato curry paired with a bowl of hot dal." },
      { imageUrl: wed3, title: "Dinner: Alu Zeera, Dal Fry", description: "A wholesome dinner combo of cumin-flavored potato curry with dal fry." },
    ],
    Thursday: [
      { imageUrl: thur1, title: "Breakfast: Sabji Paratha", description: "Soft parathas stuffed with veggies, perfect for a filling breakfast." },
      { imageUrl: thur2, title: "Lunch: Dal, Alu Gobi", description: "Comforting dal served with potato-cauliflower curry — a homestyle favorite." },
      { imageUrl: thur3, title: "Dinner: Baigan, Bharta Chole", description: "Smoky roasted eggplant mash paired with spicy chickpeas for a flavorful dinner." },
    ],
    Friday: [
      { imageUrl: fri1, title: "Breakfast: Aloo Paratha", description: "Golden parathas stuffed with spiced potatoes, best enjoyed with butter and pickle." },
      { imageUrl: fri2, title: "Lunch: Khadi, Alu Shimla", description: "A tangy yogurt-based curry with potatoes and capsicum, light yet satisfying." },
      { imageUrl: fri3, title: "Dinner: Shahi Paneer, Alu Sabji", description: "Experience a truly royal and indulgent North Indian curry. This dish features soft paneer and tender potatoes in a rich, creamy, and aromatic gravy made with tomatoes, onions, cashews, and a blend of exquisite spices." },
    ],
    Saturday: [
      { imageUrl: sat1, title: "Breakfast: Macroni", description: "Masala macaroni cooked desi-style with onions, capsicum, and Indian spices." },
      { imageUrl: sat2, title: "Lunch: Chole Bhature", description: "Fluffy bhature served with spicy chickpea curry — an indulgent weekend treat." },
      { imageUrl: sat3, title: "Dinner: Rajma, Alu SoyaBean", description: "A nutritious mix of kidney beans, potatoes, and soy chunks in a spicy curry." },
    ],
    Sunday: [
      { imageUrl: sunday1, title: "Breakfast: Sandwich", description: "Simple and tasty sandwiches stuffed with veggies, chutneys, and cheese." },
      { imageUrl: sunday2, title: "Lunch: Veg Biryani", description: "Fragrant rice layered with vegetables and spices, served with raita." },
      { imageUrl: sunday3, title: "Dinner: Masala Bhindi, Chole", description: "Okra stir-fried with spices and paired with a rich chickpea curry." },
    ],
  };

  const days = Object.keys(menuData);
  const [selectedDay, setSelectedDay] = React.useState("Monday");

  // Refs
  const railRef = React.useRef(null);
  const btnRefs = React.useRef({});

  // Smoothly center the selected pill
  React.useEffect(() => {
    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = btnRefs.current[selectedDay];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedDay]);

  // Optional: minimal tick sound
  const audioCtxRef = React.useRef(null);
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audioCtxRef.current = new Ctx();
    } else if (audioCtxRef.current.resume) {
      audioCtxRef.current.resume();
    }
  };

  //issmei se tone change krna ho toh kr lena 
  // const playTick = React.useCallback(() => {
  //   const ctx = audioCtxRef.current;
  //   if (!ctx) return;
  //   const osc = ctx.createOscillator();
  //   const gain = ctx.createGain();
  //   osc.type = "square";
  //   osc.frequency.value = 1200;
  //   gain.gain.value = 0.0001;
  //   osc.connect(gain);
  //   gain.connect(ctx.destination);
  //   const now = ctx.currentTime;
  //   gain.gain.setValueAtTime(0.0001, now);
  //   gain.gain.exponentialRampToValueAtTime(0.02, now + 0.005);
  //   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
  //   osc.start(now);
  //   osc.stop(now + 0.08);
  // }, []);



  //   const playTick = React.useCallback(() => {
  //   const ctx = audioCtxRef.current;
  //   if (!ctx) return;
  //   const osc = ctx.createOscillator();
  //   const gain = ctx.createGain();

  //   osc.type = "triangle";       // softer timbre [changeable] [web:71]
  //   osc.frequency.value = 900;    // pitch Hz [changeable] [web:44]

  //   gain.gain.value = 0.0001;
  //   osc.connect(gain);
  //   gain.connect(ctx.destination);

  //   const now = ctx.currentTime;
  //   gain.gain.setValueAtTime(0.0001, now);
  //   gain.gain.exponentialRampToValueAtTime(0.012, now + 0.008);  // peak & attack [changeable]
  //   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);  // decay [changeable]

  //   osc.start(now);
  //   osc.stop(now + 0.11); // total duration cap [optional]
  // }, []);


  // const playTick = React.useCallback(() => {
  //   const ctx = audioCtxRef.current;
  //   if (!ctx) return;
  //   const osc = ctx.createOscillator();
  //   const gain = ctx.createGain();

  //   osc.type = "square";        // bright, clicky [changeable] [web:71]
  //   osc.frequency.value = 2000; // high pitch [changeable] [web:44]

  //   gain.gain.value = 0.0001;
  //   osc.connect(gain);
  //   gain.connect(ctx.destination);

  //   const now = ctx.currentTime;
  //   gain.gain.setValueAtTime(0.0001, now);
  //   gain.gain.exponentialRampToValueAtTime(0.022, now + 0.003); // fast attack, louder [changeable]
  //   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06); // short decay [changeable]

  //   osc.start(now);
  //   osc.stop(now + 0.08);
  // }, []);


  // const playTick = React.useCallback(() => {
  //   const ctx = audioCtxRef.current;
  //   if (!ctx) return;
  //   const osc = ctx.createOscillator();
  //   const gain = ctx.createGain();

  //   osc.type = "sine";          // pure tone [changeable] [web:71]
  //   osc.frequency.value = 1200; // mid pitch [changeable] [web:44]

  //   gain.gain.value = 0.0001;
  //   osc.connect(gain);
  //   gain.connect(ctx.destination);

  //   const now = ctx.currentTime;
  //   gain.gain.setValueAtTime(0.0001, now);
  //   gain.gain.exponentialRampToValueAtTime(0.01, now + 0.005);  // moderate attack [changeable]
  //   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04); // very short decay [changeable]

  //   osc.start(now);
  //   osc.stop(now + 0.06);
  // }, []);


  // const playTick = React.useCallback(() => {
  //   const ctx = audioCtxRef.current;
  //   if (!ctx) return;
  //   const osc = ctx.createOscillator();
  //   const gain = ctx.createGain();

  //   osc.type = "sawtooth";      // edgy, retro [changeable] [web:71]
  //   osc.frequency.value = 1500; // bright [changeable] [web:44]

  //   gain.gain.value = 0.0001;
  //   osc.connect(gain);
  //   gain.connect(ctx.destination);

  //   const now = ctx.currentTime;
  //   gain.gain.setValueAtTime(0.0001, now);
  //   gain.gain.exponentialRampToValueAtTime(0.018, now + 0.004); // quick attack [changeable]
  //   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07); // short decay [changeable]

  //   osc.start(now);
  //   osc.stop(now + 0.09);
  // }, []);

  const playTick = React.useCallback(() => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";            // pure, round body [changeable] [web:71]
    osc.frequency.value = 600;    // deeper pitch [changeable] [web:44]

    gain.gain.value = 0.0001;
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.02, now + 0.004);  // firm attack for punch [changeable] [web:44]
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.095); // medium-long decay [changeable] [web:44]

    osc.start(now);
    osc.stop(now + 0.12);
  }, []);




  React.useEffect(() => {
    // comment out if you don't want sound on selection
    playTick();
  }, [selectedDay, playTick]);

  // Optional: ticks during scroll when center changes
  const lastTickIndexRef = React.useRef(null);
  const throttleRef = React.useRef(null);
  const onScroll = () => {
    if (!railRef.current) return;
    const rail = railRef.current;
    const rect = rail.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    let bestIdx = 0;
    let bestDist = Infinity;
    days.forEach((d, i) => {
      const el = btnRefs.current[d];
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mid = r.left + r.width / 2;
      const dist = Math.abs(mid - centerX);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });
    if (lastTickIndexRef.current !== bestIdx) {
      if (!throttleRef.current) {
        playTick();
        lastTickIndexRef.current = bestIdx;
        throttleRef.current = window.setTimeout(() => {
          throttleRef.current = null;
        }, 90);
      }
    }
  };

  return (
    <section className="py-16 sm:py-24 px-4 bg-stone-50" id="menu">
      <h2 className="text-stone-900 text-4xl font-bold leading-tight tracking-tight text-center mb-12">
        This Week&apos;s Menu
      </h2>

      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center border-b border-stone-200 mb-8">
          <div
            ref={railRef}
            onPointerDown={initAudio}        // enable audio on first interaction
            onScroll={onScroll}               // remove if you don't want ticks on scroll
            className="
              flex gap-1.5 overflow-x-auto scroll-smooth snap-x snap-mandatory
              [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              px-4 sm:px-6 overscroll-x-contain
            "
            style={{ scrollPaddingInline: "24px" }}
            role="tablist"
            aria-label="Select day"
          >
            {days.map((day) => (
              <button
                key={day}
                ref={(el) => (btnRefs.current[day] = el)}
                onClick={() => setSelectedDay(day)}
                className={`
                  relative flex flex-col items-center justify-center px-6 pb-3 pt-2
                  text-stone-500 transition-colors snap-center cursor-pointer
                  after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                  after:h-[2px] after:w-[0%] after:rounded-full after:transition-all after:duration-300
                  ${day === selectedDay
                    ? "text-[#ec6d13] after:bg-[#ec6d13] after:w-[60%]"
                    : "hover:text-[#ec6d13] hover:after:bg-[#ec6d13]/50 hover:after:w-[60%]"
                  }
                `}
                role="tab"
                aria-selected={day === selectedDay}
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

export default Menu;
