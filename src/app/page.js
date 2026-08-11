"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  useEffect(() => {

  const revealElements =
    document.querySelectorAll(".reveal");


  const observer =
    new IntersectionObserver(
      (entries)=>{

        entries.forEach((entry)=>{

          if(entry.isIntersecting){

            entry.target.classList.add(
              "active"
            );

          }

        });

      },
      {
        threshold:0.15,
      }
    );


  revealElements.forEach((el)=>{
    observer.observe(el);
  });


  return ()=>{
    observer.disconnect();
  };


}, []);

  /* =========================================================
     MENU ITEMS
  ========================================================= */

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

  /* =========================================================
     MENU CATEGORIES
  ========================================================= */

  const categories = [
    {
      name: "Cold Coffee",
      icon: "☕",
      text: "Fresh frappes",
    },
    {
      name: "Shakes",
      icon: "🥤",
      text: "Thick & creamy",
    },
    {
      name: "Maggi",
      icon: "🍜",
      text: "Hot & tasty",
    },
    {
      name: "Sandwich",
      icon: "🥪",
      text: "Freshly grilled",
    },
    {
      name: "Mocktails",
      icon: "🍹",
      text: "Refreshing drinks",
    },
  ];

  /* =========================================================
     ADD-ONS
  ========================================================= */

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
     BANNER SLIDER
  ========================================================= */

  const banners = [
    "/images/banner-1.jpg",
    "/images/banner-2.jpg",
    "/images/banner-3.jpg",
    "/images/banner-4.jpg",
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(
        (prev) => (prev + 1) % banners.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  /* =========================================================
     STATES
  ========================================================= */

  const [selectedSpecial, setSelectedSpecial] =
    useState(null);

  const [cart, setCart] = useState({});

  const [showCart, setShowCart] = useState(false);

  const [customerName, setCustomerName] =
    useState("");

  const [customerPhone, setCustomerPhone] =
    useState("");

  const [customerAddress, setCustomerAddress] =
    useState("");

  const [orderPlaced, setOrderPlaced] =
    useState(false);

  /* =========================================================
     CART FUNCTIONS
  ========================================================= */

  const updateQuantity = (
    itemName,
    price,
    change,
    category
  ) => {
    setCart((prev) => {
      const currentItem =
        prev[itemName] || {
          price,
          quantity: 0,
          category,
          addOns: {},
        };

      const newQty = Math.max(
        0,
        currentItem.quantity + change
      );

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

  const toggleItemAddOn = (
    itemName,
    addonName,
    addonPrice
  ) => {
    setCart((prev) => {
      const currentItem = prev[itemName];

      if (!currentItem) {
        return prev;
      }

      const updatedAddOns = {
        ...(currentItem.addOns || {}),
      };

      if (updatedAddOns[addonName]) {
        delete updatedAddOns[addonName];
      } else {
        updatedAddOns[addonName] = {
          price: addonPrice,
        };
      }

      return {
        ...prev,
        [itemName]: {
          ...currentItem,
          addOns: updatedAddOns,
        },
      };
    });
  };

  /* =========================================================
     CART TOTALS
  ========================================================= */

  const cartItems = Object.entries(cart);

  const totalQuantity = cartItems.reduce(
    (total, [, item]) =>
      total + item.quantity,
    0
  );

  const foodTotal = cartItems.reduce(
    (total, [, item]) => {
      const itemBaseTotal =
        item.price * item.quantity;

      const itemAddOnTotal =
        Object.values(
          item.addOns || {}
        ).reduce(
          (sum, addon) =>
            sum +
            addon.price * item.quantity,
          0
        );

      return (
        total +
        itemBaseTotal +
        itemAddOnTotal
      );
    },
    0
  );

  /* =========================================================
     PLACE ORDER
  ========================================================= */

  const placeOrder = () => {
    if (totalQuantity === 0) {
      return alert(
        "Please select at least one item."
      );
    }

    if (!customerName.trim()) {
      return alert(
        "Please enter your name."
      );
    }

    const cleanPhone =
      customerPhone.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      return alert(
        "Please enter a valid 10-digit mobile number."
      );
    }

    if (
      customerAddress.trim().length < 10
    ) {
      return alert(
        "Please enter your complete delivery address."
      );
    }

    const orderDetails = cartItems
      .map(([name, item]) => {
        let details = `${item.quantity} × ${name} = ₹${
          item.price * item.quantity
        }`;

        Object.entries(
          item.addOns || {}
        ).forEach(
          ([addonName, addon]) => {
            details += `\n   + ${addonName} × ${
              item.quantity
            } = ₹${
              addon.price * item.quantity
            }`;
          }
        );

        return details;
      })
      .join("\n\n");

    const message = `🛒 *CRAVEON THE CLOUD KITCHEN*

👤 *Customer:* ${customerName.trim()}
📱 *Phone:* ${cleanPhone}
📍 *Address:* ${customerAddress.trim()}

*ORDER DETAILS*

${orderDetails}

💵 *Food Total:* ₹${foodTotal}
🚚 *Delivery Charge:* To be confirmed based on delivery location

------------------------

🧾 *Total Items:* ${totalQuantity}
💰 *FOOD TOTAL:* ₹${foodTotal}

Thank you for ordering from *CraveOn* ❤️`;

    const whatsappURL =
      `https://wa.me/919079540030?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      whatsappURL,
      "_blank"
    );

    setSelectedSpecial(null);
    setCart({});
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    setOrderPlaced(true);
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="hero">
      {/* =====================================================
    FLOATING CART BAR
===================================================== */}

{totalQuantity > 0 && !selectedSpecial && (

  <div className="floating-cart-bar">

    <div className="floating-cart-info">

      <div className="floating-cart-icon">
        🛒
      </div>

      <div>
        <strong>
          {totalQuantity}{" "}
          {totalQuantity === 1 ? "Item" : "Items"}
        </strong>

        <span>
          ₹{foodTotal}
        </span>
      </div>

    </div>


    <button
      className="floating-cart-button"
      onClick={() => setShowCart(true)}
    >
      View Order →
    </button>

  </div>

)}

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="navbar">

        <div className="logo">

         <Image
src="/images/CraveOn_Animated_Premium.webp"
alt="CraveOn Logo"
width={220}
height={100}
className="hero-logo-img"
/>

        </div>

        <div className="nav-links">

          <a href="#home">Home</a>

          <a href="#menu">Menu</a>

          <a href="#about">About</a>

          <a href="#contact">Contact</a>

        </div>

      </nav>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        id="home"
        className="hero-section"
      >

        <div className="banner-section">

          <Image
            src={banners[currentBanner]}
            alt="CraveOn Cloud Kitchen"
            width={1920}
            height={700}
            className="banner"
            priority
          />

          <div className="banner-dots">

            {banners.map(
              (_, index) => (
                <button
                  key={index}
                  className={
                    currentBanner === index
                      ? "banner-dot active"
                      : "banner-dot"
                  }
                  onClick={() =>
                    setCurrentBanner(index)
                  }
                  aria-label={`Show banner ${
                    index + 1
                  }`}
                />
              )
            )}

          </div>

        </div>


        {/* HERO TEXT */}

        <div className="hero-text">

          <div className="hero-logo">

            <Image
  src="/images/CraveOn_Animated_Premium.webp"
  alt="CraveOn Logo"
  width={220}
  height={100}
  className="hero-logo"
  priority
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

      <section className="menu-section reveal" id="menu">

        {/* OUR MENU TITLE */}

        <div className="section-heading">

          <span className="heading-line"></span>

          <p className="section-title">
            OUR MENU
          </p>

          <span className="heading-line"></span>

        </div>


        {/* MAIN HEADING */}

        <h2>
          Choose Your Craving
        </h2>


        {/* DESCRIPTION */}

        <p className="section-intro">
          Tap a category to see the full menu
          and build your order.
        </p>


        {/* MENU CARDS */}

        <div 
        className="card-container">

          {categories.map(
            (category) => (

              <div
 className="card reveal"
 key={category.name}
 
                onClick={() =>
                  setSelectedSpecial(
                    category.name
                  )
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSelectedSpecial(
                      category.name
                    );
                  }
                }}
              >

                <div className="icon">
                  {category.icon}
                </div>

                <h3>
                  {category.name}
                </h3>

                <p>
                  {category.text}
                </p>

                <span>
                  View Items →
                </span>

              </div>

            )
          )}

        </div>

      </section>


      {/* =====================================================
          ORDER POPUP
      ===================================================== */}

      {selectedSpecial && (

        <div
          className="order-overlay"
          onClick={() =>
            setSelectedSpecial(null)
          }
        >

          <div
            className="order-popup"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="close-order"
              onClick={() =>
                setSelectedSpecial(null)
              }
            >
              ×
            </button>

            <h2>
              {selectedSpecial}
            </h2>

            <p className="order-subtitle">
              Select what you want to order
            </p>


            {/* ITEMS */}

            <div className="order-items">

              {specialItems[
                selectedSpecial
              ]?.map((item) => {

                const quantity =
                  cart[item.name]
                    ?.quantity || 0;

                const selectedAddOns =
                  cart[item.name]
                    ?.addOns || {};

                const addOns =
                  selectedSpecial ===
                  "Maggi"
                    ? maggiAddOns
                    : selectedSpecial ===
                      "Sandwich"
                    ? sandwichAddOns
                    : [];

                return (

                  <div
                    className="order-item"
                    key={item.name}
                  >

                    <div className="order-item-info">

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        ₹{item.price}
                      </p>

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

                      <span>
                        {quantity}
                      </span>

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


                    {/* ADD-ONS */}

                    {addOns.length > 0 &&
                      quantity > 0 && (

                        <div className="item-addons">

                          <p>
                            Add-on for{" "}
                            <strong>
                              {item.name}
                            </strong>
                          </p>

                          {addOns.map(
                            (addon) => (

                              <label
                                className="item-addon-option"
                                key={addon.name}
                              >

                                <input
                                  type="checkbox"
                                  checked={
                                    !!selectedAddOns[
                                      addon.name
                                    ]
                                  }
                                  onChange={() =>
                                    toggleItemAddOn(
                                      item.name,
                                      addon.name,
                                      addon.price
                                    )
                                  }
                                />

                                <span>
                                  {addon.name}
                                </span>

                                <strong>
                                  +₹{addon.price}
                                </strong>

                              </label>

                            )
                          )}

                        </div>

                      )}

                  </div>

                );
              })}

            </div>


            {/* YOUR ORDER */}

            {cartItems.length > 0 && (

              <div className="your-order">

                <h3>
                  Your Order
                </h3>

                <div className="your-order-items">

                  {cartItems.map(
                    ([name, item]) => {

                      const itemAddOnTotal =
                        Object.values(
                          item.addOns || {}
                        ).reduce(
                          (sum, addon) =>
                            sum +
                            addon.price *
                              item.quantity,
                          0
                        );

                      return (

                        <div
                          className="your-order-row"
                          key={name}
                        >

                          <div className="your-order-name">

                            <span>
                              {name}
                            </span>

                            {Object.keys(
                              item.addOns || {}
                            ).length >
                              0 && (

                              <small>
                                {Object.keys(
                                  item.addOns
                                ).join(", ")}
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

                            <span>
                              {item.quantity}
                            </span>

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
                            ₹
                            {item.price *
                              item.quantity +
                              itemAddOnTotal}
                          </strong>

                        </div>

                      );
                    }
                  )}

                </div>


                <div className="your-order-total">

                  <span>
                    Food Total
                  </span>

                  <strong>
                    ₹{foodTotal}
                  </strong>

                </div>

              </div>

            )}


            {/* CUSTOMER DETAILS */}

            <div className="order-summary">

              <div className="customer-details">

                <h3>
                  Customer Details
                </h3>

                <input
                  type="text"
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) =>
                    setCustomerName(
                      e.target.value
                    )
                  }
                />

                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={customerPhone}
                  onChange={(e) =>
                    setCustomerPhone(
                      e.target.value
                    )
                  }
                />

                <textarea
                  placeholder="Delivery Address"
                  value={customerAddress}
                  onChange={(e) =>
                    setCustomerAddress(
                      e.target.value
                    )
                  }
                  rows={3}
                />

                <p
                  style={{
                    margin:
                      "4px 0 0",
                    color: "#777",
                    fontSize: "13px",
                  }}
                >
                  Delivery charges will be
                  confirmed according to your
                  delivery location.
                </p>

              </div>


              <div>

                <span>
                  Items
                </span>

                <strong>
                  {totalQuantity}
                </strong>

              </div>


              <div>

                <span>
                  Food Total
                </span>

                <strong>
                  ₹{foodTotal}
                </strong>

              </div>


              <div className="grand-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹{foodTotal}
                </strong>

              </div>

            </div>


            {/* PLACE ORDER */}

            <button
              className="place-order-btn"
              disabled={
                totalQuantity === 0
              }
              onClick={placeOrder}
            >
              Place Order on WhatsApp
            </button>

          </div>

        </div>

      )}

{/* =====================================================
    FULL CART VIEW
===================================================== */}

{showCart && (

  <div
    className="cart-view-overlay"
    onClick={() => setShowCart(false)}
  >

    <div
      className="cart-view-popup"
      onClick={(e) => e.stopPropagation()}
    >

      {/* HEADER */}

      <div className="cart-view-header">

        <div>
          <h2>Your Order</h2>

          <p>
            {totalQuantity}{" "}
            {totalQuantity === 1
              ? "item"
              : "items"}{" "}
            in your order
          </p>
        </div>

        <button
          className="cart-view-close"
          onClick={() => setShowCart(false)}
        >
          ×
        </button>

      </div>


      {/* ORDER ITEMS */}

      <div className="cart-view-items">

        {cartItems.map(([name, item]) => {

          const itemAddOnTotal =
            Object.values(
              item.addOns || {}
            ).reduce(
              (sum, addon) =>
                sum +
                addon.price *
                  item.quantity,
              0
            );

          return (

            <div
              className="cart-view-item"
              key={name}
            >

              <div className="cart-view-item-info">

                <h3>
                  {name}
                </h3>

                <p>
                  ₹{item.price} each
                </p>


                {/* ADDONS */}

                {Object.keys(
                  item.addOns || {}
                ).length > 0 && (

                  <small>
                    +{" "}
                    {Object.entries(
                      item.addOns
                    )
                      .map(
                        ([addonName]) =>
                          addonName
                      )
                      .join(", ")}
                  </small>

                )}

              </div>


              {/* QUANTITY */}

              <div className="cart-view-controls">

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

                <span>
                  {item.quantity}
                </span>

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


              {/* ITEM TOTAL */}

              <strong className="cart-view-price">

                ₹
                {item.price *
                  item.quantity +
                  itemAddOnTotal}

              </strong>

            </div>

          );

        })}

      </div>


      {/* TOTAL */}

      <div className="cart-view-total">

        <span>
          Food Total
        </span>

        <strong>
          ₹{foodTotal}
        </strong>

      </div>


      {/* CONTINUE SHOPPING */}

      <button
        className="continue-shopping-btn"
        onClick={() =>
          setShowCart(false)
        }
      >
        ← Continue Ordering
      </button>


      {/* CHECKOUT */}

      <button
        className="cart-checkout-btn"
        onClick={() => {
          setShowCart(false);
          setSelectedSpecial(
            cartItems[0]?.[1]?.category ||
              "Cold Coffee"
          );
        }}
      >
        Continue to Checkout →
      </button>

    </div>

  </div>

)}

      {/* =====================================================
          SUCCESS POPUP
      ===================================================== */}

      {orderPlaced && (

        <div className="success-overlay">

          <div className="success-popup">

            <div className="success-icon">
              ✓
            </div>

            <h2>
              Order Sent Successfully!
            </h2>

            <p>
              Thank you for ordering from{" "}
              <strong>
                CraveOn
              </strong>{" "}
              ❤️
            </p>

            <p className="success-text">
              Your order details have been
              sent to us on WhatsApp. We will
              contact you shortly to confirm
              your order and delivery charge.
            </p>

            <button
              className="success-close-btn"
              onClick={() =>
                setOrderPlaced(false)
              }
            >
              Done
            </button>

          </div>

        </div>

      )}


      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section
 id="about"
 className="about-section reveal"
>

        <h2>
          About CraveOn
        </h2>

        <p>
          Welcome to{" "}
          <strong>
            CraveOn - The Cloud Kitchen
          </strong>
          , your destination for delicious
          food and refreshing beverages. We
          serve freshly prepared Cold Coffee,
          Shakes, Mocktails, Maggi and
          Sandwiches made with quality
          ingredients and unforgettable taste.
        </p>

        <p>
          Whether you're craving a quick snack
          or a refreshing drink with friends,
          CraveOn is here to satisfy your hunger
          with fast service and premium quality.
        </p>

        <p>
          Our mission is to deliver fresh,
          hygienic and affordable food with
          quick service so every customer enjoys
          an amazing experience.
        </p>

      </section>


      {/* ===============================
        CONTACT SECTION
================================ */}

<section
  id="contact"
  className="contact-section reveal"
>

  <div className="contact-heading">

    <span>
      GET IN TOUCH
    </span>

    <h2>
      Contact <b>Us</b>
    </h2>

    <p>
      Have a question or want to place an order?
      <br/>
      We are here to help you!
    </p>

  </div>


  <div className="contact-container">


    <a
      href="tel:+919079540030"
      className="contact-card"
    >

      <div className="contact-icon">
        <Image 
src="/images/phone.svg"
width={45}
height={45}
alt="phone"
/>
      </div>

      <h3>
        Call Us
      </h3>

      <p>
        +91 90795 40030
      </p>

      <span>
        Tap to call →
      </span>

    </a>



    <a
      href="https://www.instagram.com/craveonn_/"
      target="_blank"
      className="contact-card"
    >

      <div className="contact-icon">
        <Image 
src="/images/instagram.svg"
width={45}
height={45}
alt="phone"
/>
      </div>

      <h3>
        Instagram
      </h3>

      <p>
        @craveonn_
      </p>

      <span>
        Follow Us →
      </span>

    </a>




    <a
      href="https://wa.me/919079540030"
      target="_blank"
      className="contact-card"
    >

      <div className="contact-icon whatsapp-icon">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="45"
    height="45"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fill="#25D366"
      d="M20.52 3.48A11.8 11.8 0 0 0 12.1 0C5.55 0 .22 5.33.22 11.88c0 2.09.55 4.13 1.6 5.93L.1 24l6.36-1.67a11.9 11.9 0 0 0 5.64 1.43h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.47-8.4ZM12.1 21.8c-1.77 0-3.5-.48-5-1.4l-.36-.21-3.77.99 1-3.67-.23-.38a9.85 9.85 0 0 1-1.52-5.25c0-5.44 4.43-9.87 9.88-9.87 2.63 0 5.1 1.03 6.95 2.88a9.8 9.8 0 0 1 2.88 6.99c0 5.44-4.43 9.92-9.88 9.92Z"
    />

    <path
      fill="#25D366"
      d="M17.6 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.5-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"
    />
  </svg>
      </div>

      <h3>
        WhatsApp
      </h3>

      <p>
        Chat With Us
      </p>

      <span>
        Open Chat →
      </span>

    </a>



    <a
      href="#"
      className="contact-card"
    >

      <div className="contact-icon">
        <Image 
src="/images/clock.svg"
width={45}
height={45}
alt="phone"
/>
      </div>

      <h3>
        Opening Hours
      </h3>

      <p>
        7 PM - 12 AM
      </p>

      <span>
        <a 
href="https://wa.me/919079540030?text=Hello%20CraveOn,%20I%20want%20to%20know%20if%20you%20are%20open%20right%20now?"
target="_blank"
>
Check Now →
</a>
      </span>

    </a>


  </div>


</section>

      {/* ===============================
          PREMIUM FOOTER
================================ */}

<footer className="premium-footer">

  <div className="footer-container">


    {/* LEFT */}

    <div className="footer-column brand-column">

      <Image
        src="/images/CraveOn The Cloud Kitchen ( White ).png"
        alt="CraveOn Logo"
        width={180}
        height={80}
        className="footer-logo"
      />


      <h4>
        Crave More, Live More
      </h4>


      <p>
        Fresh Food • Fast Delivery • Cloud Kitchen
      </p>


      <div className="social-icons">

        <a href="#">
          ◎
        </a>

        <a href="#">
          ◉
        </a>

        <a href="tel:+919079540030">
          ☎
        </a>

      </div>


    </div>




    {/* MIDDLE */}

    <div className="footer-column footer-links">


      <h3>
        Quick Links
      </h3>


      <a href="#home">
        › Home
      </a>

      <a href="#menu">
        › Menu
      </a>

      <a href="#about">
        › About
      </a>

      <a href="#contact">
        › Contact
      </a>


    </div>





    {/* RIGHT */}

    <div className="footer-column">


      <h3>
        We're Here for You!
      </h3>


      <p>
        Your cravings, our priority.
      </p>


      <p>
        Let's connect!
      </p>


    </div>



    <div className="footer-food-icon">

      🍔

    </div>



  </div>




  <div className="footer-bottom">

    © 2026 CraveOn. All Rights Reserved.

  </div>


</footer>

    </main>
  );
}