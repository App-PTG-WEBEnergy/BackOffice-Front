/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash";
import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Skeleton, Upload, DatePicker } from "antd";
import { Row, Col, FormGroup, Input, Container } from "reactstrap";
import { post, postfile, baseUrl } from "services/callAPI";
import JoditEditor from "jodit-react";
import moment from "moment";
import c from "constant";
const SAVE_URL = "newpro/saveNewPro";
const newprotype = [
  { id: "OI", name: "น้ำมันเชื้อเพลิง" },
  { id: "LP", name: "แก๊ซเพื่อการขนส่ง" },
  { id: "GC", name: "แก๊สเพื่อการหุงต้ม" },
  { id: "EO", name: "น้ำมันเครื่อง" },
  { id: "MM", name: "แมกซ์มาร์ท" },
  { id: "PT", name: "กาแฟพันธุ์ไทย" },
  { id: "CW", name: "คอฟฟี่เวิลด์" },
  { id: "NY", name: "นิวยอร์ก ฟิฟท์อเวนิว เดลี" },
  { id: "TC", name: "ไทย เชฟ เอ็กเพรส" },
  { id: "CF", name: "ครีม แอนด์ ฟัดจ์" },
  { id: "MX", name: "บัตรสมาชิก พีที แมกซ์" },
  { id: "GE", name: "ทั่วไป" },
];
const token = localStorage.getItem("token");
const config = {
  buttons: [
    "source",
    "|",
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "ul",
    "ol",
    "|",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "table",
    "link",
    "|",
    "align",
    "undo",
    "redo",
  ],
  readonly: false,
  toolbarButtonSize: "small",
  zIndex: 10000,
  enableDragAndDropFileToEditor: true,
  uploader: {
    //insertImageAsBase64URI: true,
    url: baseUrl + "files/uploadeditor",
    method: "POST",
    headers: {
      Authorization: `Bearer ` + token,
    },
    isSuccess: function (resp) {
      return resp;
    },
    process: function (resp) {
      return {
        files: resp.data.files,
        path: resp.data.path,
        baseurl: resp.data.baseurl,
        error: resp.data.error,
        message: resp.data.message,
      };
    },
    defaultHandlerSuccess: function (data) {
      var _this = this;
      // var j = this.j;
      var j = _this;

      if (data.files && data.files.length) {
        data.files.forEach(function (filename, index) {
          console.log(filename);
          var _a = ["img", "src"],
            // var _a =
            //     data.isImages && data.isImages[index]
            //       ? ["img", "src"]
            //       : ["a", "href"],
            tagName = _a[0],
            attr = _a[1];
          var elm = j.j.createInside.element(tagName);
          elm.setAttribute(attr, data.path);
          if (tagName === "a") {
            elm.textContent = data.path;
          }
          if (tagName === "img") {
            _this.j.s.insertImage(elm, null, _this.j.o.imageDefaultWidth);
          } else {
            _this.j.s.insertNode(elm);
          }
        });
      }
    },
  },
};
const EditContentNewsPro = ({
  data,
  visible,
  callback,
  setVisable,
  type,
  nptype,
  done,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const editor = useRef(null);
  const [contentTH, setContentTH] = useState("");
  const [contentEN, setContentEN] = useState("");
  const [contentTH2, setContentTH2] = useState("");
  const [contentEN2, setContentEN2] = useState("");
  const [fileimageList, setFileImageList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [setFileImageList2] = useState([]);
  const [setImageUrl2] = useState("");
  const [npsType, setNpsType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleOk = () => {
    form.validateFields().then((values) => {
      setConfirmLoading(true);
      //console.log("xxx");
      console.log(contentTH);
      values.content_type = nptype;
      values.description_th = contentTH;
      values.description_en = contentEN;
      values.description2_th = contentTH2;
      values.description2_en = contentEN2;
      values.type = npsType;
      values.image_path1 = imageUrl;
      values.start_date = startDate;
      values.end_date = endDate;

      if (type === "edit") {
        values = { ...values, news_pro_id: data.news_pro_id };
      } else {
        values = { ...values, news_pro_id: 0 };
      }

      post(SAVE_URL, values).then(
        (result) => {
          callback({ success: true });
          setConfirmLoading(false);
          setVisable(false);
        },
        (err) => {
          setConfirmLoading(false);
          callback({ success: false });
        }
      );
    });
  };

  const handleCancel = () => {
    setVisable(false);
  };
  const onNPTypeChange = (e) => {
    setNpsType(e.target.value);
  };

  const handleSaveFile = (file) => {
    setImageUrl("");
    setConfirmLoading(true);
    postfile("files/uploadimage", file).then(
      (result) => {
        getBase64(file, (imageUrl) => {
          setFileImageList([
            {
              uid: "-1",
              name: imageUrl,
              status: "done",
              url: imageUrl,
            },
          ]);
        });
        setImageUrl(result.file_path);
        setConfirmLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const onChangeImage2 = (file) => {
    setImageUrl2("");
    setConfirmLoading(true);

    postfile("files/uploadimage", file).then(
      (result) => {
        getBase64(file, (imageUrl2) => {
          setFileImageList2([
            {
              uid: "-1",
              name: imageUrl,
              status: "done",
              url: imageUrl,
            },
          ]);
        });
        setImageUrl2(result.file_path);
        setConfirmLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const onChangeImage = ({ file }) => {
    if (file.status === c.status.removed) {
      setFileImageList([]);
      setImageUrl("");
    }
    // setFileImageList(newFileList);
  };

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  function onChangeDate(date, dateString) {
    console.log(date, dateString);
    setStartDate(dateString);
  }

  function onChangeEndDate(date, dateString) {
    setEndDate(dateString);
  }

  useEffect(() => {
    setNpsType("");
    setFileImageList([]);
    setImageUrl("");
    setContentTH("");
    setContentTH2("");
    setContentEN("");
    setContentEN2("");
    setStartDate("");
    setEndDate("");
    if (type === "edit") {
      console.log(data);
      let imageData = [];
      let imageData2 = [];
      if (data.image_path1 !== null && data.image_path1 !== undefined) {
        imageData.push({
          uid: "-1",
          name: data.image_path1,
          status: "done",
          url: data.image_path1,
        });
      }

      if (data.image_path2 !== null && data.image_path2 !== undefined) {
        imageData2.push({
          uid: "-1",
          name: data.image_path2,
          status: "done",
          url: data.image_path2,
        });
      }
      if (data.start_date !== undefined && data.start_date !== null) {
        setStartDate(data.start_date);
      } else {
        setStartDate("");
      }
      if (data.end_date !== undefined && data.end_date !== null) {
        setEndDate(data.end_date);
      } else {
        setEndDate("");
      }
      setNpsType(data.type);
      console.log(npsType);
      setFileImageList(imageData);
      setImageUrl(data.image_path1);
      setTimeout(() => {
        setContentTH(data.description_th);
        setContentEN(data.description_en);
        setContentTH2(data.description2_th);
        setContentEN2(data.description2_en);
      }, 500);

      form.setFieldsValue(data);
    } else {
      setNpsType("");
      setFileImageList([]);
      setImageUrl("");
      setContentTH("");
      setContentTH2("");
      setContentEN("");
      setContentEN2("");
      setStartDate("");
      setEndDate("");
      form.resetFields();
    }
  }, [visible, done]);

  return (
    <Modal
      title={type === "edit" ? "Edit Content" : "Add Content"}
      visible={visible}
      onOk={handleOk}
      width="90%"
      style={{ maxWidth: "1024px" }}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      maskClosable={false}
    >
      {done || type !== "edit" ? (
        <Form
          form={form}
          layout="inline"
          name="form_in_modal"
          // {...layout}
          initialValues={{
            modifier: "public",
          }}
        >
          <Container fluid>
            <Row>
              <Col sm={12} md={6}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    Topic ภาษาไทย
                  </label>
                  <Form.Item
                    name="topic_th"
                    rules={[
                      {
                        required: false,
                        message: "กรุณากรอกข้อมูล Topic ภาษาไทย!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control-alternative"
                      id="topic_th"
                      placeholder="Topic"
                      type="text"
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    Topic ภาษาอังกฤษ
                  </label>
                  <Form.Item
                    name="topic_en"
                    rules={[
                      {
                        required: false,
                        message: "กรุณากรอกข้อมูล Topic ภาษาอังกฤษ!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control-alternative"
                      id="topic_en"
                      placeholder="Topic"
                      type="text"
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    เลือกประเภท
                  </label>
                  <Form.Item
                    name="type"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาเลือกประเภท!",
                      },
                    ]}
                  >
                    <Input
                      type="select"
                      className="form-control-alternative"
                      defaultValue={nptype}
                      onChange={onNPTypeChange}
                      disabled={confirmLoading}
                    >
                      <option value="0">กรุณาเลือก</option>
                      {newprotype.map((item) => {
                        return <option value={item.id}>{item.name}</option>;
                      })}
                    </Input>
                  </Form.Item>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <FormGroup>
                  <label className="form-control-label">
                  รายละเอียดเนื้อหาภาษาไทย 1
                  </label>

                  <JoditEditor
                    ref={editor}
                    value={contentTH}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setContentTH(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => { }}
                  />
                </FormGroup>
              </Col>
              <Col sm={12}>
                <FormGroup>
                  <label className="form-control-label">
                  รายละเอียดเนื้อหาภาษาอังกฤษ 1
                  </label>

                  <JoditEditor
                    ref={editor}
                    value={contentEN}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setContentEN(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => { }}
                  />
                </FormGroup>
              </Col>

              <Col sm={12}>
                <FormGroup>
                  <label className="form-control-label">
                   รายละเอียดเนื้อหาภาษาไทย 2
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={contentTH2}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setContentTH2(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => { }}
                  />
                </FormGroup>
              </Col>
              <Col sm={12}>
                <FormGroup>
                  <label className="form-control-label">
                    รายละเอียดเนื้อหาภาษาอังกฤษ 2
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={contentEN2}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setContentEN2(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => { }}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col sm={12} md={3}>
                <label>รูปภาพประกอบที่ 1</label>
                <Upload
                  accept=".png"
                  //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  id="image_path1"
                  listType="picture-card"
                  fileList={fileimageList}
                  onChange={onChangeImage}
                  onPreview={onPreview}
                  beforeUpload={handleSaveFile}
                >
                  {fileimageList.length < 1 && "+ Upload"}
                </Upload>
              </Col>
              <Col sm={12} md={4}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    วันที่อัพเดท
                  </label>
                  <Form.Item>
                    <DatePicker
                      defaultValue={moment("", "YYYY-MM-DD")}
                      value={
                        startDate === null || startDate === ""
                          ? ""
                          : moment(startDate, "YYYY-MM-DD")
                      }
                      className="form-control-alternative"
                      onChange={onChangeDate}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              {nptype !== "N" && (
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      วันที่สิ้นสุด
                    </label>
                    <Form.Item>
                      <DatePicker
                        defaultValue={moment("", "YYYY-MM-DD")}
                        value={
                          endDate === null || endDate === ""
                            ? ""
                            : moment(endDate, "YYYY-MM-DD")
                        }
                        className="form-control-alternative"
                        onChange={onChangeEndDate}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
              )}
              {/* <Col sm={12} md={3}>
                <label>รูปภาพประกอบที่ 2</label>
                <Upload
                  accept=".png"
                  //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  id="image_path2"
                  listType="picture-card"
                  fileList={fileimageList2}
                  onChange={onChangeImage2}
                  onPreview={onPreview}
                >
                  {fileimageList2.length < 1 && "+ Upload"}
                </Upload>
              </Col> */}
            </Row>
          </Container>
        </Form>
      ) : (
        <Skeleton active />
      )}
    </Modal>
  );
};

export default EditContentNewsPro;
