import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainRouter from './MainRouter';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <MainRouter />
    </Router>
  );
}

export default App;