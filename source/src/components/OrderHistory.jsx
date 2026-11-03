import { useState } from "react";
import { Package, XCircle, CheckCircle } from "lucide-react";

function OrderHistory({
  orders = [],
  onContinueShopping,
  onCancelOrder,
}) {
  const safeOrders = Array.isArray(orders) ? orders : [];

  const [confirmingOrderId, setConfirmingOrderId] = useState(null);

  const formatPrice = (price) =>
    `₹${(Number(price) || 0).toLocaleString("en-IN")}`;

  const formatDate = (date) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  function confirmCancellation(orderId) {
    if (typeof onCancelOrder !== "function") return;

    onCancelOrder(orderId);
    setConfirmingOrderId(null);
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">
          My Orders
        </h1>

        <p className="mt-2 text-gray-500">
          View and manage your previous Shopsy demo orders.
        </p>

        {safeOrders.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-10 text-center">
            <Package size={44} className="mx-auto text-gray-300" />

            <h2 className="mt-4 text-xl font-semibold">
              No orders yet
            </h2>

            <p className="mt-2 text-gray-500">
              Your completed orders will appear here.
            </p>

            <button
              type="button"
              onClick={onContinueShopping}
              className="mt-6 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {safeOrders.map((order, orderIndex) => {
              const items = Array.isArray(order.items)
                ? order.items
                : [];

              const orderId =
                order.orderId || `ORDER-${orderIndex + 1}`;

              const status = String(
                order.status || "Placed",
              );

              const normalizedStatus = status.toLowerCase();

              const isCancelled = normalizedStatus === "cancelled";
              const canCancel = normalizedStatus === "placed";

              const statuses = [
                "Placed",
                "Processing",
                "Shipped",
                "Delivered",
              ];

              const currentStatusIndex = statuses.findIndex(
                (item) => item.toLowerCase() === normalizedStatus,
              );

              return (
                <article
                  key={orderId}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="flex flex-wrap justify-between gap-3 border-b border-gray-100 pb-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Order ID
                      </p>

                      <p className="font-bold text-gray-900">
                        {orderId}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Order Date
                      </p>

                      <p className="font-medium text-gray-800">
                        {formatDate(order.orderDate)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h3 className="mb-4 font-semibold text-gray-800">
                      Order Status
                    </h3>

                    {isCancelled ? (
                      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                        <div className="flex items-center gap-3">
                          <XCircle
                            size={26}
                            className="shrink-0 text-red-600"
                          />

                          <div>
                            <p className="font-bold text-red-700">
                              Order Cancelled
                            </p>

                            <p className="mt-1 text-sm text-red-600">
                              This order has been cancelled.
                            </p>
                          </div>
                        </div>

                        {order.cancellationDate && (
                          <p className="mt-3 text-xs text-red-600">
                            Cancelled on:{" "}
                            {formatDate(order.cancellationDate)}
                          </p>
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-4 gap-2">
                          {statuses.map((step, index) => {
                            const completed =
                              currentStatusIndex >= index;

                            return (
                              <div key={step} className="text-center">
                                <div
                                  className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                                    completed
                                      ? "bg-green-600 text-white"
                                      : "bg-gray-200 text-gray-500"
                                  }`}
                                >
                                  {completed ? (
                                    <CheckCircle size={17} />
                                  ) : (
                                    index + 1
                                  )}
                                </div>

                                <p
                                  className={`mt-2 text-xs font-medium sm:text-sm ${
                                    completed
                                      ? "text-green-700"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {step}
                                </p>
                              </div>
                            );
                          })}
                        </div>

                        <p className="mt-4 text-sm text-gray-500">
                          Current status:{" "}
                          <span className="font-semibold text-green-700">
                            {status}
                          </span>
                        </p>
                      </>
                    )}
                  </div>

                  <div className="space-y-3 border-t border-gray-100 py-5">
                    <h3 className="font-semibold text-gray-800">
                      Ordered Products
                    </h3>

                    {items.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        Product details unavailable.
                      </p>
                    ) : (
                      items.map((item, index) => (
                        <div
                          key={item.id ?? index}
                          className="flex justify-between gap-4 text-sm"
                        >
                          <span className="text-gray-700">
                            {item.name || "Product"} ×{" "}
                            {Number(item.quantity) || 1}
                          </span>

                          <span className="shrink-0 font-medium text-gray-900">
                            {formatPrice(
                              (Number(item.price) || 0) *
                                (Number(item.quantity) || 1),
                            )}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex flex-wrap justify-between gap-3 border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Payment Method
                      </p>

                      <p className="font-medium text-gray-800">
                        {{
                          cod: "Cash on Delivery",
                          upi: "UPI (Demo)",
                          card: "Card (Demo)",
                        }[order.paymentMethod] || "Not specified"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        Total Amount
                      </p>

                      <p className="text-lg font-bold text-orange-600">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>

                  {canCancel && (
                    <div className="mt-5 border-t border-gray-100 pt-5">
                      {confirmingOrderId === orderId ? (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                          <p className="font-semibold text-red-800">
                            Are you sure you want to cancel this order?
                          </p>

                          <p className="mt-1 text-sm text-red-600">
                            This action cannot be undone.
                          </p>

                          <div className="mt-4 flex flex-wrap gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                confirmCancellation(orderId)
                              }
                              className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                            >
                              Yes, Cancel Order
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setConfirmingOrderId(null)
                              }
                              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                            >
                              Keep Order
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setConfirmingOrderId(orderId)
                          }
                          className="flex items-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <XCircle size={18} />
                          Cancel Order
                        </button>
                      )}
                    </div>
                  )}

                  {isCancelled && (
                    <p className="mt-5 border-t border-gray-100 pt-4 text-sm font-medium text-red-600">
                      This order can no longer be cancelled again.
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {safeOrders.length > 0 && (
          <button
            type="button"
            onClick={onContinueShopping}
            className="mt-7 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
          >
            Continue Shopping
          </button>
        )}
      </div>
    </main>
  );
}

export default OrderHistory;