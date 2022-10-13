import headerLogo from '../assets/images/logo.jpg'

function Header({ counter }) {
  return (
    <div className='App__header'>
      <img className='App__header__logo' src={headerLogo} alt="Rick and Morty logo" />
      <h1 className='App__header__title'>Memory Card</h1>
      <div className='App__header__score'>
        <p>Best Score: {counter.max}</p>
        <p>Score: {counter.actual}</p>
      </div>
    </div>
  );
}

export default Header
