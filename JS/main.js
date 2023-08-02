var bookmarkName = document.getElementById("bookmarkName");
var siteUrl = document.getElementById("siteUrl");
var bookmarkList = [];

if (localStorage.getItem("bookmarkList") == null) {
    bookmarkList = [];
} else {
    bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
    displayBookmarkSite(bookmarkList);
}

function addBookmark() {
    if (validateBookmarkName() == true) {
        var bookmark = {
            name: bookmarkName.value,
            url: siteUrl.value,
        }
        bookmarkList.push(bookmark);
        clearList()
        displayBookmarkSite(bookmarkList);
        localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    } else {
        alert("invalide site name");
    }
}


function clearList() {
    bookmarkName.value = ""
    siteUrl.value = ""
}

function displayBookmarkSite(bookmark) {
    var cartona = ``;
    for (var i = 0; i < bookmark.length; i++) {
        cartona += `<tr>
        <td>${i + 1}</td>
        <td>${bookmark[i].name}</td>
        <td>
            <button onclick="visitWebsite(${i})" class="visitBtn rounded p-2">
                <i class="fa-solid fa-eye"></i>
                <span>Visit</span>
            </button>
        </td>
        <td>
            <button onclick="deleteWebsite(${i})" class="deleteBtn rounded p-2">
                <i class="fa-solid fa-trash-can"></i>
                <span>Delete</span>
            </button>
        </td>
    </tr>`;
    }
    document.getElementById("tBody").innerHTML = cartona;
}


function deleteWebsite(index) {
    bookmarkList.splice(index, 1);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    displayBookmarkSite(bookmarkList);
}

function visitWebsite() {
    var url = document.getElementById("siteUrl").value;
    window.open(url, "_blank");
}



function validateBookmarkName() {
    var regex = /^[A-Z][a-z]{3,}$/;
    if (regex.test(bookmarkName.value) == true) {
        bookmarkName.style.border = "none";
        document.getElementById("wrongName").classList.add("d-none");
        return true;
    } else {
        bookmarkName.style.border = "2px solid red";
        document.getElementById("wrongName").classList.remove("d-none");
        return false;
    }
}


function validateWebsiteUrl() {
    var regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    if (regex.test(siteUrl.value) == true) {
        siteUrl.style.border = "none";
        document.getElementById("wrongUrl").classList.add("d-none");
        return true;
    } else {
        siteUrl.style.border = "2px solid red";
        document.getElementById("wrongUrl").classList.remove("d-none");
        return false;
    }
}