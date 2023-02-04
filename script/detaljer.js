const id = new URLSearchParams(window.location.search).get('id')
const btnSubmitDetails = document.querySelector('#d-submit')
const detailsForm = document.querySelector('#detailsForm')
const sortedComments = []
let statusID = "";

console.log(id)

const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';
const COMMENT_URL = 'https://fnd22-shared.azurewebsites.net/api/Comments';

const output = document.querySelector('#output');


const getPost = async () => {
  
  try{
    const res = await fetch(BASE_URL + id)
    const post = await res.json()

    if(res.ok){
      console.log(res)
      output.appendChild(createCardElement(post))
    }
    else{
      console.log("Något gick fel!")
    }
  }
  catch(err) {
    console.log(err);
    output.innerHTML += `
        <div class="card">
            <h3>${err}</h3>
        </div>
        `
  } 
}
getPost()

const createCardElement = (post) => {
  const cardDetails = document.createElement('div')
  cardDetails.className = 'cardDetails'

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
  messageHeading.innerHTML = '<b>Meddelande: </b>'

  const message = document.createElement('p')
  message.innerText = post.message

  const mailHeading = document.createElement('p')
  mailHeading.innerHTML = '<b>Email: </b>'

  const email = document.createElement('p')
  email.innerText = post.email


  const statusSection = document.createElement('div')
  statusSection.classList.add('statusSection');

  const statusHeading = document.createElement('p')
  statusHeading.innerHTML = '<b>Status: </b>'

  const status = document.createElement('p')
  status.classList.add('errand_status')
  status.innerText = post.status.statusName

  

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
    
  cardDetails.appendChild(statusSection)
  statusSection.appendChild(statusColor)
  const detailsForm = document.createElement('form')
  detailsForm.setAttribute("id", "detailsForm");
  detailsForm.className = 'details_form'

   const radioSection = document.createElement('div')
   radioSection.classList.add('radioSection');

   const statusNotStarted = document.createElement('INPUT')
   statusNotStarted.setAttribute("type", "radio");
   statusNotStarted.setAttribute("name", "status");
   statusNotStarted.setAttribute("value", "1");
   statusNotStarted.setAttribute("id", "notStarted");
   statusNotStarted.setAttribute("checked", "checked");
   statusNotStarted.classList.add('statusRadio')

   const statusPending = document.createElement('INPUT')
   statusPending.setAttribute("type", "radio");
   statusPending.setAttribute("name", "status");
   statusPending.setAttribute("value", "2");
   statusPending.setAttribute("id", "pending");
   statusPending.classList.add('statusRadio')

   const statusDone = document.createElement('INPUT')
   statusDone.setAttribute("type", "radio");
   statusDone.setAttribute("name", "status");
   statusDone.setAttribute("value", "3");
   statusDone.setAttribute("id", "done");
   statusDone.classList.add('statusRadio')

  
  let comment = document.createElement('INPUT')
  comment.setAttribute("type", "text");
  comment.setAttribute("id", "comment");
  comment.classList.add('textInput');

   let commentEmail = document.createElement('INPUT')
   commentEmail.setAttribute("type", "text");
   commentEmail.setAttribute("id", "commentEmail");
   commentEmail.classList.add('textInput');

  let detailsSubmit = document.createElement('button');
  detailsSubmit.setAttribute("name", "btb-d-submit");
  detailsSubmit.setAttribute("value", "submitDetails");
  detailsSubmit.setAttribute("id", "d-submit");
  detailsSubmit.innerText = "Skicka";
  detailsSubmit.classList.add('cardButtons')
  detailsSubmit.classList.add('btnSubmitDetails');

  let btnCloseDetails = document.createElement('button');
  btnCloseDetails.setAttribute("name", "close-details");
  btnCloseDetails.setAttribute("id", "btn-close-details");
  btnCloseDetails.setAttribute("onclick", "window.location.href='errands.html'");
  btnCloseDetails.innerText = "Stäng";
  btnCloseDetails.classList.add('cardButtons')
  btnCloseDetails.classList.add('btnCloseDetails');


  cardDetails.appendChild(cardHeader)
  cardHeader.appendChild(subject)
  cardHeader.appendChild(time)
  cardDetails.appendChild(messageDiv)
  messageDiv.appendChild(messageHeading)
  messageDiv.appendChild(message)
  cardDetails.appendChild(mailDiv)
  mailDiv.appendChild(mailHeading)
  mailDiv.appendChild(email)
  cardDetails.appendChild(statusSection)
  statusSection.appendChild(statusHeading)
  statusSection.appendChild(statusColor)
  statusSection.appendChild(status)

  post.comments.forEach(e => {
    return post.comments.sort((a, b) => {
    return new Date(b.created) - new Date(a.created);
    })
  })

  post.comments.forEach(comment => {
    sortedComments.push(comment)
  })

  sortedComments.forEach(data => {

    cardDetails.innerHTML += `
    <p><b>Kommentar:</b> ${data.message}</p>
    <p><b>Email:</b> ${data.email}</p>
    <p>${new Date(data.created)}</p><br>
    `

  })

  radioSection.innerHTML += `<h4>Ändra status:</h4>`
  radioSection.innerHTML += `<p>Ej påbörjad:</p>`
  radioSection.appendChild(statusNotStarted)
  radioSection.innerHTML += `<p>Pågående:</p>`
  radioSection.appendChild(statusPending)
  radioSection.innerHTML += `<p>Klar:</p>`
  radioSection.appendChild(statusDone)

  detailsForm.innerHTML += `<h4>Komentera:</h4>`
  detailsForm.appendChild(comment)
  detailsForm.innerHTML += `<h5>Email:</h5>`
  detailsForm.appendChild(commentEmail)
  detailsForm.appendChild(radioSection)
  detailsForm.appendChild(detailsSubmit)
  
  cardDetails.appendChild(detailsForm)
  cardDetails.appendChild(btnCloseDetails)

  detailsForm.addEventListener('Skicka', commentSubmit)
  return cardDetails
}


