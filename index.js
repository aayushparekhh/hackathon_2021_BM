// * RESPONSE ARRAYS HERE
// * array for INITIAL responoses

// * audio file for notification
let notiAudio = new Audio("./sound/msg-noti.wav");

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

    if (transcript != "") {
      // -- creating a parent div
      let micParent = document.createElement("div");
      micParent.classList.add("user");
      // -- appending to the root
      document.querySelector(".chats-display-container").appendChild(micParent);
      // -- creatung a child node
      let micChild = document.createElement("div");
      micChild.classList.add("user-message");
      micChild.classList.add("mcAnimation");
      micChild.innerHTML = transcript;
      // -- apending child to parent
      micParent.appendChild(micChild);
      // -- animating the message disaply
      gsap.from(".mcAnimation", { duration: 1, opacity: 0, x: "30%" });
      messageH4.classList.remove("mcAnimation");
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
  gsap.from(".chatbot-container", { duration: 1.5, x: "100%" });
  document.querySelector(".chatbot-container").classList.add("display");
  gsap.from("nav", { duration: 1.5, y: "-100%", ease: "bounce" });
  gsap.from("footer", { duration: 1.5, x: "-100%", ease: "bounce" });
}, 6100);
// * first server message function
let serverFirstMessage = (userName) => {
  // -- checking if the userName is empty
  if (userName === "") {
    userName = "rajkotian";
  }
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
  serverMsgDiv.innerHTML =
    "Hey " +
    userName +
    " This is RMC’s virtual assistant, How can I help you? ";

  serverMsgDiv.classList.add("sdivAnimation");
  gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
  notiAudio.play();
  serverMsgDiv.classList.remove("sdivAnimation");
};
// * modal for name and email here
setTimeout(() => {
  let modalBg = document.querySelector(".modal-bg");
  modalBg.classList.add("bg-active");
  const modalClose = document.querySelector(".modal-submit");
  modalClose.addEventListener("click", () => {
    modalBg.classList.remove("bg-active");
    // -- getting user name
    var userName = document.getElementById("user-name").value;
    serverFirstMessage(userName);
  });
}, 7000);

// * taking user display and displaying on the screen

