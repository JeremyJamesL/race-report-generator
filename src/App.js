import Header from './components/UI/Header';
import RaceInfo from './components/Blocks/RaceInfo';
import Goals from './components/Blocks/Goals';
import Splits from './components/Blocks/Splits';
import Preview from './components/Blocks/Preview';
import Footer from './components/UI/Footer';
import { Fragment } from 'react';
import './App.scss';

function App() {
  return (
    <Fragment>
      <Header/>
      <main className='main'>
        <div className="row">
            <div className="col-1-of-3">
              <RaceInfo/>
              <Goals/>
              <Splits/>
            </div>
            <div className="col-2-of-3">
                <Preview/>
            </div>
        </div>
      </main>
      <Footer/>
    </Fragment>
  );
}

export default App;
