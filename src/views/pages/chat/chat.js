import React, { useState, useEffect } from "react";
import { Form, notification, Modal, Button, Space } from "antd";
import {
    PlusOutlined,
    MinusCircleOutlined,
} from "@ant-design/icons";
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

const ChatManage = () => {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    let [done, setDone] = useState(false);
    let [datapermission, setDataPermission] = useState({});
    const [dataMenu, setMenuData] = useState({});
    const location = useLocation();
    const path = location.pathname;
    const permiss = JSON.parse(localStorage.getItem("permisstiongroup"));
    let menuUpdate = {};
    const checkUserGroup = (userGroupData) => {

        let { view, modify, approve } = {};

        view = userGroupData["view_" + path.substr(14)];
        modify = userGroupData["modify_" + path.substr(14)];
        approve = userGroupData["approve_" + path.substr(14)];

        return { view, modify, approve };
    };
    const saveMenu = () => {
        setConfirmLoading(true);
        form.validateFields().then((values) => {
            console.log(values);
            let datasave = [];
            values.description_th_array.forEach(im => {
                im.chat_id = im.chat_id === undefined ? 0 : im.chat_id;
                im.status = "Y";
                datasave.push(im);
            });
            console.log(datasave);
            // let dbsave = [];
            // const d = {
            //     menu_id: 9,
            //     menu_parent_id: 0,
            //     ...values,
            //     menu_image_path: null,
            //     pattern_type: "T",
            //     status: "Y",
            //     sequence: 1,
            // };
            // dbsave.push(d);
            post("menu/saveChat", datasave).then(
                (result) => {
                    get("menu/getChatList").then(
                        (result) => {
                            if (result) {
                                setMenuData(result);
                                var data = {};
                                data.description_th_array = result;
                                form.setFieldsValue(data);
                            } else {
                                notification.error({
                                    message: "เกิดข้อผิดพลาด",
                                    description: "ไม่สามารถดึงข้อมูลได้",
                                    placement: "bottomRight",
                                });
                            }
                        },
                        (err) => { }
                    );

                    notification.success({
                        message: "บันทึกข้อมูล",
                        description: "บันทึกข้อมูลเสร็จสิ้น",
                        onClick: () => { },
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


    // useEffect(() => {

    //     get("menu/getChatList").then(
    //         (result) => {
    //             if (result.menus) {

    //                 form.setFieldsValue(result.menus[0]);

    //             } else {
    //                 notification.error({
    //                     message: "เกิดข้อผิดพลาด",
    //                     description: "ไม่สามารถดึงข้อมูลได้",
    //                     placement: "bottomRight",
    //                 });
    //             }
    //         },
    //         (err) => { }
    //     );

    // });

    useEffect(() => {
        get("menu/getChatList").then(
            (result) => {
                if (result) {
                    // menuUpdate = result;
                    // console.log(result);
                    // setMenuData(result);
                    var data = {};
                    data.description_th_array = result;
                    form.setFieldsValue(data);
                } else {
                    notification.error({
                        message: "เกิดข้อผิดพลาด",
                        description: "ไม่สามารถดึงข้อมูลได้",
                        placement: "bottomRight",
                    });
                }
            },
            (err) => { }
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
                                <h4>จัดการระบบแชท</h4>
                            </CardHeader>
                            <CardBody className="pt-0 pt-md-4">
                                <Form form={form} layout="vertical" name="form_in_list">
                                    <Col sm={12} md={6}>
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
                                                                    name={[field.name, "chat_id"]}
                                                                    fieldKey={[
                                                                        field.fieldKey,
                                                                        "chat_id",
                                                                    ]}
                                                                >
                                                                    <Input hidden={true} />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    {...field}
                                                                    name={[field.name, "day"]}
                                                                    fieldKey={[
                                                                        field.fieldKey,
                                                                        "day",
                                                                    ]}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: "กรุณากรอกวันที่",
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input placeholder="กรอกวันที่" type="number" />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    {...field}
                                                                    name={[field.name, "month"]}
                                                                    fieldKey={[
                                                                        field.fieldKey,
                                                                        "month",
                                                                    ]}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: "กรุณาเลือกเดือน",
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input type="select" name="month" id="month">
                                                                        <option value="0">เลือกเดือน</option>
                                                                        <option value="1">มกราคม</option>
                                                                        <option value="2">กุมภาพันธ์</option>
                                                                        <option value="3">มีนาคม</option>
                                                                        <option value="4">เมษายน</option>
                                                                        <option value="5">พฤษภาคม</option>
                                                                        <option value="6">มิถุนายน</option>
                                                                        <option value="7">กรกฎาคม</option>
                                                                        <option value="8">สิงหาคม</option>
                                                                        <option value="9">กันยายน</option>
                                                                        <option value="10">ตุลาคม</option>
                                                                        <option value="11">พฤศจิกายน</option>
                                                                        <option value="12">ธันวาคม</option>
                                                                    </Input>
                                                                </Form.Item>

                                                                <MinusCircleOutlined
                                                                    style={{ fontSize: '20px' }}
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
                                                                <PlusOutlined /> เพิ่มวันที่
                                                            </Button>
                                                        </Form.Item>
                                                    </div>
                                                );
                                            }}
                                        </Form.List>
                                    </Col>


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
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ChatManage;
