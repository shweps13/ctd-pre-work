import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home';
import NotFound from './components/404';
import FilmDetail from './components/FilmDetail';
import CharDetail from './components/CharDetail';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/films" element={<HomePage />} />
        <Route path="/films/:id" element={<FilmDetail />} />
        <Route path="/characters" element={<HomePage />} />
        <Route path="/characters/:id" element={<CharDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}