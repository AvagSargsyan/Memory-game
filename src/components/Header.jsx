import logo from '../assets/logo.png';
import '../styles/Header.scss';

export default function Header() {
  return (
    <header>
      <img src={logo} alt="logo" className="logo" />
    </header>
  );
}
