import './App.css';
import Navigation from './Navigate/Navigate';
import Posts from './Components/posts';
import Navbar from './Components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";

//The main entrance file that display the whole page
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Navigation/>

    </div>
  );
}

export default App;
