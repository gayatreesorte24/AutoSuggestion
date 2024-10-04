import { searchProduct, myDebounce } from "./datautils";

const searchInput = document.getElementById("search-box");
const searchList = document.getElementById("suggestions");

const resetContent = () => {
  searchList.classList.remove("suggestions-visible");
};

const renderList = (list) => {
  const suggestionFragment = document.createDocumentFragment();
  list.forEach((item) => {
    const el = document.createElement("div");
    el.innerText = item;
    el.classList.add("dropdown-item");
    el.setAttribute("data-key", item);
    suggestionFragment.appendChild(el);
  });
  searchList.innerHTML = "";
  searchList.appendChild(suggestionFragment);
};

const handleSearch = async (keyword) => {
  try {
    const result = await searchProduct(keyword);
    if (result.length) {
      searchList.classList.add("suggestions-visible");
      renderList(result);
    }
    // renderList(result);
  } catch (e) {
    console.log("error in fetching suggestions");
  }
};

const handleInputChange = (e) => {
  const keyword = e.target.value;
  if (keyword) {
    handleSearch(keyword);
  } else {
    resetContent();
  }
};

const handleValueClick = (e) => {
  const { key } = e.target.dataset;
  if (key) {
    searchInput.value = key;
    resetContent();
  }
};

(() => {
  document.addEventListener("input", myDebounce(handleInputChange, 300));
  searchList.addEventListener("click", handleValueClick);
})();
