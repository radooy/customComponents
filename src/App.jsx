import './App.css';
import { Route, Routes, useNavigate  } from 'react-router-dom';
import GoogleMaps from './components/GoogleMaps/GoogleMaps';
import Selector from './components/Selector/Selector';
import IBANValidator from './components/IBANValidator/IBANValidator';
import Card from './components/Card/Card';
import CardFlipper from './components/CardFlipper/CardFlipper';
import DatePickerBG from './components/DatePickerBG/DatePickerBG';
import ScrollTo from './components/ScrollTo/ScrollTo';

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
          <Route path="/iban" element={<IBANValidator />} />
          <Route path="/card" element={<Card />} />
          <Route path="/flipper" element={<CardFlipper />} />
          <Route path="/date" element={<DatePickerBG />} />
          <Route path="/scroll-to" element={<ScrollTo />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
