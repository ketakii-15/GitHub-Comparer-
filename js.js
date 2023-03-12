// We first select the form and the results div from the HTML document.

const form = document.querySelector('form');
const resultsDiv = document.querySelector('#results');

// We add an event listener to the form that listens for the submit event.

form.addEventListener('submit', e => {
    e.preventDefault();

    // Inside the event listener, we extract the values of the two input fields and use them to construct the URLs for the two API requests.
    const username1 = document.querySelector('#username1').value;
    const username2 = document.querySelector('#username2').value;
    fetch(`https://api.github.com/users/${username1}`)
        .then(response => response.json())
        .then(data1 => {
            fetch(`https://api.github.com/users/${username2}`)
                .then(response => response.json())
                .then(data2 => {
                    resultsDiv.innerHTML = `
          <div class="profile">
            <img src="${data1.avatar_url}" alt="${username1}">
            <div class="profile-info>
                                    <h2>${data1.name}</h2>
            <p>Username: ${data1.login}</p>
            <p>Followers: ${data1.followers}</p>
            <p>Repositories: ${data1.public_repos}</p>
          </div>
          <div class="profile">
            <img src="${data2.avatar_url}" alt="${username2}">
            <div class="profile-info">
              <h2>${data2.name}</h2>
              <p>Username: ${data2.login}</p>
              <p>Followers: ${data2.followers}</p>
              <p>Repositories: ${data2.public_repos}</p>
            </div>
          </div>
        `;
                })
                .catch(error => {
                    resultsDiv.innerHTML = `<p>Error fetching data for ${username2}</p>`;
                });
        })
        .catch(error => {
            resultsDiv.innerHTML = `<p>Error fetching data for ${username1}</p>`;
        });
});