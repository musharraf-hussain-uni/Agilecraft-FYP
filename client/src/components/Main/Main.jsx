import { Fragment } from "react";
import heroImg from "../../images/web-dev.svg";

import heroBg from "../../images/hero-bg.svg";
import styles from "./main.module.css";

const Main = () => {
  return (
    <Fragment>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>
              streamline and improve software development and quality assurance
              processes{"..."}
            </h1>
            <p className={styles.paragraph}>
              We are a team of highly motivated and skilled developers dedicated
              to delivering only the best software and quality.
            </p>
            <button className="bg-[#003175] text-white p-4 w-max cursor-pointer">
              Scroll down for more information
            </button>
          </div>
          <div className={styles.imgContainer}>
            <img src={heroImg} alt="" className={styles.img} />
          </div>
        </div>
        <div className={styles.heroContainer}>
          <img src={heroBg} alt="" className={styles.bgImg} />
        </div>
      </div>
    </Fragment>
  );
};

export default Main;
