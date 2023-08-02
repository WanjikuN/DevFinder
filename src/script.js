// create a search form
    // Adds elements to a ul li 
    // searches names from the ul
// A form to add the search inputs
let namesList = document.getElementById('names_list');
let form = document.getElementsByTagName('form')[0];
let latestLength = 0;

const handleForm = (e) => {
    e.preventDefault();
let user = document.getElementById('user').value;
let li = document.createElement('li');
li.textContent = user;
li.setAttribute('class','listy')
// namesList.appendChild(li);
namesList.insertBefore(li, namesList.firstChild); // Insert the latest item at the top
latestLength++; // Increment the latest length for the next item
li.innerHTML = latestLength + ". "+  user; // Set the text content with the latest length

form.reset();
};
form.addEventListener('submit', handleForm);

// Fetching user details on search

const handleSearch =()=>{
    
    let listy = document.getElementsByClassName('listy');
    let listyArray = [...listy];
    listyArray.forEach(l =>{
        
        // extract username
        let uname = l.textContent.split(" ")[1]; 
        function extractUsername(uname) {
            if (uname.includes('github.com/')) {
              const urlObject = new URL(uname);
              return urlObject.pathname.split('/')[1];
            } else {
              return uname.trim();
            }
          } 
        console.log(extractUsername(uname))
        let username = extractUsername(uname);
         // Get method
        //conume Github api to get user details
        fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let results = document.getElementById('search_results');
            let div = document.createElement('div');
            div.setAttribute('id', 'results_div');
            div.innerHTML = `
                <div id="nav">
                <img  src="${data.avatar_url} class="avatar">
                <div>
                <h3>${data.login}</h3>
                <p>Bio: ${data.bio}</p>
                <p>Public Repos: ${data.public_repos}</p>
                </div>
                </div>
            `
            results.appendChild(div);
            div.addEventListener('click', ()=>{
                languagesDisplay(username);
            })

        })
        
    })
    clearListArea();
}
// Clear the list section one search button is clicked on
const clearListArea = () => {
    namesList.innerHTML = ''; 
  };

// on user click display their most used languages
function languagesDisplay(user){
    // Add this code to your JavaScript file
const apiUrl = 'https://cors-anywhere.herokuapp.com/https://github-readme-stats.vercel.app/api/top-langs?username=WanjikuN&locale=en&langs_count=8';

// Fetch the data from the GitHub API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Process the fetched data
    const languagesContainer = document.getElementById('languages-container');

    // Create a list to display the languages and their usage percentage
    const list = document.createElement('ul');
    for (const language in data) {
      const item = document.createElement('li');
      item.textContent = `${language}: ${data[language]}%`;
      list.appendChild(item);
    }

    // Add the list to the container
    languagesContainer.appendChild(list);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}