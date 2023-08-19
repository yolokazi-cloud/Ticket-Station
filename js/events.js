const events = [
    {
        id: 0,
        evntname: 'Unplugged Acoustic',
        hostname: 'Amazon',
        date: 'Aug 25',
        time: '07:00 AM',
        day: 'FRI',
        venue: 'New York, USA',
        imgsrc: 'images/john.jpg',
    }, {
        id: 1,
        evntname: 'Music Lounge',
        hostname: 'Musiq Soulchild',
        date: 'AUG 25',
        day: 'FRI',
        time: '07:00PM',
        venue: 'New York, USA',
        imgsrc: 'images/musiq.jpg',

    }, {
        id: 2,
        evntname: 'Bridgerton: Queen Charlotte Launch',
        hostname: 'Shondaland',
        date: 'Aug 26',
        day: 'Sunday',
        time: '06:00PM',
        venue: 'NetFlix Studios, RSA',
        imgsrc: 'images/bridge.jpg',

    }, {
        id: 3,
        evntname: 'The Lion King Premiere',
        hostname: 'Disney',
        date: '25/08/2023',
        day: 'Friday',
        time: '18:30',
        venue: 'Disney Studios, USA',
        imgsrc: 'images/johnkani.jpg',
    }, {
        id: 4,
        evntname: 'Dance Concert',
        hostname: 'Carnival Presents',
        date: '26/08/2023',
        time: '19:30',
        venue: 'Carvival City, USA',
        imgsrc: 'images/dance.jpg',
    }, {
        id: 5,
        evntname: 'Fitness Workshop',
        hostname: 'Jillian Michaels',
        date: '25/08/',
        day: 'Friday',
        time: '12:30',
        venue: 'Milpark, Brazil',
        imgsrc: 'images/jillian.webp',
    }, {
        id: 6,
        evntname: 'Adventure retreat in Amazon Forest',
        hostname: 'Amazon',
        date: 'Aug 25',
        time: '10:30',
        day: 'Friday',
        venue: 'Amazon Forest, UK',
        imgsrc: 'images/amazon.jpg',
    }

];
//elements to select
const eventquery = document.querySelector(".row");

function displayEvents() {
    events.forEach((event) => {
        eventquery.innerHTML += `
      
   <div class="col-sm-6 col-lg-4 event-card">
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
                    <select class="btn btn-secondary " style="color: white; display: inline-block; margin-top: -22%; margin-left:60%;">
                    <i class="bi bi-chevron-compact-down" style="margin-left:5px;font-size:13px;"></i></a>
                 
                    <option selected>Book Ticket</option>
                    <option value ="1">Standard</option>
                    <option value ="2">VIP</option>

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
displayEvents();

// SEARCH

function searchEvent() {
    const searchInput = document.getElementById('search-input').value;
    let elements = document.querySelectorAll(".event-name");
    let cards = document.querySelectorAll(".event-card");
    console.log(searchInput);

    //loop through all elements
    elements.forEach((element, index) => {
        // check if elements include the input value
        if (element.innerText.includes(searchInput.toLowerCase())) {
          // display matching card
          cards[index].classList.remove("hide");
        }else{
          //hide the others
          cards[index].classList.add("hide");
        }
      })
}