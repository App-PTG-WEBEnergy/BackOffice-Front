/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Modal, Form, Skeleton, Upload, Checkbox } from "antd";
import { Row, Col, FormGroup, Input, Container } from "reactstrap";
import c from 'constant'
// import ImgCrop from "antd-img-crop";
import { post, postfile } from "services/callAPI";

const SAVE_URL = "careers/saveBusiness";

const EditBusiness = ({ data, visible, callback, setVisable, type, done }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [fileimageList, setFileImageList] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log(values)

      if (
        values.status_check === true
      ) {
        values.status = "Y";
      } else {
        values.status = "N";
      }



      if (type === "edit") {
        // if (imageUrl.startsWith('images')) {
        //   values = { ...values, business_icon: imageUrl, business_id: data.business_id };
        // }
        // else {
        //   const url = imageUrl.split('/').splice(1, imageUrl.length).join('/')
        //   values = { ...values, business_icon: url, business_id: data.business_id };
        // }
        values = { ...values, business_icon: imageUrl, business_id: data.business_id };

      } else {
        values = { ...values, business_icon: imageUrl, business_id: 0 };
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

  const handleSaveFile = (file) => {
    console.log('file ==> ', file)
    setImageUrl("");
    setConfirmLoading(true)

    postfile("files/uploadimage", file).then(
      (result) => {
        getBase64(file, (imageUrl) => {
          setFileImageList([
            {
              uid: "-1",
              name: imageUrl,
              status: "done",
              url: imageUrl,
            }
          ]);
        });
        setImageUrl(result.file_path)
        setConfirmLoading(false)
      },
      (err) => {
        console.log(err);
      }
    );
  }
  const onChangeImage = ({ file }) => {
    console.log(file)
    if (file.status === c.status.removed) {
      setFileImageList([])
    }
  };

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

  function getBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  }

  const handleCancel = () => {
    setVisable(false);
  };

  useEffect(() => {
    setFileImageList([]);
    setImageUrl("");

    if (type === "edit") {
      if (
        data.status !== null &&
        data.status !== undefined &&
        data.status === "Y"
      ) {
        data.status_check = true;
      } else {
        data.status_check = false;
      }
      let imageData = [];
      if (data.business_icon !== null && data.business_icon !== undefined) {
        imageData.push({
          uid: "-1",
          name: data.business_icon,
          status: "done",
          url: data.business_icon,
        });
      }
      console.log('imageData======>', imageData);
      setFileImageList(imageData);
      //setImageUrl(data.business_icon);
      if (data.business_icon !== null && data.business_icon !== undefined) {
        setImageUrl(data.business_icon);
      }

      form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [visible, done]);
  return (
    <Modal
      title={type === "edit" ? "Edit Business" : "Add Business"}
      visible={visible}
      width="90%"
      onOk={handleOk}
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
                    ชื่อกลุ่มธุรกิจภาษาไทย
                  </label>
                  <Form.Item
                    name="business_name_th"
                    rules={[
                      {
                        required: false,
                        message: "กรุณากรอกข้อมูล ชื่อกลุ่มธุรกิจภาษาไทย!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control-alternative"
                      id="business_name_th"
                      placeholder="ชื่อกลุ่มธุรกิจภาษาไทย"
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
                    ชื่อกลุ่มธุรกิจภาษาอังกฤษ
                  </label>
                  <Form.Item
                    name="business_name_en"
                    rules={[
                      {
                        required: false,
                        message: "กรุณากรอกข้อมูล ชื่อกลุ่มธุรกิจภาษาอังกฤษ!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control-alternative"
                      id="business_name_th"
                      placeholder="ชื่อกลุ่มธุรกิจภาษาอังกฤษ"
                      type="text"
                    />
                  </Form.Item>
                </FormGroup>
              </Col>

              <Col sm={12} md={3}>
                <label>รูปภาพ</label>
                <Upload
                  //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  id="image_path2"
                  listType="picture-card"
                  fileList={fileimageList}
                  onChange={onChangeImage}
                  onPreview={onPreview}
                  beforeUpload={handleSaveFile}
                >
                  {fileimageList.length < 1 && "+ Upload"}
                </Upload>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label>สถานะ</label>
                  <Form.Item name="status_check" valuePropName="checked">
                    <Checkbox>Active</Checkbox>
                  </Form.Item>
                </FormGroup>
              </Col>
            </Row>
          </Container>
        </Form>
      ) : (
          <Skeleton active />
        )}
    </Modal>
  );
};

export default EditBusiness;
