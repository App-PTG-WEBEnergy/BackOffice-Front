import React, { useState,useEffect } from "react";
import { Modal, Form, Input, Select, Checkbox, Skeleton } from "antd";
import { post } from "services/callAPI";

import { menus, join_us } from "./data";
const { Option } = Select;

const EditUser = ({ data, visible, callback, setVisable, type, done }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then((values) => {
      // console.log(values);
      for (var key in values) {
        if (values[key] === true) {
          values[key] = "Y";
        } else if (values[key] === undefined || values[key] === false) {
          values[key] = "N";
        }
      }
      console.log(values);
      if (type === "edit") {
        values = { ...values, id: data.id };
      }
      setConfirmLoading(true);

      post("permission/saveGroup", values).then(
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
      for (var key in data) {
        if (data[key] === "Y") {
          data[key] = true;
        } else if (data[key] === "N") {
          data[key] = false;
        }
      }
      form.setFieldsValue(data);
    } else {
      data = {
        approve_aboutptg: true,
        approve_activitysocial: true,
        approve_news: true,
        approve_procurement: true,
        approve_productservice: true,
        approve_riskmanage: true,
        approve_opportunity: true,
        approve_joinus: true,
        approve_home: true,
        approve_sustainability: true,
        approve_invester: true,
        groupName: "",
        modify_aboutptg: true,
        modify_activitysocial: true,
        modify_adminuser: true,
        modify_businessgroup: true,
        modify_member: true,
        modify_news: true,
        modify_positionall: true,
        modify_positionhotjob: true,
        modify_procurement: true,
        modify_productservice: true,
        modify_riskmanage: true,
        modify_userrole: true,
        modify_opportunity: true,
        modify_joinus: true,
        modify_department: true,
        modify_jobtype: true,
        modify_applymember: true,
        modify_home: true,
        modify_sustainability:true,
        modify_chat: true,
        modify_invester: true,
        status: "Active",
        view_aboutptg: true,
        view_activitysocial: true,
        view_news: true,
        view_adminuser: true,
        view_applymember: true,
        view_businessgroup: true,
        view_member: true,
        view_positionall: true,
        view_positionhotjob: true,
        view_procurement: true,
        view_productservice: true,
        view_riskmanage: true,
        view_userrole: true,
        view_opportunity: true,
        view_joinus: true,
        view_invester: true,
        view_department: true,
        view_jobtype: true,
        view_home: true,
        view_sustainability:true,
        view_chat: true,

      };
      form.setFieldsValue(data);
    }
  }, [visible, done]);
  return (
    <Modal
      title={type === "edit" ? "Edit Permission Group" : "Add Permission Group"}
      visible={visible}
      onOk={handleOk}
      width="90%"
      style={{ maxWidth: "850px" }}
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
          <Form.Item
            name="groupName"
            label="Group Name"
            rules={[
              {
                required: true,
                message: "please input permission group name!",
              },
            ]}
          >
            <Input disabled={confirmLoading} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
                message: "Please select status!",
              },
            ]}
          >
            <Select disabled={confirmLoading} style={{ width: "120px" }}>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <table className="table table-striped" border="1" bordercolor="#ddd">
            <thead>
              <tr bgcolor="#eaeaea">
                <th scope="col">Main Menu</th>
                <th scope="col">View</th>
                <th scope="col">Modify</th>
                <th scope="col">Approve</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu, index) => {
                return (
                  <tr>
                    <td>{menu.menu_name_th}</td>
                    <td>
                      <Form.Item
                        name={"view_" + menu.menu_id}
                        valuePropName="checked"
                      >
                        <Checkbox></Checkbox>
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item
                        name={"modify_" + menu.menu_id}
                        valuePropName="checked"
                      >
                        <Checkbox></Checkbox>
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item
                        name={"approve_" + menu.menu_id}
                        valuePropName="checked"
                      >
                        <Checkbox></Checkbox>
                      </Form.Item>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="4">ร่วมกับเรา</td>
              </tr>
              {join_us.submenu.map((menu, index) => {
                return (
                  <tr>
                    <td>{menu.menu_name_th}</td>
                    <td>
                      <Form.Item
                        name={"view_" + menu.menu_id}
                        valuePropName="checked"
                      >
                        <Checkbox></Checkbox>
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item
                        name={"modify_" + menu.menu_id}
                        valuePropName="checked"
                      >
                        <Checkbox></Checkbox>
                      </Form.Item>
                    </td>
                    {menu.menu_id === "joinus" && (
                      <td>
                        <Form.Item
                          name={"approve_" + menu.menu_id}
                          valuePropName="checked"
                        >
                          <Checkbox></Checkbox>
                        </Form.Item>
                      </td>
                    )}
                    {menu.menu_id !== "joinus" && <td></td>}
                  </tr>
                );
              })}
              {/* <tr>
                                <td colSpan='4'>User & Permission</td>
                            </tr>
                            <tr>
                                <td>
                                    Admin User
                            </td>
                                <td>
                                    <Form.Item
                                        name="view_adminuser"
                                    >
                                        <Checkbox></Checkbox>
                                    </Form.Item>

                                </td>
                                <td>
                                    <Form.Item
                                        name='modify_adminuser'

                                    >
                                        <Checkbox></Checkbox>
                                    </Form.Item>
                                </td>
                                <td>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    User Role
                            </td>
                                <td>
                                    <Form.Item
                                        name='view_userrole'

                                    >
                                        <Checkbox></Checkbox>
                                    </Form.Item>
                                </td>
                                <td>
                                    <Form.Item
                                        name='modify_userrole'

                                    >
                                        <Checkbox></Checkbox>
                                    </Form.Item>
                                </td>
                                <td>

                                </td>
                            </tr> */}
            </tbody>
          </table>
        </Form>
      ) : (
        <Skeleton active />
      )}
    </Modal>
  );
};

export default EditUser;
