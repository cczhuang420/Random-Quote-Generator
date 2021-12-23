const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const quoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const CompleteLoading = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

let quotes = [];

const getNewQuote = () => {
  loading();
  let newQuote = quotes[Math.floor(Math.random() * quotes.length)];
  if (!newQuote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = newQuote.author;
  }
  if (newQuote.text.length > 100) {
    quoteText.classList.add("long-text");
  } else {
    quoteText.classList.remove("long-text");
  }
  quoteText.textContent = newQuote.text;
  CompleteLoading();
};

const getQuotes = () => {
  loading();
  fetch("https://type.fit/api/quotes")
    .then((response) => response.json())
    .then((data) => {
      quotes = data;
      getNewQuote();
    });
};

const tweet = () => {
  const tweetUrl = `https://twitter.com/intent/tweet?text= ${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweetUrl, "_blank"); // open in new tab
};

quoteBtn.addEventListener("click", getNewQuote);
twitterBtn.addEventListener("click", tweet);

getQuotes();
