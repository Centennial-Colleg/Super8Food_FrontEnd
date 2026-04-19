/**
 * Root application component. Wraps the app in a BrowserRouter,
 * renders the Navbar and main route definitions.
 *
 * Developers:
 *  - Mohd Javed Khan      - 301523744
 *  - Brian Nubila         - 301514904
 *  - Osamahiemen Idemudia - 301476106
 *  - Andrelle Thompson    - 301519338
 *  - Adib Md. Mahin       - 301424034
 */

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