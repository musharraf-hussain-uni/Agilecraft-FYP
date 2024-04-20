import { Fragment } from "react";
import img from "../../images/Web-developer.svg";
import styles from "./intro.module.css";

const Intro = () => {
  return (
    <Fragment>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <img src={img} alt="" className={styles.img} />
          </div>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>
              We develop high quality bespoke web and mobile applications for
              organizations, institutions and SMEs{" "}
            </h1>
            <p className={styles.paragraph}>
              Our team is well vast in software development and is ready to help
              develop the applications of your choice.
            </p>
            <p className={styles.paragraph}>
              We take responsibility for building custom software solutions that
              caters for automation of your business processes and improve
              efficiency.
            </p>
            <button className="p-4 bg-[#003175] text-white max-w-fit">
              Learn More{" "}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Intro;
