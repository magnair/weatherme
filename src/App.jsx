import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapComponent from './components/MapComponent';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<MapComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