document.querySelector("form").addEventListener("submit", (e) => {
  notiAudio.pause();
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

  // * after first message here
  // -- server parent div
  notiAudio.currentTime = 0;
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
  // -- if block  1 here
  if (
    message.includes("hello") ||
    message.includes("hey") ||
    message.includes("you")
  ) {
    // -- randomly displaying a message from the array
    serverMsgDiv.innerHTML =
      responseOne[Math.floor(Math.random() * responseOne.length)];
    serverMsgDiv.classList.add("sdivAnimation");
    gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
    notiAudio.play();
    serverMsgDiv.classList.remove("sdivAnimation");
  }
  // -- if block  2 here
  else if (
    message.includes("function") ||
    message.includes("query") ||
    message.includes("services")
  ) {
    responseTwo.forEach((index) => {
      fucnUl = document.createElement("ul");
      fucnUl.classList.add("server");
      document.querySelector(".chats-display-container").appendChild(fucnUl);
      const li = document.createElement("li");
      li.classList.add("sdivAnimation");
      li.classList.add("server-message");
      li.innerHTML = index;
      fucnUl.appendChild(li);
      serverMsgDiv.classList.add("sdivAnimation");
      gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
      notiAudio.play();
      li.classList.remove("sdivAnimation");
    });
  }
  // -- if block  3 here
  else if (
    message.includes("what is") ||
    message.includes("rmc") ||
    message.includes("rajkot municipal corporation") ||
    message.includes("what")
  ) {
    serverMsgDiv.innerHTML = responseThree[0];
    serverMsgDiv.classList.add("sdivAnimation");
    gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
    notiAudio.play();
    serverMsgDiv.classList.remove("sdivAnimation");
  }
  // -- if block  4 here
  else if (message.includes("about")) {
    responseFour.forEach((index) => {
      fucnUl = document.createElement("ul");
      fucnUl.classList.add("server");
      document.querySelector(".chats-display-container").appendChild(fucnUl);
      const li = document.createElement("li");
      li.classList.add("sdivAnimation");
      li.classList.add("server-message");
      li.innerHTML = index;
      fucnUl.appendChild(li);
      serverMsgDiv.classList.add("sdivAnimation");
      gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
      notiAudio.play();
      li.classList.remove("sdivAnimation");
    });
  }
  // -- if block  5 here
  else if (
    message.includes("members") ||
    message.includes("workers") ||
    message.includes("staff") ||
    message.includes("employees") ||
    message.includes("work") ||
    message.includes("job")
  ) {
    let membersArray = [
      `The Mayor heads the Municipal Corporation`,
      `The corporation remains under the charge of Municipal Commissioner`,
      `The Executive Officers along with the Mayor and Councillors monitor and implement the programs related to planning the development of the corporation.`,
    ];

    membersArray.forEach((index) => {
      fucnUl = document.createElement("ul");
      fucnUl.classList.add("server");
      document.querySelector(".chats-display-container").appendChild(fucnUl);
      const li = document.createElement("li");
      li.classList.add("sdivAnimation");
      li.classList.add("server-message");
      li.innerHTML = index;
      fucnUl.appendChild(li);
      serverMsgDiv.classList.add("sdivAnimation");
      gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
      notiAudio.play();
      li.classList.remove("sdivAnimation");
    });
  }
  // -- if block  6 here
  else if (
    message.includes("elections") ||
    message.includes("eligiblity") ||
    message.includes("staff") ||
    message.includes("Qualification") ||
    message.includes("contesting") ||
    message.includes("age")
  ) {
    responseFive.forEach((index) => {
      fucnUl = document.createElement("ul");
      fucnUl.classList.add("server");
      document.querySelector(".chats-display-container").appendChild(fucnUl);
      const li = document.createElement("li");
      li.classList.add("sdivAnimation");
      li.classList.add("server-message");
      li.innerHTML = index;
      fucnUl.appendChild(li);
      serverMsgDiv.classList.add("sdivAnimation");
      gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
      notiAudio.play();
      li.classList.remove("sdivAnimation");
    });
  }
  // -- if block  7 here
  else if (
    message.includes("how elections") ||
    message.includes("How are Municipal Corporation Elections conducted?") ||
    message.includes("conducted") ||
    message.includes("elections conducted") ||
    message.includes("how are elections")
  ) {
    serverMsgDiv.innerHTML = responseSix[0];
    serverMsgDiv.classList.add("sdivAnimation");
    gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
    notiAudio.play();
    serverMsgDiv.classList.remove("sdivAnimation");
  }
  // -- if block  8 here
  else if (
    message.includes("Who conducts Municipal Corporation Elections") ||
    message.includes("who elections?") ||
    message.includes("who conduct")
  ) {
    serverMsgDiv.innerHTML = `The elections to the Municipal Corporations are conducted under the guidance, direction, superintendence and control of the State Election Commission.`;
    serverMsgDiv.classList.add("sdivAnimation");
    gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
    notiAudio.play();
    serverMsgDiv.classList.remove("sdivAnimation");
  }
  // -- if block  9 here
  else if (
    message.includes("composed") ||
    message.includes("Composition") ||
    message.includes("who is") ||
    message.includes("RMC Composition")
  ) {
    serverMsgDiv.innerHTML = `Based on the population of that particular city, the city or Municipal Area is divided into certain wards. A representative is chosen for each ward by the people in that ward. A chosen representative of a particular ward is called a councilor or corporator. `;
    serverMsgDiv.classList.add("sdivAnimation");
    gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
    notiAudio.play();
    serverMsgDiv.classList.remove("sdivAnimation");
  }
  // -- if block  9 here
  else if (
    message.includes("pay tax") ||
    message.includes("tax") ||
    message.includes("propery tax")
  ) {
    let taxString = `For tax related queries or paying it click this link`;
    let taxLink = taxString.link(
      "https://www.rmcegov.gov.in/payonline/propertytax.php"
    );
    serverMsgDiv.innerHTML = taxLink;
    serverMsgDiv.classList.add("sdivAnimation");
    gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
    notiAudio.play();
    serverMsgDiv.classList.remove("sdivAnimation");
  }
  // -- if block  10 here
  else if (
    message.includes("water tax") ||
    message.includes("water") ||
    message.includes("water charge")
  ) {
    let taxString = `For  water tax related queries or paying it click this link`;
    let taxLink = taxString.link(
      "https://www.rmcegov.gov.in/payonline/watertax.php"
    );
    serverMsgDiv.innerHTML = taxLink;
    serverMsgDiv.classList.add("sdivAnimation");
    gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
    notiAudio.play();
    serverMsgDiv.classList.remove("sdivAnimation");
  }
  // -- if block  11 here
  else if (
    message.includes("community Hall Booking") ||
    message.includes("hall booking") ||
    message.includes("hall")
  ) {
    let taxString = `For  hall/booking related queries please click this me`;
    let taxLink = taxString.link(
      "http://www.rmc.gov.in/rmcwebsite/hall_booking.aspx"
    );
    serverMsgDiv.innerHTML = taxLink;
    serverMsgDiv.classList.add("sdivAnimation");
    gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
    notiAudio.play();
    serverMsgDiv.classList.remove("sdivAnimation");
  }
  // -- if block  12 here
  else if (message.includes("sports")) {
    let taxString = `For  sports registration related queries please click this me`;
    let taxLink = taxString.link(
      "http://www.rmc.gov.in/rmcwebsite/frm_sports_member_master.aspx"
    );
    serverMsgDiv.innerHTML = taxLink;
    serverMsgDiv.classList.add("sdivAnimation");
    gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
    notiAudio.play();
    serverMsgDiv.classList.remove("sdivAnimation");
  }
  // -- if block  13 here
  else if (
    message.includes("e-Memo") ||
    message.includes("memo") ||
    message.includes("Memo")
  ) {
    let taxString = `For  E-Memo related queries please click this me`;
    let taxLink = taxString.link(
      "http://www.rmc.gov.in/rmcwebsite/frm_ememo_payment.aspx"
    );
    serverMsgDiv.innerHTML = taxLink;
    serverMsgDiv.classList.add("sdivAnimation");
    gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
    notiAudio.play();
    serverMsgDiv.classList.remove("sdivAnimation");
  }
  // -- if block  14 here
  else if (message.includes("complain")) {
    let taxString = `For  Complain status/registration cilck me`;
    let taxLink = taxString.link(
      "http://www.rmc.gov.in/rmcwebsite/complaintstatus.aspx"
    );
    serverMsgDiv.innerHTML = taxLink;
    serverMsgDiv.classList.add("sdivAnimation");
    gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
    notiAudio.play();
    serverMsgDiv.classList.remove("sdivAnimation");
  }
  // -- if block  15 here
  else if (
    message.includes("Right To Information Act") ||
    message.includes("rti") ||
    message.includes("RTI")
  ) {
    let rtiString = `R.T.I. Application Status`;
    let rtiStringLink = rtiString.link(
      `http://www.rmc.gov.in/rmcwebsite/rti.aspx`
    );
    let rtiStwo = `R.T.I. Proactive Disclosure
    `;
    let rtilinkTwo = rtiStwo.link(`http://www.rmc.gov.in/rmcwebsite/rti.aspx`);
    let triLink = [rtiStringLink, rtilinkTwo];
    triLink.forEach((index) => {
      fucnUl = document.createElement("ul");
      fucnUl.classList.add("server");
      document.querySelector(".chats-display-container").appendChild(fucnUl);
      const li = document.createElement("li");
      li.classList.add("sdivAnimation");
      li.classList.add("server-message");
      li.innerHTML = index;
      fucnUl.appendChild(li);
      serverMsgDiv.classList.add("sdivAnimation");
      gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
      notiAudio.play();
      li.classList.remove("sdivAnimation");
    });
  }
  // -- if block  16 here
  else if (message.includes("Birth Certificate")) {
    let taxString = `For  Birth Certificate
queries cilck me`;
    let taxLink = taxString.link(
      "http://www.rmc.gov.in/rmcwebsite/birth_certificate.aspx"
    );
    serverMsgDiv.innerHTML = taxLink;
    serverMsgDiv.classList.add("sdivAnimation");
    gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
    notiAudio.play();
    serverMsgDiv.classList.remove("sdivAnimation");
  }
  // -- if block  17 here
  else if (message.includes("bus pass")) {
    let taxString = `For  bus pass related
queries cilck me`;
    let taxLink = taxString.link(
      "http://www.rmc.gov.in/rmcwebsite/frm_rajpath_registration.aspx"
    );
    serverMsgDiv.innerHTML = taxLink;
    serverMsgDiv.classList.add("sdivAnimation");
    gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
    notiAudio.play();
    serverMsgDiv.classList.remove("sdivAnimation");
  }
  // -- if block  18 here
  else if (message.includes("vehicle") || message.includes("vehicle Tax")) {
    let taxString = `For  vehicle tax related
queries cilck me`;
    let taxLink = taxString.link(
      "http://www.rmc.gov.in/rmcwebsite/frm_vt_home.aspx"
    );
    serverMsgDiv.innerHTML = taxLink;
    serverMsgDiv.classList.add("sdivAnimation");
    gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
    notiAudio.play();
    serverMsgDiv.classList.remove("sdivAnimation");
  }
  // -- if block  19 here
  else if (
    message.includes("Shop and Establishment") ||
    message.includes("Shop") ||
    message.includes("Establishment")
  ) {
    let rtiString = `for FORM  A click me`;
    let rtiStringLink = rtiString.link(
      `http://www.rmc.gov.in/rmcwebsite/docs/shop_esta/Shop%20form%20A.pdf`
    );
    let rtiStwo = `for FORM D click me
    `;
    let rtilinkTwo = rtiStwo.link(
      `http://www.rmc.gov.in/rmcwebsite/docs/shop_esta/Shop%20Form%20D.pdf`
    );
    let fromE = `for FROM E click me`;
    let fromELink = fromE.link(
      `http://www.rmc.gov.in/rmcwebsite/docs/shop_esta/shop%20form%20E.pdf`
    );

    let triLink = [rtiStringLink, rtilinkTwo, fromELink];
    triLink.forEach((index) => {
      fucnUl = document.createElement("ul");
      fucnUl.classList.add("server");
      document.querySelector(".chats-display-container").appendChild(fucnUl);
      const li = document.createElement("li");
      li.classList.add("sdivAnimation");
      li.classList.add("server-message");
      li.innerHTML = index;
      fucnUl.appendChild(li);
      serverMsgDiv.classList.add("sdivAnimation");
      gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
      notiAudio.play();
      li.classList.remove("sdivAnimation");
    });
  }

  // * else block if nothing mathces
  else {
    serverMsgDiv.innerHTML = `I did not get that,click me to see a list of commands`;
    // -- displaying the commands div
    serverMsgDiv.addEventListener("click", () => {
      document
        .querySelector(".commands-modal")
        .classList.add("commands-modal-active");
      // -- close button closing the div
      document.getElementById("close-btn").addEventListener("click", () => {
        document
          .querySelector(".commands-modal")
          .classList.remove("commands-modal-active");
      });
    });
    serverMsgDiv.classList.add("sdivAnimation");
    gsap.from(".sdivAnimation", { duration: 1, opacity: 0, x: "-30%" });
    notiAudio.play();
    serverMsgDiv.classList.remove("sdivAnimation");
  }
  // * making chatbot scroll down to latest text
  let chatBotCon = document.querySelector(".chats-display-container");
  chatBotCon.scrollTop = chatBotCon.scrollHeight;
});

