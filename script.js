document.addEventListener("DOMContentLoaded", function () {
    const gridContainer = document.getElementById("donkeyGrid");
    let donkeyData = [];
    let itemsPerPage = 3;
    let currentPage = 0;
    const placeholderImage = "https://placehold.co/150?text=happy+donky"; // Placeholder image URL

    // Fetch JSON Data
    async function fetchDonkeys() {
        try {
            const response = await fetch("donkey_breeds.json");
            donkeyData = await response.json();
            loadMoreDonkeys(); // Load first batch
        } catch (error) {
            console.error("Error fetching donkey data:", error);
        }
    }

    // Load Donkeys in Batches
    function loadMoreDonkeys() {
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        const donkeysToLoad = donkeyData.slice(start, end);

        donkeysToLoad.forEach(donkey => {
            let card = document.createElement("div");
            card.classList.add("donkey-card");

            // Handle missing values
            let breedName = donkey.breed_name || "Unknown Breed";
            let country = donkey.country || "Unknown Country";
            let notes = donkey.notes || "No additional information available";
            let imageUrl = donkey.image_url && donkey.image_url.trim() !== "" ? donkey.image_url : placeholderImage;

            card.innerHTML = `
                <img src="${imageUrl}" alt="${breedName}" loading="lazy">
                <h3>${breedName}</h3>
                <p><strong>Country:</strong> ${country}</p>
                <p><strong>Notes:</strong> ${notes}</p>
            `;
            gridContainer.appendChild(card);
        });

        currentPage++;
    }

    // Infinite Scroll Event
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            loadMoreDonkeys();
        }
    });

    // Initial Fetch
    fetchDonkeys();
});
