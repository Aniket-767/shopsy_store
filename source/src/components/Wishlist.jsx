import { Heart, ShoppingBag, Trash2 } from "lucide-react";

function Wishlist({
  wishlist = [],
  onRemoveFromWishlist,
  onAddToCart,
  onContinueShopping,
}) {
  const safeWishlist = Array.isArray(wishlist) ? wishlist : [];

  const formatPrice = (price) =>
    `₹${(Number(price) || 0).toLocaleString("en-IN")}`;

  return (
    <section className="min-h-[60vh] px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
            Your favourites
          </p>

          <h1 className="mt-2 text-3xl font-black text-gray-900 sm:text-4xl">
            My Wishlist
          </h1>

          <p className="mt-2 text-gray-500">
            {safeWishlist.length === 0
              ? "Your favourite products will appear here."
              : `${safeWishlist.length} saved ${
                  safeWishlist.length === 1 ? "product" : "products"
                }`}
          </p>
        </div>

        {/* Empty wishlist */}
        {safeWishlist.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 px-5 py-16 text-center">
            <Heart size={48} className="mx-auto text-gray-300" />

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Your wishlist is empty
            </h2>

            <p className="mt-2 text-gray-500">
              Save products you love and find them here later.
            </p>

            <button
              type="button"
              onClick={onContinueShopping}
              className="mt-6 rounded-full bg-amber-400 px-6 py-3 font-bold text-gray-900 transition hover:bg-amber-500"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Wishlist products */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {safeWishlist.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:shadow-lg"
              >
                {/* Product image */}
                <div className="relative flex h-56 items-center justify-center bg-gray-50 p-5">
                  <img
                    src={product.image}
                    alt={product.name || "Wishlist product"}
                    className="h-full w-full object-contain"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      onRemoveFromWishlist?.(product)
                    }
                    aria-label={`Remove ${product.name} from wishlist`}
                    className="absolute right-3 top-3 rounded-full bg-white p-2 text-red-500 shadow transition hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Product information */}
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {product.category || "General"}
                  </p>

                  <h2 className="mt-2 font-bold text-gray-900">
                    {product.name || "Product"}
                  </h2>

                  <p className="mt-3 text-xl font-black text-gray-900">
                    {formatPrice(product.price)}
                  </p>

                  {Number(product.originalPrice) > Number(product.price) && (
                    <p className="mt-1 text-sm text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </p>
                  )}

                  {/* Product actions */}
                  <div className="mt-4 flex">
                    <button
                      type="button"
                      onClick={() => onAddToCart?.(product)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-400 px-3 py-3 text-sm font-bold text-gray-900 transition hover:bg-amber-500"
                    >
                      <ShoppingBag size={17} />
                      Add to Cart
                    </button>

                    
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Wishlist;