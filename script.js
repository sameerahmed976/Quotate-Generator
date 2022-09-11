import { getElement } from "./utils/getElement.js";
import { getFetch } from "./utils/getFetch.js";
const loading = getElement(".loading");
const loadingTwo = getElement(".loading-2");

const quotesContainer = getElement(".quotes-container");
let page = 12;
let limit = 10;

// getFetch()

const getData = async () => {
  loading.classList.add("show-loading");
  let url = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=${limit}`;

  const { data } = await getFetch(url);

  // console.log("🚀 ~ file: script.js ~ line 15 ~ getData ~ data", data);
  loading.classList.remove("show-loading");
  displayCardQuote(data);
};

const displayCardQuote = (data) => {
  if (!Array.isArray(data)) {
    if (page > 12) {
      loadingTwo.classList.remove("show-loading-2");

      const ele = document.createElement("p");
      ele.className = "end";
      ele.textContent = "the end";
      quotesContainer.appendChild(ele);
      return;
    }
  }

  const htmlData = data
    .map(({ quote, author }) => {
      return `<article class="quote">
          <h1 class="quotes-heading">
            <span class="quote-symbol"
            ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                style="fill: rgba(138, 43, 256, 1)"
              >
                <path
                d="m21.95 8.721-.025-.168-.026.006A4.5 4.5 0 1 0 17.5 14c.223 0 .437-.034.65-.065-.069.232-.14.468-.254.68-.114.308-.292.575-.469.844-.148.291-.409.488-.601.737-.201.242-.475.403-.692.604-.213.21-.492.315-.714.463-.232.133-.434.28-.65.35l-.539.222-.474.197.484 1.939.597-.144c.191-.048.424-.104.689-.171.271-.05.56-.187.882-.312.317-.143.686-.238 1.028-.467.344-.218.741-.4 1.091-.692.339-.301.748-.562 1.05-.944.33-.358.656-.734.909-1.162.293-.408.492-.856.702-1.299.19-.443.343-.896.468-1.336.237-.882.343-1.72.384-2.437.034-.718.014-1.315-.028-1.747a7.028 7.028 0 0 0-.063-.539zm-11 0-.025-.168-.026.006A4.5 4.5 0 1 0 6.5 14c.223 0 .437-.034.65-.065-.069.232-.14.468-.254.68-.114.308-.292.575-.469.844-.148.291-.409.488-.601.737-.201.242-.475.403-.692.604-.213.21-.492.315-.714.463-.232.133-.434.28-.65.35l-.539.222c-.301.123-.473.195-.473.195l.484 1.939.597-.144c.191-.048.424-.104.689-.171.271-.05.56-.187.882-.312.317-.143.686-.238 1.028-.467.344-.218.741-.4 1.091-.692.339-.301.748-.562 1.05-.944.33-.358.656-.734.909-1.162.293-.408.492-.856.702-1.299.19-.443.343-.896.468-1.336.237-.882.343-1.72.384-2.437.034-.718.014-1.315-.028-1.747a7.571 7.571 0 0 0-.064-.537z"
                ></path></svg
                ></span>
                ${quote}
                <span class="quote-author"> ~ ${author}</span>
          </h1>
        </article>`;
    })
    .join(" ");

  quotesContainer.insertAdjacentHTML("beforeend", htmlData);
};

const getDisplayData = () => {
  const timer = setTimeout(() => {
    page++;
    getData();
  }, 1000);

  if (page > 12) {
    loadingTwo.classList.remove("show-loading-2");

    clearTimeout(timer);
    return;
  }
};

// getData();

const getDisplayMore = async () => {
  // console.log(
  //   "🚀 ~ file: script.js ~ line 46 ~ getDisplayMore ~ window.innerHeight",
  //   window.innerHeight
  // );
  // console.log(
  //   "🚀 ~ file: script.js ~ line 46 ~ getDisplayMore ~  window.scrollY",
  //   window.scrollY
  // );
  // console.log("data");
  // if (
  //   window.scrollY + window.innerHeight >
  //   document.documentElement.scrollHeight
  // console.log(
  //   "🚀 ~ file: script.js ~ line 56 ~ getDisplayMore ~ document.documentElement.scrollHeight",
  //   document.documentElement.scrollHeight
  // );
  // ) {
  //   console.log("data");
  //   // displayCardQuote(data);
  // }

  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

  if (clientHeight + scrollTop >= scrollHeight && page < 13) {
    loadingTwo.classList.add("show-loading-2");
    getDisplayData();
    // console.log("data");
  }
  // loading.classList.remove("show-loading");
};

// window.addEventListener("load", getData);
getData();

window.addEventListener("scroll", getDisplayMore, {
  passive: true,
});
