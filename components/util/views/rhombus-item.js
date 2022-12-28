import { Col } from "react-bootstrap";
import styles from "../../../styles/rhounbusItem.module.css";
import Link from "./costumLink";
import Image from "next/image";
//================================================
const RombusItem = ({ href, text }) => {
  return (
    <>
      <Link href={href}>
        <div className={styles.box}>
          <div className={styles.link}>
            <img className={styles.img} src="/rhoumbusItem.png" alt="faild" />
          </div>
          <div className={styles.text}>
            <p className="text-success">{text} </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default RombusItem;
