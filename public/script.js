const apiUrl = "http://localhost:3000/api/users";

let currentPage = 1;
const limit = 5; // Number of users per page

// Fetch and display users
async function fetchUsers() {
    try {
        const searchQuery = document.getElementById("search")?.value || "";
        const sortOption = document.getElementById("sort")?.value || "name-asc";
        let [sortBy, order] = sortOption.split("-");

        const response = await fetch(`${apiUrl}?search=${searchQuery}&sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=${limit}`);
        const data = await response.json();

        displayUsers(data.users);
        updatePagination(data.currentPage, data.totalPages);

    } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to load users.");
    }
}

// Display users in table
function displayUsers(users) {
    const tableBody = document.getElementById("userTable");
    tableBody.innerHTML = ""; // Clear previous data

    if (!users || users.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4">No users found</td></tr>`;
        return;
    }

    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="editUser('${user._id}')">Edit</button>
                <button onclick="deleteUser('${user._id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Handle form submission (Add new user)
document.getElementById("userForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const email = document.getElementById("email").value.trim();

    if (!name || !age || !email) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, age, email })
        });

        if (response.ok) {
            alert("User added successfully!");
            fetchUsers();
            document.getElementById("userForm").reset();
        } else {
            alert("Failed to add user.");
        }
    } catch (error) {
        console.error("Error adding user:", error);
    }
});

// Edit user
async function editUser(id) {
    const name = prompt("Enter new name:");
    const age = prompt("Enter new age:");
    const email = prompt("Enter new email:");

    if (!name || !age || !email) {
        alert("All fields are required!");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, age, email })
        });

        if (response.ok) {
            alert("User updated successfully!");
            fetchUsers();
        } else {
            alert("Failed to update user.");
        }
    } catch (error) {
        console.error("Error updating user:", error);
    }
}

// Delete user
async function deleteUser(id) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });

        if (response.ok) {
            alert("User deleted successfully!");
            fetchUsers();
        } else {
            alert("Failed to delete user.");
        }
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

// Pagination controls
function changePage(direction) {
    currentPage += direction;
    fetchUsers();
}

// Update pagination UI
function updatePagination(current, total) {
    document.getElementById("pageInfo").innerText = `Page ${current} of ${total}`;
    document.getElementById("prevPage").disabled = current === 1;
    document.getElementById("nextPage").disabled = current === total;
}

// Attach event listeners
document.getElementById("sort")?.addEventListener("change", fetchUsers);
document.getElementById("search")?.addEventListener("keyup", fetchUsers);

// Load users on page load
fetchUsers();
