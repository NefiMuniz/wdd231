document.addEventListener("DOMContentLoaded", function () {
  let placesData = [];
  // Fetch the JSON data
  fetch("./data/discover.json")
    .then((response) => response.json())
    .then((data) => {
      placesData = data.places;
      displayPlaces(placesData);
    })
    .catch((error) => console.error("Error loading JSON:", error));

  // Display places in the main content area
  function displayPlaces(places) {
    const main = document.querySelector("main");
    main.innerHTML = "<h1>Discover the Bahia Chamber of Commerce</h1>";

    const container = document.createElement("div");
    container.className = "places-container";
    main.appendChild(container);

    places.forEach((place) => {
      const card = document.createElement("div");
      card.className = "place-card";

      card.innerHTML = `
              <div class="card-image">
                  <img src="${place.image_link}" alt="${place.alt}" loading="lazy">
              </div>
              <div class="card-content">
                  <h2>${place.title}</h2>
                  <p class="address">${place.address}</p>
                  <button class="learn-more" data-place-id="${place.id}">Learn More</button>
              </div>
          `;
      card.dataset.placeData = JSON.stringify(place);
      container.appendChild(card);
    });

    document.querySelectorAll(".learn-more").forEach((button) => {
      button.addEventListener("click", function () {
        const placeId = parseInt(this.getAttribute("data-place-id"));
        const placeData = placesData.find((p) => p.id === placeId);
        if (placeData) {
          createDialog(placeData).showModal();
          document.body.style.overflow = "hidden";
        }
      });
    });
  }

  // Create dialogs
  function createDialog(place) {
    const existingDialog = document.querySelector(".card-dialog");
    if (existingDialog) {
      existingDialog.remove();
    }

    const dialog = document.createElement("dialog");
    dialog.className = "card-dialog";
    dialog.innerHTML = `
        <div class="dialog-content">
          <button class="close-dialog">&times;</button>
          <img src="${place.image_link}" alt="${
      place.alt
    }">
          <h2>${place.title}</h2>
          <p class="address">${place.address}</p>
          <p class="description">${place.description}</p>
        </div>
      `;

    dialog.querySelector(".close-dialog").addEventListener("click", () => {
      dialog.close();
      document.body.style.overflow = "";
    });

    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        dialog.close();
        document.body.style.overflow = "";
      }
    });
    document.body.appendChild(dialog);
    return dialog;
  }
});
