import {
  ShoppingBag,
  Heart,
  Mail,
  ArrowUp,
} from "lucide-react";

const CURRENT_YEAR = new Date().getFullYear();

function Footer({
  onHomeClick,
  onShopClick,
  onAboutClick,
  onContactClick,
}) {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const quickLinks = [
    { label: "Home", action: onHomeClick },
    { label: "Shop Products", action: onShopClick },
    { label: "About Us", action: onAboutClick },
    { label: "Contact Us", action: onContactClick },
  ];

  return (
    <footer className="bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <button
              type="button"
              onClick={onHomeClick || scrollToTop}
              className="flex items-center gap-2 text-2xl font-black"
            >
              <ShoppingBag className="text-amber-400" size={28} />
              Shopsy<span className="text-amber-400">.</span>
            </button>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
              Discover your favourite products in one convenient shopping
              experience.
            </p>

            <p className="mt-4 flex items-center gap-2 text-sm text-gray-400">
              Made with <Heart size={15} className="text-red-400" /> for
              shoppers.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-bold">Quick Links</h3>

            <ul className="space-y-3 text-sm text-gray-400">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={link.action}
                    className="transition hover:text-amber-400"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold">Categories</h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>Footwear</li>
              <li>Men's Fashion</li>
              <li>Women's Fashion</li>
              <li>Accessories</li>
              <li>Bags</li>
              <li>Electronics</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold">Stay Connected</h3>

            <p className="text-sm leading-6 text-gray-400">
              Have questions or feedback? Visit our contact section.
            </p>

            <button
              type="button"
              onClick={onContactClick}
              className="mt-4 flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-bold text-gray-950 transition hover:bg-amber-300"
            >
              <Mail size={17} />
              Contact Us
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-6 text-center text-xs text-gray-500 sm:flex-row sm:text-left">
          <p>© {CURRENT_YEAR} Shopsy. All rights reserved.</p>
          <p className="text-center text-sm">
              Designed & Developed by{" "}
              <span className="font-semibold text-orange-500">
                Aniket Bari
              </span>
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 transition hover:text-amber-400"
          >
            Back to top <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;