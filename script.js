const products = [
  {id:1,name:"ZAN-G Signature Tee",category:"T-Shirts",price:599,style:""},
  {id:2,name:"After Dark Hoodie",category:"Hoodies",price:1199,style:"red"},
  {id:3,name:"Essential Sweatshirt",category:"Sweatshirts",price:899,style:"light"},
  {id:4,name:"Street Code Jacket",category:"Jackets",price:1499,style:""},
  {id:5,name:"Everyday Graphic Tee",category:"T-Shirts",price:649,style:"light"},
  {id:6,name:"Urban Hoodie",category:"Hoodies",price:1299,style:""}
];
let cart = [];
let activeSlide = 0;
let slideTimer;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function renderProducts(filter="All"){
  const shown = filter==="All" ? products : products.filter(p=>p.category===filter);
  $("#productGrid").innerHTML = shown.map(p=>`
    <article class="product-card">
      <div class="product-visual ${p.style}"><span>${p.name.includes("Tee")?"ZAN-G":"Z / G"}</span></div>
      <div class="product-info"><h3>${p.name}</h3><p>${p.category} · Demo design</p>
        <div class="product-bottom"><span class="price">₹${p.price.toLocaleString("en-IN")}</span><button class="add-btn" data-add="${p.id}">ADD TO BAG +</button></div>
      </div>
    </article>`).join("");
}
function showToast(message){const t=$("#toast");t.textContent=message;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function setSlide(index){
  activeSlide=(index+3)%3;
  $$(".hero-slide").forEach((s,i)=>s.classList.toggle("active",i===activeSlide));
  $$(".dot").forEach((d,i)=>d.classList.toggle("active",i===activeSlide));
}
function startSlideshow(){clearInterval(slideTimer);slideTimer=setInterval(()=>setSlide(activeSlide+1),5500)}
function openModal(message){
  $("#modalText").textContent=message;
  $("#modalBackdrop").classList.add("show");
}
renderProducts();
$("#year").textContent=new Date().getFullYear();
startSlideshow();
$("#nextSlide").addEventListener("click",()=>{setSlide(activeSlide+1);startSlideshow()});
$("#prevSlide").addEventListener("click",()=>{setSlide(activeSlide-1);startSlideshow()});
$$(".dot").forEach(d=>d.addEventListener("click",()=>{setSlide(Number(d.dataset.dot));startSlideshow()}));
$("#getStarted").addEventListener("click",()=>$("#categories").scrollIntoView({behavior:"smooth"}));
$("#mobileSignIn").addEventListener("click",()=>openModal("Mobile OTP sign-in will need a secure authentication service and an adult-managed business account. This prototype does not ask for or store your phone number."));
$("#gmailSignIn").addEventListener("click",()=>openModal("Google sign-in needs a secure OAuth setup. It is not connected in this front-end prototype, and no Google details are collected."));
$("#accountBtn").addEventListener("click",()=>openModal("Your customer account area will be added after secure sign-in is configured."));
$("#modalClose").addEventListener("click",()=>$("#modalBackdrop").classList.remove("show"));
$("#modalOk").addEventListener("click",()=>$("#modalBackdrop").classList.remove("show"));
$("#modalBackdrop").addEventListener("click",e=>{if(e.target.id==="modalBackdrop")e.currentTarget.classList.remove("show")});
$("#menuBtn").addEventListener("click",()=>$(".nav").classList.toggle("open"));
$("#searchToggle").addEventListener("click",()=>{const q=prompt("Search ZAN-G demo products:");if(q){const found=products.filter(p=>(p.name+" "+p.category).toLowerCase().includes(q.toLowerCase()));showToast(found.length?`${found.length} matching demo product(s) in the collection.`:"No matching demo products found.")}});
$("#filterRow").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;$$(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts(b.dataset.filter)});
$(".category-grid").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;const cat=b.dataset.category;const match=["Hoodies","T-Shirts","Sweatshirts","Jackets"].includes(cat)?cat:"All";$$(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===match));renderProducts(match);$("#featured").scrollIntoView({behavior:"smooth"})});
$("#productGrid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(!b)return;const p=products.find(x=>x.id===Number(b.dataset.add));cart.push(p);$("#cartCount").textContent=cart.length;showToast(`${p.name} added to your demo bag`)});
$("#cartBtn").addEventListener("click",()=>showToast(cart.length?`Your demo bag has ${cart.length} item(s). Checkout is not connected yet.`:"Your bag is empty."));
