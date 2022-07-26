import './App.css';
import { Route, Routes, useNavigate  } from 'react-router-dom';
import GoogleMaps from './components/GoogleMaps/GoogleMaps'
import Selector from './components/Selector/Selector';

function App() {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate('/');
  };

  return (
    <div className="App">
      <nav>
        <div className="home-link" onClick={onClickHandler}>Radooy's Custom Components</div>
      </nav>
      <div className="flex mt-20">
        <Selector />
        <Routes>
          <Route path="/maps" element={<GoogleMaps />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
