import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import Link from "./costumLink";
import RhombusItem from "./rhombus-item";
//======================================================
const rhombusLink = () => {
  return (
    <>
      <Row className="text-center">
        <Link href="/">
          <Image src="/logo2.png" alt="faild" width={300} height={200} />
        </Link>
        <Row>
          <Col>
            <RhombusItem href="/auth/login" text="ورود" />
          </Col>
          <Col>
            {" "}
            <RhombusItem href="/about" text="درباره ما" />
          </Col>
          <Col>
            {" "}
            <RhombusItem href="/concatcUs" text="تماس با ما" />
          </Col>
          <Col>
            <RhombusItem href="/link" text="لینک" />
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default rhombusLink;
