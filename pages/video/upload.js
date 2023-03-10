import { useState } from "react";
import {
  Row,
  Col,
  Form,
  FormSelect,
  InputGroup,
  Button,
} from "react-bootstrap";
import FormInput from "../../components/util/inputs/form-input";
import { AiOutlineVideoCameraAdd, AiFillPicture } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";
import { dev_phase } from "../../next.config";
import Image from "next/image";
import Spinner from "react-bootstrap/Spinner";
//===========================================
const Upload = () => {
  //-----------------states and initial variables-----------------
  const [isLoading, setIsLoading] = useState(false);
  const [videoPath, setVideoPath] = useState("");
  const [videoName, setVideoName] = useState("");
  const [duration, setDuration] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const user = useSelector((state) => state.login.userName);
  const baseUrl = dev_phase.fechUrl;

  //------------load video and gnerate thumbnail------------
  const loadVideo = async (e) => {
    e.preventDefault();
    const form = new FormData();
    const config = {
      header: {
        "content-type": "multipart-data",
      },
    };
    form.append("file", e.target.files[0]);
    let url = `${baseUrl}/api/video/upload`;
    axios
      .post(url, form, config)
      .then((res) => {
        setVideoPath(res.data.data.filePath);
        setVideoName(res.data.data.fileName);

        let variable = {
          filePath: res.data.data.filePath,
          fileName: res.data.data.fileName,
        };
        //generate thumbnail

        let url = `${baseUrl}/api/video/thumbnail`;
        axios
          .post(url, variable)
          .then((res) => {
            setDuration(res.data.data.thumbnailFilePath);
            setThumbnail(res.data.data.fileDuration);
            console.log("suscess", res.data.message);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  //-----------Handle submit Form-----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const writer = user;
    const titiel = form.get("title");
    const description = form.get("description");
    const category = form.get("category");
    const thubnail = form.get("thubnail");

    const videoInfo = {
      writer,
      titiel,
      description,
      category,
      videoPath,
      thubnail,
    };
    console.log("videoInfo", videoInfo);
  };

  return (
    <>
      <Row>
        <Col xxl={6} xl={8} lg={10} md={11} className="formBox">
          <Form onSubmit={handleSubmit}>
            <FormInput type={"text"} name={"title"} text={"??????????"} />
            <FormInput
              type={"textarea"}
              name={"description"}
              text={"??????????????"}
            />
            <InputGroup>
              <InputGroup.Text htmlFor="category">???????? ????????</InputGroup.Text>
              <Form.Select name="category" id="category">
                <option value={"??????????????"}>??????????????</option>
                <option value={"??????????"}>??????????</option>
                <option value={"????????????"}>????????????</option>
                <option value={"????????????"}>????????????</option>
                <option value={"??????????"}>??????????</option>
              </Form.Select>
            </InputGroup>
            <Row className="align-items-center text-center">
              <Col>
                <Form.Label htmlFor="video" style={{ cursor: "pointer" }}>
                  <AiOutlineVideoCameraAdd size={100} />
                  <br />
                  <Form.Text>???????????????? ??????????</Form.Text>
                </Form.Label>
                <Form.Control
                  onChange={(e) => loadVideo(e)}
                  id="video"
                  type="file"
                  className="fileInput"
                />
              </Col>

              <Col>
                {thumbnail !== "" && (
                  <Image
                    src={thumbnail}
                    width={100}
                    height={100}
                    alt="faild loading"
                  />
                )}
                {videoPath == "" &&
                  (isLoading ? (
                    <Spinner animation="border" variant="info" />
                  ) : (
                    <>
                      <AiFillPicture size={100} /> <p>?????? ??????????</p>
                    </>
                  ))}
              </Col>
            </Row>{" "}
            <div className="d-grid">
              <Button type="submit"> ??????????</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Upload;
