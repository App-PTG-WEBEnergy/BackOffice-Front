import React from "react";
import { useHistory } from "react-router-dom";
import { Form, notification } from "antd";
import { Helmet } from "react-helmet";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
import { post,postLogin, get } from "services/callAPI";
import JwtDecode from "jwt-decode";

const Login = (props) => {
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    form.resetFields();
    post("auth/login", values).then((result) => {
      if (result.success) {
        localStorage.setItem("user", JSON.stringify(result.users));
        localStorage.setItem("token", result.users.token);
        localStorage.setItem("permisstiongroup", JSON.stringify([]));

        if (
          values.customCheckLogin === undefined ||
          values.customCheckLogin === false
        ) {
          var date = new Date();
          localStorage.setItem("remember", date.setDate(date.getDate() + 1));
        }
        let tokenData = JwtDecode(localStorage.getItem("token"));

        get("/permission/getAdminUserData/" + tokenData.ID).then(
          (result_user) => {
            localStorage.setItem("groupbid", date.setDate(date.getDate() + 1));
            get("/permission/getGroupById/" + result_user.groupID).then(
              (result_) => {
                localStorage.setItem(
                  "permisstiongroup",
                  JSON.stringify(result_)
                );
                notification.success({
                  message: "Login success",
                  description: "the route will redirect to your home page",
                  onClick: () => {},
                  placement: "bottomRight",
                });
                history.push("/admin/main");
              }
            );
          },
          (err) => {}
        );
      } else {
        notification.error({
          message: "ไม่สามารถเข้าสูระบบได้",
          description: "username หรือ password ไม่ถูกต้อง",
          onClick: () => {},
          placement: "bottomRight",
        });
      }
    });
  };
  const handleKeyPress = (target) => {
    if (target.charCode == 13) {
      submit();
    }
  };
  const submit = () => {
    form.validateFields().then(
      (values) => {
        form.resetFields();
        
        postLogin("auth/login", values).then((result) => {
          console.log(result)
          if (result.success) {
            console.log("ss")
            localStorage.setItem("user", JSON.stringify(result.users));
            localStorage.setItem("token", result.users.token);
            localStorage.setItem("permisstiongroup", JSON.stringify([]));

            if (
              values.customCheckLogin === undefined ||
              values.customCheckLogin === false
            ) {
              var date = new Date();
              localStorage.setItem(
                "remember",
                date.setDate(date.getDate() + 1)
              );
            }
            let tokenData = JwtDecode(localStorage.getItem("token"));

            // localStorage.setItem('user', JSON.stringify(result.users));
            // localStorage.setItem('token',result.users.token);
            // notification.success({
            //   message: "Login success",
            //   description:
            //     'the route will redirect to your home page',
            //   onClick: () => {
            //   },
            //   placement: 'bottomRight'
            // });
            // history.push("/admin/home")

            get("/permission/getAdminUserData/" + tokenData.ID).then(
              (result_user) => {
                localStorage.setItem(
                  "groupbid",
                  date.setDate(date.getDate() + 1)
                );
                get("/permission/getGroupById/" + result_user.groupID).then(
                  (result_) => {
                    localStorage.setItem(
                      "permisstiongroup",
                      JSON.stringify(result_)
                    );
                    notification.success({
                      message: "เข้าสู่ระบบสำเร็จ",
                      description: "หน้าแรก",
                      onClick: () => {},
                      placement: "bottomRight",
                    });
                    history.push("/admin/main");
                  }
                );
              },
              (err) => {}
            );
          } else {
            notification.error({
              message: "login",
              description: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
              onClick: () => {},
              placement: "bottomRight",
            });
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <>
      <Helmet>
        <title>PTG | Back Office</title>
      </Helmet>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-3">
            <div className="text-muted text-center">
              <img
                alt="..."
                src={require("assets/img/brand/logo.png")}
                style={{ width: "100px", height: "100px" }}
              />
              <h3 className="text-success">PTG Back Office</h3>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form
              form={form}
              layout="vertical"
              name="form_in_modal"
              initialValues={{
                modifier: "public",
              }}
            >
              <Form.Item
                name="Username"
                className="mb-3"
                rules={[
                  {
                    required: true,
                    message: "please inputer username!",
                  },
                ]}
              >
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>

                  <Input placeholder="username" />
                </InputGroup>
              </Form.Item>
              <Form.Item
                name="Password"
                rules={[
                  {
                    required: true,
                    message: "please input password!",
                  },
                ]}
              >
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="password" placeholder="Password" onKeyPress={handleKeyPress} />
                </InputGroup>
              </Form.Item>
              <Form.Item name="customCheckLogin">
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id="customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    onClick={submit}
                  >
                    Sign in
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
