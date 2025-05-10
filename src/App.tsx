import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home';
import NotFound from './components/404';
import FilmDetail from './components/details/Film';
import CharDetail from './components/details/Character';
import SpeciesDetail from './components/details/SpeciesDetail';
import PlanetDetail from './components/details/PlanetDetail';
import StarshipDetail from './components/details/StarshipDetail';
import VehicleDetail from './components/details/VehicleDetail';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/films/:id" element={<FilmDetail />} />
        <Route path="/characters/:id" element={<CharDetail />} />
        <Route path="/species/:id" element={<SpeciesDetail />} />
        <Route path="/planets/:id" element={<PlanetDetail />} />
        <Route path="/starships/:id" element={<StarshipDetail />} />
        <Route path="/vehicles/:id" element={<VehicleDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}