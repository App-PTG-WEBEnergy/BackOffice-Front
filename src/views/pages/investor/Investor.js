import React, { useState, useEffect } from "react";
import { Form, notification,Modal,Button } from "antd";
import { get, post } from "services/callAPI";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

const Investor = () => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  let [done, setDone] = useState(false);
  let [datapermission, setDataPermission] = useState({});
  const [dataMenu, setMenuData] = useState({});
  const location = useLocation();
  const path = location.pathname;
  const permiss = JSON.parse(localStorage.getItem("permisstiongroup"));
  let menuUpdate = {};
  const [visibleApprove, setVisibaleApprove] = useState(false);
  const checkUserGroup = (userGroupData) => {
    let { view, modify, approve } = {};

    view = userGroupData["view_" + path.substr(7)];
    modify = userGroupData["modify_" + path.substr(7)];
    approve = userGroupData["approve_" + path.substr(7)];

    return { view, modify, approve };
  };
  const saveMenu = () => {
    setConfirmLoading(true);
    form.validateFields().then((values) => {
      let dbsave = [];
      const d = {
        menu_id: 9,
        menu_parent_id: 0,
        ...values,
        menu_image_path: null,
        pattern_type: "T",
        status: "Y",
        sequence: 1,
      };
      dbsave.push(d);
      post("menu/saveMenu", dbsave).then(
        (result) => {
          post("menu/searchMenu", { menu_id: 9 }).then(
            (result) => {
              if (result.menus) {
                setMenuData(result.menus[0]);
                form.setFieldsValue(result.menus[0]);
              } else {
                notification.error({
                  message: "เกิดข้อผิดพลาด",
                  description: "ไม่สามารถดึงข้อมูลได้",
                  placement: "bottomRight",
                });
              }
            },
            (err) => {}
          );

          notification.success({
            message: "บันทึกข้อมูล",
            description: "บันทึกข้อมูลเสร็จสิ้น",
            onClick: () => {},
            placement: "bottomRight",
          });

          setConfirmLoading(false);
        },
        (err) => {
          setConfirmLoading(false);
        }
      );
      setConfirmLoading(false);
    });
  };
  const approveMenu = () => {
    console.log();
      post("/menu/approveMenu", {
        menu_id: dataMenu.menu_id,
        menu_review_id: dataMenu.menu_review_id,
        contents: [],
      }).then((result) => {
        post("menu/searchMenu", { menu_id: 9 }).then(
          (result) => {
            if (result.menus) {
              setMenuData(result.menus[0]);
              form.setFieldsValue(result.menus[0]);
            } else {
              notification.error({
                message: "เกิดข้อผิดพลาด",
                description: "ไม่สามารถดึงข้อมูลได้",
                placement: "bottomRight",
              });
            }
          },
          (err) => {}
        );
        notification.success({
          message: "Approve ข้อมูลเสร็จสิ้น",
          description: "Approve เสร็จสิ้น",
          onClick: () => { },
          placement: "bottomRight",
        });
        setVisibaleApprove(false);
      });
  };
  const rejectMenu = () => {
    post("/menu/rejectMenu", {
      menu_id: dataMenu.menu_id,
    }).then((result) => {
      post("menu/searchMenu", { menu_id: 9 }).then(
        (result) => {
          if (result.menus) {
            setMenuData(result.menus[0]);
            form.setFieldsValue(result.menus[0]);
          } else {
            notification.error({
              message: "เกิดข้อผิดพลาด",
              description: "ไม่สามารถดึงข้อมูลได้",
              placement: "bottomRight",
            });
          }
        },
        (err) => {}
      );
      notification.success({
        message: "Reject ข้อมูลเสร็จสิ้น",
        description: "Reject เสร็จสิ้น",
        onClick: () => { },
        placement: "bottomRight",
      });
      setVisibaleApprove(false);
    });
  };

  const approveConfirm = (datamenu) => {
    setVisibaleApprove(true);
  };

  const handleApproveCancel = (e) => {
    setVisibaleApprove(false);
  };
  useEffect(() => {
    
    post("menu/searchMenu", { menu_id: 9 }).then(
      (result) => {
        if (result.menus) {
          
          form.setFieldsValue(result.menus[0]);
         
        } else {
          notification.error({
            message: "เกิดข้อผิดพลาด",
            description: "ไม่สามารถดึงข้อมูลได้",
            placement: "bottomRight",
          });
        }
      },
      (err) => {}
    );
    
  });

  useEffect(() => {
    post("menu/searchMenu", { menu_id: 9 }).then(
      (result) => {
        if (result.menus) {
          menuUpdate = result.menus[0];
          setMenuData(result.menus[0]);
         
        } else {
          notification.error({
            message: "เกิดข้อผิดพลาด",
            description: "ไม่สามารถดึงข้อมูลได้",
            placement: "bottomRight",
          });
        }
      },
      (err) => {}
    );
  }, []);
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
            <Card className="card-profile shadow">
              <CardHeader className="border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <h4>เมนูนักลงทุนสัมพันธ์</h4>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Form form={form} layout="vertical" name="form_in_modal">
                  <Row>
                    <Col sm={6}>
                      <FormGroup>
                        <label
                          className="form-control-label required"
                          htmlFor="input-username"
                        >
                          ชื่อ​ Menu ภาษาไทย
                        </label>
                        <Form.Item
                          name="menu_name_th"
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกชื่อภาษาไทย!",
                            },
                          ]}
                        >
                          <Input
                            className="form-control-alternative"
                            id="menu_name_th"
                            placeholder="กรุณากรอกชื่อภาษาไทย"
                            type="text"
                          />
                        </Form.Item>
                      </FormGroup>
                    </Col>
                    <Col sm={6}>
                      <FormGroup>
                        <label
                          className="form-control-label required"
                          htmlFor="input-username"
                        >
                          ชื่อ​ Menu ภาษาอังกฤษ
                        </label>
                        <Form.Item
                          name="menu_name_en"
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกชื่อ​ภาษาอังกฤษ!",
                            },
                          ]}
                        >
                          <Input
                            className="form-control-alternative"
                            placeholder="กรุณากรอกชื่อ​ภาษาอังกฤษ"
                            id="menu_name_en"
                            disabled={confirmLoading}
                          />
                        </Form.Item>
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <label
                      className="form-control-label required"
                      htmlFor="input-investor_url"
                    >
                      Investor url
                    </label>
                    <Form.Item
                      name="link_url"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกข้อมูล url",
                        },
                      ]}
                    >
                      <Input
                        className="form-control-alternative"
                        placeholder="please input investor url"
                        id="menu_name_en"
                        disabled={confirmLoading}
                      />
                    </Form.Item>
                  </FormGroup>
                </Form>
                <div className="flex">
                  <Button
                    className="my-4 mr-2"
                    type="primary"
                    onClick={saveMenu}
                    disabled={checkUserGroup(permiss).modify === "N"}
                  >
                    save
                  </Button>
                  <Button
                    className="my-4 mr-2"
                    type="success"
                    onClick={approveConfirm}
                    disabled={dataMenu.menu_review_id === 0 || checkUserGroup(permiss).approve === "N"}
                    
                  >
                    Approve
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal
          title="Approve Menu"
          visible={visibleApprove}
          footer={[
            <Button className="ant-btn" onClick={handleApproveCancel}>
              Cancel
            </Button>,
            <Button type="danger" onClick={rejectMenu}>
              Reject
            </Button>,
            <Button type="success" onClick={approveMenu}>
              Approve
            </Button>,
          ]}
        >
          <h4>ต้องการ Approve menu หรือไม่</h4>
        </Modal>
      </Container>
    </>
  );
};

export default Investor;