let responseOne = [
  `Hello, How may I help you?`,
  `Hello!,I am your virtual assistant. If you have any questions about RMC I am here to help.`,
  `Hello! I help citizens of Rajkot to address their queries and provide them relevant information regarding Rajkot Municipal Corporation. `,
  `Got any questions? I am happy to help`,
  `Hey, do you need any help?`,
];

// -- array for QUERIES
// * making a fucnt for rendring services
let responseTwo = [
  `Urban planning including town planning`,
  `  b.Regulation of land-use and construction of buildings.`,
  `Planning for economic and social development.`,
  `Water supply for domestic, industrial and commercial purposes.`,
  `Public health, sanitation conservancy and solid waste management.`,
  `Fire services.`,
];

let responseThree = [
  `The urban local government which works for the development of any Metropolitan City with a population of more than one million is known as the Municipal Corporation in India. `,
];

let responseFour = [
  `Municipal Corporations are local level governments in India`,
  `It’s also called as Mahanagar Palika, Nagar Palika, Nagar Nigam, City Corporation, etc.`,
  `A city is administered by a Municipal Corporation if the population of that city exceeds one billion `,
];

let responseFive = [
  `.She/he must be a citizen of India`,
  `She/he must have attained the age of 21 years`,
  `His/her name is registered in the Electoral Roll of a ward`,
  `She/he is not earlier disqualified for contesting Municipal Corporation elections`,
  `She/he must not be an employee of any Municipal Corporation in India`,
];
let responseSix = [
  `The members of the Municipal Corporation are elected by the people through direct elections. The elections are held for a particular ward in the city.. The electoral roll for each ward is divided into one or several parts depending upon the area within the ward where the voters of each part reside.`,
];
let commandArray = [
  `tax`,
  "job",
  "elections",
  "Complain Registration",
  "Vehicle Tax",
  "Property Tax Payment",
  "Water/Water Charge/Water Tax",
  "Community Hall Booking / Hall Booking / Hall",
  "Sports Registration",
  " E-Memo/ E-Memo Payment",
  "Complain Status",
  " Right To Information Act",
  "FORM A",
  "FORM D",
  ". FORM E",
  "New Registration Procedure (PDF)",
  "Registration Renew Procedure (PDF)",
  " Changes in Registration Procedure (PDF)",
  "Registration Cancellation Procedure (PDF)",
  " New Shop Registration ",
  " Rajkot City Bus Pass /  Bus Pass  / Bus  / Pass",
  "Birth Certificate",
  "Budget",
];
