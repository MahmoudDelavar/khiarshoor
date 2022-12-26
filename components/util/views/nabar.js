import Image from "next/image";
import Link from "./costumLink";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../../../styles/navbar.module.css";
//========================================================
function Navigationbar() {
  return (
    <Navbar
      // bg="dark"
      // variant="dark"
      expand="md"
      className={styles.nav}
    >
      <Container fluid>
        <Navbar.Brand>
          <Link href="/">
            <Image src="/logo1.png" alt="faild-logo" width={50} height={50} />
            <span style={{ color: "#80a452" }}> KHARSH</span>
            <span style={{ color: "#ffc600" }}>OO</span>
            <span style={{ color: "#80a452" }}>R.com</span>{" "}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="titile" />
        <Navbar.Collapse id="titile">
          <Nav className="me-auto " style={{ maxHeight: "100px" }} navbarScroll>
            <Link href="/video/upload">درباره ما</Link>
            <Link href="/auth/login">ورود</Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="دنبال چی میگردی؟"
              className="me-4"
              aria-label="Search"
            />
            <Button variant="outline-success">جستجو</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;
