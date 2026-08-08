import Image from "next/image";

export default function Home() {
  return (
    <main className="hero">

      {/* ================= NAVBAR ================= */}
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


      {/* ================= BANNER + HERO ================= */}
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


        {/* ================= HERO TEXT ================= */}
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


      {/* ================= OUR MENU ================= */}
      <section id="menu" className="menu-section">

        <h2>Our Menu</h2>

        <Image
          src="/images/Craveon Food & Drink Menu.jpg"
          alt="CraveOn Food and Drink Menu"
          width={1200}
          height={1600}
          className="menu-image"
        />

      </section>


      {/* ================= OUR SPECIALS ================= */}
      <section className="special-section">

        <h2>Our Specials</h2>

        <div className="card-container">

          <div className="card">
            <div className="icon">☕</div>

            <h3>Cold Coffee</h3>

            <p>
              Classic, Irish, Hazelnut, Caramel & More
            </p>

            <span>Starting ₹79</span>
          </div>


          <div className="card">
            <div className="icon">🥤</div>

            <h3>Shakes</h3>

            <p>
              Oreo, KitKat, Brownie, Strawberry & More
            </p>

            <span>Starting ₹69</span>
          </div>


          <div className="card">
            <div className="icon">🍜</div>

            <h3>Maggi</h3>

            <p>
              Masala, Cheese, Peri Peri & Tandoori
            </p>

            <span>Starting ₹59</span>
          </div>


          <div className="card">
            <div className="icon">🥪</div>

            <h3>Sandwich</h3>

            <p>
              Cheese, Paneer, Garlic & More
            </p>

            <span>Starting ₹99</span>
          </div>


          <div className="card">
            <div className="icon">🍹</div>

            <h3>Mocktails</h3>

            <p>
              Virgin Mojito, Blue Lagoon & More
            </p>

            <span>Starting ₹69</span>
          </div>

        </div>

      </section>


      {/* ================= ABOUT CRAVEON ================= */}
      <section id="about" className="about-section">

        <h2>About CraveOn</h2>

        <p>
          Welcome to <strong>CraveOn - The Cloud Kitchen</strong>,
          your destination for delicious food and refreshing beverages.
          We serve freshly prepared Cold Coffee, Shakes, Mocktails,
          Maggi and Sandwiches made with quality ingredients and
          unforgettable taste.
        </p>

        <p>
          Whether you're craving a quick snack or a refreshing drink
          with friends, CraveOn is here to satisfy your hunger with
          fast service and premium quality.
        </p>

        <p>
          Our mission is to deliver fresh, hygienic and affordable
          food with quick service so every customer enjoys an amazing
          experience.
        </p>

      </section>


      {/* ================= CONTACT US ================= */}

<section id="contact" className="contact-section">

  <h2>Contact Us</h2>

  <p>
    Have a question or want to place an order?
  </p>

  <div className="contact-container">

    {/* ================= CALL US ================= */}

    <a
      href="tel:+919079540030"
      className="contact-card contact-link"
    >
      <div className="contact-icon">
        📞
      </div>

      <h3>Call Us</h3>

      <p>+91 90795 40030</p>
    </a>


    {/* ================= INSTAGRAM ================= */}

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


    {/* ================= WHATSAPP ================= */}

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


    {/* ================= OPENING HOURS ================= */}

    <a
      href="https://wa.me/919079540030?text=Hi%20CraveOn%2C%20are%20you%20open%20right%20now%3F"
      target="_blank"
      rel="noopener noreferrer"
      className="contact-card contact-link"
    >
      <div className="contact-icon">
        🕐
      </div>

      <h3>Opening Hours</h3>

      <p>7 PM - 12 AM</p>

      <small>Open Daily</small>

    </a>

  </div>

</section>

      {/* ================= FOOTER ================= */}
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

          <p>
            Crave More, Live More
          </p>

          <p>
            Fresh Food • Fast Delivery • Cloud Kitchen
          </p>

          <div className="footer-links">

            <a href="#home">Home</a>

            <a href="#menu">Menu</a>

            <a href="#about">About</a>

            <a href="#contact">Contact</a>

          </div>

          <div className="footer-line"></div>

          <p className="copyright">
            © 2026 CraveOn. All Rights Reserved.
          </p>

        </div>

      </footer>

    </main>
  );
}