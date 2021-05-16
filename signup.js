const signup = "https://rbds-attendance.herokuapp.com/user/signup";
const formEl = document.getElementById("signupform");

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(formEl);
  var formDataSerialized = Object.fromEntries(formData);
  console.log(formDataSerialized);
  try {
    const response = await fetch(signup, {
      method: "POST",
      body: JSON.stringify(formDataSerialized),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (json.message == "user created") {
      return window.location.replace("login.html");
    } else {
      alert("user already exists");
    }
  } catch (e) {
    console.error(e);
    alert("there as an error");
  }
});
