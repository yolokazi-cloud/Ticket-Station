//   events to display array
  const events = [
    {
      id: 0,
      evntname: "Unplugged Acoustic",
      hostname: "John Legend",
      date: "Aug 25",
      time: "07:00 AM",
      day: "FRI",
      venue: "New York, USA",
      imgsrc: "images/john.jpg",
      category:"Major Event",
      price: 599.99,
      standard: 69,
      vip: 99,
    },
    {
      id: 1,
      evntname: "Music Lounge",
      hostname: "Musiq Soulchild",
      date: "AUG 25",
      day: "FRI",
      time: "07:00PM",
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
      day: "Sunday",
      time: "06:00PM",
      venue: "NetFlix Studios, RSA",
      imgsrc: "images/bridge.jpg",
      standard: 79,
      vip: 99,
    },
    {
      id: 3,
      evntname: "The Lion King Premiere",
      hostname: "Disney",
      date: "25/08/2023",
      day: "Friday",
      time: "18:30",
      venue: "Disney Studios, USA",
      imgsrc: "images/johnkani.jpg",
      standard: 49,
      vip: 79,
    },
    {
      id: 4,
      evntname: "Dance Concert",
      hostname: "Carnival Presents",
      date: "26/08/2023",
      time: "19:30",
      venue: "Carvival City, USA",
      imgsrc: "images/dance.jpg",
      standard: 69,
      vip: 99,
    },
    {
      id: 5,
      evntname: "Fitness Workshop",
      hostname: "Jillian Michaels",
      date: "25/08/",
      day: "Friday",
      time: "12:30",
      venue: "Milpark, Brazil",
      imgsrc: "images/jillian.webp",
      standard: 59,
      vip: 99,
    },
    {
      id: 6,
      evntname: "Adventure retreat in Amazon Forest",
      hostname: "Amazon",
      date: "Aug 25",
      time: "10:30",
      day: "Friday",
      venue: "Amazon Forest, UK",
      imgsrc: "images/amazon.jpg",
      standard: 99,
      vip: 149,
    },
  ];
  
// elements to select
const eventquery = document.querySelector(".row");

  // display events function
  function displayEvents() {
    events.forEach((event) => {
      eventquery.innerHTML += `
      
      
      <div class="col-sm-6 col-lg-4 event-card eventCard">
      <div class="feature-box text-center media-box fbox-bg" style="height:110%; display:inline-flex;">
        <div class="fbox-media">
          <a href="#"><img src="${event.imgsrc}" alt="${event.evntname}"></a>
        </div>
        <div class="fbox-content" style="height:30%;">
          <h3 class="event-name">${event.evntname}<span class="subtitle">  <small>${event.hostname}</small> </span></h3>
          <ul class="entry-meta no-separator">
           
          <li><a href="#" class="text-uppercase fw-medium mt-1 list-unstyled">${event.day}, ${event.date} @ ${event.time}</a></li>
            <li class="list-group-item" style="margin-top:3%;"><strong>R${event.price}</strong> Standard Price</li>
            <li class="d-flex align-items-center mt-4">
              <a href="#" class="fw-normal" style="margin-right:30%;"><i class="uil uil-map-marker"></i> ${event.venue}</a> 
              <a href="tickets.html" class=" text-success text-center mb-0 btn-hover h5">Buy Ticket<i class="bi-arrow-right"></i> </a>
            </li>
           
          </ul>
        </div>
      </div>
    </div>


      `;
    });
  }

  //search method
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
  

//-------------------------------------------------------CART-------------------------------------------------------------------------------------------


