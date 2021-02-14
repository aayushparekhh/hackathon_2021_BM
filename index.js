// * preloader javacript here
let finished = false;
let loader = document.querySelector(".loader");
// -- animating the loader text
gsap.from(".loader-text-one", { duration: 1.5, x: "-100%", ease: "bounce" });
gsap.from(".loader-text-two", { duration: 1.5, x: "100%", ease: "bounce" });
setTimeout(() => {
  gsap.to(".color-animator", {
    duration: 4,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    ease: "circ.out",
  });
}, 2000);

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("remove-loader");
  }, 6000);
  return (finished = true);
});

// -- animating the navbar and the footer
setTimeout(() => {
  gsap.from(".chatbot-container", { duration: 2, x: "100%" });
  document.querySelector(".chatbot-container").classList.add("display");
  gsap.from("nav", { duration: 2, y: "-100%", ease: "bounce" });
  gsap.from("footer", { duration: 2, x: "-100%", ease: "bounce" });
}, 6100);

// * taking user display and displaying on the screen

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let message = document.getElementById("user-message").value;
  // -- cleaer the inout once value is captured
  document.getElementById("user-message").value = "";
  // -- display the user messafe in user msg div

  let messageH4 = document.createElement("h4");
  messageH4.innerHTML = message;
  messageH4.classList.add("h4-animation");
  document.querySelector(".user-msg-dp").appendChild(messageH4);
  let mesAnimation = document.querySelector(".user-msg-dp h4");
  // -- animating the message disaply
  gsap.from(".h4-animation", { duration: 1, opacity: 0, x: "30%" });
  messageH4.classList.remove("h4-animation");
  // * creating server document
  let servmessageH4 = document.createElement("h4");
  document.querySelector(".server-message").appendChild(servmessageH4);
  // * server side message dsiplay here
  if (message.includes("how are you" || "how are you?" || "You?")) {
    servmessageH4.innerHTML = "i am good how are you?";
    Document.querySelector(".server-message").appendChild(servmessageH4);
  }
});
