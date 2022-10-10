import './App.css';
import headerLogo from './assets/images/rick-and-morty-logo-font-free-download.jpg'

function Header() {
  return (
    <div className='App__header'>
      <img className='App__header__logo' src={headerLogo} alt="Rick and Morty logo" />
      <h1 className='App__header__title'>Memory Card</h1>
      <div className='App__header__score'>
        <p>Best Score: 0</p>
        <p>Score: 0</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className='App__footer'>
        <a className='App__footer__link' href="https://github.com/rolckeirnad/TOP-memory-game">GitHub</a>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <div className='App__content'>
        <div className='Content__grid'>
          Here we'll display the cards
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
