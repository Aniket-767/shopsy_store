import { useEffect } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

function formatPrice(value) {
  return `₹${(Number(value) || 0).toLocaleString("en-IN")}`;
}

function CartDrawer({
  cartItems = [],
  onClose,
  onRemove,
  onChangeQuantity,
  onCheckout,
}) {
  const safeItems = Array.isArray(cartItems) ? cartItems : [];

  useEffect(() => {
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
  }, [onClose]);

  const subtotal = safeItems.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Math.max(0, Number(item.quantity) || 0);

    return total + price * quantity;
  }, 0);

  const totalItems = safeItems.reduce(
    (total, item) => total + Math.max(0, Number(item.quantity) || 0),
    0,
  );

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close shopping cart"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-black/40"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl rounded-2xl  "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Your Shopping Cart
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Products */}
        <div className="flex-1 overflow-y-auto p-5">
          {safeItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag size={52} className="text-gray-300" />

              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Your cart is empty
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Add something you love to get started.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-5 rounded-full bg-amber-400 px-6 py-3 font-semibold transition hover:bg-amber-500"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {safeItems.map((item) => {
                const quantity = Math.max(
                  1,
                  Number(item.quantity) || 1,
                );

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-gray-100 pb-5"
                  >
                    <img
                      src={item.image}
                      alt={item.name || "Shopping cart product"}
                      className="h-24 w-20 shrink-0 rounded-xl bg-gray-100 object-contain p-1"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-gray-900">
                        {item.name || "Product"}
                      </h3>

                      <p className="mt-1 font-bold text-gray-900">
                        {formatPrice(item.price)}
                      </p>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="flex items-center rounded-lg border border-gray-200">
                          <button
                            type="button"
                            aria-label={`Decrease ${item.name} quantity`}
                            disabled={quantity <= 1}
                            onClick={() =>
                              onChangeQuantity?.(item.id, -1)
                            }
                            className="p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="min-w-8 text-center text-sm font-medium">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            aria-label={`Increase ${item.name} quantity`}
                            onClick={() =>
                              onChangeQuantity?.(item.id, 1)
                            }
                            className="p-2 transition hover:bg-gray-100"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          type="button"
                          aria-label={`Remove ${item.name} from cart`}
                          onClick={() => onRemove?.(item.id)}
                          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>

                      <p className="mt-2 text-sm text-gray-500">
                        Item total:{" "}
                        {formatPrice(
                          (Number(item.price) || 0) * quantity,
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Subtotal and checkout */}
        {safeItems.length > 0 && (
          <div className="border-t bg-white p-5 rounded-b-2xl">
            <div className="flex justify-between text-lg font-bold">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Shipping and taxes are calculated at checkout.
            </p>

            <button
              type="button"
              onClick={onCheckout}
              disabled={subtotal <= 0}
              className="mt-5 w-full rounded-xl bg-amber-400 py-4 font-bold text-gray-900 transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Proceed to Checkout
            </button>

            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full py-2 text-sm font-semibold text-gray-600 transition hover:text-gray-900"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;