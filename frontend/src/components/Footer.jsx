import { Link } from "react-router-dom";

const Footer = () => (

    <footer className="footer p-10 bg-neutral text-neutral-content">
  <nav>
    <h6 className="footer-title">Services</h6> 
    <a className="link link-hover"><Link to='/design'>Design</Link></a>

  </nav> 
  <nav>
    <h6 className="footer-title">Company</h6> 
    <a className="link link-hover"><Link to='/about'>About</Link> </a>
    <a className="link link-hover"><Link to='/contact'>Contact</Link></a>
    <a className="link link-hover"><Link to= '/jobs'>Jobs</Link></a>
  </nav> 
  <nav>
    <h6 className="footer-title">Legal</h6> 
    <a className="link link-hover"><Link to='/terms'>Terms and Conditions</Link></a>
  </nav>
</footer>

)

export default Footer;