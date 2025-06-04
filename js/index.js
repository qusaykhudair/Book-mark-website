var siteNameInput = document.getElementById("bookname");
var siteURLInput = document.getElementById("linkBox");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".data-info");

bookmarks = [];

if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  displayBookmarks(bookmarks);
}

function SubmitClick() {
  if (!isValidInput()) {
    boxModal.classList.remove("d-none");
    return;
  }

  var newBookmark = {
    siteName: capitalize(siteNameInput.value),
    siteURL: siteURLInput.value.trim(),
  };

  bookmarks.unshift(newBookmark);
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
  displayBookmarks(bookmarks);
  clearInputs();
}

function isValidInput() {
  return (
    siteNameInput.classList.contains("is-valid") &&
    siteURLInput.classList.contains("is-valid")
  );
}

function displayBookmarks(bookmarksArray) {
  var content = "";

  for (var i = 0; i < bookmarksArray.length; i++) {
    var bookmark = bookmarksArray[i];
    var finalURL = bookmark.siteURL.startsWith("http")
      ? bookmark.siteURL
      : `https://${bookmark.siteURL}`;

    content += `
    <tr>
      <td>${i + 1}</td>
      <td>${bookmark.siteName}</td>
      <td>
        <button class="btn btn-visit" onclick="visitSite('${finalURL}')">
          <i class="fa-solid fa-eye pe-2"></i> Visit
        </button>
      </td>
      <td>
        <button class="btn btn-delete" onclick="deleteBookmark(${i})">
          <i class="fa-solid fa-trash-can"></i> Delete
        </button>
      </td>
    </tr>
  `;
  }

  tableContent.innerHTML = content;
}

function clearInputs() {
  siteNameInput.value = "";
  siteURLInput.value = "";
  siteNameInput.classList.remove("is-valid", "is-invalid");
  siteURLInput.classList.remove("is-valid", "is-invalid");
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
  displayBookmarks(bookmarks);
}

function visitSite(url) {
  window.open(url, "_blank");
}

function isValidInput() {
  var nameRegex = /^\w{3,}(\s+\w+)*$/;
  var urlRegex =
    /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(com|edu|net|org|gov)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
  var isNameValid = nameRegex.test(siteNameInput.value);
  var isURLValid = urlRegex.test(siteURLInput.value);

  toggleValidationStyle(siteNameInput, isNameValid);
  toggleValidationStyle(siteURLInput, isURLValid);

  return isNameValid && isURLValid;
}

function toggleValidationStyle(input, isValid) {
  input.classList.toggle("is-valid", isValid);
  input.classList.toggle("is-invalid", !isValid);
}

function addEventListener() {
  boxModal.classList.add("d-none");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") boxModal.classList.add("d-none");
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("data-info")) {
    boxModal.classList.add("d-none");
  }
});
