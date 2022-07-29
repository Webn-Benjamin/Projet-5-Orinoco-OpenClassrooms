const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
if (id != null) {
  let itemPrice = 0;
  let imgUrl;
  let nameproduct;
}

fetch("http://localhost:3000/api/teddies/" + id)
  .then((response) => response.json())
  .then((res) => handleData(res));

function handleData(teddy) {
  const { colors, description, imageUrl, name, price } = teddy;
  itemPrice = price;
  imgUrl = imageUrl;
  nameproduct = name;
  const image = makeImage(imageUrl);
  const h1 = makeName(name);
  const star = makeStar();
  const notice = makeNotice();
  const stock = makeStock();
  const paragraph = makeDescription(description);

  makeQuantity();
  makeColors(colors);
  appendChild(image, h1, star, notice, stock, paragraph);
}

function appendChild(image, h1, star, notice, stock, paragraph) {
  const productImg = document.querySelector(".product-img");
  productImg.appendChild(image);
  const name = document.querySelector(".product-desc");
  name.appendChild(h1);
  name.prepend(h1);
  const productRate = document.querySelector(".product-rates");
  for (let i = 0; i < 5; i++) {
    productRate.appendChild(star.cloneNode(true));
  }
  productRate.appendChild(notice);
  productRate.appendChild(stock);
  const productDescription = document.querySelector(".desc");
  productDescription.appendChild(paragraph);
}

function makeImage(imageUrl) {
  const image = document.createElement("img");
  image.id = "product-img";
  image.src = imageUrl;
  return image;
}

function makeName(name) {
  const h1 = document.createElement("h1");
  h1.textContent = "Ours en peluche " + '"' + name + '"';
  return h1;
}

function makeStar() {
  const star = document.createElement("img");
  star.src = "../images/star.svg";
  star.classList.add("star");
  return star;
}

function makeNotice() {
  const notice = document.createElement("a");
  notice.href = "../html/index.html";
  notice.textContent = "25 Avis";
  return notice;
}

function makeStock() {
  const paragraph = document.createElement("p");
  paragraph.textContent = "En stock";
  return paragraph;
}

function makeDescription(description) {
  const paragraph = document.createElement("p");
  paragraph.textContent = description;
  return paragraph;
}

function makeColors(colors) {
  const select = document.querySelector("#colors");
  if (select != null) {
    colors.forEach(function (color) {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      select.appendChild(option);
    });
  }
}

function makeQuantity() {
  const select = document.querySelector("#quantity");

  let option = document.createElement("option");
  option.value = 1;
  option.textContent = "1";
  let option2 = document.createElement("option");
  option2.value = 2;
  option2.textContent = "2";
  let option3 = document.createElement("option");
  option3.value = 3;
  option3.textContent = "3";
  select.appendChild(option);
  select.appendChild(option2);
  select.appendChild(option3);
}

const button = document.querySelector("#buy");
if (button !== null) {
  button.addEventListener("click", (e) => {
    const color = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;
    if (color == null || color === "" || quantity === "" || quantity == null) {
      alert("Veuillez choisir la couleur et la quantitée");
      return;
    }
    savetocart(color, quantity);
    window.location.href = "cart.html";
  });
}

function savetocart(color, quantity) {
  const databuy = {
    id: id,
    color: color,
    quantity: Number(quantity),
    price: itemPrice,
    imageUrl: imgUrl,
    name: nameproduct,
  };
  localStorage.setItem(id, JSON.stringify(databuy));
}
