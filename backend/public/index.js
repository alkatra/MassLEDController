//<div class="d-inline-flex p-2">I'm an inline flexbox container!</div>
const url = "http://54.208.202.63:5000/api/";

async function authenticate() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let urlx = url + "login";

  await fetch(urlx, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username: username, password: password }),
  }).then((response) => {
    console.log(response);
    if (response.status == 200) {
      var hostname = location.hostname;
      window.location = `http://${hostname}:5000/list`;
    }
  });
}
