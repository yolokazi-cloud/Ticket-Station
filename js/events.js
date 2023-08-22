const events = [
  {
    id: 0,
    evntname: "Unplugged Acoustic",
    hostname: "Amazon",
    date: "Aug 25",
    time: "07:00 AM",
    day: "Fri",
    venue: "New York, USA",
    imgsrc: "images/john.jpg",
    standard: 69,
    vip: 99,
  },
  {
    id: 1,
    evntname: "Music Lounge",
    hostname: "Musiq Soulchild",
    date: "AUG 25",
    day: "Fri",
    time: "07:00 PM",
    venue: "New York, USA",
    imgsrc: "images/musiq.jpg",
    standard: 59,
    vip: 89,
  },
  {
    id: 2,
    evntname: "Bridgerton: Queen Charlotte Launch",
    hostname: "Shondaland",
    date: "Aug 26",
    day: "Sat",
    time: "06:00 PM",
    venue: "NetFlix Studios,RSA ",
    imgsrc: "images/bridge.jpg",
    standard: 79,
    vip: 99,
  },
  {
    id: 3,
    evntname: "The Lion King Premiere",
    hostname: "Disney",
    date: "AUG 26",
    day: "Sat",
    time: "07:30 PM",
    venue: "Disney Studios, USA",
    imgsrc: "images/johnkani.jpg",
    standard: 49,
    vip: 79,
  },
  {
    id: 4,
    evntname: "Dance Concert",
    hostname: "Carnival Presents",
    date: "AUG 26",
    day:"Sat",
    time: "08:30 AM",
    venue: "Carvival City, USA",
    imgsrc: "images/dance.jpg",
    standard: 69,
    vip: 99,
  },
  {
    id: 5,
    evntname: "Fitness Workshop",
    hostname: "Jillian Michaels",
    date: "AUG 27",
    day: "Sun",
    time: "12:30 AM",
    venue: "Milpark, Brazil",
    imgsrc: "images/jillian.webp",
    standard: 59,
    vip: 99,
  },
 
];
//elements to select
const eventquery = document.querySelector(".row");

/////////////// DISPLAY EVENTS ///////////////////

function displayEvents() {
  events.forEach((event) => {
    eventquery.innerHTML += `
      
   <div class="col-sm-6 col-lg-4 event-card eventCard">
        <div class="feature-box text-center media-box fbox-bg" style="height:90%; display:inline-flex;">
            <div class="fbox-media">
                <a href="#"><img src="${event.imgsrc}" alt="${event.evntname}"></a>
            </div>
            <div class="fbox-content" style="height:30%;">
                <h3 class="event-name">${event.evntname}<span class="subtitle">  <small>${event.hostname}</small> </span></h3>
                <ul class="entry-meta no-separator">
                    <li><a href="#" class="text-uppercase fw-medium mt-1 list-unstyled">${event.day}, ${event.date} @ ${event.time}</a></li>
                    <li class="d-flex align-items-center mt-4">
                        <a href="#" class="fw-normal" style="margin-left:15%;"><i class="uil uil-map-marker"></i> ${event.venue}</a>
                    </li>
                    <li>
                      <p>
                      <select class="btn btn-secondary ticket-dropdown" style="color: white; display: inline-block; margin-top: -22%; margin-left:60%;">
                        <i class="bi bi-chevron-compact-down" style="margin-left:5px; font-size:13px;"></i>
                        <option selected>Book Ticket</option>
                        <option value="1" class="btn btn-secondary ticket-option" data-price="${event.standard}" data-id="${event.id}">Standard R${event.standard}</option>
                        <option value="2" class="btn btn-secondary ticket-option" data-price="${event.vip}" data-id="${event.id}">VIP R${event.vip}</option>
                      </select>
                      </p>
                    </li>     
                </ul> 
            </div>
        </div>
    </div>
          `;
  });
}

// SEARCH

function searchEvent() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  let elements = document.querySelectorAll(".event-name");
  let cards = document.querySelectorAll(".event-card");
  console.log(searchInput);

  // loop through all elements
  elements.forEach((element, index) => {
    // check if elements include the input value
    if (element.innerText.toLowerCase().includes(searchInput)) {
      // display matching card
      cards[index].classList.remove("hide");
    } else {
      // hide the others
      cards[index].classList.add("hide");
    }
  });
}

/////////////// CART ///////////////////

let cart = [];

/////////////// UPDATE LOCAL STORAGE ///////////////////
function updateLocalStorageCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// CREATE CART ARRAY
initCart();

// INITIALIZING THE CART FROM LOCAL STORAGE
function initCart() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateLocalStorageCart(); // Update the cart display after retrieving from local storage
  }
}

///////// select cart elements /////////
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");

//////// OPEN CART BUTTON ////////////
const openCartBtn = document.querySelector(".open-cart-btn");
const openSideCart = document.querySelector(".side-cart");
const closeSideCart = document.querySelector(".close-btn");

