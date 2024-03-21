/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash";
import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Skeleton, Button, Space } from "antd";
import { Row, Col, FormGroup, Input, Container } from "reactstrap";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import JoditEditor from "jodit-react";
import { post, get, baseUrl } from "services/callAPI";
import c from "constant";
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
      var j = this.j;

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
          var elm = j.createInside.element(tagName);
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
const EditContentTruck = ({
  data,
  visible,
  callback,
  setVisable,
  type,
  layouttype,
  done,
  menudata,
  datad,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const editor = useRef(null);
  const regex = /<(“[^”]*”|'[^’]*’|[^'”>])*>/gi;
  const handleOk = () => {
    form.validateFields().then((values) => {
      setConfirmLoading(true);
      if (type === "edit") {
        values = {
          ...values,
          menu_content_id: data.menu_content_id,
          menu_content_review_id: data.menu_content_review_id,
        };
      } else {
        values = { ...values, menu_content_id: 0, menu_content_review_id: 0 };
      }

      if (
        values.description_th_array !== null &&
        values.description_th_array !== undefined
      ) {
        values.description_th = JSON.stringify(values.description_th_array);
        values.description_en = JSON.stringify(values.description_th_array);
      }

      setVisable(false);
      let dataContent = {};
      dataContent = values;

      let dataSave = {
        menu: {
          ...menudata,
        },
        contents: [
          {
            ...dataContent,
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

  useEffect(() => {
    if (type === "edit") {
      try {
        data.description_th_array = JSON.parse(data.description_th);
        data.description_en_array = JSON.parse(data.description_en);
      } catch (error) {}

      form.setFieldsValue(data);
    } else {
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

              <Col sm={12} md={12}>
                <Form.List name="description_th_array">
                  {(fields, { add, remove }) => {
                    return (
                      <div>
                        {fields.map((field) => (
                          <Space
                            key={field.key}
                            style={{
                              display: "flex",
                              marginBottom: 12,
                            }}
                            align="start"
                          >
                            <Form.Item
                              {...field}
                              name={[field.name, "car_type_name"]}
                              fieldKey={[field.fieldKey, "car_type_name"]}
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณากรอกประเภทรถ",
                                },
                              ]}
                            >
                              <Input placeholder="ประเภทรถ" />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              name={[field.name, "num_of_cars"]}
                              fieldKey={[field.fieldKey, "num_of_cars"]}
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณากรอกจำนวน",
                                },
                              ]}
                            >
                              <Input placeholder="จำนวน" />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              name={[field.name, "capacity"]}
                              fieldKey={[field.fieldKey, "capacity"]}
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณากรอกความจุ",
                                },
                              ]}
                            >
                              <Input placeholder="ความจุ" />
                            </Form.Item>

                            <MinusCircleOutlined
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          </Space>
                        ))}

                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => {
                              add();
                            }}
                            block
                          >
                            <PlusOutlined /> เพิ่ม
                          </Button>
                        </Form.Item>
                      </div>
                    );
                  }}
                </Form.List>
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

export default EditContentTruck;
