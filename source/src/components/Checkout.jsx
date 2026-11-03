import { useState } from "react";
import {
  ArrowLeft,
  ShoppingBag,
  Truck,
  ShieldCheck,
} from "lucide-react";

function Checkout({ cartItems = [], onBack, onPlaceOrder }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [error, setError] = useState("");

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  );

  const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 49;
  const total = subtotal + shipping;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (cartItems.length === 0) {
      setError("Your cart is empty. Add products before checkout.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      setError("Enter a valid 6-digit PIN code.");
      return;
    }

    if (typeof onPlaceOrder === "function") {
      onPlaceOrder({
        customer: formData,
        items: cartItems,
        subtotal,
        shipping,
        total,
        paymentMethod,
      });
    }
  }

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

  const labelClass =
    "mb-2 block text-sm font-medium text-gray-700";

  const paymentMethods = [
    {
      id: "cod",
      label: "Cash on Delivery",
      detail: "Pay when your order arrives",
    },
    {
      id: "upi",
      label: "UPI",
      detail: "Google Pay, PhonePe, or another UPI app",
    },
    {
      id: "card",
      label: "Credit / Debit Card",
      detail: "Demo selection only",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </button>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
            Shopsy Checkout
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Complete Your Order
          </h1>

          <p className="mt-2 text-gray-500">
            Enter your delivery details and review your order.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3"
        >
          {/* Left column: Delivery and Payment */}
          <div className="space-y-8 lg:col-span-2">
            {/* Delivery form */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                  <Truck size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Shipping Address
                  </h2>
                  <p className="text-sm text-gray-500">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className={labelClass}>
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    minLength={2}
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Mobile Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    required
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address" className={labelClass}>
                    Full Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    autoComplete="street-address"
                    required
                    minLength={10}
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House number, street, area, landmark"
                    className={`${inputClass} resize-y`}
                  />
                </div>

                <div>
                  <label htmlFor="city" className={labelClass}>
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Your city"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="state" className={labelClass}>
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    autoComplete="address-level1"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Your state"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="pincode" className={labelClass}>
                    PIN Code
                  </label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit PIN code"
                    className={inputClass}
                  />
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              <div className="mt-6 flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                <ShieldCheck
                  size={21}
                  className="mt-0.5 shrink-0 text-green-600"
                />

                <p className="text-sm text-gray-600">
                  Your information is used here for this checkout demo only.
                  No real payment will be processed.
                </p>
              </div>
            </section>

            {/* Payment method */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Payment Method
              </h2>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                      paymentMethod === method.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="mt-1 accent-orange-600"
                    />

                    <span>
                      <span className="block font-semibold text-gray-900">
                        {method.label}
                      </span>

                      <span className="mt-1 block text-sm text-gray-500">
                        {method.detail}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Right column: Order Summary */}
          <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-6">
            <div className="mb-6 flex items-center gap-3">
              <ShoppingBag size={22} className="text-orange-600" />

              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>
            </div>

            <div className="mb-5 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Your cart is empty.
                </p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-800">
                        {item.name}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="shrink-0 font-semibold text-gray-900">
                      ₹
                      {(
                        Number(item.price || 0) *
                        Number(item.quantity || 0)
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-3 border-t border-gray-200 pt-5 text-sm">
              <div className="flex justify-between gap-3 text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between gap-3 text-gray-600">
                <span>Shipping</span>
                <span>
                  {shipping === 0
                    ? "Free"
                    : `₹${shipping.toLocaleString("en-IN")}`}
                </span>
              </div>

              <div className="flex justify-between gap-3 border-t border-gray-200 pt-4 text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Free shipping on orders of ₹999 or more.
            </p>

            <button
              type="submit"
              disabled={cartItems.length === 0}
              className="mt-6 w-full rounded-xl bg-orange-600 px-5 py-3.5 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Place Order
            </button>

            <p className="mt-3 text-center text-xs text-gray-500">
              Demo checkout · No payment required
            </p>
          </aside>
        </form>
      </div>
    </div>
  );
}

export default Checkout;