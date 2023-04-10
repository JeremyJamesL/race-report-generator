// Global vars
const form = document.querySelector('form');
const outputArea = document.querySelector('.output');
const loading = document.querySelector('.loading');
const activityInput = document.querySelector('.enter-activity');
const results = document.querySelector('.results');
const unitSelector = document.querySelector('.unit-selector');
const unitRadios = document.querySelectorAll('.radio-units');
const addGoalBtn = document.querySelector('.goal-add'); 
const goalCard = document.querySelector('.card--goals');
const inputsArea = document.querySelector('.inputs');
const raceInfoArea = document.querySelector('.card--race-info');
const splitsArea = document.querySelector('.card--splits');
const goalsArea = document.querySelector('.card--goals');
const backgroundArea = document.querySelector('.card--background');
const previewArea = document.querySelector('.preview');
const sourceArea = document.querySelector('.race-source-text');

let measurement = 'km';
let metricOrStandard;
let clientId = '96784';
let clientSecret = 'fac7d050a2167b73f126050654539331d0ce413c';
let callActivity = 'https://www.strava.com/api/v3/activities/id?access_token=';

let activities;
let globalRace;


// Event listeners 
form.addEventListener('submit', handleSubmit);
raceInfoArea.addEventListener('input', setPreview);
splitsArea.addEventListener('keyup', setSplitsPreview);
goalsArea.addEventListener('keyup', setGoalsPreview);
goalsArea.addEventListener('change', setGoalsPreview);
goalsArea.addEventListener('click', setGoalsPreview);
addGoalBtn.addEventListener('click', handleGoalAdd);

const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = () => {
    const values = {
        name: document.querySelector('.preview__name').textContent,
        date: document.querySelector('.preview__date').textContent,
        distance: document.querySelector('.preview__distance').textContent,
        location: document.querySelector('.preview__location').textContent,
        time: document.querySelector('.preview__time').textContent,
        elevation: document.querySelector('.preview__elevation').textContent,
        splits: Array.from(document.querySelectorAll('.race-splits')),
        goals: Array.from(document.querySelectorAll('.preview__goal'))
    }

    const splits = values.splits.map(function(split,index) {
        return `| ${index + 1} | ${split.value} |\n`
    })

    const goals = values.goals.map(function(goal,index) {
        return `| ${goal.children[0].childNodes[0].data} | ${goal.children[1].childNodes[0].data} | ${goal.children[2].childNodes[0].data} \n`
    })

    const html = `# Race report \n## Info\n### Name: ${values.name}\n### Date: ${values.date}\n### Distance: ${values.distance}\n### Location: ${values.location}\n### Time: ${values.time}\n### Elevation: ${values.elevation}\n### Splits\n| Split | Time |\n|------|------|\n${splits.join('')}\n### Goals\n| Goal | Description | Completed? |\n|------|------|------|\n${goals.join('')}`
    sourceArea.textContent = html;

};
const observer = new MutationObserver(callback);
observer.observe(previewArea, config);
 
