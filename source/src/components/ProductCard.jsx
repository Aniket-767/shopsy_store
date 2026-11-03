import { Heart, ShoppingCart, Star } from "lucide-react";

function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
  isWishlisted = false,
  onToggleWishlist,
}) {
  if (!product) return null;

  const formatPrice = (price) =>
    `₹${(Number(price) || 0).toLocaleString("en-IN")}`;

  const hasDiscount =
    Number(product.originalPrice) > Number(product.price);

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product image */}
      <div className="relative overflow-hidden bg-gray-100">
        <button
          type="button"
          onClick={() => onViewDetails?.(product)}
          className="block w-full cursor-pointer"
          aria-label={`View details for ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </button>

        {/* Sale badge */}
        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
            {product.discount}% OFF
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => onToggleWishlist?.(product)}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={isWishlisted}
          className="absolute right-3 top-3 rounded-full bg-white p-2 shadow transition hover:scale-110"
        >
          <Heart
            size={20}
            className={
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-500"
            }
          />
        </button>
      </div>

      {/* Product details */}
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {product.category}
        </p>

        <button
          type="button"
          onClick={() => onViewDetails?.(product)}
          className="mt-1 text-left text-lg font-bold text-gray-900 transition hover:text-amber-600"
        >
          {product.name}
        </button>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1 text-sm">
          <Star
            size={15}
            className="fill-amber-400 text-amber-400"
          />

          <span className="font-medium">
            {product.rating ?? "N/A"}
          </span>

          <span className="text-gray-400">
            ({Number(product.reviews) || 0} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>

          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          type="button"
          onClick={() => onAddToCart?.(product)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-400 hover:text-gray-900"
        >
          <ShoppingCart size={17} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;