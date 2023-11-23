import './App.css';
import Header from './components/header';
import LandingContainer from './components/landingContainer';

function App() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Header />
      <LandingContainer />
    </div>
  );
}

export default App;
