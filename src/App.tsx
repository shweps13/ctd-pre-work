import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Characters from './components/Characters';
import Films from './components/Films';

function App() {

  return (
    <Router>
      <div className="p-3 bg-black text-white flex gap-4">
        <Link to="/">Characters</Link>
        <Link to="/films">Films</Link>
      </div>

      <div className="p-3">
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/films" element={<Films />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
