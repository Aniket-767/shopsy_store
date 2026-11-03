import { useEffect, useState } from "react";
import {
  X,
  Star,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";

import ProductReviews from "./ProductReviews";

function ProductDetailsModal({
  product,
  onClose,
  onAddToCart,
}) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const price = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice) || 0;
  const totalPrice = price * quantity;

  const formatPrice = (value) =>
    `₹${value.toLocaleString("en-IN")}`;

  function handleAddToCart() {
    if (price <= 0 || typeof onAddToCart !== "function") return;

    onAddToCart(product, quantity);
    onClose?.();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-title"
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow transition hover:bg-gray-100"
        >
          <X size={22} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex min-h-72 items-center justify-center bg-gray-50 p-8">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-80 w-full object-contain"
            />
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
              {product.category}
            </p>

            <h2
              id="product-title"
              className="mt-3 text-2xl font-black text-gray-900"
            >
              {product.name}
            </h2>

            <div className="mt-3 flex items-center gap-2">
              <Star
                size={18}
                className="fill-amber-400 text-amber-400"
              />

              <span className="font-semibold">
                {product.rating ?? "N/A"}
              </span>

              <span className="text-sm text-gray-500">
                ({Number(product.reviews) || 0} reviews)
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-black text-gray-900">
                {formatPrice(price)}
              </span>

              {originalPrice > price && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>

            <p className="mt-5 leading-7 text-gray-600">
              {product.description ||
                `Discover our ${product.name.toLowerCase()}, part of our ${product.category.toLowerCase()} collection. A great addition to your everyday style.`}
            </p>

            <div className="mt-7">
              <p className="mb-3 text-sm font-semibold text-gray-800">
                Quantity
              </p>

              <div className="flex w-fit items-center rounded-lg border border-gray-200">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() =>
                    setQuantity((current) =>
                      Math.max(1, current - 1)
                    )
                  }
                  className="p-3 transition hover:bg-gray-100 disabled:opacity-40"
                >
                  <Minus size={16} />
                </button>

                <span className="min-w-10 text-center font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() =>
                    setQuantity((current) => current + 1)
                  }
                  className="p-3 transition hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={price <= 0}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-4 font-bold text-gray-900 transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingCart size={20} />
              Add to Cart · {formatPrice(totalPrice)}
            </button>
          </div>
        </div>

        <div className="border-t border-gray-100 p-5 sm:p-8">
          <ProductReviews
            key={product.id}
            productId={product.id}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsModal;