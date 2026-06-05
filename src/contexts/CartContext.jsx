import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("shop_cart") || "[]"));

  const persist = (nextItems) => {
    localStorage.setItem("shop_cart", JSON.stringify(nextItems));
    setItems(nextItems);
  };

  const addItem = (product, variant, quantity = 1) => {
    const key = `${product._id}-${variant?.size || "default"}-${variant?.color || "default"}`;
    const nextItems = [...items];
    const existing = nextItems.find((item) => item.key === key);
    const price = variant?.price || product.discountPrice || product.price;

    if (existing) existing.quantity += quantity;
    else {
      nextItems.push({
        key,
        product: product._id,
        slug: product.slug,
        name: product.name,
        image: product.images?.[0],
        size: variant?.size,
        color: variant?.color,
        price,
        quantity,
      });
    }

    persist(nextItems);
  };

  const updateQuantity = (key, quantity) => {
    persist(items.map((item) => (item.key === key ? { ...item, quantity: Math.max(1, quantity) } : item)));
  };

  const removeItem = (key) => persist(items.filter((item) => item.key !== key));
  const clearCart = () => persist([]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.05);
    const shipping = subtotal === 0 || subtotal > 4999 ? 0 : 149;
    return { subtotal, tax, shipping, total: subtotal + tax + shipping, count: items.reduce((sum, item) => sum + item.quantity, 0) };
  }, [items]);

  return <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clearCart, totals }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
