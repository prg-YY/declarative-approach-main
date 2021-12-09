let ourData = []
render()

const ourForm = document.querySelector("#ourForm")

function loadData() {
  if (localStorage.getItem("ourData")) {
    ourData = JSON.parse(localStorage.getItem("ourData"))
  }
}

loadData()
render()

//save data
function saveData() {
  localStorage.setItem("ourForm", JSON.stringify(ourData))
}

function render() {
  document.querySelector(
    "#app"
  ).innerHTML = `<form onsubmit="submitHandler(event)">
  <input id="ourField" type="text" autocomplete="off" />
  <button>Create Item</button>
  </form>
  
 <ul>
 ${ourData
   .map(function (item) {
     return `<li>${item.value} <button data-value="${item.value}" data-id="${item.id}" onclick="updateMe(this)">Edit</button> <button onclick="deleteMe(this)" data-id="${item.id}">Delete</button></li>`
   })
   .join("")}
   </ul>
  `
}

//update
function updateMe(el) {
  const idToUpdate = el.gettAttribute("data-id")
  let newValue = prompt("ENter new value", el.gettAttribute("data-value"))
  if (newValue) {
    ourData = ourData.map(function (item) {
      if (item.id === idToUpdate) {
        item.value = newValue
      }
      return item
    })
    saveData()
  }
}
//delete
function deleteMe(el) {
  const idToDelete = el.gettAttribute("data-id")
  ourData = ourData.filter(function (item) {
    return item.id != idToDelete
  })  
  saveData()
}

//submit handler
function submitHadler(e) {
  e.prevenDefault()
  ourData.push({
    value: document.querySelector("#ourField").value,
    id: Date.now(),
  })
  saveData()
}
