import './App.css';
import './fonts.css';
import Game from './Game'

function App() {
  return (
    <div>
      <h1 className='poppins-light'>Reaction Time Game</h1>
      <p className='poppins-extralight'>Ready to play!</p>
      <Game />
    </div>
  );
}

export default App;
