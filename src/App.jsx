import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, CreditCard, History, KeyRound, LogOut, Menu, Minus, PackageCheck, Plus, Search, ShieldCheck, ShoppingBag, Trash2, Truck, UserRound, X } from "lucide-react";
import api from "./api";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider, useCart } from "./contexts/CartContext";
import "./App.css";

const money = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value || 0);

function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totals } = useCart();

  const nav = (
    <>
      <Link className="nav-link" to="/products">Shop</Link>
      <Link className="nav-link" to="/cart">Cart</Link>
      {user && <Link className="nav-link" to="/orders">Orders</Link>}
      {user ? (
        <button className="nav-link inline-flex items-center gap-2" onClick={logout}><LogOut size={16} /> Logout</button>
      ) : (
        <Link className="nav-link" to="/login">Login</Link>
      )}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-ink">
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 font-black tracking-wide">
            <span className="grid h-10 w-10 place-items-center rounded bg-ink text-white"><ShoppingBag size={20} /></span>
            MERN MART
          </Link>
          <nav className="hidden items-center gap-6 md:flex">{nav}</nav>
          <div className="flex items-center gap-3">
            {user && <span className="hidden text-sm text-stone-600 sm:inline">Hi, {user.name}</span>}
            <Link to="/cart" className="relative rounded-full border border-stone-300 p-2">
              <ShoppingBag size={19} />
              {totals.count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-xs font-bold text-white">{totals.count}</span>}
            </Link>
            <button className="rounded-full border border-stone-300 p-2 md:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={19} /></button>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <div className="ml-auto h-full w-72 bg-white p-5 shadow-xl">
            <button className="mb-8 ml-auto block rounded-full border p-2" onClick={() => setOpen(false)} aria-label="Close menu"><X size={18} /></button>
            <div className="grid gap-5 text-lg" onClick={() => setOpen(false)}>{nav}</div>
          </div>
        </div>
      )}
      <main className="flex-1">{children}</main>
      {/* <footer className="mt-16 border-t border-stone-200 bg-white py-8 text-center text-sm text-stone-500">Secure MERN eCommerce with JWT, MongoDB, Razorpay and Tailwind CSS.</footer> */}
      <footer className="border-t bg-white py-6 text-sm text-gray-600">
        <div className="container mx-auto flex flex-col items-center gap-4 px-4 md:flex-row md:justify-between">

          {/* Payment Section */}
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-700">Payment</span>

            <div className="flex items-center gap-2">
              <img src="https://img.icons8.com/color/48/visa.png" className="h-6" alt="Visa" />
              <img src="https://img.icons8.com/color/48/mastercard.png" className="h-6" alt="Mastercard" />
              <img src="https://img.icons8.com/color/48/amex.png" className="h-6" alt="Amex" />
              <img src="https://img.icons8.com/color/48/bank.png" className="h-6" alt="Net Banking" />
              <img src="https://img.icons8.com/color/48/cash-in-hand.png" className="h-6" alt="Cash on Delivery" />
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500">
            Copyright © {new Date().getFullYear()} MERN Mart. All Rights Reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-700">Connect</span>

            <div className="flex gap-3">
              <a href="#"><img src="https://img.icons8.com/ios-filled/24/facebook--v1.png" /></a>
              <a href="#"><img src="https://img.icons8.com/ios-filled/24/twitter.png" /></a>
              <a href="#"><img src="https://img.icons8.com/ios-filled/24/pinterest--v1.png" /></a>
              <a href="#"><img src="https://img.icons8.com/ios-filled/24/youtube-play.png" /></a>
              <a href="#"><img src="https://img.icons8.com/ios-filled/24/instagram-new.png" /></a>
              <a href="#"><img src="https://img.icons8.com/ios-filled/24/linkedin.png" /></a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

function Home() {
  return (
    <Layout>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-coral">Fresh drops every week</p>
            <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-6xl">Modern essentials for faster checkout.</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-stone-600">Explore the latest fashion collection, browse dynamic product variants, add your favorite styles to the cart, and enjoy a seamless, secure shopping experience with smooth authentication and fast Razorpay-powered checkout for a trusted purchase journey.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn-primary">Start shopping</Link>
              <Link to="/register" className="btn-secondary">Create account</Link>
            </div>
          </div>
          <img className="h-[420px] w-full rounded object-cover shadow-sm" src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80" alt="Modern retail store" />
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
        <Feature icon={<ShieldCheck />} title="Secure Authentication" text="Protected APIs for customers, orders, and account data using industry-standard JWT security." />
        <Feature icon={<Truck />} title="Quick & Secure Delivery" text="Quick & secure delivery ensuring fast, safe, and reliable shipping every time." />
        <Feature icon={<CreditCard />} title="Secure Payments" text="Seamless and secure payment integration with Razorpay for smooth checkout experience." />
      </section>
    </Layout>
  );
}

