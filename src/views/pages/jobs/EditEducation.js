/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Modal, Form, Skeleton } from "antd";
import { Row, Col, FormGroup, Input, Container } from "reactstrap";
// import ImgCrop from "antd-img-crop";

const EditJobType = ({ data, visible, callback, setVisable, type, done }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const handleOk = () => {
    setVisable(false);
  };

  const handleCancel = () => {
    setVisable(false);
  };

  useEffect(() => {
    if (type === "edit") {
      if (data.start_date != null) {
        data.start_date = data.start_date.replace("T00:00:00", "");
      }
      if (data.end_date != null) {
        data.end_date = data.end_date.replace("T00:00:00", "");
      }
      form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [visible, done]);
  return (
    <Modal
      title={type === "edit" ? "ข้อมูลการศึกษา" : "ข้อมูลการศึกษา"}
      visible={visible}
      width="90%"
      onOk={handleOk}
      style={{ maxWidth: "1024px" }}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
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
                    ระดับการศึกษา
                  </label>
                  <Form.Item name="education_level">
                    <Input
                      className="form-control-alternative"
                      id="education_level"
                      placeholder="ระดับการศึกษา"
                      readOnly={true}
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
                    ชื่อสถาบันการศึกษา
                  </label>
                  <Form.Item name="education_institution">
                    <Input
                      className="form-control-alternative"
                      id="education_institution"
                      placeholder="ระดับการศึกษา"
                      readOnly={true}
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
                    สถานที่ตั้ง / จังหวัด
                  </label>
                  <Form.Item name="education_place">
                    <Input
                      className="form-control-alternative"
                      id="education_place"
                      placeholder="สถานที่ตั้ง / จังหวัด"
                      readOnly={true}
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
                    ระยะเวลาตั้งแต่
                  </label>
                  <Form.Item name="start_date">
                    <Input
                      className="form-control-alternative"
                      id="start_date"
                      placeholder="ระยะเวลาตั้งแต่"
                      readOnly={true}
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
                    ระยะเวลาถึง
                  </label>
                  <Form.Item name="end_date">
                    <Input
                      className="form-control-alternative"
                      id="end_date"
                      placeholder="ระยะเวลาถึง"
                      readOnly={true}
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
                    วุฒิการศึกษาที่ได้รับ
                  </label>
                  <Form.Item name="education_degree">
                    <Input
                      className="form-control-alternative"
                      id="education_degree"
                      placeholder="วุฒิการศึกษาที่ได้รับ"
                      readOnly={true}
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
                    เกรดเฉลี่ย
                  </label>
                  <Form.Item name="education_grade">
                    <Input
                      className="form-control-alternative"
                      id="education_grade"
                      placeholder="เกรดเฉลี่ย"
                      readOnly={true}
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
                    วิชาเอก
                  </label>
                  <Form.Item name="education_major">
                    <Input
                      className="form-control-alternative"
                      id="education_major"
                      placeholder="วิชาเอก"
                      readOnly={true}
                      type="text"
                    />
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

export default EditJobType;
