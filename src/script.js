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
            let linkIframe = document.getElementById('linkIframe');
            let link = document.createElement('a');
            link.setAttribute('id', 'myLink');
            link.setAttribute('href',`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&size_weight=0.5&count_weight=0.5&langs_count=5`);
            link.setAttribute('target', 'linkIframe');
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
            link.appendChild(div);
            results.appendChild(link);
            link.addEventListener('click', ()=>{
                languagesDisplay();
            })

        })
        
    })
    clearListArea();
}

// Clear the list section one search button is clicked on
const clearListArea = () => {
    namesList.innerHTML = ''; 
  };
// An Iframe to hold the top languages  
let languages = document.getElementById("languages");
let iframe = document.createElement("iframe");
iframe.setAttribute('id', 'linkIframe');
iframe.setAttribute('name','linkIframe');
languages.appendChild(iframe);

// on click function to display the users most used languages
function languagesDisplay(){
    // Display in an Iframe
    let link = document.getElementById('myLink');
    iframe.src = link.href; 
}