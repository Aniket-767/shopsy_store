import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "./ProductCard";
import ProductDetailsModal from "./ProductDetailsModal";
import { products } from "../data/products";

function ProductGrid({
  searchTerm = "",
  onAddToCart,
  wishlist = [],
  onToggleWishlist,
}) {
  const normalizedSearchTerm =
    typeof searchTerm === "string" ? searchTerm : "";

  const [search, setSearch] = useState(normalizedSearchTerm);
  const [previousSearchTerm, setPreviousSearchTerm] =
    useState(normalizedSearchTerm);

  // Update local search only when the parent search term changes.
  if (normalizedSearchTerm !== previousSearchTerm) {
    setPreviousSearchTerm(normalizedSearchTerm);
    setSearch(normalizedSearchTerm);
  }

  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products
    .filter((product) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;

      return a.id - b.id;
    });

  function resetFilters() {
    setSearch("");
    setCategory("All");
    setSortBy("featured");
  }

  return (
    <section id="products" className="px-5 py-16 sm:px-8 lg:px-12 bg-sky-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
            Handpicked for you
          </p>

          <h2 className="mt-2 text-3xl font-black text-gray-900 sm:text-4xl">
            Trending Products
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Discover your next favourite item.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_auto]">
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 focus-within:border-amber-400">
            <Search size={20} className="shrink-0 text-gray-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products or categories..."
              aria-label="Search products"
              className="w-full bg-transparent text-sm outline-none"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="text-gray-400 hover:text-gray-900"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 bg-white">
            <SlidersHorizontal size={18} className="shrink-0 text-gray-500" />

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Filter by category"
              className="w-full py-3 px-4 text-sm outline-none rounded-xl"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All categories" : item}
                </option>
              ))}
            </select>
          </div>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort products"
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-sm text-gray-500" aria-live="polite">
            Showing {filteredProducts.length} of {products.length} products
          </p>

          {(search || category !== "All" || sortBy !== "featured") && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-semibold text-amber-700 hover:text-amber-900"
            >
              Reset filters
            </button>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onViewDetails={setSelectedProduct}
                isWishlisted={wishlist.some(
                  (item) => item.id === product.id
                )}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 px-5 py-16 text-center">
            <Search size={36} className="mx-auto text-gray-300" />

            <h3 className="mt-4 text-lg font-bold text-gray-900">
              No products found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try another search term or choose a different category.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-full bg-amber-400 px-5 py-3 text-sm font-bold hover:bg-amber-500"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductDetailsModal
          key={selectedProduct.id}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
}

export default ProductGrid;