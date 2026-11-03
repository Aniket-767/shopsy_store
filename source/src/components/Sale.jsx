import { useState } from "react";
import { Tag } from "lucide-react";
import ProductCard from "./ProductCard";
import ProductDetailsModal from "./ProductDetailsModal";
import { products } from "../data/products";

function Sale({ onAddToCart, wishlist = [], onToggleWishlist }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const saleProducts = products.filter(
    (product) => product.originalPrice > product.price,
  );

  return (
    <section className="min-h-screen bg-gray-50 px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 rounded-3xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-12 text-center text-gray-900 sm:px-12">
          <Tag size={38} className="mx-auto mb-4" />

          <p className="text-sm font-bold uppercase tracking-[0.2em]">
            Shopsy Special Offers
          </p>

          <h1 className="mt-3 text-4xl font-black sm:text-5xl">
            Sale Is Live!
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base">
            Discover your favourites at special prices. Shop now and save on
            selected products.
          </p>

          <p className="mt-5 font-bold">
            {saleProducts.length} products on offer
          </p>
        </div>

        <div className="mb-7">
          <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">
            Deals You Don't Want to Miss
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Limited-time style, everyday value.
          </p>
        </div>

        {saleProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {saleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onViewDetails={setSelectedProduct}
                isWishlisted={wishlist.some(
                  (item) => item.id === product.id,
                )}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
            <h3 className="text-lg font-bold text-gray-900">
              No sale products right now
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Check back when new offers become available.
            </p>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
}

export default Sale;