window.addEventListener('load', () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
   
    if(code != null) {
        const runID = localStorage.getItem('actID');
        activityInput.value = runID;
        displayLoading();
        fetch(`https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(result => displayData(result.access_token, runID));
    }
});

unitRadios.forEach(unit => {
    unit.addEventListener('change', updateSplits)
})

function displayData(accessToken, ID) {
        fetch(`https://www.strava.com/api/v3/activities/${ID}?access_token=${accessToken}`)
    .then(response => response.json())
    .then(result => {
        hideLoading();
        setActivities(result);
        setPreview();
    })
}


// Add goals

function handleGoalAdd() {

    const html = ` 
    <div class="input-group mb-3 goal">
        <div class="input-group-text">
        <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
        </div>
        <input type="text" class="form-control" aria-label="Text input with checkbox">
        <button type="button" class="btn-close goal-delete fs-6" aria-label="Close" role="button"></button>
  </div>
  `

  document.querySelector('.card--goals').insertAdjacentHTML('beforeend', html);
}


// Loading 

function displayLoading() {
    loading.classList.remove('d-none');
    loading.classList.add('d-block');
}

function hideLoading() {
    loading.classList.remove('d-block');
    loading.classList.add('d-none');
}

// Display activities
function setActivities(race) {

    // Set global race (this poor logic will be fixed)
    globalRace = race;

    if(race.laps.length > race.splits_standard.length) {
        metricOrStandard = 'km';
    } else {
        metricOrStandard = 'miles'
    }

    setSplitsMetric(metricOrStandard);

    function setSplitsMetric() {
        document.querySelector(`.radio-${metricOrStandard}`).checked = true;
    }
    
    // Get data
    let raceName = race.name;
    let totalTime = new Date(race.elapsed_time * 1000).toISOString().slice(11,19);
    let splits = race.laps;

    results.classList.remove('d-none');
    results.classList.add('d-flex');

    const convertToMin = (s) => {
       // 👇️ get number of full minutes
       const minutes = Math.floor(s / 60);
        
       // 👇️ get remainder of seconds
       const seconds = s % 60;
       
       function padTo2Digits(num) {
         return num.toString().padStart(2, '0');
       }
       
       // ✅ format as MM:SS
       const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
       return result;
    }

    function convertTime(time) {
        const timestamp = new Date(time);
        const month = timestamp.toLocaleString('default', {month: 'long'});
        const day = timestamp.toLocaleString('default', {weekday: 'long'});
        const date = timestamp.getDate();
        const year = timestamp.getUTCFullYear();
        return `${day} ${month} ${date}, ${year}`;
    }

    function displaySplits(lap) {

        document.querySelector('.the-splits').insertAdjacentHTML('beforeEnd',
            `
            <div class="mb-3">
                <label for="race-${lap.name}-control" class="form-label">
                    Split ${lap.name}
                </label>
                <input type="text" class="form-control race-splits" id="race-distance-control-${lap.split}" value=${convertToMin(lap.elapsed_time)}>
            </div>
            `
        )
    }

    function displayMetric(metric, item) {
        if(metric !== undefined){
            document.querySelector(`#race-${item}-control`).value = metric;
        }
    }

    displayMetric(raceName, 'name');
    displayMetric(totalTime, 'time');
    displayMetric(race.total_elevation_gain, 'elevation');
    document.querySelector('#race-date-control').value = convertTime(race.start_date);
    document.querySelector('#race-distance-control').value = `${(race.distance / 1000).toFixed(2)} km`;
    displayMetric(race.location_city, 'location');
    document.querySelector('#race-time-control').value = totalTime;
    document.querySelector('#race-location-control').value = race.location_city;

    // Display splits in chosen metric
    race.laps.forEach(lap => displaySplits(lap))
}


// Display preview on first submit
function setPreview() {
    document.querySelector('.table-body').innerHTML = '';
    const inputs = document.querySelectorAll('.card--race-info input');
    const splits = Array.from(document.querySelectorAll('.card--splits .race-splits'));

    const displayInputsPreview = (input) => {
        const inputSelector = input.id.split('-')[1];
        document.querySelector(`.preview__${inputSelector}`).innerHTML = input.value;
    }

    const displaySplitsPreview = (split, index) => {
        const displayIndex = index + 1;
        let html = `
            <th scope="row">${displayIndex}</th>
            <td>${split.value}</td>
        `
        document.querySelector('.table--splits').insertAdjacentHTML('beforeend', html);
    }

    splits.forEach((split, index) => { 
        displaySplitsPreview(split,index)
    })

    inputs.forEach(input => displayInputsPreview(input));

}

function setSplitsPreview() {
    document.querySelector('.table--splits').innerHTML = '';
    const splits = Array.from(document.querySelectorAll('.card--splits .race-splits'));

    const displaySplitsPreview = (split, index) => {
        const displayIndex = index + 1;
        let html = `
            <th scope="row">${displayIndex}</th>
            <td>${split.value}</td>
        `
        document.querySelector('.table--splits').insertAdjacentHTML('beforeend', html);
    }

    splits.forEach((split, index) => { 
        displaySplitsPreview(split,index)
    })
}


function setGoalsPreview(e) {
    if(e.target.classList.contains('goal-delete')) {
        e.target.parentElement.remove();
    }
    const alphabet = ['a','b','c','d','e'];
    const goalValues = Array.from(document.querySelectorAll('.goal'));

    const convertDigitToNum = (num) => {
        return alphabet[num];
    }
    const completedOrNot = (bool) => {
        return bool ? 'Yes' : 'No'
    }

    const goalValuesArr = goalValues.map((el, index) => {
        return `
            <tr class="preview__goal">
                <td>${convertDigitToNum(index)}</td>
                <td>${el.children[1].value}</td>
                <td>${completedOrNot(el.children[0].children[0].checked)}</td>
            </tr>
        `
    });
    document.querySelector('.table--goals').innerHTML = goalValuesArr.join('');
}


// Handle submit
function handleSubmit(event) {
    event.preventDefault();

    const activityID = (form.elements[0].value);    
    localStorage.setItem('actID', activityID);
    const url = `https://www.strava.com/oauth/authorize?client_id=96784&response_type=code&redirect_uri=https://jezl.xyz/&approval_prompt=force&scope=activity:read_all`;
    window.location = url;
}


// Update splits 
function updateSplits(event) {

    const convertToMin = (s) => {

        // 👇️ get number of full minutes
        const minutes = Math.floor(s / 60);
        
        // 👇️ get remainder of seconds
        const seconds = s % 60;
        
        function padTo2Digits(num) {
          return num.toString().padStart(2, '0');
        }
        
        // ✅ format as MM:SS
        const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
        return result;
    }
    
    const displaySplits = (lap) => {

        document.querySelector('.the-splits').insertAdjacentHTML('beforeEnd',
            `
            <div class="mb-3">
                <label for="race-${lap.split}-control" class="form-label">
                    Split ${lap.split}
                </label>
                <input type="text" class="form-control race-splits" id="race-distance-control-${lap.split}" value=${convertToMin(lap.elapsed_time)}>
            </div>
            `
        )
    }
    
    let newSplits;

    if(event.target.value === 'km') {
        newSplits = globalRace.splits_metric;
    } else if (event.target.value = 'miles') {
        newSplits = globalRace.splits_standard;
    }

    document.querySelector('.the-splits').innerHTML = '';

    newSplits.forEach(lap => displaySplits(lap))
    setSplitsPreview();
}

