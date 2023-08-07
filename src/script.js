// Global variables
let namesList = document.getElementById('names_list');
let form = document.getElementsByTagName('form')[0];
let latestLength = 0;
let modal = document.getElementById("myModal");         
let span = document.getElementsByClassName("close")[0]; 
let vid = document.getElementById("video-container");

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
        let username = extractUsername(uname);
        // Check if valid username
        if(username){
         // Get method
        //consume Github api to get user details
        fetch(`https://api.github.com/users/${username}`)
        .then(response => {
          if(!response.ok){
            throw new Error(`Invalid GitHub username ${username}`);
          }else return response.json()})
        .then(data => {       
            let results = document.getElementById('search_results');
            let div = document.createElement('div');
            let btn = document.createElement('button');
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
            btn.id = data.login;
            btn.textContent = "Profile"
            btn.addEventListener('click', ()=>{
                modal.style.display = "block";
                modalData(data)
                });
            link.addEventListener('mouseover', ()=>{
            
                link.appendChild(btn);
                btn.style.display = "block"
                span.onclick = function() {
                    modal.style.display = "none";
                  }
                window.onclick = function(event) {
                    if (event.target == modal) {
                      modal.style.display = "none";
                    }
                  }
            })
            link.addEventListener('mouseout', ()=>{
                btn.style.display = 'none';
            })
            link.addEventListener('click', ()=>{
               languagesDisplay(data.login);
               
            })          
        })
      }

    })
    vid.style.display = 'none';
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
let lang_nav = document.getElementById('lang_nav');


// on click function to display the users most used languages
function languagesDisplay(){  
    
    // Display in an Iframe
    let link = document.getElementById('myLink');
    iframe.src = link.href; 
}
function recentRepos(username) {
    let modal_body = document.getElementsByClassName('modal-body')[0];
    modal_body.innerHTML = '';
    let modal_div = document.createElement('div');
    let md = document.createElement('div');
    md.setAttribute('id', 'md');
    modal_div.setAttribute('id', 'recent');
    let search = document.createElement('input');
    search.type = 'text';
    search.id = 'lang';
    search.placeholder = 'Language🔍';

    // add an eventlistener to search the input for 
    // repos using the language
    search.addEventListener('input', () => {
      let language = search.value.trim().toLowerCase();
      let repos = md.getElementsByClassName('repos');

      // Create elements from class repos into an array and loop
      Array.from(repos).forEach((repo) => {
        let repoLanguage = repo.querySelector('p:nth-child(1)').textContent.trim().toLowerCase();
        if (language === '' || repoLanguage.includes(language)) {
          repo.style.display = 'block'; 
        } else {
          repo.style.display = 'none'; 
        }
      })
    })

//Fetch and display recent repos for the specific user
     fetch(`https://api.github.com/users/${username}/repos?sort=created`)
      .then(response => response.json())
      .then(data => {
             
        data.forEach(d=>{
            let card = document.createElement('div');
            card.setAttribute('class', 'repos');
            card.innerHTML =`
            <div id="nav_repos">
            <h4>${d.name}<h4>
            <a id="repo_link" href="https://github.com/${d.owner.login}/${d.name}" target="_blank" title="GitHub Link">🏹</a>
            </div>
            <div id="body_repos">
            <p>Top Language: ${d.language} </p>
            <p>${(d.created_at).split('T')[0]} <p>
            <div>
            
            ` 
         md.appendChild(card) 
        modal_div.appendChild(md);
        modal_div.appendChild(search);
        
        })
        modal_body.appendChild(modal_div);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    
  }
  // add a modal to display user profile
function modalData(data){
    console.log(data);
    let modal_header = document.getElementsByClassName('modal-header')[0];
    let div = document.createElement('div');
    div.setAttribute('class', 'rating');
    for(let i=0; i<5; i++) {
        let span = document.createElement('span');
        span.setAttribute('data-star',i);
        span.setAttribute('class', 'star');
        span.innerHTML = `&#9733;`
        div.appendChild(span);
    }
    
    modal_header.innerHTML =`
    <img  src="${data.avatar_url} id="avatar1">
    <h3>${data.login}</h3>
    <hr>
    <p>Bio: ${data.bio}</p>
    <p>Public Repos: ${data.public_repos}</p>  
    <div id="followers"><p>Followers: ${data.followers}  |</p>
    <p>| Following: ${data.following} </p>
    </div>  
    <a id="gh" href="${data.html_url}" target="_blank"><img id="github" src="./images/download.png" alt="github" ></a>
    `
    modal_header.appendChild(div);

    // Add stars for rating
    let stars = document.getElementsByClassName('star');
    function changeColor(num) {
        for (let i = 0; i < stars.length; i++) {
          if (i <= num) {
            stars[i].style.color = 'yellow';
          } else {
            stars[i].style.color = 'gray';
          }
        }
      }
      for (let i = 0; i < stars.length; i++) {
        stars[i].addEventListener('click', function() {
          let starNumber = parseInt(this.getAttribute('data-star'));
          changeColor(starNumber);
        });
      }
    
   recentRepos(data.login); 

  }
