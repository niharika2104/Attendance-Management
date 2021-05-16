const login = "https://rbds-attendance.herokuapp.com/user/login";
const formEl1 = document.getElementById("loginform");
const startSession =
  "https://rbds-attendance.herokuapp.com/attendance/startSession";
const endSession =
  "https://rbds-attendance.herokuapp.com/attendance/endSession";
const formEl2 = document.getElementById("startcard");
const formEl3 = document.getElementById("stopcard");
const currentSessoionActive = false;
let json;
let tokenstorage;

if (formEl1) {
  formEl1.addEventListener("submit", async (e) => {
    e.preventDefault();
    var formData = new FormData(formEl1);
    var formDataSerialized = Object.fromEntries(formData);
    console.log(formDataSerialized);
    try {
      var response = await fetch(login, {
        method: "POST",
        body: JSON.stringify(formDataSerialized),
        headers: {
          "Content-Type": "application/json",
        },
      });
      json = await response.json();
      console.log(json);
      sessionStorage.setItem("token", json.token);

      if (json.message == "Auth successful") {
        myFunc();
      }
    } catch (e) {
      console.error(e);
      alert("there as an error");
    }
  });
}

const startSessionFn = async () => {
  tokenstorage = sessionStorage.getItem("token");
  const res = await fetch(startSession, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenstorage}`,
      "Content-Type": "application/json",
    },
  });
  console.log(res);
  if (res.status == 200) {
    console.log("session started");
    $("#sessionStartBtn").addClass("hide");
    $("#sessionEndBtn").removeClass("hide");
  }
};

const stopSessionFn = async () => {
  const res = await fetch(endSession, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenstorage}`,
      "Content-Type": "application/json",
    },
  });
  console.log(res);
  if (res.status == 200) {
    console.log("session ended");
  }
};

function myFunc() {
  if (json.message == "Auth successful") {
    window.location.replace("dashboard.html");
  } else {
    alert("Invalid Credentials");
  }
}
