/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Modal, Form, Skeleton } from 'antd';
import { Row, Col, FormGroup, Input, Container } from 'reactstrap'
import { post } from 'services/callAPI';
import { get } from 'services/callAPI';


const EditAdminUser = ({ data, visible, callback, setVisable, type, done }) => {
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [form] = Form.useForm();
    let [groups, setGroups] = useState([]);
    
    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
              
                if (type === 'edit') {
                    values = { ...values, id: data.id }
                } else {
                    values = { ...values, id: 0 }
                }
                console.log(values);
                setConfirmLoading(true);
                post('permission/saveAdminUserData', values).then((result) => {
                    callback({ success: true });
                    setConfirmLoading(false);
                    setVisable(false);
                }, err => {
                    setConfirmLoading(false);
                    callback({ success: false })
                })
            });
    }
    const handleCancel = () => {
        setVisable(false)
    }

    useEffect(() => {
        console.log("data", data)
        get('permission/getUserGroups').then((result) => {
            setGroups(result.filter(x => x.id != 1));
            if (type === 'edit') {

                form.setFieldsValue(data)
        } else {
                form.resetFields();
            }
        })
    }, [visible, done]);
    return (
        <Modal
            title={type === 'edit' ? 'Edit Admin User' : 'Add Admin User'}
            visible={visible}
            onOk={handleOk}
            width="90%"
            style={{ maxWidth: '850px' }}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            maskClosable={false}
        >
            {(done || type !== 'edit') ? (
                <Form
                    form={form}
                    layout="inline"
                    name="form_in_modal"
                    // {...layout}
                    initialValues={{
                        modifier: 'public',
                    }}
                >
                    <Container fluid>
                        <Row>

                            <Col sm={12} md={6}>

                                <FormGroup>
                                    <label
                                        className="form-control-label required"
                                        htmlFor="input-username"
                                    >
                                        First Name </label>
                                    <Form.Item
                                        name="firstName"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input first name!',
                                            },
                                        ]}
                                    >
                                        <Input

                                            className="form-control-alternative"
                                            id="firstName"
                                            placeholder="First Name"
                                            type="text"
                                        />
                                    </Form.Item>
                                </FormGroup>

                            </Col>
                            <Col sm={12} md={6}>

                                <FormGroup>
                                    <label
                                        className="form-control-label required"
                                        htmlFor="input-username"
                                    >
                                        Last Name</label>
                                    <Form.Item
                                        name="lastName"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input last name!',
                                            },
                                        ]}
                                    >
                                        <Input

                                            className="form-control-alternative"
                                            id="lastName"
                                            placeholder="Last Name"
                                            type="text"
                                        />
                                    </Form.Item>
                                </FormGroup>

                            </Col>
                            <Col sm={12} md={6}>

                                <FormGroup>
                                    <label
                                        className="form-control-label required"
                                        htmlFor="input-username"
                                    >
                                        Department</label>
                                    <Form.Item
                                        name="department"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Department!',
                                            },
                                        ]}
                                    >
                                        <Input

                                            className="form-control-alternative"
                                            id="department"
                                            placeholder="Department"
                                            type="text"
                                        />
                                    </Form.Item>
                                </FormGroup>

                            </Col>
                            <Col sm={12} md={6}>

                                <FormGroup>
                                    <label
                                        className="form-control-label required"
                                        htmlFor="input-username"
                                    >
                                        E-Mail</label>
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input email!',
                                            },
                                        ]}
                                    >
                                        <Input

                                            className="form-control-alternative"
                                            id="email"
                                            placeholder="E-Mail"
                                            type="text"
                                        />
                                    </Form.Item>
                                </FormGroup>

                            </Col>
                            <Col sm={12} md={6}>

                                <FormGroup>
                                    <label
                                        className="form-control-label required"
                                        htmlFor="input-username"
                                    >
                                        Mobile Number</label>
                                    <Form.Item
                                        name="mobilePhoneNumber"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input mobile phone number!',
                                            },
                                        ]}
                                    >
                                        <Input

                                            className="form-control-alternative"
                                            id="mobilePhoneNumber"
                                            placeholder="mobile phone number"
                                            type="text"
                                        />

                                    </Form.Item>
                                </FormGroup>
                            </Col>

                            {/* <Col sm={12} md={6}>

                                <FormGroup>
                                    <label
                                        className="form-control-label required"
                                        htmlFor="input-username"
                                    >
                                        Office Number</label>
                                    <Form.Item
                                        name="officeNumber"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input office number!',
                                            },
                                        ]}
                                    >
                                        <Input

                                            className="form-control-alternative"
                                            id="officeNumber"
                                            placeholder="Office Number"
                                            type="text"
                                        />
                                    </Form.Item>
                                </FormGroup>

                            </Col> */}


                            <Col sm={12} md={6}>
                                <FormGroup>
                                    <label
                                        className="form-control-label required"
                                        htmlFor="input-username"
                                    >
                                        Permission Group</label>
                                    <Form.Item
                                        name="groupID"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select user group name!',
                                            },
                                        ]}
                                    >
                                        <Input type="select" className="form-control-alternative" disabled={confirmLoading} >
                                            <option></option>
                                            {
                                                groups.map((item) => {
                                                    return (
                                                        <option value={item.id}>{item.groupName}</option>
                                                    )
                                                })
                                            }
                                        </Input>


                                    </Form.Item>
                                </FormGroup>
                            </Col>
                            <Col sm={12} md={6}>
                                <FormGroup>
                                    <label
                                        className="form-control-label required"
                                        htmlFor="input-username"
                                    >
                                        Status</label>
                                    <Form.Item
                                        name="status"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select user status!',
                                            },
                                        ]}
                                    >
                                        <Input disabled={confirmLoading} type='select' className="form-control-alternative">
                                            <option></option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </Input>


                                    </Form.Item>
                                </FormGroup>
                            </Col>
                            <Col md={6} sm={12}>
                                <FormGroup>
                                    <label
                                        className="form-control-label required"
                                        htmlFor="input-username"
                                    >
                                        Username</label>
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input username!',
                                            },
                                        ]}
                                    >
                                        <Input disabled={confirmLoading}  className="form-control-alternative"/>

                                    </Form.Item>
                                </FormGroup>
                            </Col>
                            <Col md={6} sm={12}>
                                <FormGroup>
                                    <label
                                        className="form-control-label required"
                                        htmlFor="input-username"
                                    >
                                        Password</label>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input password!',
                                            },
                                        ]}
                                    >
                                        <Input disabled={confirmLoading} type='password' className="form-control-alternative"/>
                                    </Form.Item>
                                </FormGroup>
                            </Col>
                        </Row>

                    </Container>
                </Form>) : (<Skeleton active />)}
        </Modal>
    )
}

export default EditAdminUser;
