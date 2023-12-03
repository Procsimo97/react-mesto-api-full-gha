import { Link } from 'react-router-dom';
import logo from '../images/logo.svg'

function Header(props) {
    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="логотип место"/>
        <div className="header__container">
          <p className="header__email">{props.email}</p>
          <Link to={props.route} onClick={props.onClick} className="header__link">{props.title}</Link>
        </div>
        
      </header>
    )
}

export default Header;