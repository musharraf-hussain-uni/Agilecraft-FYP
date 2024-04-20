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
            <li>Test Management</li>
            <li>Feature Tour</li>
            <li>Video Demo</li>
            <li>Pricing & Plans</li>
            <li>Free Trial</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4>FEATURES</h4>
          <ul>
            <li>Unified QA Testing</li>
            <li>Test Case Management</li>
            <li>Exploratory Testing</li>
            <li>Test Automation</li>
            <li>Projects & Milestones</li>
            <li>Reporting & Metrics</li>
            <li>QA Team Productivity</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4>CONTENT</h4>
          <ul>
            <li>Testmo Blog</li>
            <li>Testing Guides</li>
            <li>Support & Docs</li>
            <li>Testing Topics</li>
            <li>Newsletter</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4>COMPANY</h4>
          <ul>
            <li>About & Contact</li>
            <li>Legal</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Security</li>
            <li>Status</li>
          </ul>
        </div>
      </footer>
      <div className={styles.footer1}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>
            4 Embarcadero Center, Suite 780, San Francisco CA 94111
          </p>
          <p className={styles.footerCopyright}>
            © 2024 Jot-form Inc. The name Jot-form and the Jot-form logo are
            registered trademarks of Jot-form Inc.
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
