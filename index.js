const searchBtn = document.querySelector(".search-button");
const searchBox = document.querySelector(".search-bar-input");
const apiKey = "JqNVSbqvkSkeA7Kr0FhKicTHvQxU2NGjKZpkkXZf";
const url = "https://developer.nps.gov/api/v1/campgrounds";
const activitiesUrl = "https://developer.nps.gov/api/v1/activities";

searchBtn.addEventListener("click", function () {
  let city = searchBox.value;
  fetch(`${url}?q=${city}&api_key=${apiKey}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Process the JSON response here & call functions here
      let dataInfo = data.data;
      displayCampGrounds(dataInfo);
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
});

function displayCampGrounds(dataInfo) {
  const campingDataBox = document.querySelector(".camping-data-box");
  campingDataBox.innerHTML = "";
  for (let i = 0; i < dataInfo.length; i++) {
    const campgroundName = dataInfo[i].name;
    const campBtn = document.createElement("button");

    // Set the button text to the campground name
    campBtn.textContent = campgroundName;

    // Set a class for styling purposes
    campBtn.classList.add("campground-button");

    // Add a click event listener to the button
    campBtn.addEventListener("click", function () {
      // Handle button click event here, e.g., navigate to a campground details page

      showCampinfo(dataInfo[i]);
    });
    document.querySelector(".camping-data-box").classList.add("flex-container");

    // Append the button to the campingDataBox
    campingDataBox.appendChild(campBtn);
  }
}

function showCampinfo(campgroundData) {
  let name = campgroundData.name;
  let phoneNumber = campgroundData.contacts.phoneNumbers[0].phoneNumber;
  let campgroundAddress =
    campgroundData.addresses[0].line1 +
    " " +
    campgroundData.addresses[0].city +
    " " +
    campgroundData.addresses[0].stateCode +
    " " +
    campgroundData.addresses[0].postalCode;
  let campgroundDescription =
    campgroundData.description + campgroundData.fees[0].description;
  let campingFees = campgroundData.fees[0].cost;
  let campImageUrl = campgroundData.images[0].url;
  // by creating an <img> element and setting its src attribute to imageUrl.

  // Get a reference to the .camping-data-box element
  const campingDataBox = document.querySelector(".camping-data-box");

  // Clear existing content inside the .camping-data-box
  campingDataBox.innerHTML = "";

  // Create new elements to display campground information
  const heading = document.createElement("h2");
  heading.textContent = name;
  heading.classList.add("heading-for-Info");

  const address = document.createElement("p");
  address.textContent = `Address: ${campgroundAddress}`;

  const description = document.createElement("p");
  description.textContent = campgroundDescription;

  const phoneNumberElement = document.createElement("p");
  phoneNumberElement.textContent = `Phone Number: ${phoneNumber}`;
  phoneNumberElement.style.marginRight = "20px";
  const fees = document.createElement("p");
  fees.textContent = `Fees: ${campingFees}`;

  const image = document.createElement("img");
  image.src = campImageUrl;
  image.alt = "Campground Image";
  image.style.maxWidth = "100%";
  image.style.marginTop = "30px";
  image.style.borderRadius = "30px"; // Ensure image fits within the box

  // Append the new elements to the .camping-data-box
  campingDataBox.appendChild(heading);
  campingDataBox.appendChild(address);
  campingDataBox.appendChild(description);
  campingDataBox.appendChild(phoneNumberElement);
  campingDataBox.appendChild(fees);
  campingDataBox.appendChild(image);

  // Add CSS class to the .camping-data-box for additional styling if needed
  campingDataBox.classList.add("camping-info");
}
