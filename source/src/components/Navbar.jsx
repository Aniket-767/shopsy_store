import { useState } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";

function Navbar({
  cartCount = 0,
  onCartClick,
  onWishlistClick,
  onOrdersClick,
  onSaleClick,
  onHomeClick,
  onShopClick,
  onAboutClick,
  onContactClick,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { label: "Home", action: onHomeClick },
    { label: "Shop", action: () => onShopClick?.("") },
    { label: "Sale", action: onSaleClick },
    { label: "About", action: onAboutClick },
    { label: "Contact", action: onContactClick },
    { label: "Wishlist", action: () => handleNavigation(onWishlistClick) },
    { label: "Order History", action: () => handleNavigation(onOrdersClick) },
  ];

  function handleSearch(event) {
    event.preventDefault();

    const searchValue = search.trim();

    if (typeof onShopClick === "function") {
      onShopClick(searchValue);
    }

    closeMenu();
  }

  function handleNavigation(action) {
    if (typeof action === "function") {
      action();
    }

    closeMenu();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-4">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavigation(onHomeClick)}
          className="shrink-0 text-3xl font-black tracking-tight"
          aria-label="Shopsy home"
        >
          Shopsy<span className="text-amber-500">.</span>
        </button>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 lg:flex"
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavigation(item.action)}
              className="text-sm font-medium text-gray-700 px-3 py-2 rounded-xl hover:bg-gray-100 hover:text-amber-500 transition duration-200"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          role="search"
          className="ml-auto hidden items-center gap-2 rounded-full bg-gray-100 px-4 py-2 sm:flex"
        >
          <Search size={18} className="shrink-0 text-gray-500" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="w-36 bg-transparent text-sm outline-none lg:w-44"
          />

          
        </form>

        {/* Cart */}
        <button
          type="button"
          onClick={onCartClick}
          aria-label={`Shopping cart, ${cartCount} items`}
          className="relative rounded-full p-2 text-gray-700 transition hover:bg-amber-50"
        >
          <ShoppingCart size={22} />

          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-xs font-bold text-gray-900">
              {cartCount}
            </span>
          )}
        </button>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 lg:hidden"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="grid gap-1 border-t border-gray-100 px-6 py-4 lg:hidden"
        >
          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            role="search"
            className="mb-3 flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-3"
          >
            <Search size={18} className="shrink-0 text-gray-500" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />

            <button
              type="submit"
              className="rounded-lg bg-orange-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-orange-700"
            >
              Search
            </button>
          </form>

          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavigation(item.action)}
              className="w-full py-2 text-left text-sm font-medium text-gray-700 transition hover:text-orange-600"
            >
              {item.label}
            </button>
          ))}

        </nav>
      )}
    </header>
  );
}

export default Navbar;
