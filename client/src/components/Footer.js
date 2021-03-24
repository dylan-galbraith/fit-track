import menuIcon from '../assets/icons/icons8-menu.svg'

function Footer() {
  return(
    <footer className="footer">
      <h1 className="footer__logo">FitTrack</h1>
      <img className="footer__icon" src={menuIcon} alt="menu icon" />
    </footer>
  )
}

export default Footer; 