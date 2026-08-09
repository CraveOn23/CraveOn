"use client";

import Image from "next/image";
import { useState } from "react";

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

  const maggiAddOns = [
    { name: "Extra Vegetables", price: 10 },
    { name: "Extra Cheese", price: 20 },
  ];

  // Sandwich add-on: ONLY Extra Cheese
  const sandwichAddOns = [{ name: "Extra Cheese", price: 20 }];

  const [selectedSpecial, setSelectedSpecial] = useState(null);
  const [cart, setCart] = useState({});
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const updateQuantity = (itemName, price, change, category) => {
    setCart((prev) => {
      const currentItem = prev[itemName] || {
        price,
        quantity: 0,
        category,
        addOns: {},
      };

      const newQty = Math.max(0, currentItem.quantity + change);
      const updated = { ...prev };

      if (newQty === 0) {
        delete updated[itemName];
      } else {
        updated[itemName] = {
          ...currentItem,
          price,
          quantity: newQty,
          category,
        };
      }

      return updated;
    });
  };

  const toggleItemAddOn = (itemName, addonName, addonPrice) => {
    setCart((prev) => {
      const currentItem = prev[itemName];
      if (!currentItem) return prev;

      const currentAddOns = currentItem.addOns || {};
      const updatedAddOns = { ...currentAddOns };

      if (updatedAddOns[addonName]) {
        delete updatedAddOns[addonName];
      } else {
        updatedAddOns[addonName] = { price: addonPrice };
      }

      return {
        ...prev,
        [itemName]: { ...currentItem, addOns: updatedAddOns },
      };
    });
  };

  const cartItems = Object.entries(cart);

  const totalQuantity = cartItems.reduce(
    (total, [, item]) => total + item.quantity,
    0
  );

  const totalAmount = cartItems.reduce((total, [, item]) => {
    const itemBaseTotal = item.price * item.quantity;
    const itemAddOnTotal = Object.values(item.addOns || {}).reduce(
      (addOnTotal, addon) => addOnTotal + addon.price * item.quantity,
      0
    );
    return total + itemBaseTotal + itemAddOnTotal;
  }, 0);

  const placeOrder = () => {
    if (totalQuantity === 0) {
      alert("Please select at least one item.");
      return;
    }

    if (!customerName.trim()) {
      alert("Please enter your name.");
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (customerAddress.trim().length < 10) {
      alert("Please enter your complete delivery address.");
      return;
    }

    const orderDetails = cartItems
      .map(([name, item]) => {
        let details = `${item.quantity} × ${name} = ₹${
          item.price * item.quantity
        }`;

        Object.entries(item.addOns || {}).forEach(([addonName, addon]) => {
          details += `\n   + ${addonName} × ${item.quantity} = ₹${
            addon.price * item.quantity
          }`;
        });

        return details;
      })
      .join("\n\n");

    const message = `🛒 *CRAVEON THE CLOUD KITCHEN*

👤 *Customer:* ${customerName.trim()}

📱 *Phone:* ${cleanPhone}

📍 *Address:* ${customerAddress.trim()}


*ORDER DETAILS*

${orderDetails}


------------------------

🧾 *Total Items:* ${totalQuantity}

💰 *Total Amount:* ₹${totalAmount}


Thank you for ordering from *CraveOn* ❤️`;

    const whatsappNumber = "919079540030";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

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
          <Image
            src="/images/CraveOn The Cloud Kitchen.png"
            alt="CraveOn Logo"
            width={120}
            height={60}
            className="brand-logo"
          />
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="home" className="hero-section">
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

          <p>Crave More, Live More</p>
          <h3>Fresh Food • Fast Delivery • Cloud Kitchen</h3>

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

      {/* The large menu image has been removed. Menu navigation now goes to Our Specials. */}
      <section id="menu" className="special-section">
        <h2>Our Specials</h2>

        <div className="card-container">
          <div
            className="card"
            onClick={() => setSelectedSpecial("Cold Coffee")}
            style={{ cursor: "pointer" }}
          >
            <div className="icon">☕</div>
            <h3>Cold Coffee</h3>
            <p>Classic, Irish, Hazelnut, Caramel & More</p>
            <span>Starting ₹79</span>
          </div>

          <div
            className="card"
            onClick={() => setSelectedSpecial("Shakes")}
            style={{ cursor: "pointer" }}
          >
            <div className="icon">🥤</div>
            <h3>Shakes</h3>
            <p>Oreo, KitKat, Brownie, Strawberry & More</p>
            <span>Starting ₹69</span>
          </div>

          <div
            className="card"
            onClick={() => setSelectedSpecial("Maggi")}
            style={{ cursor: "pointer" }}
          >
            <div className="icon">🍜</div>
            <h3>Maggi</h3>
            <p>Masala, Cheese, Peri Peri & Tandoori</p>
            <span>Starting ₹59</span>
          </div>

          <div
            className="card"
            onClick={() => setSelectedSpecial("Sandwich")}
            style={{ cursor: "pointer" }}
          >
            <div className="icon">🥪</div>
            <h3>Sandwich</h3>
            <p>Cheese, Paneer, Garlic & More</p>
            <span>Starting ₹99</span>
          </div>

          <div
            className="card"
            onClick={() => setSelectedSpecial("Mocktails")}
            style={{ cursor: "pointer" }}
          >
            <div className="icon">🍹</div>
            <h3>Mocktails</h3>
            <p>Virgin Mojito, Blue Lagoon & More</p>
            <span>Starting ₹69</span>
          </div>
        </div>
      </section>

      {selectedSpecial && (
        <div
          className="order-overlay"
          onClick={() => setSelectedSpecial(null)}
        >
          <div
            className="order-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-order"
              onClick={() => setSelectedSpecial(null)}
            >
              ×
            </button>

            <h2>{selectedSpecial}</h2>
            <p className="order-subtitle">
              Select what you want to order
            </p>

            <div className="order-items">
              {specialItems[selectedSpecial]?.map((item) => {
                const quantity = cart[item.name]?.quantity || 0;
                const selectedAddOns = cart[item.name]?.addOns || {};

                return (
                  <div className="order-item" key={item.name}>
                    <div className="order-item-info">
                      <h3>{item.name}</h3>
                      <p>₹{item.price}</p>
                    </div>

                    <div className="quantity-box">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.name,
                            item.price,
                            -1,
                            selectedSpecial
                          )
                        }
                      >
                        −
                      </button>
                      <span>{quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.name,
                            item.price,
                            1,
                            selectedSpecial
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    {selectedSpecial === "Maggi" && quantity > 0 && (
                      <div className="item-addons">
                        <p>
                          Add-ons for <strong>{item.name}</strong>
                        </p>
                        {maggiAddOns.map((addon) => (
                          <label
                            className="item-addon-option"
                            key={addon.name}
                          >
                            <input
                              type="checkbox"
                              checked={!!selectedAddOns[addon.name]}
                              onChange={() =>
                                toggleItemAddOn(
                                  item.name,
                                  addon.name,
                                  addon.price
                                )
                              }
                            />
                            <span>{addon.name}</span>
                            <strong>+₹{addon.price}</strong>
                          </label>
                        ))}
                      </div>
                    )}

                    {selectedSpecial === "Sandwich" && quantity > 0 && (
                      <div className="item-addons">
                        <p>
                          Add-on for <strong>{item.name}</strong>
                        </p>
                        {sandwichAddOns.map((addon) => (
                          <label
                            className="item-addon-option"
                            key={addon.name}
                          >
                            <input
                              type="checkbox"
                              checked={!!selectedAddOns[addon.name]}
                              onChange={() =>
                                toggleItemAddOn(
                                  item.name,
                                  addon.name,
                                  addon.price
                                )
                              }
                            />
                            <span>{addon.name}</span>
                            <strong>+₹{addon.price}</strong>
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
                    const itemAddOnTotal = Object.values(
                      item.addOns || {}
                    ).reduce(
                      (sum, addon) => sum + addon.price * item.quantity,
                      0
                    );

                    return (
                      <div className="your-order-row" key={name}>
                        <div className="your-order-name">
                          <span>{name}</span>
                          {Object.keys(item.addOns || {}).length > 0 && (
                            <small>
                              {Object.entries(item.addOns || {})
                                .map(([addonName]) => addonName)
                                .join(", ")}
                            </small>
                          )}
                        </div>

                        <div className="your-order-controls">
                          <button
                            onClick={() =>
                              updateQuantity(
                                name,
                                item.price,
                                -1,
                                item.category
                              )
                            }
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                name,
                                item.price,
                                1,
                                item.category
                              )
                            }
                          >
                            +
                          </button>
                        </div>

                        <strong>
                          ₹{item.price * item.quantity + itemAddOnTotal}
                        </strong>
                      </div>
                    );
                  })}
                </div>

                <div className="your-order-total">
                  <span>Total</span>
                  <strong>₹{totalAmount}</strong>
                </div>
              </div>
            )}

            <div className="order-summary">
              <div className="customer-details">
                <h3>Customer Details</h3>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
                <textarea
                  placeholder="Delivery Address"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <span>Items</span>
                <strong>{totalQuantity}</strong>
              </div>

              <div>
                <span>Total</span>
                <strong>₹{totalAmount}</strong>
              </div>
            </div>

            <button
              className="place-order-btn"
              disabled={totalQuantity === 0}
              onClick={placeOrder}
            >
              Place Order on WhatsApp
            </button>
          </div>
        </div>
      )}

      {orderPlaced && (
        <div className="success-overlay">
          <div className="success-popup">
            <div className="success-icon">✓</div>
            <h2>Order Sent Successfully!</h2>
            <p>
              Thank you for ordering from <strong>CraveOn</strong> ❤️
            </p>
            <p className="success-text">
              Your order details have been sent to us on WhatsApp. We will
              contact you shortly to confirm your order.
            </p>
            <button
              className="success-close-btn"
              onClick={() => setOrderPlaced(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}

      <section id="about" className="about-section">
        <h2>About CraveOn</h2>
        <p>
          Welcome to <strong>CraveOn - The Cloud Kitchen</strong>, your
          destination for delicious food and refreshing beverages. We serve
          freshly prepared Cold Coffee, Shakes, Mocktails, Maggi and
          Sandwiches made with quality ingredients and unforgettable taste.
        </p>
        <p>
          Whether you're craving a quick snack or a refreshing drink with
          friends, CraveOn is here to satisfy your hunger with fast service and
          premium quality.
        </p>
        <p>
          Our mission is to deliver fresh, hygienic and affordable food with
          quick service so every customer enjoys an amazing experience.
        </p>
      </section>

      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <p>Have a question or want to place an order?</p>

        <div className="contact-container">
          <a
            href="tel:+919079540030"
            className="contact-card contact-link"
          >
            <div className="contact-icon">📞</div>
            <h3>Call Us</h3>
            <p>+91 90795 40030</p>
          </a>

          <a
            href="https://www.instagram.com/craveonn_/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card contact-link"
          >
            <div className="contact-icon">
              <Image
                src="/images/Instagram_icon.png"
                alt="Instagram"
                width={45}
                height={45}
                className="instagram-icon"
              />
            </div>
            <h3>Instagram</h3>
            <p>@craveonn_</p>
          </a>

          <a
            href="https://wa.me/919079540030"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card contact-link"
          >
            <div className="contact-icon">
              <Image
                src="/images/Whatsapp_icon.png"
                alt="WhatsApp"
                width={45}
                height={45}
                className="whatsapp-icon"
              />
            </div>
            <h3>WhatsApp</h3>
            <p>Chat With Us</p>
          </a>

          <a
            href="https://wa.me/919079540030?text=Hi%20CraveOn%2C%20are%20you%20open%20right%20now%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card contact-link"
          >
            <div className="contact-icon">🕐</div>
            <h3>Opening Hours</h3>
            <p>7 PM - 12 AM</p>
            <small>Open Daily</small>
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Image
              src="/images/CraveOn The Cloud Kitchen ( White ).png"
              alt="CraveOn Logo"
              width={180}
              height={80}
              className="footer-brand-logo"
            />
          </div>

          <p>Crave More, Live More</p>
          <p>Fresh Food • Fast Delivery • Cloud Kitchen</p>

          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#menu">Menu</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-line"></div>
          <p className="copyright">© 2026 CraveOn. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
