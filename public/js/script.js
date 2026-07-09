// ================================
// Luxury Hotel Website JavaScript
// ================================

// Sticky Navbar

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        navbar.style.background = "#111";
        navbar.style.padding = "18px 30px";
        navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,.4)";

    }else{

        navbar.style.background = "transparent";
        navbar.style.padding = "25px 30px";
        navbar.style.boxShadow = "none";

    }

});


// ================================
// Smooth Scroll
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});


// ================================
// Fade Animation on Scroll
// ================================

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0px)";

}

});

},{
threshold:0.2
});


document.querySelectorAll(".feature,.room-card,.service,.stats div,.gallery-grid img,.testimonial-box").forEach(el=>{

el.style.opacity="0";

el.style.transform="translateY(60px)";

el.style.transition="all .8s ease";

observer.observe(el);

});



// ================================
// Counter Animation
// ================================

const counters=document.querySelectorAll(".stats h2");

const speed=200;

counters.forEach(counter=>{

const animate=()=>{

const value=+counter.innerText.replace(/\D/g,'');

const data=+counter.getAttribute("data-count");

if(!data) return;

const time=data/speed;

if(value<data){

counter.innerText=Math.ceil(value+time)+"+";

setTimeout(animate,20);

}else{

counter.innerText=data+"+";

}

};

animate();

});



// ================================
// Back To Top Button
// ================================

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

document.body.appendChild(topBtn);

topBtn.style.position="fixed";

topBtn.style.right="25px";

topBtn.style.bottom="25px";

topBtn.style.width="55px";

topBtn.style.height="55px";

topBtn.style.borderRadius="50%";

topBtn.style.border="none";

topBtn.style.background="#C8A165";

topBtn.style.color="#111";

topBtn.style.fontSize="24px";

topBtn.style.cursor="pointer";

topBtn.style.display="none";

topBtn.style.zIndex="999";

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});



// ================================
// Hero Background Slider
// ================================

const hero = document.querySelector(".hero");

if (hero) {

    const images = [
        "images/hero.jpg",
        "images/hero2.jpg",
        "images/hero3.jpg"
    ];

    let index = 0;

    setInterval(() => {

        index++;

        if (index >= images.length) {
            index = 0;
        }

        hero.style.backgroundImage = `url(${images[index]})`;

    }, 5000);

}

// Admin Navigation

const adminBtn = document.getElementById("adminBtn");

if (adminBtn) {

    adminBtn.addEventListener("click", (e) => {

        e.preventDefault();

        if (localStorage.getItem("adminLoggedIn") === "true") {

            window.location.href = "admin-dashboard.html";

        } else {

            window.location.href = "admin-login.html";

        }

    });

}

const footerAdmin = document.getElementById("footerAdmin");

if (footerAdmin) {

    footerAdmin.addEventListener("click", (e) => {

        e.preventDefault();

        if (localStorage.getItem("adminLoggedIn") === "true") {

            window.location.href = "admin-dashboard.html";

        } else {

            window.location.href = "admin-login.html";

        }

    });

}





// ================================
// Room Card Hover Effect
// ================================

document.querySelectorAll(".room-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-15px) scale(1.02)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px)";

});

});



// ================================
// Gallery Image Popup
// ================================

document.querySelectorAll(".gallery-grid img").forEach(image=>{

image.addEventListener("click",()=>{

const popup=document.createElement("div");

popup.style.position="fixed";

popup.style.left="0";

popup.style.top="0";

popup.style.width="100%";

popup.style.height="100%";

popup.style.background="rgba(0,0,0,.9)";

popup.style.display="flex";

popup.style.justifyContent="center";

popup.style.alignItems="center";

popup.style.zIndex="9999";

const img=document.createElement("img");

img.src=image.src;

img.style.maxWidth="85%";

img.style.maxHeight="85%";

img.style.borderRadius="12px";

popup.appendChild(img);

popup.onclick=()=>popup.remove();

document.body.appendChild(popup);

});

});



console.log("Luxury Hotel Website Loaded Successfully");

function updateNavbar() {

    const guest = JSON.parse(localStorage.getItem("guest"));
    const admin = JSON.parse(localStorage.getItem("admin"));

    // Guest Logged In
    if (guest) {

        document.getElementById("loginNav").style.display = "none";
        document.getElementById("registerNav").style.display = "none";
        document.getElementById("adminNav").style.display = "none";

        document.getElementById("myBookingsNav").style.display = "block";
        document.getElementById("guestNameNav").style.display = "block";
        document.getElementById("logoutNav").style.display = "block";

        document.getElementById("guestName").textContent = guest.name || guest.username;

        return;
    }

    // Admin Logged In
    if (admin) {

        document.getElementById("loginNav").style.display = "none";
        document.getElementById("registerNav").style.display = "none";
        document.getElementById("adminNav").style.display = "none";

        document.getElementById("servicesNav").style.display = "none";
        document.getElementById("galleryNav").style.display = "none";

        document.getElementById("bookNowBtn").style.display = "none";

        document.getElementById("dashboardNav").style.display = "block";
        document.getElementById("logoutNav").style.display = "block";

        document.querySelector("#dashboardNav a").href = "admin-dashboard.html";

        return;
    }

}

updateNavbar();