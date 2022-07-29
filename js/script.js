fetch("http://localhost:3000/api/teddies")
  .then((response) => response.json())
  .then((data) => addProducts(data));

function addProducts(data) {
  data.forEach((teddy) => {
    const { _id, description, name, imageUrl, price } = teddy;
    console.log(data);
    const article = document.createElement("article");
    article.classList.add("article");
    const articleDescription = document.createElement("div");
    articleDescription.classList.add("article-desc");
    const articleTitle = document.createElement("span");
    articleTitle.classList.add("article-title");
    const image = makeImage(imageUrl);
    const h3 = makeH3(name);
    const star = makeStar();
    const paragraph = makePrice(price);
    const paragraphdescription = makeParagraphdescription(description);
    const hover = makeHover(_id);
    appendChildren(
      article,
      image,
      articleDescription,
      articleTitle,
      h3,
      star,
      paragraph,
      paragraphdescription,
      hover
    );
  });
}
function appendChildren(
  article,
  image,
  articleDescription,
  articleTitle,
  h3,
  star,
  paragraph,
  paragraphdescription,
  hover
) {
  const containerGrid = document.querySelector(".container-grid");
  containerGrid.appendChild(article);
  article.appendChild(image);
  article.appendChild(articleDescription);
  articleDescription.appendChild(articleTitle);
  articleTitle.appendChild(h3);
  for (let i = 0; i < 5; i++) {
    articleTitle.appendChild(star.cloneNode(true));
  }
  articleTitle.appendChild(paragraph);
  articleDescription.appendChild(paragraphdescription);
  article.appendChild(hover);
}

function makeImage(imageUrl) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.classList.add("article-photo");
  return image;
}

function makeH3(name) {
  const h3 = document.createElement("h3");
  h3.textContent = name;
  return h3;
}

function makeStar() {
  const star = document.createElement("img");
  star.src = "../images/star.svg";
  star.classList.add("star");
  return star;
}

function makePrice(price) {
  const paragraph = document.createElement("p");
  paragraph.classList.add("price");
  paragraph.textContent = price + ".00€";
  return paragraph;
}

function makeParagraphdescription(description) {
  const paragraph = document.createElement("p");
  paragraph.textContent = description;
  return paragraph;
}

function makeHover(_id) {
  const hover = document.createElement("span");
  hover.classList.add("buy-it");
  const button = document.createElement("button");
  button.id = "add-to-cart";
  const anchor = document.createElement("a");
  anchor.href = "./product.html?id=" + _id;
  anchor.textContent = "Acheter";
  hover.appendChild(button);
  button.appendChild(anchor);
  return hover;
}