function Feature({ icon, title, text }) {
  return <div className="rounded border border-stone-200 bg-white p-5"><div className="mb-4 text-coral">{icon}</div><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm text-stone-600">{text}</p></div>;
}

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get("/products", { params: { search: query, category } })
      .then(({ data }) => {
        setProducts(data.products);
        setCategories(data.categories);
      })
      .finally(() => setLoading(false));
  }, [query, category]);

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-black">Products</h1>
            <p className="mt-2 text-stone-600">Filter, compare variants and add your favourites to cart.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative">
              <Search className="absolute left-3 top-3 text-stone-400" size={18} />
              <input className="input pl-10" placeholder="Search products" value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
            <select className="input" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="">All categories</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>
        {loading ? <p>Loading products...</p> : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        )}
      </section>
    </Layout>
  );
}

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.slug}`} className="group overflow-hidden rounded border border-stone-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <img className="aspect-[4/3] w-full object-cover" src={product.images?.[0]} alt={product.name} />
      <div className="p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-moss">{product.category}</p>
        <h2 className="mt-2 font-bold group-hover:text-coral">{product.name}</h2>
        <div className="mt-3 flex items-center gap-2">
          <span className="font-black">{money(product.discountPrice || product.price)}</span>
          {product.discountPrice && <span className="text-sm text-stone-400 line-through">{money(product.price)}</span>}
        </div>
      </div>
    </Link>
  );
}

function ProductDetails() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [selected, setSelected] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api.get(`/products/${slug}`).then(({ data }) => {
      setProduct(data);
      setSelected(data.variants?.[0] || null);
    });
  }, [slug]);

  if (!product) return <Layout><div className="mx-auto max-w-7xl px-4 py-12">Loading product...</div></Layout>;

  return (
    <Layout>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
        <img className="aspect-square w-full rounded object-cover" src={product.images?.[0]} alt={product.name} />
        <div>
          <p className="font-bold uppercase tracking-[0.2em] text-moss">{product.brand}</p>
          <h1 className="mt-3 text-4xl font-black">{product.name}</h1>
          <p className="mt-4 text-lg leading-8 text-stone-600">{product.description}</p>
          <div className="mt-6 flex items-center gap-3 text-2xl font-black">
            {money(selected?.price || product.discountPrice || product.price)}
            {product.discountPrice && <span className="text-base font-medium text-stone-400 line-through">{money(product.price)}</span>}
          </div>
          <div className="mt-8">
            <h3 className="font-bold">Choose variant</h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {product.variants.map((variant) => (
                <button key={`${variant.size}-${variant.color}`} className={`variant ${selected === variant ? "variant-active" : ""}`} onClick={() => setSelected(variant)}>
                  <span>{variant.size}</span><span>{variant.color}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex h-12 items-center rounded border border-stone-300 bg-white">
              <button className="px-4" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus size={16} /></button>
              <span className="w-8 text-center font-bold">{quantity}</span>
              <button className="px-4" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus size={16} /></button>
            </div>
            <button className="btn-primary" onClick={() => addItem(product, selected, quantity)}>Add to cart</button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function AuthPage({ mode }) {
  const isRegister = mode === "register";
  const { login, register, forgotPassword } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      if (mode === "forgot") {
        const { data } = await forgotPassword(form.email);
        setMessage(data.message);
        return;
      }
      if (isRegister) await register(form.name, form.email, form.password);
      else await login(form.email, form.password);
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout>
      <section className="mx-auto grid min-h-[70vh] max-w-7xl place-items-center px-4 py-10">
        <form className="w-full max-w-md rounded border border-stone-200 bg-white p-6 shadow-sm" onSubmit={submit}>
          <UserRound className="mb-4 text-coral" />
          <h1 className="text-2xl font-black">{mode === "forgot" ? "Forgot password" : isRegister ? "Create account" : "Welcome back"}</h1>
          {isRegister && <input className="input mt-6 w-full" placeholder="Full name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />}
          <input className="input mt-4 w-full" type="email" placeholder="Email address" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          {mode !== "forgot" && <input className="input mt-4 w-full" type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required minLength={6} />}
          {error && <p className="mt-4 rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          {message && <p className="mt-4 rounded bg-green-50 p-3 text-sm text-green-700">{message}</p>}
          <button className="btn-primary mt-6 w-full">{mode === "forgot" ? "Send reset link" : isRegister ? "Register" : "Login"}</button>
          <div className="mt-5 flex justify-between text-sm">
            <Link className="text-coral" to={isRegister ? "/login" : "/register"}>{isRegister ? "Login instead" : "Create account"}</Link>
            <Link className="text-stone-500" to="/forgot-password">Forgot password?</Link>
          </div>
        </form>
      </section>
    </Layout>
  );
}

function ResetPassword() {
  const { token } = useParams();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (passwords.password !== passwords.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(token, passwords.password);
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="mx-auto grid min-h-[70vh] max-w-7xl place-items-center px-4 py-10">
        <form className="w-full max-w-md rounded border border-stone-200 bg-white p-6 shadow-sm" onSubmit={submit}>
          <KeyRound className="mb-4 text-coral" />
          <h1 className="text-2xl font-black">Reset password</h1>
          <p className="mt-2 text-sm text-stone-600">Enter a new password for your account.</p>
          <input className="input mt-6 w-full" type="password" placeholder="New password" value={passwords.password} onChange={(event) => setPasswords({ ...passwords, password: event.target.value })} required minLength={6} />
          <input className="input mt-4 w-full" type="password" placeholder="Confirm password" value={passwords.confirmPassword} onChange={(event) => setPasswords({ ...passwords, confirmPassword: event.target.value })} required minLength={6} />
          {error && <p className="mt-4 rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button className="btn-primary mt-6 w-full" disabled={loading}>{loading ? "Updating..." : "Change password"}</button>
        </form>
      </section>
    </Layout>
  );
}

function Cart() {
  const { items, totals, updateQuantity, removeItem } = useCart();

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black">Cart</h1>
        {items.length === 0 ? <EmptyCart /> : (
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="grid gap-4">
              {items.map((item) => (
                <div key={item.key} className="grid gap-4 rounded border border-stone-200 bg-white p-4 sm:grid-cols-[110px_1fr_auto]">
                  <img className="h-28 w-full rounded object-cover sm:w-28" src={item.image} alt={item.name} />
                  <div>
                    <Link className="font-bold hover:text-coral" to={`/products/${item.slug}`}>{item.name}</Link>
                    <p className="mt-1 text-sm text-stone-500">{item.size} / {item.color}</p>
                    <p className="mt-3 font-bold">{money(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input className="input w-20" type="number" min="1" value={item.quantity} onChange={(event) => updateQuantity(item.key, Number(event.target.value))} />
                    <button className="rounded border border-stone-300 p-3 text-red-600" onClick={() => removeItem(item.key)} aria-label="Remove item"><Trash2 size={17} /></button>
                  </div>
                </div>
              ))}
            </div>
            <OrderSummary totals={totals} cta={<Link className="btn-primary w-full" to="/checkout">Checkout</Link>} />
          </div>
        )}
      </section>
    </Layout>
  );
}

function EmptyCart() {
  return <div className="mt-8 rounded border border-stone-200 bg-white p-8 text-center"><ShoppingBag className="mx-auto mb-3 text-stone-400" /><p className="text-stone-600">Your cart is empty.</p><Link className="btn-primary mt-5 inline-flex" to="/products">Browse products</Link></div>;
}

function OrderSummary({ totals, cta }) {
  return (
    <aside className="h-fit rounded border border-stone-200 bg-white p-5">
      <h2 className="font-black">Order summary</h2>
      <Row label="Subtotal" value={money(totals.subtotal)} />
      <Row label="Tax" value={money(totals.tax)} />
      <Row label="Shipping" value={totals.shipping ? money(totals.shipping) : "Free"} />
      <div className="my-4 border-t border-stone-200" />
      <Row label="Total" value={money(totals.total)} strong />
      <div className="mt-5">{cta}</div>
    </aside>
  );
}

function Row({ label, value, strong }) {
  return <div className={`mt-3 flex justify-between ${strong ? "text-lg font-black" : "text-stone-600"}`}><span>{label}</span><span>{value}</span></div>;
}

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function Checkout() {
  const { items, totals, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ fullName: "", address: "", city: "", postalCode: "", country: "India", phone: "" });
  const [error, setError] = useState("");

  const loadRazorpayScript = () => new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const { data: order } = await api.post("/orders", {
        shippingAddress: address,
        items: items.map(({ product, size, color, quantity }) => ({ product, size, color, quantity })),
      });
      const { data: payment } = await api.post("/payments/razorpay/order", { orderId: order._id });

      if (payment.demo || !(await loadRazorpayScript())) {
        await api.post("/payments/razorpay/verify", {
          orderId: order._id,
          demo: true,
          razorpay_order_id: payment.orderId,
          razorpay_payment_id: `demo_pay_${Date.now()}`,
          razorpay_signature: "demo",
        });
        clearCart();
        navigate(`/thank-you/${order._id}`);
        return;
      }

      const checkout = new window.Razorpay({
        key: payment.key,
        amount: payment.amount,
        currency: payment.currency,
        name: "MERN MART",
        description: "Order payment",
        order_id: payment.orderId,
        handler: async (response) => {
          await api.post("/payments/razorpay/verify", { orderId: order._id, ...response });
          clearCart();
          navigate(`/thank-you/${order._id}`);
        },
        prefill: { name: address.fullName, contact: address.phone },
      });
      checkout.open();
    } catch (err) {
      setError(err.response?.data?.message || "Checkout failed");
    }
  };

  if (!items.length) return <Navigate to="/cart" replace />;

  return (
    <Layout>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <form className="rounded border border-stone-200 bg-white p-5" onSubmit={submit}>
          <h1 className="text-3xl font-black">Checkout</h1>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {["fullName", "phone", "address", "city", "postalCode", "country"].map((field) => (
              <input key={field} className={`input ${field === "address" ? "sm:col-span-2" : ""}`} placeholder={field.replace(/([A-Z])/g, " $1")} value={address[field]} onChange={(event) => setAddress({ ...address, [field]: event.target.value })} required />
            ))}
          </div>
          {error && <p className="mt-4 rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button className="btn-primary mt-6">Pay with Razorpay</button>
        </form>
        <OrderSummary totals={totals} cta={<span className="block rounded bg-stone-100 p-3 text-sm text-stone-600">Payment opens after address submission.</span>} />
      </section>
    </Layout>
  );
}

function ThankYou() {
  const { id } = useParams();
  return (
    <Layout>
      <section className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-4 py-12 text-center">
        <div className="rounded border border-stone-200 bg-white p-8 shadow-sm">
          <CheckCircle2 className="mx-auto h-14 w-14 text-moss" />
          <h1 className="mt-5 text-3xl font-black">Thank you for your order</h1>
          <p className="mt-3 text-stone-600">Your order is confirmed and payment status has been saved.</p>
          <p className="mt-4 rounded bg-stone-100 p-3 text-sm text-stone-600">Order ID: {id}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link className="btn-primary" to="/orders">View order history</Link>
            <Link className="btn-secondary" to="/products">Continue shopping</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/orders/mine")
      .then(({ data }) => setOrders(data))
      .catch((err) => setError(err.response?.data?.message || "Could not load orders"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <History className="text-coral" />
          <div>
            <h1 className="text-3xl font-black">Order history</h1>
            <p className="mt-1 text-stone-600">Track your previous purchases and payment status.</p>
          </div>
        </div>
        {loading && <p>Loading orders...</p>}
        {error && <p className="rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {!loading && !error && orders.length === 0 && (
          <div className="rounded border border-stone-200 bg-white p-8 text-center">
            <PackageCheck className="mx-auto mb-3 text-stone-400" />
            <p className="text-stone-600">You have not placed any orders yet.</p>
            <Link className="btn-primary mt-5 inline-flex" to="/products">Shop products</Link>
          </div>
        )}
        <div className="grid gap-4">
          {orders.map((order) => (
            <article key={order._id} className="rounded border border-stone-200 bg-white p-5">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-moss">Order #{order._id.slice(-8)}</p>
                  <h2 className="mt-2 font-black">{money(order.total)}</h2>
                  <p className="mt-1 text-sm text-stone-500">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`rounded px-3 py-1 text-sm font-bold ${order.isPaid ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>{order.isPaid ? "Paid" : "Payment pending"}</span>
                  <span className="rounded bg-stone-100 px-3 py-1 text-sm font-bold text-stone-700">{order.status}</span>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                {order.items.map((item) => (
                  <div key={`${order._id}-${item.product}-${item.size}-${item.color}`} className="flex items-center gap-3 border-t border-stone-100 pt-3">
                    <img className="h-14 w-14 rounded object-cover" src={item.image} alt={item.name} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold">{item.name}</p>
                      <p className="text-sm text-stone-500">{item.size} / {item.color} x {item.quantity}</p>
                    </div>
                    <p className="font-bold">{money(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/thank-you/:id" element={<PrivateRoute><ThankYou /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/forgot-password" element={<AuthPage mode="forgot" />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  const providers = useMemo(() => <AuthProvider><CartProvider><AppRoutes /></CartProvider></AuthProvider>, []);
  return providers;
}