openCartBtn.addEventListener("click", openCart);
closeSideCart.addEventListener("click", closeCart);
// OPEN SIDE CART FUNCTION
function openCart() {
  openSideCart.classList.add("open");
}

// CLOSE SIDE CART FUNCTION
function closeCart() {
  openSideCart.classList.remove("open");
}

displayEvents();

// get price standard / vip from object and set it as price
const ticketDropdowns = document.querySelectorAll(".ticket-dropdown");

ticketDropdowns.forEach((ticketDropdown) => {
  ticketDropdown.addEventListener("change", function () {
    const selectedOption = ticketDropdown.options[ticketDropdown.selectedIndex];
    const selectedPrice = selectedOption.getAttribute("data-price");
    const selectedEventId = selectedOption.getAttribute("data-id");
    console.log("Selected price:", selectedPrice);
    console.log("Selected event ID:", selectedEventId);

    addToCart(selectedEventId, selectedPrice);
  });
});

// CREATE CART ARRAY
updateLocalStorageCart();

// ADD TO CART
function addToCart(id, price) {
  const eventToAdd = events.find((event) => event.id == id);

  // Check if product already exists in cart
  const existingCartItem = cart.find(
    (item) => item.id == id && item.price == price
  );

  if (!existingCartItem) {
    cart.push({
      ...eventToAdd,
      numberOfUnits: 1,
      price: price,
    });
  } else {
    // If it exists, you can provide feedback to the user, or simply do nothing
    console.log("Item already in cart.");
  }

  updateLocalStorageCart();
  renderCartItems();
  renderSubtotal();
}

// CALCULATE AND RENDER SUBTOTAL
function renderSubtotal() {
  console.log("Rendering subtotal...");
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  console.log("Total Price:", totalPrice);
  console.log("Total Items:", totalItems);

  subtotalEl.innerHTML = `Subtotal (${totalItems} items): R ${totalPrice.toFixed(
    2
  )}`;
  totalItemsInCartEl.innerHTML = totalItems;
  renderCartItems();
}
renderSubtotal();

// REMOVE ITEM FROM CART
function removeItemFromCart(id, price) {
  console.log("Removing item with ID and Price:", id, price);

  // Check if product already exists in cart
  const existingCartItemIndex = cart.findIndex(
    (item) => item.id == id && item.price == price
  );

  if (existingCartItemIndex !== -1) {
    cart.splice(existingCartItemIndex, 1); // Remove the item from the cart
  } else {
    console.log("Item not found in cart.");
  }

  console.log("Updated Cart:", cart);

  updateLocalStorageCart();
  renderCartItems();
  renderSubtotal();
}

// CHANGE NUMBER OF UNITS PER ITEM
function changeNumberOfUnits(action, id, price) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id == id && item.price == price) {
      if (action == "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action == "plus") {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateLocalStorageCart();
  renderCartItems();
  renderSubtotal();
}

// RENDER CART ITEMS
function renderCartItems() {
  console.log(cart); // Corrected line
  // CLEAR CART ELEMENT
  cartItemsEl.innerHTML = "";
  cart.forEach((item) => {
    console.log(item);
    cartItemsEl.innerHTML += `
      <div class="cart-item">

        <div class="remove-item" onclick="removeItemFromCart('${item.id}', '${item.price}')">x</div>

        <div class="item-info" >
         <img src="${item.imgsrc}" alt="${item.evntname}">
        </div>
        <div class="unit-price">
          <h4>${item.evntname}</h4>
          <small>R</small>${item.price}
        </div>
        <div class="units">
          <div class="btn minus" onclick="changeNumberOfUnits('minus', '${item.id}', '${item.price}')">-</div>
          <div class="number">${item.numberOfUnits}</div>
          <div class="btn plus quantity-btn" onclick="changeNumberOfUnits('plus', '${item.id}', '${item.price}')">+</div>      
        </div>
      </div>
    `;
  });
}

renderCartItems();

// POP UP MODAL

const paymentModal = document.getElementById("paymentModal");
const modalSubtotal = document.getElementById("modalSubtotal");
const payButton = document.querySelector(".pay-btn");
const paymentStatus = document.getElementById("paymentStatus");
const closeModalButton = document.querySelector(".close-modal");

// Event listener for the "Checkout" button
const checkoutButton = document.querySelector(".checkout-btn");
checkoutButton.addEventListener("click", () => {
  modalSubtotal.textContent = subtotalEl.textContent;
  paymentModal.style.display = "block";
});

// Event listener for the "Pay" button inside the modal and sending amount to payfast
payButton.addEventListener("click", () => {
  // sending amount to payfast
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });
  paymentStatus.value = totalPrice;

  // Hide the "Pay" button
  payButton.style.display = "none";
});

// Event listener to close the modal
closeModalButton.addEventListener("click", () => {
  paymentModal.style.display = "none";
  paymentStatus.style.display = "none";
});
