class Event {
  constructor(id, evntname, hostname, date, day, time, venue, imgsrc, category, price) {
    this.id = id;
    this.evntname = evntname;
    this.hostname = hostname;
    this.date = date;
    this.day = day;
    this.time = time;
    this.venue = venue;
    this.imgsrc = imgsrc;
    this.category = category;
    this.price = price;
  }

  generateHTML() {
    return `
    <div class="col-sm-6 col-lg-4 event-card eventCard ${this.category.toLowerCase().replace(/\s+/g, '-')}">
        <div class="feature-box text-center media-box fbox-bg" style="height:110%; display:inline-flex;">
          <div class="fbox-media">
            <a href="#"><img src="${this.imgsrc}" alt="${this.evntname}"></a>
          </div>
          <div class="fbox-content" style="height:30%;">
            <h3 class="event-name">${this.evntname}<span class="subtitle">  <small>${this.hostname}</small></span></h3>
            <ul class="entry-meta no-separator">
              <li><a href="#" class="text-uppercase fw-medium mt-1 list-unstyled">${this.day}, ${this.date} @ ${this.time}</a></li>
              <li class="list-group-item" style="margin-top:3%;"><strong>R${this.price}</strong> Standard Price</li>
              <li class="d-flex align-items-center mt-4">
                <a href="#" class="fw-normal" style="margin-right:30%;"><i class="uil uil-map-marker"></i> ${this.venue}</a> 
                <a href="tickets.html" class=" text-success text-center mb-0 btn-hover h5">Buy Ticket<i class="bi-arrow-right"></i> </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }
}

class Ticket extends Event {
  constructor(id, evntname, hostname, date, day, time, venue, imgsrc, category, price, vipPrice) {
    super(id, evntname, hostname, date, day, time, venue, imgsrc, category, price);
    this.vipPrice = vipPrice || (price + 200);
  }
}
const numTickets = 100;
let numTicketsRemaining = numTickets;

const events = [
  new Ticket(0, "Unplugged Acoustic", "John Legend", "Aug 25", "Friday", "07:00 AM", "New York, USA", "images/john.jpg", "Major Event", 199.99),
  new Ticket(1, "Music Lounge", "Musiq Soulchild", "AUG 25", "Friday", "07:00PM", "New York, USA", "images/musiq.jpg", "Major Event", 116.85),
  new Ticket(2, "Bridgerton: Queen Charlotte Launch", "Shondaland", "Aug 26", "Sunday", "06:00PM", "NetFlix Studios, RSA", "images/bridge.jpg", "Major Event", 79, 99),
  new Ticket(3, "The Lion King Premiere", "Disney", "25/08/2023", "Friday", "18:30", "Disney Studios, USA", "images/johnkani.jpg", "", 49, 79),
  new Ticket(4, "Dance Concert", "Carnival Presents", "26/08/2023", "", "19:30", "Carvival City, USA", "images/dance.jpg", "", 69, 99),
  new Ticket(5, "Fitness Workshop", "Jillian Michaels", "25/08/", "Friday", "12:30", "Milpark, Brazil", "images/jillian.webp", "Showcase", 59, 99),
  new Ticket(6, "Adventure retreat in Amazon Forest", "Amazon", "Aug 25", "Friday", "10:30", "Amazon Forest, UK", "images/amazon.jpg", "Networking Event", 99, 149),
  new Ticket(7, "Art Expo", "ArtHub", "Aug 26", "Saturday", "10:00 AM", "Art Gallery, Paris", "images/art2.jpg", "Exhibition", 75.5),
  new Ticket(8, "Tech Conference", "Tech Innovations", "Aug 27", "Sunday", "09:30 AM", "Tech Hub, San Francisco", "images/tech.jpg", "Conference", 150),
  new Ticket(9, "Food Festival", "Tasty Treats", "Aug 28", "Monday", "12:00 PM", "City Park, Sydney", "images/food.jpg", "Festival", 25.99),
  new Ticket(10, "Fashion Show", "Fashionista", "Aug 29", "Tuesday", "06:00 PM", "Luxury Hotel, Milan", "images/fashion.jpg", "Showcase", 85),
  new Ticket(11, "Book Fair", "Bookworms", "Aug 30", "Wednesday", "11:00 AM", "Community Center, London", "images/books.jpg", "Exhibition", 20),
  new Ticket(12, "Movie Night", "Cinephile Club", "Aug 31", "Thursday", "08:00 PM", "Outdoor Theater, Los Angeles", "images/movie.jpg", "Film Screening", 12.5),
  new Ticket(13, "Comedy Show", "Laugh Factory", "Sep 1", "Friday", "07:30 PM", "Comedy Club, New York", "images/comedy2.jpg", "Entertainment", 30),
  new Ticket(14, "Science Exhibition", "Science Museum", "Sep 2", "Saturday", "09:00 AM", "Science Center, Tokyo", "images/science.jpg", "Exhibition", 15),
  new Ticket(15, "Dance Workshop", "Groove Academy", "Sep 3", "Sunday", "03:00 PM", "Dance Studio, Barcelona", "images/dance2.jpg", "Workshop", 40),
  new Ticket(16, "Music Festival", "Groove Fest", "Sep 4", "Monday", "12:00 PM", "Open Field, Rio de Janeiro", "images/music.jpg", "Festival", 80),
  new Ticket(17, "Tech Hackathon", "InnovateTech", "Sep 5", "Tuesday", "10:00 AM", "Innovation Center, Bangalore", "images/tech3.jpg", "Networking Event", 25),
  new Ticket(18, "Cooking Masterclass", "Culinary Delights", "Sep 6", "Wednesday", "06:30 PM", "Cooking School, Paris", "images/cooking2.jpg", "Networking Event", 55.5),
  new Ticket(19, "Sports Championship", "Sports Arena", "Sep 7", "Thursday", "04:00 PM", "Stadium, New York", "images/sports.jpg", "Championship", 70),
  new Ticket(20, "Gardening Workshop", "Green Thumb", "Sep 8", "Friday", "11:00 AM", "Botanical Garden, Sydney", "images/gardening.jpg", "Workshop", 35),
  new Ticket(21, "Art Auction", "Art Enthusiasts", "Sep 9", "Saturday", "02:00 PM", "Auction House, London", "images/art.jpg", "Auction", 50),
  new Ticket(22, "Educational Seminar", "Knowledge Hub", "Sep 10", "Sunday", "09:00 AM", "Conference Hall, Tokyo", "images/seminar.jpg", "Networking Event", 15),
  new Ticket(23, "Cultural Festival", "Cultural Exchange", "Sep 11", "Monday", "03:00 PM", "Community Center, Rio de Janeiro", "images/culture.jpg", "Festival", 10),
  new Ticket(24, "Stand-up Comedy", "Funny Fiasco", "Sep 12", "Tuesday", "07:00 PM", "Comedy Club, Barcelona", "images/comedy4.jpg", "Major Event", 20),
  new Ticket(25, "Robotics Exhibition", "Robot World", "Sep 13", "Wednesday", "10:00 AM", "Tech Center, Bangalore", "images/tech4.jpg", "Exhibition", 40),
  new Ticket(26, "Yoga Retreat", "Inner Peace", "Sep 14", "Thursday", "06:30 AM", "Mountain Resort, Paris", "images/yoga.jpg", "Retreat", 90),
  new Ticket(27, "Music Workshop", "Melody Makers", "Sep 15", "Friday", "02:00 PM", "Music School, New York", "images/music5.jpg", "Workshop", 30),
  new Ticket(28, "Photography Exhibition", "Capture Moments", "Sep 16", "Saturday", "10:00 AM", "Art Gallery, London", "images/photography.jpg", "Networking Event", 20),
  new Ticket(29, "Cooking Workshop", "Flavor Fusion", "Sep 17", "Sunday", "03:00 PM", "Culinary School, Paris", "images/cooking.jpg", "Workshop", 40)

];

const eventquery = document.querySelector(".row");

function displayEvents(events) {
  events.forEach((event) => {
    eventquery.innerHTML += event.generateHTML();
  });
}

// Sort events by date before displaying
events.sort((a, b) => new Date(a.date) - new Date(b.date));

displayEvents(events);

//getters and setters for tickets
function getNumTicketsRemaining() {
  return numTicketsRemaining;
}

function setNumTicketsRemaining(newCount) {
  numTicketsRemaining = newCount;
}

//update tickets accordingly
function updateNumTicketsRemaining(selectedEvent) {
  if (selectedEvent) {
    const selectedStandardPrice = selectedEvent.price;
    const selectedVIPPrice = selectedEvent.vipPrice;
    const selectedTickets = parseInt(document.getElementById("num-tickets").value);
    
    const totalCost = (selectedStandardPrice * selectedTickets) + (selectedVIPPrice * selectedTickets);
    
    if (totalCost <= numTicketsRemaining) {
      numTicketsRemaining -= totalCost;
      return true;
    } else {
      return false;
    }
  }
}

function searchEvent() {
  const searchInput = document
    .getElementById("searchField")
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
