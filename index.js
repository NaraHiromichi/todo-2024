let todoDatas = [{ id: "1", name: "Complete online javascript course" }];

const todoListInput = document.querySelector("#todo-input");
let todoListContainer = document.querySelector("ul");
// let todoListContainer = document.createElement("ul");
// todoListContainer.classList.add("list-container");
function removeList(e) {
  const removeId = e.target.id;
  todo.splice(todo.indexOf(todo.find((c) => c.id === removeId)));
  updateUI();
  console.log(todo);
}
const updateUI = () => {
  console.log(todoDatas.length, "inside", todoDatas);
  if (todoDatas.length === 0) {
    todoListContainer.innerHTML = "";
    return;
  }
  let todoLists = ``;
  todoDatas.forEach((todo) => {
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
        <li class="check-container todo-list">
            <div class="check-and-label-container">
            <input class="checkbox-spin " type="checkbox" id=${todo.id}/>
        <label for=${todo.id}><span></span></label>
            <h4 class="todo-text not-done">${todo.name}</h4>
            </div>
            <img id=${todo.id} class="remove" src="./images/icon-cross.svg" alt=delete"">
        </li> `;
    todoLists = todoLists + todoList;
  });
  todoListContainer.innerHTML = "";
  todoListContainer.innerHTML = todoLists;
  console.log("doododo", todoLists);
  document.querySelectorAll(".remove").forEach((r) => {
    r.addEventListener("click", (e) => {
      const removeId = e.target.id;
      const temp = todoDatas.filter((item) => {
        return item.id !== removeId;
      });
      console.log(temp, "tem");
      if (temp !== undefined) {
        console.log("temp,,,", temp);
        todoDatas = temp;
        updateUI();
        return;
      }
      todoDatas = [];
      updateUI();
    });
  });
};

updateUI();

todoListInput.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  todoDatas.push({
    id: (todoDatas.length + 1).toString(),
    name: e.target.value,
  });
  console.log(todoDatas);
  updateUI();
});
