const login = "https://rbds-attendance.herokuapp.com/user/login";
const formEl1 = document.getElementById("loginform");
const startSession =
  "https://rbds-attendance.herokuapp.com/attendance/startSession";
const endSession =
  "https://rbds-attendance.herokuapp.com/attendance/endSession";

let json;
let tokenstorage;

const Login = async () => {
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
};

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
    $("#sessionEndBtn").addClass("hide");
    $("#sessionStartBtn").removeClass("hide");
  }
};

const logout = async () => {
  sessionStorage.removeItem("token");
  console.log(sessionStorage.getItem("token"));
  window.location.replace("login.html");
};

function myFunc() {
  if (json.message == "Auth successful") {
    window.location.replace("dashboard.html");
  } else {
    alert("Invalid Credentials");
  }
}
