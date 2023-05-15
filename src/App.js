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
import { Fragment, useEffect, useState } from 'react';
import './App.scss';

const clientId = '96784';
const activityID = '8076222179';
const clientSecret = 'fac7d050a2167b73f126050654539331d0ce413c';
const callActivity = 'https://www.strava.com/api/v3/activities/id?access_token=';

const dummyData = {
  name: 'Richmond half',
  data: '11-22-2022',
  distance: 21.1,
  location: 'London, England',
  finishTime: '1:41:22',
  elevation: 520,
  splits: [
    {
      name: "Lap 1",
      time: "5:20"
    },
    {
      name: "Lap 2",
      time: "5:20"
    },
    {
      name: "Lap 3",
      time: "5:20"
    },
    {
      name: "Lap 4",
      time: "5:20"
    },
    {
      name: "Lap 5",
      time: "5:20"
    },
    {
      name: "Lap 6",
      time: "5:20"
    }
  ]
} 

function App() {
  const [showBlocks, updateShowBlocks] = useState(false);
  const [raceData, updateRaceData] = useState(dummyData);
  const [isLoading, setIsLoading] = useState(true);

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
        throw new Error(`Something went wrong ${response}`)
      }

      const data = await response.json();
      const transformedData = {
        name: data.name,
        date: data.start_date_local,
        distance: data.distance,
        location: `${data.location_city}, ${data.location_country}`,
        finishTime: data.elapsed_time,
        elevation: data.total_elevation_gain,
        splits: data.laps.map(lap => ({
          name: lap.name,
          time: lap.elapsed_time
        }))
      };

      updateRaceData(transformedData);

    } catch (error) {
        console.log(`error occurred${error}`);
    }
    setIsLoading(false);
    updateShowBlocks(true);
  }

  // Test for Strace redirect URL on reload
  useEffect(() => {
    if(window.location.search !== '') {
      setIsLoading(true);
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const code = urlParams.get('code');

      if(code != null) {
        fetch(`https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(result => displayData(result.access_token, activityID));
    }

    } else {
      console.log('not a strava url');
      setIsLoading(false);
    }
  }, [])

  return (

    <Fragment>
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
              <Splits raceData={raceData}/>
            </div>
            <div className="col-2-of-3">
                <Preview/>
            </div>
        </div>
        }

      </main>
      <Footer/>
    </Fragment>

  );
}

export default App;
