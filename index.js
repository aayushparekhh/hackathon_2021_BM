// * text to speech API here
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// -- adding event listener to mic
document.getElementById("mic").addEventListener("click", () => {
  recognition.start();
  recognition.onresult = (e) => {
    let resultIndex = e.resultIndex;
    let transcript = e.results[resultIndex][0].transcript;
    console.log(transcript);
    if (transcript != "") {
      let messageH4 = document.createElement("h4");
      messageH4.innerHTML = transcript;
      messageH4.classList.add("h4-animation");
      document.querySelector(".user-msg-dp").appendChild(messageH4);
      let mesAnimation = document.querySelector(".user-msg-dp h4");
      // -- animating the message disaply
      gsap.from(".h4-animation", { duration: 1, opacity: 0, x: "30%" });
      messageH4.classList.remove("h4-animation");
    }
  };
});
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
  // -- cleaer the input once value is captured
  document.getElementById("user-message").value = "";
  // -- display the user message in user msg div
  if (message != "") {
    // -- creating the parent div
    const userparentDiv = document.createElement("div");
    userparentDiv.classList.add("user");
    // -- creating achild node
    const userMsgDiv = document.createElement("div");
    userMsgDiv.classList.add("user-message");
    userMsgDiv.classList.add("msgAnimation");
    userMsgDiv.innerHTML = message;
    // -- appending child to the parent
    userparentDiv.appendChild(userMsgDiv);
    // -- appending parent to root
    document
      .querySelector(".chats-display-container")
      .appendChild(userparentDiv);
    // -- animaating the child div
    gsap.from(".msgAnimation", { duration: 1, opacity: 0, x: "30%" });
    userMsgDiv.classList.remove("msgAnimation");
  }
  // * creating server document
  // -- server parent div
  let serverParentDiv = document.createElement("div");
  serverParentDiv.classList.add("server");
  // -- appending paret to root
  document
    .querySelector(".chats-display-container")
    .appendChild(serverParentDiv);
  // -- creaitng server child elem
  let serverMsgDiv = document.createElement("div");
  serverMsgDiv.classList.add("server-message");
  // -- appending child to parent
  serverParentDiv.appendChild(serverMsgDiv);
  // * server side message dsiplay here
  if (message.includes("you" || "how are you?" || "You?")) {
    serverMsgDiv.innerHTML = "i am good how are you?";
    serverMsgDiv.classList.add("sdivAnimation");
    gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
    serverMsgDiv.classList.remove("sdivAnimation");
  }
});
