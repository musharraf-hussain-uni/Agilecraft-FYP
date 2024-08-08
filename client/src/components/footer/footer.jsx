import styles from "./footer.module.css";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ContactIcon from "../../components/ContactU-links/Contact-link";
const Footer = () => {
  return (
    <>
      <footer>
        <div className={styles.footerSection}>
          <h4>PRODUCT</h4>
          <ul>
            <li>Task Management</li>
            <li>Feature Overview</li>
            <li>Video Tutorials</li>
            <li>Pricing & Plans</li>
            <li>Free Trial</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4>FEATURES</h4>
          <ul>
            <li>Unified QA Testing</li>
            <li>Requirements Management</li>
            <li>Bug Tracking</li>
            <li>Test Case Management</li>
            <li>Code Review Management</li>
            <li>Reporting & Analytics</li>
            <li>Collaboration Tools</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4>CONTENT</h4>
          <ul>
            <li>ETMS Blog</li>
            <li>Testing Guides</li>
            <li>Support & Documentation</li>
            <li>Testing Resources</li>
            <li>Newsletter Subscription</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4>COMPANY</h4>
          <ul>
            <li>About Us</li>
            <li>Contact Information</li>
            <li>Legal Information</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Status Page</li>
          </ul>
        </div>
      </footer>
      <div className={styles.footer1}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>
            Department of Computer Science & Information Technology, Sir Syed
            University of Engineering and Technology, University Road, Karachi
            75300{" "}
          </p>
          <p className={styles.footerCopyright}>
            © 2024 Enhanced Task Management System. All rights reserved. The
            name ETMS and the ETMS logo are registered trademarks of the
            development team.{" "}
          </p>
          <ul className={styles.footerLinks}>
            <li>
              <a href="#" className={styles.footerLink}>
                Terms & Conditions |
              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLink}>
                Privacy Policy |
              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLink}>
                Security |
              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLink}>
                Accessibility Statement
              </a>
            </li>
          </ul>
          <div className={styles.socialLinks}>
            <ContactIcon
              to="https://www.facebook.com/"
              icon={<FacebookOutlinedIcon />}
              label="Facebook"
            />
            <ContactIcon
              to="https://twitter.com/"
              icon={<XIcon />}
              label="Twitter"
            />
            <ContactIcon
              to="https://github.com/"
              icon={<GitHubIcon />}
              label="GitHub"
            />
            <ContactIcon
              to="https://www.linkedin.com/"
              icon={<LinkedInIcon />}
              label="LinkedIn"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
