const form = document.getElementById("form");
const input = document.getElementById("inputvlaue");
const paragraph1 = document.getElementById("p1");
const paragraph2 = document.getElementById("p2");
const paragraph3 = document.getElementById("p3");
const paragraph4 = document.getElementById("p4");
const paragraph5 = document.getElementById("p5");
const paragraph6 = document.getElementById("p6");
const img = document.getElementById("img");
const error = document.getElementById("error-div");
const loader = document.getElementsByClassName("loader")[0];
console.log(paragraph1.innerText);
if (!paragraph1.innerText) {
  error.innerText = "Input is Empty";
}
form.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    error.innerText = "";
    img.src = "";
    paragraph1.innerText = "";
    paragraph2.innerText = "";
    paragraph3.innerText = "";
    paragraph4.innerText = "";
    paragraph5.innerText = "";
    paragraph6.innerText = "";
    loader.style.display = "block";
    let inputValue = input.value;
    const api = await fetch(`https://api.github.com/users/${inputValue}`);
    let jsonFormatChange = await api.json();
    console.log(jsonFormatChange);

    loader.style.display = "none";
    console.log(event.target.value);

    if (jsonFormatChange.status == 404) {
      img.src = "";
      error.innerText = jsonFormatChange.message;
      error.style.color = "red";
    }
    console.log(jsonFormatChange);
    img.src = jsonFormatChange.avatar_url;
    paragraph1.innerText = `Name :${
      jsonFormatChange.login ? jsonFormatChange.login : jsonFormatChange.message
    }`;
    paragraph2.innerText = `Followers :${
      jsonFormatChange.followers
        ? jsonFormatChange.followers
        : jsonFormatChange.message
    }`;
    paragraph3.innerText = `Following :${
      jsonFormatChange.following
        ? jsonFormatChange.following
        : jsonFormatChange.message
    }`;
    paragraph4.innerText = `Repositere :${
      jsonFormatChange.public_repos
        ? jsonFormatChange.public_repos
        : jsonFormatChange.message
    }`;
    paragraph5.innerText = `Create Account :${
      jsonFormatChange.created_at
        ? jsonFormatChange.created_at
        : jsonFormatChange.message
    }`.slice(0, 23);
    paragraph6.innerText = `Last Update :${
      jsonFormatChange.updated_at
        ? jsonFormatChange.updated_at
        : jsonFormatChange.message
    }`.slice(0, 20);
    event.target.reset("");
  } catch (error) {
    console.log(error.message);
  }
});
