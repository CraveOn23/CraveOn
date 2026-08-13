"use client";

import Image from "next/image";
import { useState, useEffect } from "react";


export default function Home() {


/* =========================
   REVEAL ANIMATION
========================= */


useEffect(()=>{

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
threshold:0.15
}

);


revealElements.forEach((el)=>{
observer.observe(el);
});


return ()=>{

observer.disconnect();

};


},[]);





/* =========================
   MENU ITEMS
========================= */


const specialItems = {


"Cold Coffee":[

{name:"Classic Frappe",price:79},

{name:"Irish Frappe",price:99},

{name:"Hazelnut Frappe",price:99},

{name:"Butterscotch Frappe",price:99},

{name:"Caramel Frappe",price:99},

{name:"Kit-Kat Frappe",price:99},

{name:"Tiramisu Frappe",price:110},

],



"Shakes":[

{name:"Vanilla Shake",price:69},

{name:"Paan Shake",price:89},

{name:"Oreo Shake",price:99},

{name:"Kit-Kat Shake",price:99},

{name:"Passion Fruit Shake",price:99},

{name:"Bubblegum Shake",price:99},

{name:"Chocolate Shake",price:110},

{name:"Blueberry Shake",price:120},

{name:"Brownie Shake",price:120},

{name:"Strawberry Shake",price:120},

],



"Maggi":[

{name:"Plain Maggi",price:59},

{name:"Masala Maggi",price:69},

{name:"Cheese Maggi",price:79},

{name:"Cheese Corn Maggi",price:89},

{name:"Tandoori Maggi",price:99},

{name:"Peri Peri Maggi",price:99},

],




"Sandwich":[

{name:"Mix Veg. Sandwich",price:99},

{name:"Cheese Corn Sandwich",price:119},

{name:"Cheese Chilli Sandwich",price:119},

{name:"Chilli Garlic Sandwich",price:119},

{name:"Melted Cheese Sandwich",price:139},

{name:"Tandoori Paneer Sandwich",price:139},

{name:"Peri Peri Paneer Sandwich",price:139},

{name:"Veg. Tandoori Paneer Sandwich",price:159},

],




"Mocktails":[

{name:"Virgin Mojito",price:69},

{name:"Blue Lagoon",price:79},

{name:"Green Apple Mojito",price:79},

{name:"Orange Burst Mojito",price:89},

{name:"Berry Mojito",price:89},

{name:"Melomania Mojito",price:99},

{name:"Watermelon Lychee Blast",price:110},

],


};





/* =========================
   CATEGORIES
========================= */


const categories=[


{
name:"Cold Coffee",
icon:"☕",
text:"Fresh frappes",
},


{
name:"Shakes",
icon:"🥤",
text:"Thick & creamy",
},


{
name:"Maggi",
icon:"🍜",
text:"Hot & tasty",
},


{
name:"Sandwich",
icon:"🥪",
text:"Freshly grilled",
},


{
name:"Mocktails",
icon:"🍹",
text:"Refreshing drinks",
},


];





/* =========================
   ADDONS
========================= */


const maggiAddOns=[

{
name:"Extra Vegetables",
price:10
},

{
name:"Extra Cheese",
price:20
}

];



const sandwichAddOns=[

{
name:"Extra Cheese",
price:20
}

];






/* =========================
   BANNER SLIDER
========================= */


const banners=[

"/images/banner-1.jpg",

"/images/banner-2.jpg",

"/images/banner-3.jpg",

"/images/banner-4.jpg",

];



const [currentBanner,setCurrentBanner]
=
useState(0);



useEffect(()=>{


const interval=setInterval(()=>{


setCurrentBanner(
(prev)=>
(prev+1)%banners.length
);


},4000);



return ()=>clearInterval(interval);



},[]);






/* =========================
   STATES
========================= */


const [selectedSpecial,setSelectedSpecial]
=
useState(null);



const [cart,setCart]
=
useState({});



const [showCart,setShowCart]
=
useState(false);



const [customerName,setCustomerName]
=
useState("");



const [customerPhone,setCustomerPhone]
=
useState("");



const [customerAddress,setCustomerAddress]
=
useState("");



const [orderPlaced,setOrderPlaced]
=
useState(false);







