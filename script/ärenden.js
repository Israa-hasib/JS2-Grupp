const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';
console.log(BASE_URL);
let errands = []

const output = document.querySelector('#output');

const getPosts = async () => {
  
  // Try to fetch
  try {
    const res = await fetch(BASE_URL)
    const posts = await res.json()
    console.log(res)

    // Function to sort posts
    const sortPosts = (posts) => {
      return posts.sort((a, b) => {
        return new Date(b.created) - new Date(a.created);
      });
    }
    // Skickar posts genom sortPosts funktionen och sparar i errands arrayen
    errands = sortPosts(posts);

    console.log(errands)
    // För varje post i sortedPosts
    errands.forEach(post => {
 
      //Skicka med posten och skapa ett nytt card element som är child till output
      output.appendChild(createCardElement(post))
    })
  }

  // Catch error - output error message
  catch(err) {
    console.log(err);
    output.innerHTML += `
        <div class="card">
            <h3>${err}</h3>
        </div>
        `
  }   
}

getPosts()


// Create a new card element with the info from each post of sortedPosts
const createCardElement = (post) => {
  const cardListErrands = document.createElement('a')
  cardListErrands.className = 'cardListErrands'

  // card.href = `details.html?id=${post.id}`
  cardListErrands.setAttribute('href', `detaljer.html?id=${post.id}`)

  const cardHeader = document.createElement('div')
  cardHeader.className = 'cardHeader'

  const messageDiv = document.createElement('div')
  messageDiv.className = 'messageDiv'

  const mailDiv = document.createElement('div')
  mailDiv.className = 'mailDiv'

  const subject = document.createElement('h3')
  subject.innerText = post.subject

  const time = document.createElement('p');
  const date = new Date(post.created);
  time.innerText = date.toLocaleString()
  time.classList.add('timeText');

  const messageHeading = document.createElement('p')
  messageHeading.innerHTML = '<b>Message: </b>'

  const message = document.createElement('p')
  message.innerText = post.message

  const mailHeading = document.createElement('p')
  mailHeading.innerHTML = '<b>Email: </b>'

  const email = document.createElement('p')
  email.innerText = post.email

  // ADD DIV FOR STATUS
  const statusSection = document.createElement('div')
  statusSection.classList.add('statusSection');
  
  const statusHeading = document.createElement('p')
  statusHeading.innerHTML = '<b>Status: </b>'

  const status = document.createElement('p')
  status.classList.add('errand_status')
  status.innerText = post.status.statusName

  // Status color
  const statusColor = document.createElement('div')
    statusColor.classList.add('statusColor')

  if(post.statusId == 3) {
    statusColor.classList.add('green')
  }
  else if(post.statusId == 2) {
    statusColor.classList.add('yellow')
  }
  else {
    statusColor.classList.add('red')
  }
    
  cardListErrands.appendChild(statusSection)
  statusSection.appendChild(statusColor)
  // ADD INPUT FORM TO DETAILS CARD
  const detailsForm = document.createElement('form')
  detailsForm.setAttribute("id", "detailsForm");
  detailsForm.className = 'details_form'

   // ADD DIV FOR RADIO BUTTONS
   const radioSection = document.createElement('div')
   radioSection.classList.add('radioSection');

   // Status not started
   const statusNotStarted = document.createElement('INPUT')
   statusNotStarted.setAttribute("type", "radio");
   statusNotStarted.setAttribute("name", "status");
   statusNotStarted.setAttribute("value", "1");
   statusNotStarted.setAttribute("id", "notStarted");
   statusNotStarted.setAttribute("checked", "checked");
   statusNotStarted.classList.add('statusRadio')

   // Status pending
   const statusPending = document.createElement('INPUT')
   statusPending.setAttribute("type", "radio");
   statusPending.setAttribute("name", "status");
   statusPending.setAttribute("value", "2");
   statusPending.setAttribute("id", "pending");
   statusPending.classList.add('statusRadio')

   // Status done
   const statusDone = document.createElement('INPUT')
   statusDone.setAttribute("type", "radio");
   statusDone.setAttribute("name", "status");
   statusDone.setAttribute("value", "3");
   statusDone.setAttribute("id", "done");
   statusDone.classList.add('statusRadio')

  
   // Add Comment text input
  let comment = document.createElement('INPUT')
  comment.setAttribute("type", "text");
  comment.setAttribute("id", "comment");
  comment.classList.add('textInput');

   // Add mail text input
   let commentEmail = document.createElement('INPUT')
   commentEmail.setAttribute("type", "text");
   commentEmail.setAttribute("id", "commentEmail");
   commentEmail.classList.add('textInput');

  //  Add submit button to details form
  let detailsSubmit = document.createElement('button');
  detailsSubmit.setAttribute("name", "btb-d-submit");
  detailsSubmit.setAttribute("value", "submitDetails");
  detailsSubmit.setAttribute("id", "d-submit");
  detailsSubmit.innerText = "Submit";
  detailsSubmit.classList.add('cardButtons')
  detailsSubmit.classList.add('btnSubmitDetails');

  //  Add close button to details card
  let btnCloseDetails = document.createElement('button');
  btnCloseDetails.setAttribute("name", "close-details");
  btnCloseDetails.setAttribute("id", "btn-close-details");
  btnCloseDetails.setAttribute("onclick", "window.location.href='errands.html'");
  btnCloseDetails.innerText = "Close";
  btnCloseDetails.classList.add('cardButtons')
  btnCloseDetails.classList.add('btnCloseDetails');


  // Display everything on the card
  cardListErrands.appendChild(cardHeader)
  cardHeader.appendChild(subject)
  cardHeader.appendChild(time)
  cardListErrands.appendChild(messageDiv)
  messageDiv.appendChild(messageHeading)
  messageDiv.appendChild(message)
  cardListErrands.appendChild(mailDiv)
  mailDiv.appendChild(mailHeading)
  mailDiv.appendChild(email)
  cardListErrands.appendChild(statusSection)
  statusSection.appendChild(statusHeading)
  statusSection.appendChild(statusColor)
  statusSection.appendChild(status)

  return cardListErrands
}