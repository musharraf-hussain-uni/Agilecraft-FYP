import "./About.css";
import img from "./aboutUs.png";
import { Link } from "react-router-dom"; // Assuming you're using React Router

const About = () => {
  return (
    <div>
      <section className="about-us">
        <h2 className="section-title">About Us</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              At Agile Craft, we are a team of experienced and dedicated
              professionals who are passionate about delivering high-quality
              project management services to our clients. With years of
              experience in the industry, we have the expertise and knowledge to
              help you achieve your project goals.
            </p>
            <p>
              Our mission is to deliver exceptional project management solutions
              that exceed our clients expectations. We believe in building
              strong relationships with our clients based on trust,
              transparency, and open communication. Our team is committed to
              understanding your unique needs and delivering customized
              solutions that meet your specific requirements.
            </p>
            <p>
              If you have any questions or would like to learn more about us,
              please do not hesitate to get in touch.{" "}
              <Link to="/learn-more">learn more</Link>.
            </p>
          </div>
          <img src={img} alt="About Us Image" className="about-image" />
        </div>
      </section>
    </div>
  );
};

export default About;
