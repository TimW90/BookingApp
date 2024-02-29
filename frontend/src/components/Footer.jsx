import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer p-10 bg-neutral text-neutral-content">
    <nav>
      <h6 className="footer-title">Services</h6>
      <Link className="link link-hover" to="/design">
        Design
      </Link>
    </nav>
    <nav>
      <h6 className="footer-title">Company</h6>
      <Link className="link link-hover" to="/about">
        About
      </Link>{' '}
      <Link className="link link-hover" to="/contact">
        Contact
      </Link>
      <Link className="link link-hover" to="/jobs">
        Jobs
      </Link>
    </nav>
    <nav>
      <h6 className="footer-title">Legal</h6>

      <Link className="link link-hover" to="/terms">
        Terms and Conditions
      </Link>
    </nav>
  </footer>
);

export default Footer;
