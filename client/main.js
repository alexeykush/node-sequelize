const renderUser = user => {
    return `
        <div>
            <p>Id: ${user.id}</p>
            <p>Name: ${user.name}</p>
            <button onclick="deleteUser(${user.id})">Delete</button>
        </div>
    `;
};

async function deleteUser(id) {
    await fetch(`/users/${id}`, {
        method: "DELETE"
    });
    fetchUsers();
}

const renderUsers = users => users.map(user => renderUser(user)).join("");

const fetchUsers = () => {
    fetch("/users")
        .then(res => res.json())
        .then(data => {
            document.getElementById("users").innerHTML = renderUsers(data);
        })
        .catch(e => console.log(e));
};

fetchUsers();

document.getElementById("posts").addEventListener("click", () => {
    fetch("/posts")
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(e => console.log(e));
});

const form = document.getElementById("form");
form.addEventListener("submit", async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    const dataToSubmit = { name };
    await fetch("/users", {
        method: "POST",
        body: JSON.stringify(dataToSubmit),
        headers: {
            "Content-Type": "application/json"
        }
    });
    fetchUsers();
});