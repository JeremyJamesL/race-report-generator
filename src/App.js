import 'bootstrap/dist/css/bootstrap.min.css';
import { BsStrava, BsFillPenFill } from "react-icons/bs";
import Markdown from './components/Modals/Markdown';
import Button from './components/UI/Button';
import Spinner from './components/UI/Spinner';
import Header from './components/UI/Header';
import RaceInfo from './components/Blocks/RaceInfo';
import Goals from './components/Blocks/Goals';
import Splits from './components/Blocks/Splits';
import Preview from './components/Blocks/Preview';
import Footer from './components/UI/Footer';
import dummyData from './components/Data/data';
import ReactDOM from 'react-dom';
import { Fragment, useEffect, useReducer, useState } from 'react';
import AppContext from './components/Context/app-context';
import bs from './components/UI/Button.module.scss';
import {convertDateToReadable, convertToMinSec, convertSecondsToHMS, metresToKm, convertMinSecToSec} from './utils/utils';
import './App.scss';

const clientId = '96784';
const activityID = '8076222179';
const clientSecret = 'fac7d050a2167b73f126050654539331d0ce413c';

// Reducer functions
const raceReducer = (raceData, action) => {
  switch(action.type) {

    case 'addNewRace' : {
      return action.newRace;
    }

    case 'updateInput' : {
      if(action.dataType === 'goal') {
        return {
            ...raceData,
            goals: raceData.goals.map((g) => g.name === action.name ? {...g, value: action.newValue} : g )
            }
      } else if(action.dataType === 'race-info') {
          return {
          ...raceData,
          [action.name]: action.newValue
        }
      } else if(action.dataType === 'split') {
        return {
          ...raceData,
          splits: raceData.splits.map((s) => s.split === action.name ? {...s, elapsed_time : action.newValue} : s)
        }
        // console.log(action.name);
      }
    }
    
    case 'changeCompleted': {
      return {
        ...raceData,
        goals: raceData.goals.map((g) => g.name === action.goalID ? {...g, completed: action.newValue} : g )
      }
    }

    case 'switchMeasurement': {
        if(action.unit === 'miles') {
          return {
            ...raceData,
            chosenMeasurementSystem: 'miles',
            splits: raceData.splits.map(s => {
              return {
                ...s,
                elapsed_time: convertToMinSec(convertMinSecToSec(s.elapsed_time) * 1.609)
              }
            })
          }
        }
        else {
          return {
            ...raceData,
            chosenMeasurementSystem: 'km',
            splits: raceData.splits.map(s => {
              return {
                ...s,
                elapsed_time: convertToMinSec(convertMinSecToSec(s.elapsed_time) / 1.609)
              }
            })
          }
        }
    }

    case 'deleteOrAddSplit' : {
      if(action.operation === 'delete') {
        return {
          ...raceData,
          splits: raceData.splits.filter((_, i) => 
            i !== raceData.splits.length-1
          )
        }
      } else if(action.operation === 'add') {
        console.log('adding split')
        return {
          ...raceData,
          splits: raceData.splits.concat({
            split: (raceData.splits.length + 1).toString(),
            elapsed_time: '05:20'
          })
        }
      }
    }

    case 'deleteOrAddGoal' : {
        if(action.operation === 'delete') {
          console.log('deleting')
          return {
            ...raceData,
            goals: raceData.goals.filter((_, i) => 
              i !== raceData.goals.length-1
            )
          }
        } else if(action.operation === 'add') {
          return {
            ...raceData,
            goals: raceData.goals.concat({
              name: (raceData.goals.length + 1).toString(),
              value: "",
              completed: false
            })
          }
        }
    }

    case 'changeGoal' : {
      return {
        ...raceData,
        goals: raceData.goals.map((g) => g.name === action.goalID ? {...g, value: action.newValue} : g )
      }
    }
  }
}

function App() {
  const [showBlocks, updateShowBlocks] = useState(false);
  const [raceData, dispatch] = useReducer(raceReducer, dummyData);
  const [isLoading, setIsLoading] = useState(true);
  const [showMarkdown, updateShowMarkdown] = useState(false);
  const [enterMode, setEnterMode] = useState('');
  console.log(raceData)

  // Reducer actions
  const handleAddNewRace = (race) => {
    dispatch({
      type: 'addNewRace', 
      newRace: race
    })
  }

  const updateGoalCompleted = (goal) => {
    dispatch({
      type: 'changeCompleted',
      goalID: goal.name,
      newValue: goal.newVal
    })
  }

  const deleteOrAddGoal = (operation) => {
    dispatch({
      type: 'deleteOrAddGoal',
      operation: operation
    })
  }

  const deleteOrAddSplit = (operation) => {
    dispatch({
      type: 'deleteOrAddSplit', 
      operation: operation
    })
  }

  const changeMeasurement = (measurement) => {
    dispatch({
      type: 'switchMeasurement',
      unit: measurement
    })
  }

  const updateInputVal = (input, name, dataType) => {
    dispatch ({
      type: 'updateInput',
      newValue: input,
      name: name, 
      dataType
    })
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
      console.log(data);

      const transformedData = {
        name: data.name || '',
        date: convertDateToReadable(data.start_date_local) || '',
        distance: metresToKm(data.distance) || '',
        location: `${data.location_city || ''} ${data.location_country || ''}`,
        finishTime: convertSecondsToHMS(data.elapsed_time) || '',
        elevation: data.total_elevation_gain || '',
        splitsKM: data.splits_metric || '',
        splitsMiles: data.splits_standard || '',
        goals: [
          {
            name: "1",
            value: "Sub 2 hours",
            completed: false,
          },
          {
            name: "2",
            value: "Sub 1:30",
            completed: false
          }
        ] || '',

        // Evaluate user measurement system
        chosenMeasurementSystem: data.laps[0].elapsed_time === data.splits_metric[0].elapsed_time ? 'km' : 'miles',

        splits: data.laps.map(lap => ({
          split: lap.split,
          elapsed_time: convertToMinSec(lap.elapsed_time)
        })) || []
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
      raceData: raceData,
      updateInputVal,
      updateGoalCompleted,
      updateShowMarkdown,
      updateShowBlocks,
      deleteOrAddGoal,
      deleteOrAddSplit,
      changeMeasurement,
      setEnterMode,
      enterMode
    }}>

      {showMarkdown &&
       ReactDOM.createPortal(<Markdown raceData={raceData}/>, document.getElementById('root-markdown'))
      }
      
      <Header showBlocks={showBlocks}/>

      <main className='main'>
        {!showBlocks && !isLoading &&
          <div className={`row-util home`}>
          <div className='home__buttons'>
            <Button text="Add Strava race" icon={<BsStrava className={bs['button__icon']}/>} className='home__btn button__icon' authorize={authorize}/>
            <Button text="Enter manually" icon={<BsFillPenFill className={bs['button__icon']}/>} className='home__btn button__icon' />
          </div>
          </div>
        }
        {isLoading &&
            <Spinner/>
          }
        {showBlocks &&
        <div className="row-util">
            <div className="col-1-of-3">
              <RaceInfo raceData={raceData}/>
              <Goals raceData={raceData}/>
              <Splits raceData={raceData} />
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
