import logo from './logo.svg';
import './App.css';
import baseURL from './Config';

// port 3000 is used by express
function callApi() {
  fetch(baseURL)
  .then(res => res.text())
  .then(res => console.log(res));
}

callApi();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} 

export default App;