//   shopping cart class with all the cart related properties and methods
  class ShoppingCart {
    constructor() {
      // declair cart
      this.cart = [];

      //   select cart elements
      this.cartItemsEl = document.querySelector(".cart-items");
      this.subtotalEl = document.querySelector(".subtotal");
      this.totalItemsInCartEl = document.querySelector(".total-items-in-cart");
  
      // cart buttons
      this.openCartBtn = document.querySelector(".open-cart-btn");
      this.openSideCart = document.querySelector(".side-cart");
      this.closeSideCart = document.querySelector(".close-btn");
  
      //   ticket dropdown elements to select a ticket from 2 options
      this.ticketDropdowns = document.querySelectorAll(".ticket-dropdown");
  
      //   payment modal elements
      this.paymentModal = document.getElementById("paymentModal");
      this.modalSubtotal = document.getElementById("modalSubtotal");
      this.payButton = document.querySelector(".pay-btn");
      this.paymentStatus = document.getElementById("paymentStatus");
      this.closeModalButton = document.querySelector(".close-modal");

      //   openning and closing the cart
      this.openCartBtn.addEventListener("click", this.openCart.bind(this));
      this.closeSideCart.addEventListener("click", this.closeCart.bind(this));
  
      //   choosing selected ticket from available options
      //   loop through available tickets
      this.ticketDropdowns.forEach((ticketDropdown) => {
        // listen for user to select an option in the available tickets and pass in the event related to selected ticket
        ticketDropdown.addEventListener("change", (event) => {
          // get event index of selected option in dropdown
          const selectedOption = event.target.options[event.target.selectedIndex];
          // get value from the "data-price" atribute of the selected option which is the selected tickets' price
          const selectedPrice = selectedOption.getAttribute("data-price");
          // get value from the "data-id" atribute of the selected option which is the selected tickets' event id
          const selectedEventId = selectedOption.getAttribute("data-id");
          console.log("Selected price:", selectedPrice);
          console.log("Selected event ID:", selectedEventId);
      
          // call addToCart function and pass in id and price
          this.addToCart(selectedEventId, selectedPrice);
        });
      });
  
      // checkout button selector
      this.checkoutButton = document.querySelector(".checkout-btn");

      // listen for click on checkout button the trigger openPaymentModal function which opens the payment modal
      // side not always use .bind(this) when you're attaching event listeners to methods of a class
      this.checkoutButton.addEventListener("click", this.openPaymentModal.bind(this));
  
      // listen for click of payButton and call processPayment function
      this.payButton.addEventListener("click", this.processPayment.bind(this));
  
     //  listen for click of closeModalButton and call closePaymentModal function
      this.closeModalButton.addEventListener("click", this.closePaymentModal.bind(this));
  
     // call initialise cart
      this.initCart();

    /////////////// END OF CONSTRUCTOR //////////////////
    }
  
    // open cart
    openCart() {
      this.openSideCart.classList.add("open");
    }
  
    // close cart
    closeCart() {
      this.openSideCart.classList.remove("open");
    }
  
    // initialise cart
    initCart() {
        // get data from local storage
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        // push data from local storage to cart
        this.cart = JSON.parse(storedCart);

        // call functions
        this.updateLocalStorageCart();
        this.renderCartItems();
        this.renderSubtotal();
      }
    }
  
    // update local storage with items added to cart
    updateLocalStorageCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    }

    // add items to cart
    addToCart(id, price) {
      // get data pushed in from ticketDropdowns
      const eventToAdd = events.find((event) => event.id == id);
      // check if item already in cart ?
      const existingCartItem = this.cart.find(
        (item) => item.id == id && item.price == price
      );
  
      // if not in cart add event id, quantity = 1 and selected ticket price as object to end of the cart array
      if (!existingCartItem) {
        this.cart.push({
          ...eventToAdd,
          numberOfUnits: 1,
          price: price,
        });
      } else {
        console.log("Item already in cart.");
      }
  
      // call functions
      this.updateLocalStorageCart();
      this.renderCartItems();
      this.renderSubtotal();
    }
  
    // add amounts together and display subtotal
    renderSubtotal() {
      let totalPrice = 0,
        totalItems = 0;
  
    // accumulate price and quantity
      this.cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
      });
  
    // display totals
      this.subtotalEl.innerHTML = `Subtotal (${totalItems} items): R ${totalPrice.toFixed(
        2
      )}`;
      this.totalItemsInCartEl.innerHTML = totalItems;
    }
  
    // remove item from the cart
    removeItemFromCart(id, price) {

      // look for item with matching id and price and get its index in the cart
      const existingCartItemIndex = this.cart.findIndex(
        (item) => item.id == id && item.price == price
      );
  
    //   if item is in the cart
      if (existingCartItemIndex !== -1) {
        // cut out 1 item starting from the provided index using splice method => splice(providedIndex, numberOfItemsToBeRemoved)
        this.cart.splice(existingCartItemIndex, 1);
      } else {
        console.log("Item not found in cart.");
      }
  
    // call functions
      this.updateLocalStorageCart();
      this.renderCartItems();
      this.renderSubtotal();
    }
  
    // adjust quantities within the cart
    changeNumberOfUnits(action, id, price) {
        // go through the cart item by item using map
        this.cart = this.cart.map((item) => {
          let numberOfUnits = item.numberOfUnits;
    
          // look for item in cart
          if (item.id == id && item.price == price) {
            // if passed in action is minus subtract 1 from total items
            if (action == "minus" && numberOfUnits > 1) {
              numberOfUnits--;
            // if passed in action is plus add 1 from total items
            } else if (action == "plus") {
              numberOfUnits++;
            }
          }
    
        //   return new item with new quantity
          return {
            ...item,
            numberOfUnits,
          };
        });
    
        // call functons
        this.updateLocalStorageCart();
        this.renderCartItems();
        this.renderSubtotal();
      }
  
    // display items in cart
    renderCartItems() {
      this.cartItemsEl.innerHTML = "";
      this.cart.forEach((item) => {
        this.cartItemsEl.innerHTML += `
          <div class="cart-item">
            <div class="remove-item" onclick="shoppingCart.removeItemFromCart('${item.id}', '${item.price}')">x</div>
            <div class="item-info">
              <img src="${item.imgsrc}" alt="${item.evntname}">
            </div>
            <div class="unit-price">
              <h4>${item.evntname}</h4>
              <small>R</small>${item.price}
            </div>
            <div class="units">
              <div class="btn minus" onclick="shoppingCart.changeNumberOfUnits('minus', '${item.id}', '${item.price}')">-</div>
              <div class="number">${item.numberOfUnits}</div>
              <div class="btn plus quantity-btn" onclick="shoppingCart.changeNumberOfUnits('plus', '${item.id}', '${item.price}')">+</div>
            </div>
          </div>
        `;
      });
    }
  
    // open payment modal
    openPaymentModal() {
      this.modalSubtotal.textContent = this.subtotalEl.textContent;
      this.paymentModal.style.display = "block";
    }
  
    // process payment
    processPayment() {
      let totalPrice = 0,
        totalItems = 0;
  
      // loop through all items in cart suming up price and quantity
      this.cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
      });
      this.paymentStatus.value = totalPrice;
  
      // hide pay button
      this.payButton.style.display = "none";
    }
  
    // close payment modal
    closePaymentModal() {
      this.paymentModal.style.display = "none";
      this.paymentStatus.style.display = "none";
    }
  }
  
//   call display events and initialise new shoppingCart from the shoppingCart class
  displayEvents();
  const shoppingCart = new ShoppingCart();

 

  
  
  