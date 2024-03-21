/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Skeleton, Upload, Button } from "antd";
import { Row, Col, FormGroup, Input, Container } from "reactstrap";
import { UploadOutlined } from "@ant-design/icons";
import { post, postfile } from "services/callAPI";
import c from "constant";
const token = localStorage.getItem("token");

const EditContentFileList = ({
  data,
  visible,
  callback,
  setVisable,
  type,
  layouttype,
  done,
  menudata,
  datad,
  contentdata,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [layoutType, setlayoutType] = useState(layouttype);
  const editor = useRef(null);
  const [contentTH, setContentTH] = useState("");
  const [contentEN, setContentEN] = useState("");
  const [footerTH, setFooterTH] = useState("");
  const [footerEN, setFooterEN] = useState("");
  const [fileimageList, setFileImageList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [fileVideoList, setFileVideoList] = useState([]);
  const [fileVideoUrl, setFileVideoUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filesize, setFileSize] = useState("");
  const regex = /<(“[^”]*”|'[^’]*’|[^'”>])*>/gi;
  const content_no_topic = [186, 195, 196, 197, 198, 199,240];
  const content_no_content2 = [
    199,
    200,
    195,
    196,
    197,
    198,
    189,
    190,
    191,
    251,
    252,
    268,
    272,
    240,
  ];
  const content_no_content = [
    240,
  ];
  const content_no_image = [251];
  const handleOk = () => {
    form.validateFields().then((values) => {
      setConfirmLoading(true);
      let contentdata_ = contentdata;
      var max = 0;
      contentdata_.forEach((item) => {
        max = item.sequence > max ? item.sequence : max;
        max++;
      });
      if (type === "edit") {
        values = {
          ...values,
          menu_content_id: data.menu_content_id,
          menu_content_review_id: data.menu_content_review_id,
          sequence: type === "edit" ? data.sequence : max,
        };
      } else {
        values = {
          ...values,
          sequence: type === "edit" ? data.sequence : max,
          menu_content_id: 0,
          menu_content_review_id: 0,
        };
      }
      // if (type === "edit") {
      //   values = {
      //     ...values,
      //     menu_content_id: data.menu_content_id,
      //     menu_content_review_id: data.menu_content_review_id,
      //   };
      // } else {
      //   values = { ...values, menu_content_id: 0, menu_content_review_id: 0 };
      // }

      setVisable(false);
      let dataContent = {};
      dataContent = values;

      type = parseInt(layoutType);
      const layoutListNoContent = [0, 6];
      if (
        contentTH !== null &&
        contentTH !== "" &&
        menudata.menu_id !== 219 &&
        !layoutListNoContent.includes(type)
      ) {
        dataContent.description_th = contentTH;
      }
      if (
        contentEN !== null &&
        contentEN !== "" &&
        menudata.menu_id !== 219 &&
        !layoutListNoContent.includes(type)
      ) {
        dataContent.description_en = contentEN;
      }

      if (startDate !== "") {
        dataContent.start_date = startDate;
      }
      if (endDate !== "") {
        dataContent.start_date = endDate;
      }

      let dataSave = {
        menu: {
          ...menudata,
        },
        contents: [
          {
            ...dataContent,
            image_path1: "images/file-down.png",
            file_path: fileUrl,
            file_name: fileName,
          },
        ],
      };
      post("menu/saveContent", dataSave).then(
        (result) => {
          form.resetFields();
          callback({ success: true });
          setConfirmLoading(false);
          setVisable(false);
        },
        (err) => {
          callback({ success: false });
          setConfirmLoading(false);
        }
      );
    });
  };

  const handleCancel = () => {
    setVisable(false);
  };

  const handleSaveFile = (file) => {
    setImageUrl("");
    setFileSize("");
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
        setFileSize(result.file_size);
        setImageUrl(result.file_path);
        // data.description_th = filesize;
        // data.description_en = filesize;
        // console.log(data);
        // form.setFieldsValue(data);
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

  const handleSaveVideo = (file) => {
    setFileUrl("");
    setConfirmLoading(true);
    postfile("files/uploadvideo", file).then(
      (result) => {
        getBase64(file, (imageUrl) => {
          setFileList([
            {
              uid: "-1",
              name: result.file_name,
              status: "done",
              url: imageUrl,
            },
          ]);
        });
        console.log(result);
        setFileUrl(result.file_path);
        setFileName(result.file_name);
        setConfirmLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const onChangeVideo = ({ file }) => {
    if (file.status === c.status.removed) {
      setFileList([]);
      setFileUrl("");
    }
  };

  const handleSaveFilePDF = (file) => {
    setFileUrl("");
    data = {};
    setConfirmLoading(true);
    postfile("files/uploadfile", file).then(
      (result) => {
        getBase64(file, (imageUrl) => {
          setFileList([
            {
              uid: "-1",
              name: result.file_name,
              status: "done",
              url: imageUrl,
            },
          ]);
        });
        console.log(result);
        setFileUrl(result.file_path);
        setFileSize(result.file_size);
        setFileName(result.file_name);
        data.description_th = result.file_size;
        data.description_en = result.file_size;
        console.log(data);
        form.setFieldsValue(data);
        setConfirmLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const onChangeFile = ({ file }) => {
    if (file.status === c.status.removed) {
      setFileList([]);
      setFileUrl("");
    }
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

  const onPreviewFile = async (file) => {
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

  // const onChangeFile = ({ fileList: newFileList }) => {
  //   setFileUrl("");
  //   if (newFileList.length !== 0) {
  //     if (newFileList[0].status === "done") {
  //       postfile("files/uploadfile", newFileList[0].originFileObj).then(
  //         (result) => {
  //           getBase64(newFileList[0].originFileObj, (imageUrl) =>
  //             setFileUrl(result.file_path)
  //           );
  //         },
  //         (err) => {
  //           console.log(err);
  //         }
  //       );
  //     }
  //   }
  //   setFileList(newFileList);
  // };

  useEffect(() => {
    form.resetFields();
    if (type === "edit") {
      setFileImageList([]);
      setImageUrl("");
      setFileUrl("");
      setFileList([]);
      setFileUrl("");
      setImageUrl("");
      setFileName("");
      setFileSize("");

      if (data.footer1_th !== null) {
        setFooterTH(data.footer1_th);
        setFooterEN(data.footer1_en);
      }

      let imageData = [];
      let fileData = [];
      if (data.image_path1 !== null && data.image_path1 !== undefined) {
        imageData.push({
          uid: "-1",
          name: data.file_name,
          status: "done",
          url: data.image_path1,
        });
      }
      if (data.file_path !== null && data.file_path !== undefined) {
        fileData.push({
          uid: "-1",
          name: data.file_name,
          status: "done",
          url: data.file_path,
        });
      }
      setFileName(data.file_name);
      setFileImageList(imageData);
      setFileList(fileData);
      setFileUrl(data.file_path);
      setImageUrl(data.image_path1);
      form.setFieldsValue(data);
    } else {
      data = {};
      setFileImageList([]);
      setImageUrl("");
      setFileUrl("");
      setFileList([]);
      setFileUrl("");
      setImageUrl("");
      setFileName("");
      setFileSize("");
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
      key={data.menu_id}
    >
      {done || type !== "edit" ? (
        <Form
          form={form}
          layout="inline"
          name="form_in_modal_file"
          // {...layout}
          initialValues={{
            modifier: "public",
          }}
        >
          <Container fluid>
            {!content_no_topic.includes(menudata.menu_id) && (
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
            )}
             {!content_no_content.includes(menudata.menu_id) && (
            <Row>
              <Col sm={12}>
                <FormGroup>
                  <label className="form-control-label">
                    รายละเอียดเนื้อหา ภาษาไทย 1
                  </label>
                  <Form.Item
                    name="description_th"
                    rules={[
                      {
                        required: false,
                        message: "กรุณากรอกข้อมูลรายละเอียดเนื้อหา ภาษาไทย!",
                      },
                    ]}
                  >
                    <Input
                      type="textarea"
                      id="description_th"
                      className="form-control-alternative"
                      placeholder="รายละเอียดเนื้อหา ภาษาไทย 1"
                      rows={5}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12}>
                <FormGroup>
                  <label className="form-control-label">
                    รายละเอียดเนื้อหา ภาษาอังกฤษ 1
                  </label>
                  <Form.Item
                    name="description_en"
                    rules={[
                      {
                        required: false,
                        message: "กรุณากรอกข้อมูลรายละเอียดเนื้อหา ภาษาอังกฤษ!",
                      },
                    ]}
                  >
                    <Input
                      type="textarea"
                      id="description_en"
                      className="form-control-alternative"
                      placeholder="รายละเอียดเนื้อหา ภาษาอังกฤษ"
                      rows={5}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
            </Row>
            )}

            {!content_no_content2.includes(menudata.menu_id) && (
              <Row>
                <Col sm={12}>
                  <FormGroup>
                    <label className="form-control-label">
                      รายละเอียดเนื้อหา ภาษาไทย 2
                    </label>
                    <Form.Item
                      name="description2_th"
                      rules={[
                        {
                          required: false,
                          message: "กรุณากรอกข้อมูลรายละเอียดเนื้อหา ภาษาไทย!",
                        },
                      ]}
                    >
                      <Input
                        type="textarea"
                        id="description2_th"
                        className="form-control-alternative"
                        placeholder="รายละเอียดเนื้อหา ภาษาไทย 2"
                        rows={5}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup>
                    <label className="form-control-label">
                      รายละเอียดเนื้อหา ภาษาอังกฤษ 2
                    </label>
                    <Form.Item
                      name="description2_en"
                      rules={[
                        {
                          required: false,
                          message:
                            "กรุณากรอกข้อมูลรายละเอียดเนื้อหา ภาษาอังกฤษ 2!",
                        },
                      ]}
                    >
                      <Input
                        type="textarea"
                        id="description2_en"
                        className="form-control-alternative"
                        placeholder="รายละเอียดเนื้อหา ภาษาอังกฤษ"
                        rows={5}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
              </Row>
            )}

            <Row>
              {/* {!content_no_image.includes(menudata.menu_id) && (
                <Col sm={12} md={3}>
                  <label>รูปภาพประกอบ</label>
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
              )} */}
              {menudata.menu_id !== 186 && menudata.menu_id !== 240 && (
                <Col sm={12} md={4}>
                  <label>อัพโหลดไฟล์ PDF</label>
                  <Upload
                    //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    id="file_path"
                    accept=".PDF"
                    fileList={fileList}
                    onChange={onChangeFile}
                    beforeUpload={handleSaveFilePDF}
                  >
                    <Button>
                      <UploadOutlined /> Upload File
                    </Button>
                  </Upload>
                </Col>
              )}

              {menudata.menu_id === 240 && (
                <Col sm={12} md={4}>
                  <label>อัพโหลดไฟล์ VDO</label>
                  <Upload
                    //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    id="file_path"
                    accept=".mp4"
                    fileList={fileList}
                    onChange={onChangeVideo}
                    beforeUpload={handleSaveVideo}
                  >
                    <Button>
                      <UploadOutlined /> Upload File
                    </Button>
                  </Upload>
                </Col>
              )}
            </Row>
          </Container>
        </Form>
      ) : (
        <Skeleton active />
      )}
    </Modal>
  );
};

export default EditContentFileList;
