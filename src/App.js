import 'bootstrap/dist/css/bootstrap.min.css';
import { BsStrava, BsFillPenFill, BsFillInfoCircleFill } from "react-icons/bs";
import Card from './components/UI/Card';
import Markdown from './components/Modals/Markdown';
import Help from './components/Modals/Help';
import InputRaceID from './components/Modals/InputRaceID';
import Button from './components/UI/Button';
import Spinner from './components/UI/Spinner';
import Header from './components/UI/Header';
import RaceInfo from './components/Blocks/RaceInfo';
import Goals from './components/Blocks/Goals';
import TextSections from './components/Blocks/TextSections';
import Splits from './components/Blocks/Splits';
import Preview from './components/Blocks/Preview';
import Footer from './components/UI/Footer';
import dummyData from './components/Data/data';
import ReactDOM from 'react-dom';
import { useEffect, useReducer, useState } from 'react';
import AppContext from './components/Context/app-context';
import bs from './components/UI/Button.module.scss';
import {convertDateToReadable, convertToMinSec, convertSecondsToHMS, metresToKm, convertMinSecToSec} from './utils/utils';
import './App.scss';

const clientId = '96784';
const clientSecret = 'fac7d050a2167b73f126050654539331d0ce413c';

// Reducer functions
const raceReducer = (raceData, action) => {
  switch(action.type) {

    case 'resetRaceData' : {
      return dummyData;
    }

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
      } else if(action.dataType === 'section') {
        return {  
          ...raceData,
          textSections: raceData.textSections.map((s, i) => {
            if(i === action.name) {
              return s = action.newValue
            } else {
              return s
            }
          })
        }
      }
    }
    
    case 'changeCompleted': {
      return {
        ...raceData,
        goals: raceData.goals.map((g) => g.name === action.goalID ? {...g, completed: action.newValue} : g )
      }
    }

    case 'deleteOrAddSection' : {
      if(action.operation === 'add') {
        return {
          ...raceData,
          textSections: [
            ...raceData.textSections,
            'Add title'
          ]
        }
      } else {
          return {
            ...raceData,
            textSections: raceData.textSections.filter((_, i) => 
            i !== raceData.textSections.length-1)
          }
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
  const [showHelp, updateShowHelp] = useState(false);
  const [showRaceInput, updateShowRaceInput] = useState(false);
  const [enterMode, setEnterMode] = useState('');
  const [error, updateError] = useState(false);
  const [errorMessage, updateErrorMessage] = useState({
    code: '',
    message: ''
  });


  // Reducer actions
  const handleAddNewRace = (race) => {
    dispatch({
      type: 'addNewRace', 
      newRace: race
    })
  }

  const resetRace = () => {
    dispatch({
      type: 'resetRaceData'
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

  const deleteOrAddTextSection = (operation) => {
    dispatch({
      type: 'deleteOrAddSection',
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
  const authorize = (submittedID) => {
    localStorage.setItem('actID', submittedID);
    setIsLoading(true);
    const url = `https://www.strava.com/oauth/authorize?client_id=96784&response_type=code&redirect_uri=https://race-report-gen.jezl.xyz/&approval_prompt=force&scope=activity:read_all`;
    window.location = url;
  }

  // Fetch race data
  const displayData = async(accessToken, activityID) => {
    console.log('running display data function');
    try {
      const response = await fetch(`https://www.strava.com/api/v3/activities/${activityID}?access_token=${accessToken}`);

      if (!response.ok) {

        updateErrorMessage({
          code: response.status,
          name: response.statusText
        });
        throw new Error(`Something went wrong in display function`);
      }

      const data = await response.json();


      const transformedData = {
        name: data.name || '',
        date: convertDateToReadable(data.start_date_local) || '',
        distance: metresToKm(data.distance) || '',
        location: `${data.location_city || ''} ${data.location_country || ''}`,
        finishTime: convertSecondsToHMS(data.elapsed_time) || '',
        elevation: data.total_elevation_gain || '',
        splitsKM: data.splits_metric || '',
        splitsMiles: data.splits_standard || '',
        gear: data.gear.name || '',
        stravaURL: `https://www.strava.com/activities/${data.id}`,
        textSections: [
          'Background', 'Training', 'Pre-race'
        ],
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
        console.log(`error occurred${error} in display function`);
        updateError(true);
    }
    setIsLoading(false);
    updateShowBlocks(true);
  }

  // Test for Strava redirect URL on reload
  useEffect(() => {
      console.log('running load function');
      setIsLoading(true);
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const code = urlParams.get('code');

      if(code !== null) {
        const activityID = localStorage.getItem('actID');
        
        const fetchURL = async() => {
          try {
            const response = await fetch(`https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`, {method: 'POST'});

            if (!response.ok) {
              updateErrorMessage({
                code: response.status,
                name: response.statusText
              })
              throw new Error(`Something went wrong in load function ${response}`);
            }        
            
            const data = await response.json();
            displayData(data.access_token, activityID)

          }
          catch (error) {
            console.log(error, 'in load function')
            updateError(true);
            setIsLoading(false);
          }
        }

        fetchURL();
      }

      else {
        setIsLoading(false);
      }
  }, [])


  return (
    <AppContext.Provider value={{
      raceData: raceData,
      updateInputVal,
      updateGoalCompleted,
      updateShowMarkdown,
      updateShowHelp,
      updateShowRaceInput,
      updateShowBlocks,
      showMarkdown,
      showHelp,
      showRaceInput,
      deleteOrAddGoal,
      deleteOrAddSplit,
      deleteOrAddTextSection,
      changeMeasurement,
      setEnterMode,
      resetRace,
      enterMode
    }}>

      {showMarkdown &&
       ReactDOM.createPortal(<Markdown raceData={raceData}/>, document.getElementById('root-markdown'))
      }

      {showHelp &&
       ReactDOM.createPortal(<Help/>, document.getElementById('root-help'))
      }

      {
        showRaceInput &&
        ReactDOM.createPortal(<InputRaceID authorize={authorize}/>, document.getElementById('root-raceInput'))
      }

      <Header showBlocks={showBlocks} error={error}/>

      <main className='main'>
        {!showBlocks && !isLoading && !error &&
          <div className={`row-util home`}>
          <div className='home__buttons'>
            <Button text="Add Strava race" icon={<BsStrava className={bs['button__icon']}/>} className='home__btn button__icon'/>
            <Button text="Enter manually" icon={<BsFillPenFill className={bs['button__icon']}/>} className='home__btn button__icon' />
            <Button text="Help" icon={<BsFillInfoCircleFill className={bs['button__icon']}/>} className='home__btn button__icon'/>
          </div>
          </div>
        }
        {isLoading &&
            <Spinner/>
          }
        {showBlocks && !error &&
        <div className="row-util">
            <div className="col-1-of-3">
              <RaceInfo raceData={raceData} />
              <Goals raceData={raceData} />
              <TextSections raceData={raceData} />
              <Splits raceData={raceData} />
            </div>
            <div className="col-2-of-3">
                <Preview raceData={raceData}/>
            </div>
        </div>
        }

        {error &&
        <div className="row-util">
          <Card>
            <p>Something went wrong. Status code: <strong>{errorMessage.code} {errorMessage.name}</strong>
            </p>
            <p>Please check your Activity ID is correct. You can also click <a className='home__link' href='/'>start again</a> and fill in manually.</p>
            <p>You can contact the app owner <a className='home__link' href="mailto:jeremyluscombe@gmail.com">here</a>. Include your ActivityID and the experience you are having</p>
            
          </Card>
        </div>  
        }

      </main>
      <Footer/>
    </AppContext.Provider>
  );
}

export default App;
