import Navbar from "./nabar";
import Banner from "./banner";
import { Col, Container, Row } from "react-bootstrap";
import RhombusLink from "./rhombus-Link";

//===========================================================
const Layout = ({ children }) => {
  return (
    <>
      {/* <Banner /> */}
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xxl={12} xl={12} lg={12} md={12}>
            <RhombusLink />
          </Col>
          <Col xxl={9} xl={6} lg={8} md={11}>
            <main>{children}</main>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
