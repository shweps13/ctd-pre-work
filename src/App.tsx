import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home';
import NotFound from './components/404';
import FilmDetail from './components/FilmDetail';
import CharDetail from './components/CharDetail';
import SpeciesDetail from './components/SpeciesDetail';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/films/:id" element={<FilmDetail />} />
        <Route path="/characters/:id" element={<CharDetail />} />
        <Route path="/species/:id" element={<SpeciesDetail />} />
        {/* <Route path="/planets/:id" element={<SpeciesDetail />} />
        <Route path="/starships/:id" element={<SpeciesDetail />} />
        <Route path="/vehicles/:id" element={<SpeciesDetail />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}