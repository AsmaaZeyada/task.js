var markName = document.getElementById("markName");
var webUrl = document.getElementById("webUrl");
var markList;

//=================================================================
if (localStorage.getItem("bookMarkList") == null) {
  markList = [];
}
else {
  markList = JSON.parse(localStorage.getItem("bookMarkList"));
  display(markList);
}
//===================================================================
function addMark(value) {
  if (checkName(value)) {
    var bookMark = {
      name: markName.value,
      url: webUrl.value
    }
    markList.push(bookMark);
    localStorage.setItem("bookMarkList", JSON.stringify(markList));

    display(markList);
    clearMark(markList);
  }

  else {
    if (value == "" || value == null || value == " ") {
      document.getElementById("msgName").innerHTML = "Name is require";
    }
  }
}

// ===========================================================================
function display(array) {
  var container = ``;
  for (var i = 0; i < array.length; i++) {
    container += `
    <tr class="table-light py-2">
            <td>
              <p class="m-2">${array[i].name}</p>
            </td>
            <td>
              <button id="visitBtn" class="m-2"> <a href="${array[i].url}" target="_blank" class="text-decoration-none text-light">Visit</a></button>
            </td>
            <td>
              <button id="deleteBtn" class="m-2" onclick="deleteMark(${i})">Delete</button>
            </td>
      </tr>
      `};
  document.getElementById("tBody").innerHTML = container;
}

//=========================================================================
function clearMark(array) {
  for (var i = 0; i < array.length; i++) {
    array[i].value = "";
  }
}
//========================================================================
function validateUrl(value) {
  var regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  if (regex.test(value) == true) {
    for (var i = 0; i < markList.length; i++) {
      if (value == markList[i].url) {
        document.getElementById("msgUrl").innerHTML = "this url already exist";
        return false;
      }
      else {
        document.getElementById("msgUrl").innerHTML = "";
        return true;
      }
    }
  }

  else if (value == "" || value == null || value == " ") {
    document.getElementById("msgUrl").innerHTML = "url feild is require";
    document.getElementById("msgUrl").style.border.replace("none", "1px  solid rgb(143, 25, 25)");
    return false;
  }
}
//========================================================================
function deleteMark(deletedIndex) {
  markList.splice(deletedIndex, 1);
  localStorage.setItem("bookMarkList", JSON.stringify(markList));
  display(markList);
}

//=======================================================================

function validateName(value) {
  var regex = /^\w/;
  if (regex.test(value) == true) {
    return true;
  }
  else {
    document.getElementById("msgName").innerHTML="invalid name";
    return false;
  }
}

//=============================================================
function checkName(checkName) {
  if (validateName(checkName)) {
    for (var i = 0; i < markList.length; i++) {
      if (checkName == markList[i].name) {
        document.getElementById("msgName").innerHTML = "name is already exist";
        return false;
      }
      else {
        return true;
      }
    }
  }
}
//==================================================================