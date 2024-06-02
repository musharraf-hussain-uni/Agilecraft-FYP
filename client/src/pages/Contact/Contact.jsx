// src/components/Contact.js
import "./Contact.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ContactIcon from "../../components/ContactU-links/Contact-link"; // Make sure to adjust the path

const Contact = () => {
  return (
    <div id="contact" className="contact-container">
      <div className={`contact-info bg-contact-back `}>
        <h3 className="text-2xl font-bold">JOIN OUR WEBSITE</h3>
        <p className="text-[#276fd5] text-3xl my-10">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, sint.
        </p>
        <p className="text-white text-xl">Your Company Address</p>
        <p className="text-white text-xl">Monday - Friday 9:00 am - 8:00 pm</p>
        <p className="text-white text-xl mb-10">
          Saturday - Sunday 9:00 am - 10:00 pm
        </p>
        <a href="#" className="text-[#87cae4] text-xl">
          ContactSupport@etms.com
        </a>
        <br />
        <h2 className="text-blue-300 text-xl mt-10">Follow us</h2>
        <div className="social-links">
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
        <h5 className="text-xl font-bold text-gray-400 mt-10">
          &copy; 2024 Your Company. Privacy Policy
        </h5>
      </div>

      <div className="contact-form">
        <h1 className="text-[#0e3e81] text-2xl">Contact Us</h1>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "41ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Enter your Name"
            variant="standard"
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "41ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Enter your valid email address"
            variant="standard"
          />
        </Box>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "41ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="standard-multiline-flexible"
              label="Enter your message"
              multiline
              maxRows={4}
              variant="standard"
            />
          </div>
        </Box>
        <button type="submit">Submit</button>
      </div>
    </div>
  );
};

export default Contact;
