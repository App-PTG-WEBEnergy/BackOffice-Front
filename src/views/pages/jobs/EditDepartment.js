/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Modal, Form, Skeleton, Checkbox,Select } from "antd";
import { Row, Col, FormGroup, Input, Container } from "reactstrap";
// import ImgCrop from "antd-img-crop";
import { get, post } from "services/callAPI";

const SAVE_URL = "careers/saveDepartment";

const EditDepartment = ({
  data,
  visible,
  callback,
  setVisable,
  type,
  done,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [business, setBusiness] = useState("0");
  const [dataBusiness, setDataBusiness] = useState([]);
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (type === "edit") {
        if (values.status_check === true) {
          values.status = "Y";
        } else {
          values.status = "N";
        }
        values = {
          ...values,
          business_id: business,
          department_id: data.department_id,
        };
      } else {
        values = { ...values, business_id: business, department_id: 0 };
      }
      console.log(values);
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

  const onBusinessChange = (e) => {
    setBusiness(e);
  };

  useEffect(() => {
    
    get("careers/getBusinesss").then((result) => {
      setDataBusiness(result);
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
    });
  }, [visible, done]);
  return (
    <Modal
      title={type === "edit" ? "Edit Department" : "Add Department"}
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
                    ชื่อฝ่ายภาษาไทย
                  </label>
                  <Form.Item
                    name="department_name_th"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกข้อมูล ชื่อฝ่ายภาษาไทย!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control-alternative"
                      id="department_name_th"
                      placeholder="ชื่อฝ่ายภาษาไทย"
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
                    ชื่อฝ่ายภาษาอังกฤษ
                  </label>
                  <Form.Item
                    name="department_name_en"
                    rules={[
                      {
                        required: false,
                        message: "กรุณากรอกข้อมูล ชื่อฝ่ายภาษาอังกฤษ!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control-alternative"
                      id="business_name_th"
                      placeholder="ชื่อฝ่ายภาษาอังกฤษ"
                      type="text"
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    ประเภทธุรกิจ
                  </label>
                  <Form.Item
                    name="business_id"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาเลือกประเภทธุรกิจ!",
                      },
                    ]}
                  >
                    {/* <Input
                      type="select"
                      className="form-control-alternative"
                      disabled={confirmLoading}
                      defaultValue={business}
                      onChange={onBusinessChange}
                    >
                      <option value="0">กรุณาเลือก</option>
                      {dataBusiness.map((item) => {
                        return (
                          <option value={item.business_id}>
                            {item.business_name_th}
                          </option>
                        );
                      })}
                    </Input> */}
                      <Select
                      showSearch
                      style={{ width: 200 }}
                      className="form-control-alternative"
                      optionFilterProp="children"
                      onChange={onBusinessChange}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <option value="0">กรุณาเลือก</option>
                      {dataBusiness.map((item) => {
                        return (
                          <option value={item.business_id}>
                            {item.business_name_th}
                          </option>
                        );
                      })}
                    </Select>

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

export default EditDepartment;
