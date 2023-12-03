async function fetchData() {
    try {
        const response = await fetch('https://js1-todo-api.vercel.app/api/todos?apikey=d5e86d22-2565-4f8e-b747-1c3778bec8e6');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        displayTodos(data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function displayTodos(todos) {
    const todoList = document.getElementById("todoList");

    todos.forEach(todo => {
        const listItem = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        const updateButton = document.createElement("button");
        updateButton.innerText = "Update";
        updateButton.addEventListener("click", async () => {
            try {
                const response = await fetch(`https://js1-todo-api.vercel.app/api/todos/${todo._id}?apikey=d5e86d22-2565-4f8e-b747-1c3778bec8e6`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ completed: !todo.completed }), 
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                todo.completed = !todo.completed;
            } catch (error) {
                console.error('Error:', error.message);
            }
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", async () => {
            if (checkbox.checked || todo.completed) {
                try {
                    const response = await fetch(`https://js1-todo-api.vercel.app/api/todos/${todo._id}?apikey=d5e86d22-2565-4f8e-b747-1c3778bec8e6`, {
                        method: 'DELETE',
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    listItem.remove();
                } catch (error) {
                    console.error('Error:', error.message);
                }
            } else {
                const deleteWarning = document.getElementById("deleteWarning");
                deleteWarning.style.display = "block";

                setTimeout(() => {
                    deleteWarning.style.display = "none";
                }, 3000);
            }
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(document.createTextNode(todo.title));
        listItem.appendChild(updateButton);
        listItem.appendChild(deleteButton);

        todoList.appendChild(listItem);
    });
}

async function addTodo() {
    const todoInput = document.getElementById("todoInput").value;

    try {
        const response = await fetch('https://js1-todo-api.vercel.app/api/todos?apikey=d5e86d22-2565-4f8e-b747-1c3778bec8e6', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: todoInput }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const todo = await response.json();
        displayTodos([todo]);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

fetchData();