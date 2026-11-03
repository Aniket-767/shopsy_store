import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import CartDrawer from "./components/CartDrawer";
import Wishlist from "./components/Wishlist";
import Checkout from "./components/Checkout";
import OrderHistory from "./components/OrderHistory";
import Sale from "./components/Sale";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function getStoredData(key) {
  try {
    const savedData = localStorage.getItem(key);

    if (!savedData) return [];

    const parsedData = JSON.parse(savedData);
    return Array.isArray(parsedData) ? parsedData : [];
  } catch {
    return [];
  }
}

function saveStoredData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Unable to save ${key} to localStorage:`, error);
  }
}

function App() {
  const [cartItems, setCartItems] = useState(() =>
    getStoredData("shopsy-cart"),
  );

  const [wishlist, setWishlist] = useState(() =>
    getStoredData("shopsy-wishlist"),
  );

  const [orders, setOrders] = useState(() =>
    getStoredData("shopsy-orders"),
  );

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("shop");
  const [orderDetails, setOrderDetails] = useState(null);
  const [shopSearch, setShopSearch] = useState("");

  useEffect(() => {
    saveStoredData("shopsy-cart", cartItems);
  }, [cartItems]);

  useEffect(() => {
    saveStoredData("shopsy-wishlist", wishlist);
  }, [wishlist]);

  useEffect(() => {
    saveStoredData("shopsy-orders", orders);
  }, [orders]);

  function toggleWishlist(product) {
    setWishlist((currentWishlist) => {
      const alreadySaved = currentWishlist.some(
        (item) => item.id === product.id,
      );

      return alreadySaved
        ? currentWishlist.filter((item) => item.id !== product.id)
        : [...currentWishlist, product];
    });
  }

  function addToCart(product, quantity = 1) {
    if (!product || !Number.isFinite(quantity) || quantity < 1) return;

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...currentItems, { ...product, quantity }];
    });

    setIsCartOpen(true);
  }

  function removeFromCart(productId) {
    setCartItems((items) =>
      items.filter((item) => item.id !== productId),
    );
  }

  function changeQuantity(productId, change) {
    setCartItems((items) =>
      items.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + change),
            }
          : item,
      ),
    );
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0,
  );

  function handlePlaceOrder(order) {
    if (!order || !order.customer || cartItems.length === 0) return;

    const completedOrder = {
      ...order,
      items: cartItems.map((item) => ({ ...item })),
      orderId: `SHOP${Date.now().toString().slice(-8)}`,
      orderDate: new Date().toISOString(),
      status: "Placed",
    };

    setOrderDetails(completedOrder);
    setOrders((previousOrders) => [
      completedOrder,
      ...previousOrders,
    ]);
    setCartItems([]);
    setIsCartOpen(false);
    setCurrentPage("success");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelOrder(orderId) {
    setOrders((previousOrders) =>
      previousOrders.map((order) => {
        if (order.orderId !== orderId) return order;

        const currentStatus = String(order.status || "Placed").toLowerCase();

        // Only orders that have not progressed beyond Placed can be cancelled.
        if (currentStatus !== "placed") return order;

        return {
          ...order,
          status: "Cancelled",
          cancellationDate: new Date().toISOString(),
        };
      }),
    );
  }

  function openSale() {
    setCurrentPage("sale");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openHome() {
    setShopSearch("");
    setCurrentPage("shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openShop(searchTerm = "") {
    const safeSearchTerm =
      typeof searchTerm === "string" ? searchTerm : "";

    setShopSearch(safeSearchTerm);
    setCurrentPage("shop");

    if (safeSearchTerm.trim()) {
      window.setTimeout(() => {
        document.getElementById("products")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function openSection(sectionId) {
    setCurrentPage("shop");

    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  }

  function openAbout() {
    openSection("about");
  }

  function openContact() {
    openSection("contact");
  }

  function continueShopping() {
    setCurrentPage("shop");
    setShopSearch("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setCurrentPage("wishlist")}
        onOrdersClick={() => setCurrentPage("orders")}
        onSaleClick={openSale}
        onHomeClick={openHome}
        onShopClick={openShop}
        onAboutClick={openAbout}
        onContactClick={openContact}
      />

      {currentPage === "shop" && (
        <>
          <Hero
            onShopClick={openShop}
            onSaleClick={openSale}
          />

          <ProductGrid
            searchTerm={shopSearch}
            onAddToCart={addToCart}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
          />

          <About />
          <Contact />
        </>
      )}

      {currentPage === "sale" && (
        <Sale
          onAddToCart={addToCart}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
        />
      )}

      {currentPage === "wishlist" && (
        <Wishlist
          wishlist={wishlist}
          onRemoveFromWishlist={toggleWishlist}
          onAddToCart={addToCart}
          onContinueShopping={continueShopping}
        />
      )}

      {currentPage === "orders" && (
        <OrderHistory
          orders={orders}
          onCancelOrder={handleCancelOrder}
          onContinueShopping={continueShopping}
        />
      )}

      {currentPage === "checkout" && (
        <Checkout
          cartItems={cartItems}
          onBack={() => {
            setCurrentPage("shop");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {currentPage === "success" && orderDetails && (
        <main className="mx-auto max-w-xl px-4 py-20 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600">
            ✓
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Order Placed Successfully!
          </h1>

          <p className="mt-3 text-gray-600">
            Thank you, {orderDetails.customer.fullName}.
          </p>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 text-left">
            <p className="text-sm text-gray-500">Demo Order ID</p>
            <p className="mt-1 font-bold">{orderDetails.orderId}</p>

            <div className="mt-4 flex justify-between gap-4">
              <span className="text-gray-600">Total</span>
              <span className="font-bold">
                ₹{orderDetails.total.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="mt-4 flex justify-between gap-4 text-sm">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium">
                {{
                  cod: "Cash on Delivery",
                  upi: "UPI (Demo)",
                  card: "Card (Demo)",
                }[orderDetails.paymentMethod] || "Not selected"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={continueShopping}
            className="mt-7 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
          >
            Continue Shopping
          </button>

          <p className="mt-4 text-xs text-gray-500">
            Frontend demo only — no real order or payment.
          </p>
        </main>
      )}

      <Footer
        onHomeClick={openHome}
        onShopClick={() => openShop("")}
        onAboutClick={openAbout}
        onContactClick={openContact}
      />

      {isCartOpen && (
        <CartDrawer
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onRemove={removeFromCart}
          onChangeQuantity={changeQuantity}
          onCheckout={() => {
            if (cartItems.length === 0) return;

            setIsCartOpen(false);
            setCurrentPage("checkout");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </div>
  );
}

export default App;