"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const specialItems = {
    "Cold Coffee": [
      { name: "Classic Frappe", price: 79 },
      { name: "Irish Frappe", price: 99 },
      { name: "Hazelnut Frappe", price: 99 },
      { name: "Butterscotch Frappe", price: 99 },
      { name: "Caramel Frappe", price: 99 },
      { name: "Kit-Kat Frappe", price: 99 },
      { name: "Tiramisu Frappe", price: 110 },
    ],
    Shakes: [
      { name: "Vanilla Shake", price: 69 },
      { name: "Paan Shake", price: 89 },
      { name: "Oreo Shake", price: 99 },
      { name: "Kit-Kat Shake", price: 99 },
      { name: "Passion Fruit Shake", price: 99 },
      { name: "Bubblegum Shake", price: 99 },
      { name: "Chocolate Shake", price: 110 },
      { name: "Blueberry Shake", price: 120 },
      { name: "Brownie Shake", price: 120 },
      { name: "Strawberry Shake", price: 120 },
    ],
    Maggi: [
      { name: "Plain Maggi", price: 59 },
      { name: "Masala Maggi", price: 69 },
      { name: "Cheese Maggi", price: 79 },
      { name: "Cheese Corn Maggi", price: 89 },
      { name: "Tandoori Maggi", price: 99 },
      { name: "Peri Peri Maggi", price: 99 },
    ],
    Sandwich: [
      { name: "Mix Veg. Sandwich", price: 99 },
      { name: "Cheese Corn Sandwich", price: 119 },
      { name: "Cheese Chilli Sandwich", price: 119 },
      { name: "Chilli Garlic Sandwich", price: 119 },
      { name: "Melted Cheese Sandwich", price: 139 },
      { name: "Tandoori Paneer Sandwich", price: 139 },
      { name: "Peri Peri Paneer Sandwich", price: 139 },
      { name: "Veg. Tandoori Paneer Sandwich", price: 159 },
    ],
    Mocktails: [
      { name: "Virgin Mojito", price: 69 },
      { name: "Blue Lagoon", price: 79 },
      { name: "Green Apple Mojito", price: 79 },
      { name: "Orange Burst Mojito", price: 89 },
      { name: "Berry Mojito", price: 89 },
      { name: "Melomania Mojito", price: 99 },
      { name: "Watermelon Lychee Blast", price: 110 },
    ],
  };

  const categories = [
    { name: "Cold Coffee", icon: "☕", text: "Fresh frappes" },
    { name: "Shakes", icon: "🥤", text: "Thick & creamy" },
    { name: "Maggi", icon: "🍜", text: "Hot & tasty" },
    { name: "Sandwich", icon: "🥪", text: "Freshly grilled" },
    { name: "Mocktails", icon: "🍹", text: "Refreshing drinks" },
  ];

  const maggiAddOns = [
    { name: "Extra Vegetables", price: 10 },
    { name: "Extra Cheese", price: 20 },
  ];

  const sandwichAddOns = [
    {
      name: "Extra Cheese",
      price: 20,
    },
  ];


  /* =========================================================
     STATES
  ========================================================= */

  const [selectedSpecial, setSelectedSpecial] = useState(null);
  const [cart, setCart] = useState({});
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const updateQuantity = (itemName, price, change, category) => {
    setCart((prev) => {
      const currentItem = prev[itemName] || { price, quantity: 0, category, addOns: {} };
      const newQty = Math.max(0, currentItem.quantity + change);
      const updated = { ...prev };
      if (newQty === 0) delete updated[itemName];
      else updated[itemName] = { ...currentItem, price, quantity: newQty, category };
      return updated;
    });
  };

  const toggleItemAddOn = (itemName, addonName, addonPrice) => {
    setCart((prev) => {
      const currentItem = prev[itemName];
      if (!currentItem) return prev;
      const updatedAddOns = { ...(currentItem.addOns || {}) };
      if (updatedAddOns[addonName]) delete updatedAddOns[addonName];
      else updatedAddOns[addonName] = { price: addonPrice };
      return { ...prev, [itemName]: { ...currentItem, addOns: updatedAddOns } };
    });
  };

  const cartItems = Object.entries(cart);
  const totalQuantity = cartItems.reduce((total, [, item]) => total + item.quantity, 0);
  const foodTotal = cartItems.reduce((total, [, item]) => {
    const itemBaseTotal = item.price * item.quantity;
    const itemAddOnTotal = Object.values(item.addOns || {}).reduce((sum, addon) => sum + addon.price * item.quantity, 0);
    return total + itemBaseTotal + itemAddOnTotal;
  }, 0);

  const placeOrder = () => {
    if (totalQuantity === 0) return alert("Please select at least one item.");
    if (!customerName.trim()) return alert("Please enter your name.");
    const cleanPhone = customerPhone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) return alert("Please enter a valid 10-digit mobile number.");
    if (customerAddress.trim().length < 10) return alert("Please enter your complete delivery address.");

    const orderDetails = cartItems.map(([name, item]) => {
      let details = `${item.quantity} × ${name} = ₹${item.price * item.quantity}`;
      Object.entries(item.addOns || {}).forEach(([addonName, addon]) => {
        details += `\n   + ${addonName} × ${item.quantity} = ₹${addon.price * item.quantity}`;
      });
      return details;
    }).join("\n\n");

    const message = `🛒 *CRAVEON THE CLOUD KITCHEN*\n\n👤 *Customer:* ${customerName.trim()}\n📱 *Phone:* ${cleanPhone}\n📍 *Address:* ${customerAddress.trim()}\n\n*ORDER DETAILS*\n\n${orderDetails}\n\n💵 *Food Total:* ₹${foodTotal}\n🚚 *Delivery Charge:* To be confirmed based on delivery location\n\n------------------------\n🧾 *Total Items:* ${totalQuantity}\n💰 *FOOD TOTAL:* ₹${foodTotal}\n\nThank you for ordering from *CraveOn* ❤️`;

    const whatsappURL = `https://wa.me/919079540030?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");

    setSelectedSpecial(null);
    setCart({});
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    setOrderPlaced(true);
  };

  return (
    <main className="hero">
      <nav className="navbar">
        <div className="logo">
          <Image src="/images/CraveOn The Cloud Kitchen.png" alt="CraveOn Logo" width={120} height={60} className="brand-logo" />
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>



      {/* =====================================================
          BANNER + HERO
      ===================================================== */}

      <section
        id="home"
        className="hero-section"
      >

        <div className="banner-section">

          <Image
            src="/images/banner.png"
            alt="CraveOn Cloud Kitchen"
            width={1920}
            height={700}
            className="banner"
            priority
          />

        </div>



        {/* HERO TEXT */}

        <div className="hero-text">

          <div className="hero-logo">

            <Image
              src="/images/CraveOn The Cloud Kitchen.png"
              alt="CraveOn Logo"
              width={220}
              height={100}
              className="hero-brand-logo"
            />

          </div>


          <p>
            Crave More, Live More
          </p>


          <h3>
            Fresh Food • Fast Delivery • Cloud Kitchen
          </h3>


          <a
            href="https://wa.me/919079540030?text=Hi%20CraveOn%2C%20I%20want%20to%20place%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            🍔 Order Now
          </a>

        </div>

      </section>



      {/* =====================================================
          OUR MENU
      ===================================================== */}

      <section
        id="menu"
        className="menu-section"
      >



      </section>



      {/* =====================================================
          OUR SPECIALS
      ===================================================== */}

     
           <section id="menu" className="special-section">
        <div className="section-kicker">OUR MENU</div>
        <h2>Choose Your Craving</h2>
        <p className="section-intro">Tap a category to see the full menu and build your order.</p>
        <div className="card-container">
          {categories.map((category) => (
            <div className="card" key={category.name} onClick={() => setSelectedSpecial(category.name)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setSelectedSpecial(category.name)}>
              <div className="icon">{category.icon}</div>
              <h3>{category.name}</h3>
              <p>{category.text}</p>
              <span>View Items →</span>
            </div>
          ))}
        </div>
      </section>

      {selectedSpecial && (
        <div className="order-overlay" onClick={() => setSelectedSpecial(null)}>
          <div className="order-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-order" onClick={() => setSelectedSpecial(null)}>×</button>
            <h2>{selectedSpecial}</h2>
            <p className="order-subtitle">Select what you want to order</p>

            <div className="order-items">
              {specialItems[selectedSpecial]?.map((item) => {
                const quantity = cart[item.name]?.quantity || 0;
                const selectedAddOns = cart[item.name]?.addOns || {};
                const addOns = selectedSpecial === "Maggi" ? maggiAddOns : selectedSpecial === "Sandwich" ? sandwichAddOns : [];
                return (
                  <div className="order-item" key={item.name}>
                    <div className="order-item-info"><h3>{item.name}</h3><p>₹{item.price}</p></div>
                    <div className="quantity-box">
                      <button onClick={() => updateQuantity(item.name, item.price, -1, selectedSpecial)}>−</button>
                      <span>{quantity}</span>
                      <button onClick={() => updateQuantity(item.name, item.price, 1, selectedSpecial)}>+</button>
                    </div>
                    {addOns.length > 0 && quantity > 0 && (
                      <div className="item-addons">
                        <p>Add-on for <strong>{item.name}</strong></p>
                        {addOns.map((addon) => (
                          <label className="item-addon-option" key={addon.name}>
                            <input type="checkbox" checked={!!selectedAddOns[addon.name]} onChange={() => toggleItemAddOn(item.name, addon.name, addon.price)} />
                            <span>{addon.name}</span><strong>+₹{addon.price}</strong>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {cartItems.length > 0 && (
              <div className="your-order">
                <h3>Your Order</h3>
                <div className="your-order-items">
                  {cartItems.map(([name, item]) => {
                    const itemAddOnTotal = Object.values(item.addOns || {}).reduce((sum, addon) => sum + addon.price * item.quantity, 0);
                    return (
                      <div className="your-order-row" key={name}>
                        <div className="your-order-name">
                          <span>{name}</span>
                          {Object.keys(item.addOns || {}).length > 0 && <small>{Object.keys(item.addOns).join(", ")}</small>}
                        </div>
                        <div className="your-order-controls">
                          <button onClick={() => updateQuantity(name, item.price, -1, item.category)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(name, item.price, 1, item.category)}>+</button>
                        </div>
                        <strong>₹{item.price * item.quantity + itemAddOnTotal}</strong>
                      </div>
                    );
                  })}
                </div>
                <div className="your-order-total"><span>Food Total</span><strong>₹{foodTotal}</strong></div>
              </div>
            )}

            <div className="order-summary">
              <div className="customer-details">
                <h3>Customer Details</h3>
                <input type="text" placeholder="Your Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                <input type="tel" placeholder="Mobile Number" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                <textarea placeholder="Delivery Address" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} rows={3} />
                <p style={{ margin: "4px 0 0", color: "#777", fontSize: "13px" }}>Delivery charges will be confirmed according to your delivery location.</p>
              </div>
              <div><span>Items</span><strong>{totalQuantity}</strong></div>
              <div><span>Food Total</span><strong>₹{foodTotal}</strong></div>
              <div className="grand-total"><span>Total</span><strong>₹{foodTotal}</strong></div>
            </div>

            <button className="place-order-btn" disabled={totalQuantity === 0} onClick={placeOrder}>Place Order on WhatsApp</button>
          </div>
        </div>
      )}

      {orderPlaced && (
        <div className="success-overlay">
          <div className="success-popup">
            <div className="success-icon">✓</div>
            <h2>Order Sent Successfully!</h2>
            <p>Thank you for ordering from <strong>CraveOn</strong> ❤️</p>
            <p className="success-text">Your order details have been sent to us on WhatsApp. We will contact you shortly to confirm your order and delivery charge.</p>
            <button className="success-close-btn" onClick={() => setOrderPlaced(false)}>Done</button>
          </div>
        </div>
      )}

      <section id="about" className="about-section">
        <h2>About CraveOn</h2>
        <p>Welcome to <strong>CraveOn - The Cloud Kitchen</strong>, your destination for delicious food and refreshing beverages. We serve freshly prepared Cold Coffee, Shakes, Mocktails, Maggi and Sandwiches made with quality ingredients and unforgettable taste.</p>
        <p>Whether you're craving a quick snack or a refreshing drink with friends, CraveOn is here to satisfy your hunger with fast service and premium quality.</p>
        <p>Our mission is to deliver fresh, hygienic and affordable food with quick service so every customer enjoys an amazing experience.</p>
      </section>

      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <p>Have a question or want to place an order?</p>
        <div className="contact-container">
          <a href="tel:+919079540030" className="contact-card contact-link"><div className="contact-icon">📞</div><h3>Call Us</h3><p>+91 90795 40030</p></a>
          <a href="https://www.instagram.com/craveonn_/" target="_blank" rel="noopener noreferrer" className="contact-card contact-link"><div className="contact-icon"><Image src="/images/Instagram_icon.png" alt="Instagram" width={45} height={45} className="instagram-icon" /></div><h3>Instagram</h3><p>@craveonn_</p></a>
          <a href="https://wa.me/919079540030" target="_blank" rel="noopener noreferrer" className="contact-card contact-link"><div className="contact-icon"><Image src="/images/Whatsapp_icon.png" alt="WhatsApp" width={45} height={45} className="whatsapp-icon" /></div><h3>WhatsApp</h3><p>Chat With Us</p></a>
          <a href="https://wa.me/919079540030?text=Hi%20CraveOn%2C%20are%20you%20open%20right%20now%3F" target="_blank" rel="noopener noreferrer" className="contact-card contact-link"><div className="contact-icon">🕐</div><h3>Opening Hours</h3><p>7 PM - 12 AM</p><small>Open Daily</small></a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo"><Image src="/images/CraveOn The Cloud Kitchen ( White ).png" alt="CraveOn Logo" width={180} height={80} className="footer-brand-logo" /></div>
          <p>Crave More, Live More</p>
          <p>Fresh Food • Fast Delivery • Cloud Kitchen</p>
          <div className="footer-links"><a href="#home">Home</a><a href="#menu">Menu</a><a href="#about">About</a><a href="#contact">Contact</a></div>
          <div className="footer-line"></div>
          <p className="copyright">© 2026 CraveOn. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
