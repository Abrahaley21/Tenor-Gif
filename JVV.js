// Assignment: Tenor Gif
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const gifResults = document.getElementById("gifResults");
const message = document.getElementById("message");
// The Cat API endpoint
const API_URL = "https://api.thecatapi.com/v1/images/search";
function searchGIFs() {
    const query = searchInput.value.trim();

    if (query === "") {
        message.textContent = "Please enter a search term.";
        gifResults.innerHTML = "";
        return;
    }
    gifResults.innerHTML = "";
    message.textContent = "Loading cat images...";
    // Fetch cat images from The Cat API
    fetch(API_URL + "?limit=8")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("API request failed: " + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            gifResults.innerHTML = "";
            if (!data || data.length === 0) {
                message.textContent = "No cat images found. Try again.";
                return;
            }
            data.forEach(function (cat) {
                if (cat.url) {
                    const img = document.createElement("img");
                    img.src = cat.url;
                    img.alt = query + " cat";
                    img.loading = "lazy";
                    img.style.width = "200px";
                    img.style.height = "auto";
                    img.style.margin = "10px";
                    img.style.borderRadius = "8px";
                    gifResults.appendChild(img);
                }
            });
            message.textContent =
                gifResults.children.length + " cat images found!";
        })
        .catch(function (error) {
            message.textContent =
                "Unable to load cat images. Please try again.";
            console.error("Error fetching cat images:", error);
        });
}
// Search button click
searchButton.addEventListener("click", searchGIFs);
// Press Enter to search
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchGIFs();
    }
});
// Load one random cat image when the page opens
fetch(API_URL)
    .then(function (response) {
        if (!response.ok) {
            throw new Error("Failed to load the cat image.");
        }
        return response.json();
    })
    .then(function (data) {
        if (data.length > 0 && data[0].url) {
            const img = document.createElement("img");
            img.src = data[0].url;
            img.alt = "Random cat";
            img.style.width = "300px";
            img.style.height = "auto";
            gifResults.prepend(img);
        }
    })
    .catch(function (error) {
        console.error("Error loading initial cat:", error);
    });
