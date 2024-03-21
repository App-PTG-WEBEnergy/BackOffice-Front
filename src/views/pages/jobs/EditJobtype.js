/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Modal, Form, Skeleton,Checkbox } from "antd";
import { Row, Col, FormGroup, Input, Container } from "reactstrap";
// import ImgCrop from "antd-img-crop";
import { post } from "services/callAPI";

const SAVE_URL = "careers/saveJobType";

const EditJobType = ({ data, visible, callback, setVisable, type, done }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (values.status_check === true) {
        values.status = "Y";
      } else {
        values.status = "N";
      }
      if (type === "edit") {
        values = { ...values,job_type_id: data.job_type_id };
      } else {
        values = { ...values, job_type_id: 0 };
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

  useEffect(() => {
    if (type === "edit") {
      if (data.status === "Y") {
        data.status_check = true;
      } else {
        data.status_check = false;
      }
      form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [visible, done]);
  return (
    <Modal
      title={type === "edit" ? "Edit Jobtype" : "Add Jobtype"}
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
                      ชื่อประเภทภาษาไทย
                  </label>
                  <Form.Item
                    name="job_type_name_th"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกข้อมูล ชื่อประเภทภาษาไทย!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control-alternative"
                      id="job_type_name_th"
                      placeholder="ชื่อประเภทภาษาไทย"
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
                      ชื่อประเภทภาษาอังกฤษ
                  </label>
                  <Form.Item
                    name="job_type_name_en"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกข้อมูล ชื่อประเภทภาษาอังกฤษ!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control-alternative"
                      id="job_type_name_en"
                      placeholder="ชื่อประเภทภาษาอังกฤษ"
                      type="text"
                    />
                  </Form.Item>
                </FormGroup>
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

export default EditJobType;