/* =========================
   CART FUNCTIONS
========================= */


const updateQuantity=(

itemName,

price,

change,

category

)=>{


setCart((prev)=>{


const currentItem =
prev[itemName] || {

price,

quantity:0,

category,

addOns:{}

};




const newQty=Math.max(

0,

currentItem.quantity+change

);




const updated={...prev};



if(newQty===0){


delete updated[itemName];


}

else{


updated[itemName]={

...currentItem,

price,

quantity:newQty,

category,

};


}



return updated;



});


};





const toggleItemAddOn=(

itemName,

addonName,

addonPrice

)=>{


setCart((prev)=>{


const currentItem =
prev[itemName];


if(!currentItem)
return prev;




const updatedAddOns={

...(currentItem.addOns || {})

};




if(updatedAddOns[addonName]){


delete updatedAddOns[addonName];


}

else{


updatedAddOns[addonName]={

price:addonPrice

};


}




return {


...prev,


[itemName]:{


...currentItem,


addOns:updatedAddOns


}


};



});


};





/* =========================
 CART TOTAL
========================= */


const cartItems =
Object.entries(cart);



const totalQuantity =
cartItems.reduce(

(total,[,item])=>

total + item.quantity,

0

);




const foodTotal =
cartItems.reduce(

(total,[,item])=>{


const itemTotal =
item.price *
item.quantity;



const addonTotal =
Object.values(

item.addOns || {}

).reduce(

(sum,addon)=>

sum +
addon.price *
item.quantity,

0

);



return total + itemTotal + addonTotal;



},

0

);
/* =========================
   PLACE ORDER
========================= */


