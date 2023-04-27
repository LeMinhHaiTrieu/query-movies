import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={MovieList} />
        <Route path="/movie-details/:id" component={MovieDetail} />
      </Switch>
    </Router>
  );
}

export default App;
