// let todoDatas = [
//   { id: "1", name: "Complete online javascript course", checked: false },
// ];
let theme = "dark";
const themeBtn = document.querySelector(".theme");
themeBtn.addEventListener("click", (e) => {
  const bodyTag = document.querySelector("body");
  const checkContainer = document.querySelector(".check-container");
  const statusClearContainer = document.querySelector(
    ".status-clear-container"
  );
  const footerNav = document.querySelector(".footer-nav");
  if (theme === "dark") {
    theme = "light";
    e.target.src = "./images/icon-moon.svg";
    bodyTag.style.backgroundImage = "url('./images/bg-mobile-light.jpg')";
    bodyTag.style.backgroundColor = "#f6f6f8";
    checkContainer.style.backgroundColor = "white";
    statusClearContainer.style.backgroundColor = "white";
    footerNav.style.backgroundColor = "white";
    updateUI();
    return;
  }
  theme = "dark";
  e.target.src = "./images/icon-sun.svg";
  bodyTag.style.backgroundImage = "url('./images/bg-mobile-dark.jpg')";
  bodyTag.style.backgroundColor = "#161722";
  checkContainer.style.backgroundColor = "#25273c";
  statusClearContainer.style.backgroundColor = "#25273c";
  footerNav.style.backgroundColor = "#25273c";
  updateUI();
});

const todoListInput = document.querySelector("#todo-input");
let todoListContainer = document.querySelector("ul");
// let todoListContainer = document.createElement("ul");
// todoListContainer.classList.add("list-container");
let Todos;
let activeTodos;
let completedTodos;
function removeList(e) {
  const removeId = e.target.id;
  Todos.splice(Todos.indexOf(Todos.find((c) => c.id === removeId)));
  updateUI();
  console.log(Todos);
}
function dec2hex(dec) {
  return dec.toString(16).padStart(2, "0");
}

// generateId :: Integer -> String
function generateId(len) {
  var arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
}
const updateUI = () => {
  if (localStorage.getItem("todoData") === null) {
    console.log("no local");
    localStorage.setItem("todoData", JSON.stringify([]));
  }
  Todos = JSON.parse(localStorage.getItem("todoData"));
  // if (window.location.pathname === "/active.html") {
  //   if (Todos.length === 0) {
  //     console.log(Todos, "triggered");
  //     Todos = [];
  //     return;
  //   }
  //   activeTodos = Todos.filter((v) => v.checked === false);
  // }
  // if (Todos.length === 0) {
  //   todoListContainer.innerHTML = "";
  //   return;
  // }
  let todoLists = ``;
  const displayedTodo = () => {
    console.log("inside display", window.location.pathname);
    if (window.location.pathname === "/") {
      return Todos;
    }
    if (window.location.pathname === "/active.html")
      return Todos.filter((v) => v.checked === false);
    if (window.location.pathname === "/completed.html")
      return Todos.filter((v) => v.checked === true);
  };
  console.log(displayedTodo());
  if (displayedTodo().length === 0) {
    todoListContainer.innerHTML = "";
  }
  displayedTodo().forEach((todo) => {
    // const li = document.createElement("li");
    // li.classList.add("check-container");
    // li.classList.add("todo-list");
    // const checkAndLabel = document.createElement("div");
    // checkAndLabel.classList.add("check-and-label-container");
    // const checkbox = document.createElement("input");
    // checkbox.type = "checkbox";
    // checkbox.classList.add("checkbox-spin");
    // checkbox.id = todo.id;
    // const label = document.createElement("label");
    // label.setAttribute("for", todo.id);
    // const span = document.createElement("span");
    // const h4 = document.createElement("h4");
    // h4.classList.add("todo-text");
    // h4.classList.add("not-done");
    // h4.append(todo.name);
    // console.log(todo.name);
    // const image = document.createElement("img");
    // image.src = "./images/icon-cross.svg";
    // // appending
    // label.append(span);
    // checkAndLabel.append(checkbox, label, h4);
    // li.append(checkAndLabel, image);
    // todoListContainer.append(li);
    const todoList = `
        <li class="check-container todo-list ${
          theme === "light" && "todo-list-light"
        }">
            <div class="check-and-label-container">
            <input class="checkbox-spin" type="checkbox" id=${todo.id} ${
      todo.checked && "checked"
    }>
        <label for=${todo.id}><span></span></label>
            <label for=${todo.id} class="todo-text ${
      todo.checked ? "done-text" : "not-done"
    } ${theme === "light" && "todo-text-light"}">${todo.name}</label>
            </div>
            <img id="img-${
              todo.id
            }" class="remove" src="./images/icon-cross.svg" alt=delete"">
        </li> `;
    todoLists = todoLists + todoList;
    console.log(todo.checked);
  });
  todoListContainer.innerHTML = "";
  todoListContainer.innerHTML = todoLists;
  const statusClearContainer = document.querySelector(
    ".status-clear-container"
  );
  console.log(activeTodos, "above");
  statusClearContainer.innerHTML = `
  <span>${
    window.location.pathname === "/" ? Todos.length : displayedTodo().length
  } items left</span>
  <span class="clear">Clear Completed</span>
  `;
  document.querySelectorAll(".remove").forEach((r) => {
    r.addEventListener("click", (e) => {
      const removeId = e.target.id.slice(4);
      const temp = Todos.filter((item) => {
        return item.id !== removeId;
      });
      console.log(Todos, "inside remove");
      console.log(temp, "tem");
      if (temp !== undefined) {
        console.log("temp,,,", temp);
        Todos = temp;
        localStorage.setItem("todoData", JSON.stringify(Todos));
        updateUI();
        return;
      }
      // if (window.location.pathname !== "/active.html") {
      //   Todos = [];
      // }
      localStorage.setItem("todoData", JSON.stringify(Todos));
      updateUI();
    });
  });
  document.querySelectorAll(".checkbox-spin").forEach((r) => {
    r.addEventListener("change", (e) => {
      const tempTodoDatas = Todos.map((data) => {
        if (data.id !== e.target.id) return data;
        const modifiedTodo = {
          id: data.id,
          name: data.name,
          checked: e.target.checked,
        };
        return modifiedTodo;
      });
      Todos = tempTodoDatas;
      localStorage.setItem("todoData", JSON.stringify(Todos));
      updateUI();
    });
  });
  //clear completed
  document.querySelector(".clear").addEventListener("click", () => {
    const checkedFiltered = Todos.filter((todo) => todo.checked === false);
    console.log(checkedFiltered, "clear");
    localStorage.setItem("todoData", JSON.stringify(checkedFiltered));
    updateUI();
  });
};

todoListInput.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  // if (Todos === undefined) {
  //   localStorage.setItem(
  //     "todoData",
  //     JSON.stringify({
  //       id: generateId(20),
  //       name: e.target.value,
  //       checked: false,
  //     })
  //   );
  //   return;
  // }
  Todos.push({
    id: generateId(20),
    name: e.target.value,
    checked: false,
  });
  localStorage.setItem("todoData", JSON.stringify(Todos));
  e.target.value = "";
  console.log(Todos);
  updateUI();
});

updateUI();
