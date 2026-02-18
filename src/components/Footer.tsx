import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-line">Fördjupad Frontendutveckling</p>
      <p className="footer-line">Mittuniversitetet</p>
      <p className="footer-line">&copy; {new Date().getFullYear()}  Annika Gadman</p>
    </footer>
  );
};

export default Footer;