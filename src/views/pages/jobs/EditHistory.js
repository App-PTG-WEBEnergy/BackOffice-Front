/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Modal, Form, Skeleton } from "antd";
import { Row, Col, FormGroup, Input, Container } from "reactstrap";

const EditHistory = ({ data, visible, callback, setVisable, type, done }) => {
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
      title={type === "edit" ? "ประวัติการทำงาน" : "ประวัติการทำงาน"}
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
                    ชื่อสถานที่ทำงาน
                  </label>
                  <Form.Item name="workplace_name">
                    <Input
                      className="form-control-alternative"
                      id="workplace_name"
                      placeholder="ชื่อสถานที่ทำงาน"
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
                    ตำแหน่งงาน
                  </label>
                  <Form.Item name="jobposition">
                    <Input
                      className="form-control-alternative"
                      id="jobposition"
                      placeholder="ตำแหน่งงาน"
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
                    ค่าจ้างที่ได้รับ (THB)
                  </label>
                  <Form.Item name="wage">
                    <Input
                      className="form-control-alternative"
                      id="wage"
                      placeholder="ค่าจ้างที่ได้รับ (THB)"
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
                    เหตุผลที่ออก
                  </label>
                  <Form.Item name="reason_resign">
                    <Input
                      className="form-control-alternative"
                      id="reason_resign"
                      placeholder="เหตุผลที่ออก"
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

export default EditHistory;