const placeOrder = () => {


if(totalQuantity===0){

alert(
"Please select at least one item."
);

return;

}



if(!customerName.trim()){

alert(
"Please enter your name."
);

return;

}



const cleanPhone =
customerPhone.replace(/\D/g,"");



if(cleanPhone.length!==10){

alert(
"Please enter valid 10 digit mobile number."
);

return;

}




if(customerAddress.trim().length < 10){

alert(
"Please enter complete delivery address."
);

return;

}




const orderDetails = cartItems

.map(([name,item])=>{


let details =

`${item.quantity} × ${name} = ₹${
item.price * item.quantity
}`;



Object.entries(
item.addOns || {}
)

.forEach(
([addonName,addon])=>{


details +=

`\n + ${addonName} × ${
item.quantity
} = ₹${
addon.price * item.quantity
}`;


});



return details;



})

.join("\n\n");






const message =

`🛒 *CRAVEON THE CLOUD KITCHEN*

👤 *Customer:* ${customerName}

📱 *Phone:* ${cleanPhone}

📍 *Address:* ${customerAddress}


*ORDER DETAILS*

${orderDetails}


💵 *Food Total:* ₹${foodTotal}


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






/* =========================
   PAGE RETURN
========================= */


return (

<main>




{/* FLOATING CART */}


{totalQuantity>0 && !selectedSpecial && (


<div className="floating-cart-bar">


<div className="floating-cart-info">


<div className="floating-cart-icon">
🛒
</div>



<div>

<strong>

{totalQuantity}

{" "}

{totalQuantity===1
?
"Item"
:
"Items"
}

</strong>



<span>
₹{foodTotal}
</span>


</div>


</div>




<button

className="floating-cart-button"

onClick={()=>setShowCart(true)}

>

View Order →

</button>



</div>


)}






{/* NAVBAR */}



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


<a href="#home">
Home
</a>


<a href="#menu">
Menu
</a>


<a href="#about">
About
</a>


<a href="#contact">
Contact
</a>



</div>



</nav>






{/* HERO SECTION */}



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


{banners.map((_,index)=>(


<button

key={index}

className={

currentBanner===index

?

"banner-dot active"

:

"banner-dot"

}


onClick={()=>setCurrentBanner(index)}


/>


))}



</div>




</div>








<div className="hero-text">



<div className="hero-logo">


<Image

src="/images/CraveOn_Animated_Premium.webp"

alt="CraveOn Logo"

width={220}

height={100}

className="hero-logo-img"

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
{/* =========================
        OUR MENU
========================= */}


<section
className="menu-section reveal"
id="menu"
>


<div className="section-heading">


<span className="heading-line"></span>


<p className="section-title">
OUR MENU
</p>


<span className="heading-line"></span>


</div>




<h2>
Choose Your Craving
</h2>



<p className="section-intro">

Tap a category to see the full menu
and build your order.

</p>





<div className="card-container">


{categories.map((category)=>(


<div

className="card reveal"

key={category.name}


onClick={()=>setSelectedSpecial(category.name)}

role="button"

tabIndex={0}


onKeyDown={(e)=>{

if(e.key==="Enter"){

setSelectedSpecial(category.name);

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



))}



</div>



</section>








{/* =========================
        ORDER POPUP
========================= */}



{selectedSpecial && (



<div

className="order-overlay"

onClick={()=>setSelectedSpecial(null)}

>



<div

className="order-popup"

onClick={(e)=>e.stopPropagation()}

>




<button

className="close-order"

onClick={()=>setSelectedSpecial(null)}

>

×

</button>





<h2>

{selectedSpecial}

</h2>





<p className="order-subtitle">

Select what you want to order

</p>








<div className="order-items">



{specialItems[selectedSpecial]?.map((item)=>{


const quantity =

cart[item.name]?.quantity || 0;



const selectedAddOns =

cart[item.name]?.addOns || {};




const addOns =

selectedSpecial==="Maggi"

?

maggiAddOns

:

selectedSpecial==="Sandwich"

?

sandwichAddOns

:

[];





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

onClick={()=>updateQuantity(

item.name,

item.price,

-1,

selectedSpecial

)}

>

−

</button>




<span>

{quantity}

</span>





<button

onClick={()=>updateQuantity(

item.name,

item.price,

1,

selectedSpecial

)}

>

+

</button>




</div>







{/* ADDONS */}



{addOns.length>0 && quantity>0 && (



<div className="item-addons">



<p>

Add-on for{" "}

<strong>

{item.name}

</strong>

</p>




{addOns.map((addon)=>(



<label

className="item-addon-option"

key={addon.name}

>



<input

type="checkbox"

checked={

!!selectedAddOns[addon.name]

}


onChange={()=>toggleItemAddOn(

item.name,

addon.name,

addon.price

)}


/>



<span>

{addon.name}

</span>




<strong>

+₹{addon.price}

</strong>




</label>



))}



</div>



)}





</div>



);



})}



</div>








{/* YOUR ORDER */}



{cartItems.length>0 && (



<div className="your-order">



<h3>

Your Order

</h3>





<div className="your-order-items">



{cartItems.map(([name,item])=>{



const itemAddOnTotal =

Object.values(item.addOns || {})

.reduce(

(sum,addon)=>

sum + addon.price * item.quantity,

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

).length>0 && (



<small>

{

Object.keys(item.addOns).join(", ")

}

</small>



)}



</div>







<div className="your-order-controls">



<button

onClick={()=>updateQuantity(

name,

item.price,

-1,

item.category

)}

>

−

</button>





<span>

{item.quantity}

</span>





<button

onClick={()=>updateQuantity(

name,

item.price,

1,

item.category

)}

>

+

</button>



</div>







<strong>

₹

{item.price * item.quantity + itemAddOnTotal}

</strong>




</div>



);



})}



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

{/* =========================
      CUSTOMER DETAILS + CHECKOUT
========================= */}


<div className="order-summary">


<div className="customer-details">


<h3>
Customer Details
</h3>



<input

type="text"

placeholder="Your Name"

value={customerName}

onChange={(e)=>
setCustomerName(e.target.value)
}

/>



<input

type="tel"

placeholder="Mobile Number"

value={customerPhone}

onChange={(e)=>
setCustomerPhone(e.target.value)
}

/>



<textarea

placeholder="Delivery Address"

value={customerAddress}

onChange={(e)=>
setCustomerAddress(e.target.value)
}

/>



<p>

Delivery charges will be confirmed
according to your location.

</p>



</div>





<div className="summary-row">


<span>
Items
</span>


<strong>
{totalQuantity}
</strong>


</div>





<div className="summary-row">


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






<button

className="place-order-btn"

disabled={totalQuantity===0}

onClick={placeOrder}

>

Place Order on WhatsApp

</button>






</div>

</div>

)}








{/* =========================
       FULL CART VIEW
========================= */}



{showCart && (



<div

className="cart-view-overlay"

onClick={()=>setShowCart(false)}

>




<div

className="cart-view-popup"

onClick={(e)=>e.stopPropagation()}

>





<div className="cart-view-header">



<div>

<h2>
Your Order
</h2>



<p>

{totalQuantity}

{" "}

{totalQuantity===1
?
"item"
:
"items"
}

in your order

</p>


</div>





<button

className="cart-view-close"

onClick={()=>setShowCart(false)}

>

×

</button>



</div>








<div className="cart-view-items">



{cartItems.map(([name,item])=>{



const addonTotal =

Object.values(item.addOns || {})

.reduce(

(sum,addon)=>

sum +

addon.price * item.quantity,

0

);





return (



<div

className="cart-view-item"

key={name}

>




<div>

<h3>

{name}

</h3>



<p>

₹{item.price} each

</p>





</div>








<div className="cart-view-controls">



<button

onClick={()=>updateQuantity(

name,

item.price,

-1,

item.category

)}

>

−

</button>




<span>

{item.quantity}

</span>





<button

onClick={()=>updateQuantity(

name,

item.price,

1,

item.category

)}

>

+

</button>



</div>







<strong>


₹

{

item.price *

item.quantity +

addonTotal

}


</strong>





</div>



);



})}



</div>








<div className="cart-view-total">


<span>

Food Total

</span>



<strong>

₹{foodTotal}

</strong>


</div>







<button

className="continue-shopping-btn"

onClick={()=>setShowCart(false)}

>

← Continue Ordering

</button>







<button

className="cart-checkout-btn"

onClick={()=>{


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








{/* =========================
       SUCCESS POPUP
========================= */}



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

Thank you for ordering from

<strong>
CraveOn
</strong>

❤️

</p>





<p>

Your order details have been sent
to WhatsApp.

We will contact you shortly.

</p>





<button

className="success-close-btn"

onClick={()=>setOrderPlaced(false)}

>

Done

</button>





</div>



</div>



)}
{/* ===============================
        ABOUT SECTION
================================ */}


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

, your destination for delicious food
and refreshing beverages.

We serve freshly prepared Cold Coffee,
Shakes, Mocktails, Maggi and Sandwiches
made with quality ingredients and
unforgettable taste.

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

rel="noopener noreferrer"

className="contact-card"

>



<div className="contact-icon">


<Image

src="/images/instagram.svg"

width={45}

height={45}

alt="instagram"

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

rel="noopener noreferrer"

className="contact-card"

>



<div className="contact-icon">


<div className="whatsapp-simple">

💬

</div>


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

href="https://wa.me/919079540030"

target="_blank"

rel="noopener noreferrer"

className="contact-card"

>



<div className="contact-icon">


<Image

src="/images/clock.svg"

width={45}

height={45}

alt="clock"

/>


</div>




<h3>

Opening Hours

</h3>



<p>

7 PM - 12 AM

</p>



<span>

Check Now →

</span>



</a>






</div>



</section>









{/* ===============================
        PREMIUM FOOTER
================================ */}



<footer

className="premium-footer"

>




<div className="footer-container">





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

  {/* INSTAGRAM */}
  <a
    href="https://www.instagram.com/craveonn_/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="CraveOn Instagram"
  >
    <Image
      src="/images/instagram-icon.png"
      alt="Instagram"
      width={45}
      height={45}
    />
  </a>


  {/* WHATSAPP */}
  <a
    href="https://wa.me/919079540030"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="CraveOn WhatsApp"
  >
    <Image
      src="/images/whatsapp-icon.png"
      alt="WhatsApp"
      width={45}
      height={45}
    />
  </a>


  {/* PHONE */}
  <a
    href="tel:+919079540030"
    aria-label="Call CraveOn"
  >
    <Image
      src="/images/phone-icon.png"
      alt="Call CraveOn"
      width={45}
      height={45}
    />
  </a>

</div>




</div>









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
  <img
    src="/images/footer-food-icon.png"
    alt="CraveOn Food"
  />
</div>






</div>






<div className="footer-bottom">

© 2026 CraveOn. All Rights Reserved.

</div>






</footer>



</main>


);


}
