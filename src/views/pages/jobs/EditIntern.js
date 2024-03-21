/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Modal, Form, Skeleton } from "antd";
import { Row, Col, FormGroup, Input, Container } from "reactstrap";



const EditIntern = ({ data, visible, callback, setVisable, type, done }) => {
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
      form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [visible, done]);
  return (
    <Modal
      title={type === "edit" ? "ข้อมูลการฝึกอบรม" : "ข้อมูลการฝึกอบรม"}
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
            </Row>
          </Container>
        </Form>
      ) : (
        <Skeleton active />
      )}
    </Modal>
  );
};

export default EditIntern;
