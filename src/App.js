import './App.css';
import Game from './game_components/Game.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>chess</h1>
      </header>
      <main>
        <Game />
      </main>
    </div>
  );
}

export default App;
