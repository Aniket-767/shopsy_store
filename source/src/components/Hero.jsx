import { useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const slides = [
  {
    label: "THE NEW SEASON IS HERE",
    title: (
      <>
        Up to 50% off on
        <br /> all Men’s Wear
      </>
    ),
    description:
      "Everyday essentials, elevated. Discover styles made for your everyday.",
    button: "Shop Men’s Collection",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    discount: "50%",
    action: "men",
  },
  {
    label: "FRESH LOOKS, FRESH FEELING",
    title: (
      <>
        30% off on all
        <br /> Women’s Wear
      </>
    ),
    description:
      "Find your next favourite outfit from our latest collection.",
    button: "Explore Women’s Wear",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
    discount: "30%",
    action: "women",
  },
  {
    label: "LIMITED TIME OFFER",
    title: (
      <>
        70% off on all
        <br /> Products Sale
      </>
    ),
    description:
      "Good style. Great prices. Your next look is waiting for you.",
    button: "Shop the Sale",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
    discount: "70%",
    action: "sale",
  },
];

function Hero({ onShopClick, onSaleClick }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const currentSlide = slides[activeSlide];

  function nextSlide() {
    setActiveSlide((current) => (current + 1) % slides.length);
  }

  function previousSlide() {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length,
    );
  }

  function handleSlideAction() {
    if (currentSlide.action === "sale") {
      onSaleClick?.();
      return;
    }

    if (currentSlide.action === "men") {
      onShopClick?.("Men’s Fashion");
      return;
    }

    if (currentSlide.action === "women") {
      onShopClick?.("Women’s Fashion");
    }
  }

  return (
    <section id="home" className="overflow-hidden bg-[#fff4df]">
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 md:min-h-[520px] md:grid-cols-2 md:py-14">
        {/* Text content */}
        <div className="relative z-10">
          <p className="mb-5 text-xs font-bold tracking-[2px] text-amber-800">
            {currentSlide.label}
          </p>

          <h1 className="text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {currentSlide.title}
          </h1>

          <p className="mt-5 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
            {currentSlide.description}
          </p>

          <button
            type="button"
            onClick={handleSlideAction}
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-amber-400 px-6 py-3.5 text-sm font-bold text-gray-900 transition hover:bg-amber-500"
          >
            {currentSlide.button}
            <ArrowRight size={18} />
          </button>

          {/* Slide indicators */}
          <div className="mt-9 flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.label}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Show slide ${index + 1}`}
                aria-pressed={activeSlide === index}
                className={`h-1.5 rounded-full transition-all ${
                  activeSlide === index
                    ? "w-9 bg-amber-500"
                    : "w-4 bg-amber-200"
                }`}
              />
            ))}

            <span className="ml-2 text-xs text-gray-500">
              0{activeSlide + 1} / 0{slides.length}
            </span>
          </div>
        </div>

        {/* Fashion image */}
        <div className="relative mx-auto flex w-full max-w-lg items-center justify-center md:h-full">
          <div className="absolute h-64 w-64 rounded-full bg-amber-200 sm:h-80 sm:w-80 lg:h-96 lg:w-96" />

          <img
            src={currentSlide.image}
            alt="Fashion collection"
            className="relative z-10 h-[320px] w-full rounded-t-[48%] object-cover object-top sm:h-[400px] md:h-[440px]"
          />

          {/* Discount badge */}
          <div className="absolute right-0 top-5 z-20 rotate-6 rounded-2xl bg-white px-5 py-4 text-center shadow-lg sm:right-2">
            <p className="text-[10px] font-bold tracking-widest text-gray-500">
              UP TO
            </p>

            <p className="text-3xl font-black text-amber-500">
              {currentSlide.discount}
            </p>

            <p className="text-xs font-bold text-gray-900">
              OFF
            </p>
          </div>
        </div>

        {/* Previous button */}
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow transition hover:bg-amber-100 md:block"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Next button */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow transition hover:bg-amber-100 md:block"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}

export default Hero;