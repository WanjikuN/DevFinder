// create a search form
    // Adds elements to a ul li 
    // searches names from the ul
// A form to add the search inputs
let namesList = document.getElementById('names_list');
let form = document.getElementsByTagName('form')[0];


const handleForm = (e) => {
    e.preventDefault();
let user = document.getElementById('user').value;
let li = document.createElement('li');
li.textContent = user;
li.setAttribute('class','listy')
namesList.appendChild(li);
form.reset();
};
form.addEventListener('submit', handleForm);
