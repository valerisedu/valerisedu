// Smooth scroll animation

document.querySelectorAll("a").forEach(link => {
link.addEventListener("click", function(e){
if(this.hash !== ""){
e.preventDefault();
const hash = this.hash;

document.querySelector(hash).scrollIntoView({
behavior:"smooth"
});
}
});
});
