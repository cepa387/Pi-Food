import './App.css';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import LandingPage from './views/LandingPage/LandingPage';
import Home from './views/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Form from './views/Form/Form'
import Detail from './views/Detail/Detail'


function App() {
  return (
    <div className="App">

      <Route exact path="/">
        <LandingPage />
      </Route>

      <Route path="/home">
        <NavBar /><br /><br />
        <Home />
      </Route>

      <Route path="/created">
        <NavBar /><br /><br />
        <Form />
      </Route>

      <Route path="/detail/:id">
        <NavBar />
        <Detail />
      </Route>

    </div>
  );
}

export default App;
