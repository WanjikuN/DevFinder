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

// Fetching user details on search

const handleSearch =()=>{
    
    let listy = document.getElementsByClassName('listy');
    let listyArray = [...listy];
    listyArray.forEach(l =>{
        
        // extract username
        let uname = l.textContent; 
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
        })

    })
    
}
