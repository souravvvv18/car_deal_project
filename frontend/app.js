const API_BASE = "http://localhost:5000/api";

const state = {
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user") || "null"),
    cars: [],
};

const appMessage = document.getElementById("app-message");
const tokenState = document.getElementById("token-state");

function setMessage(message) {
    appMessage.textContent = message;
}

function updateSessionUI() {
    tokenState.textContent = state.token ? "Authenticated" : "Not signed in";
}

function saveSession(token, user) {
    state.token = token;
    state.user = user;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    updateSessionUI();
}

function authHeaders() {
    return state.token ? { Authorization: `Bearer ${state.token}` } : {};
}

async function request(path, options = {}) {
    const response = await fetch(`${API_BASE}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
            ...(options.headers || {}),
        },
        ...options,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.message || "Request failed.");
    }

    return data;
}

function showView(viewName) {
    document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("active"));
    const target = document.getElementById(`view-${viewName}`);
    if (target) {
        target.classList.add("active");
    }
}

async function loadCars() {
    const data = await request("/cars");
    state.cars = data.data.cars || [];
    const grid = document.getElementById("car-grid");

    grid.innerHTML = state.cars.length
        ? state.cars.map((car) => `
            <article class="card">
                <h3>${car.brand} ${car.model}</h3>
                <p class="muted">ID: ${car.id} | ${car.year} | ${car.transmission}</p>
                <p>$${Number(car.price).toLocaleString()}</p>
                <button data-car-id="${car.id}" class="view-details-btn">View details</button>
            </article>
        `).join("")
        : '<p class="muted">No cars available yet.</p>';

    document.querySelectorAll(".view-details-btn").forEach((button) => {
        button.addEventListener("click", () => {
            document.querySelector('[name="carId"]').value = button.dataset.carId;
            showView("details");
            document.getElementById("car-search-form").requestSubmit();
        });
    });
}

async function loadCarDetails(carId) {
    const data = await request(`/cars/${carId}`);
    const car = data.data.car;
    document.getElementById("car-details").innerHTML = `
        <h3>${car.brand} ${car.model}</h3>
        <p><strong>Year:</strong> ${car.year}</p>
        <p><strong>Price:</strong> $${Number(car.price).toLocaleString()}</p>
        <p><strong>Fuel:</strong> ${car.fuelType}</p>
        <p><strong>Transmission:</strong> ${car.transmission}</p>
        <p><strong>Kilometers:</strong> ${car.kilometersDriven ?? 0}</p>
        <p>${car.description || "No description available."}</p>
    `;
}

async function loadDashboard() {
    const data = await request("/bookings");
    const bookings = data.data.bookings || [];
    document.getElementById("dashboard-summary").innerHTML = `
        <div class="summary-item"><strong>${bookings.length}</strong><div>Bookings</div></div>
        <div class="summary-item"><strong>${new Set(bookings.map((item) => item.status)).size || 0}</strong><div>Status types</div></div>
    `;

    document.getElementById("booking-list").innerHTML = bookings.length
        ? bookings.map((booking) => `
            <article class="card">
                <h3>${booking.customerName}</h3>
                <p class="muted">Car: ${booking.car.brand} ${booking.car.model}</p>
                <p>Status: ${booking.status}</p>
                <p>${booking.preferredDate} at ${booking.preferredTime}</p>
            </article>
        `).join("")
        : '<p class="muted">No bookings yet.</p>';
}

document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => showView(button.dataset.view));
});

document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
        const data = await request("/auth/login", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData.entries())),
        });
        saveSession(data.data.token, data.data.user);
        setMessage("Logged in successfully.");
        showView("cars");
        await loadCars();
    } catch (error) {
        setMessage(error.message);
    }
});

document.getElementById("register-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
        await request("/auth/register", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData.entries())),
        });
        setMessage("Registration complete. You can now log in.");
        showView("login");
    } catch (error) {
        setMessage(error.message);
    }
});

document.getElementById("refresh-cars").addEventListener("click", async () => {
    try {
        await loadCars();
        setMessage("Cars loaded.");
    } catch (error) {
        setMessage(error.message);
    }
});

document.getElementById("car-search-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const carId = new FormData(event.currentTarget).get("carId");
    try {
        await loadCarDetails(carId);
        setMessage(`Loaded car ${carId}.`);
    } catch (error) {
        setMessage(error.message);
    }
});

document.getElementById("booking-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
        await request("/bookings", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData.entries())),
        });
        setMessage("Booking submitted successfully.");
        event.currentTarget.reset();
    } catch (error) {
        setMessage(error.message);
    }
});

document.getElementById("load-dashboard").addEventListener("click", async () => {
    try {
        await loadDashboard();
        setMessage("Dashboard loaded.");
    } catch (error) {
        setMessage(error.message);
    }
});

updateSessionUI();
loadCars().catch((error) => setMessage(error.message));