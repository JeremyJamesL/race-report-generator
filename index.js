const form = document.querySelector('form');
const outputArea = document.querySelector('.output');
const loading = document.querySelector('.loading');

let clientId = '96784';
let clientSecret = 'fac7d050a2167b73f126050654539331d0ce413c';
let callActivity = 'https://www.strava.com/api/v3/activities/id?access_token=';
let accessToken = ''

let activities;


// Event listeners

form.addEventListener('submit', handleSubmit);

window.addEventListener('load', () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    fetch(`https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(result => accessToken = result.access_token);

});



// Loading 

function displayLoading() {
    loading.style.display = 'block';
}

function hideLoading() {
    loading.style.display = 'none';
}



// Display activities

function setActivities(race) {
    
    const convertToMin = (s) => {
        let minutes = Math.floor(s / 60)
        let seconds = s % 60;

        return `${minutes}:${seconds}`
    }

    console.log(race);
    let shoes = race.gear.name;
    let raceName = race.name;
    let totalTime = new Date(race.elapsed_time * 1000).toISOString().slice(11,19);
    let splits = race.laps;

    let html = 
    `
    <h2>${raceName}</h2>
    <h4>${totalTime}</h4>
    <h4>${shoes}</h4>
    <ul>    
        ${splits.map((lap) => `
        <li>
           <span>${lap.name}:</span>
            <span>${convertToMin(lap.elapsed_time)}
            </span>
        </li>`).join('')}
    </ul>
    `
    outputArea.insertAdjacentHTML("afterbegin", html);

}


// Handle submit

function handleSubmit(event) {
    event.preventDefault();

    displayLoading();

    let urlSplit = event.target.elements[0].value.split("/");
    let activityId = urlSplit[urlSplit.length -1];
    console.log(activityId);

    fetch(`https://www.strava.com/api/v3/activities/${activityId}?access_token=${accessToken}`)
    .then(response => response.json())
    .then(result => {
        hideLoading();
        setActivities(result);
    })

}