const commentSubmit = e => {
  e.preventDefault()

  console.log(e.target.comment.value);
  console.log(e.target);

  let statusID = 0;

  console.log(commentEmail)
  commentEmail = e.target.commentEmail.value
  console.log(commentEmail)
  comment = e.target.comment.value
    

  if(e.target.notStarted.checked){
    console.log("Status: Ej påbörjad")
    statusID = 1;
  }
  else if(e.target.pending.checked){
    console.log("Status: pågående")
    statusID = 2;
  }
  else if(e.target.done.checked){
    console.log("Status: klar")
    statusID = 3;
  }
  

  let changeID = {
    id: id,
    statusID: statusID,
  }

  let options = {
    method: "PUT",
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(changeID)
  }

  try{
    fetch(BASE_URL+id, options)
    .then((idRes) => console.log(idRes))


    const addComment = {
      caseID: id,
      email: document.querySelector('#commentEmail').value,
      message: comment,
    }

    let commentOptions = {
      method: "POST",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(addComment)
    }

    if(comment == "") {
      console.log("Ingen kommentar!")
      return
    }else if(commentEmail == "") {
      console.log("Lägg till Email!")
    }
    else{
      try{
        fetch(COMMENT_URL, commentOptions)
        .then((commentRes) => console.log(commentRes))

        document.querySelector('.textInput').value = "";
        document.querySelector('#commentEmail').value = "";

        setTimeout(() => {
          window.location.reload();
        }, "400")

        setTimeout();

      } 

      catch(err) {
        console.log(err);
        output.innerHTML += `
            <div class="card">
                <h3>${err}</h3>
            </div>
            `
      } 
    }

  }
  catch(err) {
    console.log(err);
    output.innerHTML += `
        <div class="card">
            <h3>${err}</h3>
        </div>
        `
  }   

}
