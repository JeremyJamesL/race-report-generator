import 'bootstrap/dist/css/bootstrap.min.css';
import stravaIcon from './assets/images/strava.png';
import Button from './components/UI/Button';
import Spinner from './components/UI/Spinner';
import Header from './components/UI/Header';
import RaceInfo from './components/Blocks/RaceInfo';
import Goals from './components/Blocks/Goals';
import Splits from './components/Blocks/Splits';
import Preview from './components/Blocks/Preview';
import Footer from './components/UI/Footer';
import dummyData from './components/Data/data';
import { Fragment, useEffect, useReducer, useState } from 'react';
import AppContext from './components/Context/app-context';
import './App.scss';

const clientId = '96784';
const activityID = '8076222179';
const clientSecret = 'fac7d050a2167b73f126050654539331d0ce413c';

// Convert times
const convertToMinSec = (s) => {
  const minutes = Math.floor(s / 60);
  const seconds = s % 60;
  
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  return result;
}

// Reducer functions
const raceReducer = (raceData, action) => {
  switch(action.type) {
    case 'addNewRace' : {
      return action.newRace
    }

    case 'switchToMiles': {
      return {
        ...raceData,
        splits: raceData.splitsMiles,
        chosenMeasurementSystem: 'miles',
      }
    }

  }
}

function App() {
  const [showBlocks, updateShowBlocks] = useState(false);
  const [raceData, dispatch] = useReducer(raceReducer, dummyData);
  const [isLoading, setIsLoading] = useState(true);
  console.log(raceData);

  // Reducer actions
  const handleAddNewRace = (race) => {
    dispatch({
      type: 'addNewRace', 
      newRace: race
    })
  }

  const handleSwitchToMiles = (measurement) => {
    dispatch ({
      type: 'switchToMiles',
    })
  }

  const updateInputVal = (input) => {
    // dispatch ({
    //   type: 'updateInput',
    //   newValue: input
    // })
    console.log(`updating input val in app.js ${input}`);
  }

  // Authorize
  const authorize = () => {
    setIsLoading(true);
    const url = `https://www.strava.com/oauth/authorize?client_id=96784&response_type=code&redirect_uri=http://localhost:3000/&approval_prompt=force&scope=activity:read_all`;
    window.location = url;
  }

  // Fetch race data
  const displayData = async(accessToken, activityID) => {
    console.log(accessToken, activityID);
    try {
      const response = await fetch(`https://www.strava.com/api/v3/activities/${activityID}?access_token=${accessToken}`);
      if (!response.ok) {
        throw new Error(`Something went wrong ${response}`);
      }

      const data = await response.json();

      const transformedData = {
        name: data.name,
        date: data.start_date_local,
        distance: data.distance,
        location: `${data.location_city}, ${data.location_country}`,
        finishTime: convertToMinSec(data.elapsed_time),
        elevation: data.total_elevation_gain,
        splitsKM: data.splits_metric,
        splitsMiles: data.splits_standard,

        // Evaluate user measurement system
        chosenMeasurementSystem: '',
        splits: data.laps.map(lap => ({
          name: lap.name,
          time: convertToMinSec(lap.elapsed_time)
        }))
      };

      handleAddNewRace(transformedData);

    } catch (error) {
        console.log(`error occurred${error}`);
    }
    setIsLoading(false);
    updateShowBlocks(true);
  }

  // Test for Strava redirect URL on reload
  useEffect(() => {
      setIsLoading(true);
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const code = urlParams.get('code');

      if(code !== null) {

        const fetchURL = async() => {
          try {
            const response = await fetch(`https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`, {method: 'POST'});

            if (!response.ok) {
              throw new Error(`Something went wrong ${response}`);
            }        

            const data = await response.json();
            displayData(data.access_token, activityID)

          }
          catch (error) {
            console.log(`error occurred${error}`);
          }
        }

        fetchURL();

      }

      else {
        console.log('not a strava url');
        setIsLoading(false);
      }
  }, [])


  return (
    <AppContext.Provider value={{
      raceData,
      updateInputVal
    }}>
      <Header showBlocks={showBlocks}/>

      <main className='main'>
        {!showBlocks && !isLoading &&
          <div className={`row-util home`}>
            <Button text="Add Strava race" icon={stravaIcon} className='home__btn' authorize={authorize}/>
          </div>
        }

        {isLoading &&
            <Spinner/>
          }

        {showBlocks &&
        <div className="row-util">
            <div className="col-1-of-3">
              <RaceInfo raceData={raceData}/>
              <Goals/>
              <Splits raceData={raceData} handleSwitchToMiles={handleSwitchToMiles}/>
            </div>
            <div className="col-2-of-3">
                <Preview raceData={raceData}/>
            </div>
        </div>
        }

      </main>
      <Footer/>
    </AppContext.Provider>
  );
}

export default App;
