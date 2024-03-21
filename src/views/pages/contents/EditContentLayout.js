/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash";
import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Form,
  Skeleton,
  Upload,
  Button,
  Checkbox,
  DatePicker,
  Space,
} from "antd";
import { Row, Col, FormGroup, Input, Container } from "reactstrap";
import {
  UploadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { drinkType, sizeDrinkType } from "./data";
import JoditEditor from "jodit-react";
import moment from "moment";
import { post, postfile, get, baseUrl } from "services/callAPI";
import c from "constant";
const token = localStorage.getItem("token");
const beverageType = [
  { id: "CO", name: "เครื่องดื่มกาแฟ" },
  { id: "TE", name: "เครื่องดื่มชา" },
  { id: "GT", name: "เครื่องดื่มชาเขียว" },
  { id: "CH", name: "เครื่องดื่มช็อกโกแลตและอื่นๆ" },
  { id: "MS", name: "เครื่องดื่มมิลค์เชค" },
  { id: "CF", name: "เครื่องดื่มชีสเค้ก แฟรปเป้" },
  { id: "IS", name: "อิตาเลี่ยน โซดา" },
  { id: "SM", name: "เครื่องดื่มสมูทตี้" },
];

const menuFixNoTxtArea = [219,186];

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
  allowTags: {
    p: false,
    // a: {
    //   href: true,
    // },
    // table: true,
    // tr: true,
    // td: true,
    // img: {
    //   src: "1.png",
    // },
  },
  //emoveEmptyBlocks: true,
  beautyHTML: false,
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
      // var j = this.j;
      var j = _this;

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
          var elm = j.j.createInside.element(tagName);
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
const EditContentLayout = ({
  data,
  visible,
  callback,
  setVisable,
  type,
  layouttype,
  done,
  menudata,
  datad,
  contentdata,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [fileUrl, setFileUrl] = useState("");
  const [layoutType, setlayoutType] = useState(layouttype);
  const editor = useRef(null);
  const [contentTH, setContentTH] = useState("");
  const [contentEN, setContentEN] = useState("");
  const [footerTH, setFooterTH] = useState("");
  const [footerEN, setFooterEN] = useState("");
  const [contentTH2, setContentTH2] = useState("");
  const [contentEN2, setContentEN2] = useState("");
  const [fileimageList, setFileImageList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [fileVideoList, setFileVideoList] = useState([]);
  const [fileVideoUrl, setFileVideoUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dataBusiness, setDataBusiness] = useState("");
  const [business, setBusiness] = useState("0");
  const regex = /<(“[^”]*”|'[^’]*’|[^'”>])*>/gi;
  const handleOk = () => {
    form.validateFields().then((values) => {
      setConfirmLoading(true);

      let contentdata_ = contentdata;
      if (menudata.menu_id === 68) {
        contentdata_ = contentdata_.filter(
          ({ beverage_type }) => beverage_type === values.beverage_type
        );
      }
      var max = 0;
      contentdata_.forEach((item) => {
        max = item.sequence > max ? item.sequence : max;
        max++;
      });
      if (type === "edit") {
        values = {
          ...values,
          menu_content_id: data.menu_content_id,
          menu_content_review_id: data.menu_content_review_id,
          sequence: type === "edit" ? data.sequence : max,
        };
      } else {
        values = {
          ...values,
          sequence: type === "edit" ? data.sequence : max,
          menu_content_id: 0,
          menu_content_review_id: 0,
        };
      }

      if (values.hot_drink === true) {
        values.hot_drink = "Y";
      } else if (values.hot_drink === false) {
        values.hot_drink = "N";
      }
      if (values.cool_drink === true) {
        values.cool_drink = "Y";
      } else if (values.cool_drink === false) {
        values.cool_drink = "N";
      }
      if (values.spin_drink === true) {
        values.spin_drink = "Y";
      } else if (values.spin_drink === false) {
        values.spin_drink = "N";
      }

      // if (values.small_drink === true) {
      //   values.small_drink = "Y";
      // } else if (values.small_drink === false) {
      //   values.small_drink = "N";
      // }
      // if (values.medium_drink === true) {
      //   values.medium_drink = "Y";
      // } else if (values.medium_drink === false) {
      //   values.medium_drink = "N";
      // }

      // if (values.large_drink === true) {
      //   values.large_drink = "Y";
      // } else if (values.large_drink === false) {
      //   values.large_drink = "N";
      // }
      if (
        values.description_th_array !== null &&
        values.description_th_array !== undefined
      ) {
        values.description_th = JSON.stringify(values.description_th_array);
        values.description_en = JSON.stringify(values.description_th_array);
      }

      if (values.footer1_th !== null && values.footer1_th !== undefined) {
        values.footer1_th = footerTH;
        values.footer1_en = footerEN;
      }

      if (data.menu_id === 291) {
        values.food_type = business;
      }
      setVisable(false);
      let dataContent = {};
      dataContent = values;

      type = parseInt(layoutType);
      const layoutListNoContent = [6];
      if (
        contentTH !== null &&
        contentTH !== "" &&
        !menuFixNoTxtArea.includes(menudata.menu_id) &&
        !layoutListNoContent.includes(type)
      ) {
        dataContent.description_th = contentTH;
      }
      if (
        contentEN !== null &&
        contentEN !== "" &&
        !menuFixNoTxtArea.includes(menudata.menu_id) &&
        !layoutListNoContent.includes(type)
      ) {
        dataContent.description_en = contentEN;
      }

      if (
        contentTH2 !== null &&
        contentTH2 !== "" &&
        !menuFixNoTxtArea.includes(menudata.menu_id) &&
        !layoutListNoContent.includes(type)
      ) {
        dataContent.description2_th = contentTH2;
      }
      if (
        contentEN2 !== null &&
        contentEN2 !== "" &&
        !menuFixNoTxtArea.includes(menudata.menu_id) &&
        !layoutListNoContent.includes(type)
      ) {
        dataContent.description2_en = contentEN2;
      }

      if (startDate !== "") {
        dataContent.start_date = startDate;
      }
      if (endDate !== "") {
        dataContent.start_date = endDate;
      }
      console.log("dataContentXXXXXXXXXXX");
      console.log(dataContent);

      let dataSave = {
        menu: {
          ...menudata,
        },
        contents: [
          {
            ...dataContent,
            image_path1: imageUrl,
            file_path: fileUrl,
            file_name: "",
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

  const handleSaveFile = (file) => {
    setImageUrl("");
    setConfirmLoading(true);
    postfile("files/uploadimage", file).then(
      (result) => {
        getBase64(file, (imageUrl) => {
          setFileImageList([
            {
              uid: "-1",
              name: imageUrl,
              status: "done",
              url: imageUrl,
            },
          ]);
        });
        setImageUrl(result.file_path);
        setConfirmLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const onChangeImage = ({ file }) => {
    if (file.status === c.status.removed) {
      setFileImageList([]);
      setImageUrl("");
    }
    // setFileImageList(newFileList);
  };

  const handleSaveVideo = (file) => {
    setFileUrl("");
    setConfirmLoading(true);
    postfile("files/uploadimage", file).then(
      (result) => {
        getBase64(file, (imageUrl) => {
          setFileList([
            {
              uid: "-1",
              name: imageUrl,
              status: "done",
              url: imageUrl,
            },
          ]);
        });
        setFileUrl(result.file_path);
        setConfirmLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const onChangeVideo = ({ file }) => {
    if (file.status === c.status.removed) {
      setFileVideoList([]);
      setFileVideoUrl("");
    }
  };

  const handleSaveFilePDF = (file) => {
    setFileUrl("");
    setConfirmLoading(true);
    data = {};
    postfile("files/uploadfile", file).then(
      (result) => {
        getBase64(file, (imageUrl) => {
          setFileList([
            {
              uid: "-1",
              name: result.file_name,
              status: "done",
              url: imageUrl,
            },
          ]);
        });
        setFileUrl(result.file_path);
        data.description_th = result.file_size;
        data.description_en = result.file_size;
        form.setFieldsValue(data);
        setConfirmLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const onChangeFile = ({ file }) => {
    if (file.status === c.status.removed) {
      setFileList([]);
      setFileUrl("");
    }
  };

  // const onChangeVideo = ({ fileList: newFileList }) => {
  //   setFileVideoUrl("");
  //   if (newFileList.length !== 0) {
  //     if (newFileList[0].status === "done") {
  //       postfile("files/uploadvideo", newFileList[0].originFileObj).then(
  //         (result) => {
  //           getBase64(newFileList[0].originFileObj, (imageUrl) =>
  //             setFileVideoUrl(result.file_path)
  //           );
  //         },
  //         (err) => {
  //           console.log(err);
  //         }
  //       );
  //     }
  //   }
  //   setFileVideoList(newFileList);
  // };

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const onPreviewFile = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  // const onChangeFile = ({ fileList: newFileList }) => {
  //   setFileUrl("");
  //   if (newFileList.length !== 0) {
  //     if (newFileList[0].status === "done") {
  //       postfile("files/uploadfile", newFileList[0].originFileObj).then(
  //         (result) => {
  //           getBase64(newFileList[0].originFileObj, (imageUrl) =>
  //             setFileUrl(result.file_path)
  //           );
  //         },
  //         (err) => {
  //           console.log(err);
  //         }
  //       );
  //     }
  //   }
  //   setFileList(newFileList);
  // };
  const onBusinessChange = (e) => {
    setBusiness(e.target.value);
  };

  function onChangeDate(date, dateString) {
    console.log(date, dateString);
    setStartDate(dateString);
  }

  useEffect(() => {
    console.log(type);
    form.resetFields();
    if (type === "edit") {
      setFileImageList([]);
      setImageUrl("");
      setFileUrl("");
      setFileList([]);
      setFileUrl("");
      setImageUrl("");
      setContentTH("");
      setContentEN("");
      setContentTH2("");
      setContentEN2("");
      setFooterTH("");
      setFooterEN("");
      get("careers/getBusinesss").then((result) => {
        setDataBusiness(result);
        if (data.description_th !== null) {
          setContentTH(data.description_th);
          setContentEN(data.description_en);
          setContentTH2(data.description2_th);
          setContentEN2(data.description2_en);
          try {
            data.description_th_array = JSON.parse(data.description_th);
            data.description_en_array = JSON.parse(data.description_en);
          } catch (error) {}
        }

        if (data.footer1_th !== null) {
          setFooterTH(data.footer1_th);
          setFooterEN(data.footer1_en);
        }
        if (data.menu_id == 68) {
          if (data.hot_drink === "Y") {
            data.hot_drink = true;
          } else if (data.hot_drink === "N") {
            data.hot_drink = false;
          }
          if (data.cool_drink === "Y") {
            data.cool_drink = true;
          } else if (data.cool_drink === "N") {
            data.cool_drink = false;
          }
          if (data.spin_drink === "Y") {
            data.spin_drink = true;
          } else if (data.spin_drink === "N") {
            data.spin_drink = false;
          }

          if (data.small_drink === "Y") {
            data.small_drink = true;
          } else if (data.small_drink === "N") {
            data.small_drink = false;
          }
          if (data.medium_drink === "Y") {
            data.medium_drink = true;
          } else if (data.medium_drink === "N") {
            data.medium_drink = false;
          }
          if (data.large_drink === "Y") {
            data.large_drink = true;
          } else if (data.large_drink === "N") {
            data.large_drink = false;
          }
        }

        let imageData = [];
        let fileData = [];
        if (data.image_path1 !== null && data.image_path1 !== undefined) {
          imageData.push({
            uid: "-1",
            name: data.file_path,
            status: "done",
            url: data.image_path1,
          });
        }
        if (data.file_path !== null && data.file_path !== undefined) {
          fileData.push({
            uid: "-1",
            name: data.file_path,
            status: "done",
            url: data.file_path,
          });
        }
        if (
          data.start_date !== null &&
          data.start_date !== "" &&
          data.start_date !== "0001-01-01T00:00:00"
        ) {
          setStartDate(data.start_date);
        }

        if (data.menu_id === 291 && data.food_type !== null) {
          setBusiness(data.food_type);
        } else if (data.menu_id === 291 && data.food_type === null) {
          data.food_type = "0";
        }
        setFileImageList(imageData);
        setFileList(fileData);
        setFileUrl(data.file_path);
        setImageUrl(data.image_path1);
        console.log(datad);
        form.setFieldsValue(data);
      });
    } else {
      console.log(datad);
      get("careers/getBusinesss").then((result) => {
        setDataBusiness(result);
        setFileImageList([]);
        setImageUrl("");
        setFileUrl("");
        setFileList([]);
        setFileUrl("");
        setImageUrl("");
        setContentTH("");
        setContentEN("");
        setContentTH2("");
        setContentEN2("");
        setFooterTH("");
        setFooterEN("");
        setBusiness("0");
        form.resetFields();
      });
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
            {type !== "edit" &&
              datad !== undefined &&
              (layoutType === 0 || layoutType === "0") && (
                <>
                  {datad.topic_th !== null && (
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
                                required: true,
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
                                required: true,
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
                    </Row>
                  )}
                  {regex.test(datad.description_th) === false &&
                    datad.description_th != null &&
                    datad.menu_id !== 219 && (
                      <Row>
                        <Col sm={12}>
                          <FormGroup>
                            <label className="form-control-label">
                              รายละเอียดเนื้อหา ภาษาไทย 1
                            </label>
                            <Form.Item
                              name="description_th"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "กรุณากรอกข้อมูลรายละเอียดเนื้อหา ภาษาไทย!",
                                },
                              ]}
                            >
                              <Input
                                type="textarea"
                                id="description_th"
                                className="form-control-alternative"
                                placeholder="รายละเอียดเนื้อหา ภาษาไทย 1"
                                rows={5}
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                        <Col sm={12}>
                          <FormGroup>
                            <label className="form-control-label">
                              รายละเอียดเนื้อหา ภาษาอังกฤษ 1
                            </label>
                            <Form.Item
                              name="description_en"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "กรุณากรอกข้อมูลรายละเอียดเนื้อหา ภาษาอังกฤษ!",
                                },
                              ]}
                            >
                              <Input
                                type="textarea"
                                id="description_en"
                                className="form-control-alternative"
                                placeholder="รายละเอียดเนื้อหา ภาษาอังกฤษ"
                                rows={5}
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                      </Row>
                    )}
                  {regex.test(datad.description2_th) === false &&
                    datad.description2_th != null &&
                    datad.menu_id !== 219 && (
                      <Row>
                        <Col sm={12}>
                          <FormGroup>
                            <label className="form-control-label">
                              รายละเอียดเนื้อหา ภาษาไทย 2
                            </label>
                            <Form.Item
                              name="description2_th"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "กรุณากรอกข้อมูลรายละเอียดเนื้อหา ภาษาไทย 2!",
                                },
                              ]}
                            >
                              <Input
                                type="textarea"
                                id="description2_th"
                                className="form-control-alternative"
                                placeholder="รายละเอียดเนื้อหา ภาษาไทย 2"
                                rows={5}
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                        <Col sm={12}>
                          <FormGroup>
                            <label className="form-control-label">
                              รายละเอียดเนื้อหา ภาษาอังกฤษ 2
                            </label>
                            <Form.Item
                              name="description2_en"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "กรุณากรอกข้อมูลรายละเอียดเนื้อหา ภาษาอังกฤษ 2 !",
                                },
                              ]}
                            >
                              <Input
                                type="textarea"
                                id="description2_en"
                                className="form-control-alternative"
                                placeholder="รายละเอียดเนื้อหา ภาษาอังกฤษ 2"
                                rows={5}
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                      </Row>
                    )}
                  {regex.test(datad.description_th) === true &&
                    datad.description_th != null &&
                    datad.menu_id !== 219 && (
                      <>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            รายละเอียดเนื้อหา ภาษาไทย 1
                          </label>

                          <JoditEditor
                            ref={editor}
                            value={contentTH}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={(newContent) => setContentTH(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={(newContent) => {}}
                          />
                        </FormGroup>

                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            รายละเอียดเนื้อหา ภาษาอังกฤษ 1
                          </label>

                          <JoditEditor
                            ref={editor}
                            value={contentEN}
                            config={config}
                            tabIndex={2} // tabIndex of textarea
                            onBlur={(newContent) => setContentEN(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={(newContent) => {}}
                          />
                        </FormGroup>
                      </>
                    )}
                  {regex.test(datad.description2_th) === true &&
                    datad.description2_th != null &&
                    datad.menu_id !== 219 && (
                      <>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            รายละเอียดเนื้อหา ภาษาไทย 2
                          </label>

                          <JoditEditor
                            ref={editor}
                            value={contentTH2}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={(newContent) => setContentTH2(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={(newContent) => {}}
                          />
                        </FormGroup>

                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            รายละเอียดเนื้อหา ภาษาอังกฤษ 2
                          </label>

                          <JoditEditor
                            ref={editor}
                            value={contentEN2}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={(newContent) => setContentEN2(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={(newContent) => {}}
                          />
                        </FormGroup>
                      </>
                    )}

                  {datad.description_th !== null && datad.menu_id === 219 && (
                    <>
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
                                      fieldKey={[
                                        field.fieldKey,
                                        "car_type_name",
                                      ]}
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
                    </>
                  )}
                  {regex.test(datad.footer1_th) === false &&
                    datad.footer1_th != null && (
                      <Row>
                        <Col sm={12} md={12}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Footer ภาษาไทย 1
                            </label>
                            <Form.Item
                              name="footer1_th"
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณากรอกข้อมูล footer ภาษาไทย!",
                                },
                              ]}
                            >
                              <Input
                                type="textarea"
                                id="footer1_th"
                                className="form-control-alternative"
                                rows={5}
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                      </Row>
                    )}
                  {regex.test(datad.footer1_en) === false &&
                    datad.footer1_en != null && (
                      <Row>
                        <Col sm={12} md={12}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Footer ภาษาอังกฤษ 1
                            </label>
                            <Form.Item
                              name="footer1_en"
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณากรอกข้อมูล footer ภาษาอังกฤษ!",
                                },
                              ]}
                            >
                              <Input
                                type="textarea"
                                id="footer1_en"
                                className="form-control-alternative"
                                rows={5}
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                      </Row>
                    )}
                  {regex.test(datad.footer1_th) === true &&
                    datad.footer1_th != null && (
                      <Row>
                        <Col sm={12} md={12}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Footer ภาษาไทย 1
                            </label>
                            <JoditEditor
                              ref={editor}
                              value={footerTH}
                              config={config}
                              tabIndex={1} // tabIndex of textarea
                              onBlur={(newContent) => setFooterTH(newContent)} // preferred to use only this option to update the content for performance reasons
                              onChange={(newContent) => {}}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    )}
                  {regex.test(datad.footer1_en) === true &&
                    datad.footer1_en != null && (
                      <Row>
                        <Col sm={12} md={12}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Footer ภาษาอังกฤษ 1
                            </label>
                            <JoditEditor
                              ref={editor}
                              value={footerEN}
                              config={config}
                              tabIndex={1} // tabIndex of textarea
                              onBlur={(newContent) => setFooterEN(newContent)} // preferred to use only this option to update the content for performance reasons
                              onChange={(newContent) => {}}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    )}
                  {datad.beverage_type !== null && (
                    <Row>
                      <Col sm={12} md={3}>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            ประเภทเครื่องดื่ม
                          </label>
                          <Form.Item
                            name="beverage_type"
                            rules={[
                              {
                                required: false,
                                message: "กรุณาเลือกประเภทเครื่องดื่ม!",
                              },
                            ]}
                          >
                            <Input
                              type="select"
                              className="form-control-alternative"
                              disabled={confirmLoading}
                            >
                              <option value="0">กรุณาเลือก</option>
                              {beverageType.map((item) => {
                                return (
                                  <option value={item.id}>{item.name}</option>
                                );
                              })}
                            </Input>
                          </Form.Item>
                        </FormGroup>
                      </Col>
                      <Col sm={12} md={4}>
                        <FormGroup>
                          <Form.Item></Form.Item>
                          {drinkType.map((drink, index) => {
                            return (
                              <Form.Item
                                name={drink.name}
                                valuePropName="checked"
                              >
                                <Checkbox value={drink.name}>
                                  {drink.label}
                                </Checkbox>
                              </Form.Item>
                            );
                          })}
                        </FormGroup>
                      </Col>
                      {/* <Col sm={12} md={4}>
                        <FormGroup>
                          {sizeDrinkType.map((drink, index) => {
                            return (
                              <Form.Item name={drink.name}>
                                <Checkbox value={drink.name}>
                                  {drink.label}
                                </Checkbox>
                              </Form.Item>
                            );
                          })}
                        </FormGroup>
                      </Col> */}
                    </Row>
                  )}
                  <Row>
                    {datad.capacity_value !== null && (
                      <Col sm={12} md={6}>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            ขนาดความจุ
                          </label>
                          <Form.Item
                            name="capacity_value"
                            rules={[
                              {
                                required: false,
                                message: "กรุณากรอกข้อมูลขนาดความจุ",
                              },
                            ]}
                          >
                            <Input
                              className="form-control-alternative"
                              id="capacity_value"
                              placeholder="ขนาดความจุ"
                              type="text"
                            />
                          </Form.Item>
                        </FormGroup>
                      </Col>
                    )}
                    {datad.capacity_value !== null && (
                      <Col sm={12} md={6}>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            ขนาดความสูง
                          </label>
                          <Form.Item
                            name="height_value"
                            rules={[
                              {
                                required: false,
                                message: "กรุณากรอกข้อมูลขนาดความสูง",
                              },
                            ]}
                          >
                            <Input
                              className="form-control-alternative"
                              id="height_value"
                              placeholder="ความสูง"
                              type="text"
                            />
                          </Form.Item>
                        </FormGroup>
                      </Col>
                    )}
                    {datad.capacity_value !== null && datad.menu_id === 150 && (
                      <Col sm={12} md={6}>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            จำนวนวาล์ว
                          </label>
                          <Form.Item
                            name="valve_value"
                            rules={[
                              {
                                required: false,
                                message: "กรุณากรอกข้อมูลจำนวนวาล์ว",
                              },
                            ]}
                          >
                            <Input
                              className="form-control-alternative"
                              id="valve_value"
                              placeholder="จำนวนวาล์ว"
                              type="text"
                            />
                          </Form.Item>
                        </FormGroup>
                      </Col>
                    )}
                  </Row>
                  {datad.station_all_num !== 0 && (
                    <>
                      <Row>
                        <Col sm={12} md={3}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="station_all_num"
                            >
                              จำนวนสถานีบริการทั้งหมด
                            </label>
                            <Form.Item
                              name="station_all_num"
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณากรอกจำนวนสถานีบริการทั้งหมด!",
                                },
                              ]}
                            >
                              <Input
                                className="form-control-alternative"
                                id="station_all_num"
                                type="number"
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                        <Col sm={12} md={3}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="station_oil_num"
                            >
                              จำนวนสถานีบริการน้ำมัน
                            </label>
                            <Form.Item
                              name="station_oil_num"
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณากรอกจำนวนสถานีบริการน้ำมัน!",
                                },
                              ]}
                            >
                              <Input
                                className="form-control-alternative"
                                id="station_oil_num"
                                type="number"
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                        <Col sm={12} md={3}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="station_lpg_num"
                            >
                              จำนวนสถานีบริการ LPG
                            </label>
                            <Form.Item
                              name="station_lpg_num"
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณากรอกจำนวนสถานีบริการ LPG!",
                                },
                              ]}
                            >
                              <Input
                                className="form-control-alternative"
                                id="station_lpg_num"
                                type="number"
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>

                        <Col sm={12} md={3}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="station_oil_lpg_num"
                            >
                              จำนวนสถานีบริการน้ำมันและ LPG
                            </label>
                            <Form.Item
                              name="station_oil_lpg_num"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "กรุณากรอกข้อมูล สถานีบริการน้ำมันและ LPG!",
                                },
                              ]}
                            >
                              <Input
                                className="form-control-alternative"
                                id="station_oil_lpg_num"
                                type="number"
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                      </Row>
                    </>
                  )}
                  {data.menu_id === 291 && (
                    <Row>
                      <Col sm={12} md={3}>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            ประเภทธุรกิจ
                          </label>
                          <Form.Item
                            name="food_type"
                            rules={[
                              {
                                required: true,
                                message: "กรุณาเลือกประเภทธุรกิจ!",
                              },
                            ]}
                          >
                            <Input
                              type="select"
                              className="form-control-alternative"
                              disabled={confirmLoading}
                              value={business}
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
                            </Input>
                          </Form.Item>
                        </FormGroup>
                      </Col>
                    </Row>
                  )}
                  <Row>
                    {datad.image_path1 !== null &&
                      datad.image_path1 !== "" &&
                      datad.menu_id != 272 && (
                        <Col sm={12} md={3}>
                          <FormGroup>
                            <label>รูปภาพประกอบ</label>
                            <Upload
                              accept=".png"
                              //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                              id="image_path1"
                              listType="picture-card"
                              fileList={fileimageList}
                              onChange={onChangeImage}
                              onPreview={onPreview}
                              beforeUpload={handleSaveFile}
                            >
                              {fileimageList.length < 1 && "+ Upload"}
                            </Upload>
                          </FormGroup>
                        </Col>
                      )}
                    {datad.file_path !== null &&
                      datad.file_path !== "" &&
                      datad.menu_id != 272 && (
                        <Col sm={12} md={4}>
                          <FormGroup>
                            <Upload
                              //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                              id="file_path"
                              accept=".PDF"
                              fileList={fileList}
                              onChange={onChangeFile}
                              beforeUpload={handleSaveFilePDF}
                            >
                              <Button>
                                <UploadOutlined /> Upload File
                              </Button>
                            </Upload>
                          </FormGroup>
                        </Col>
                      )}
                    {datad.menu_id === 272 && (
                      <Col sm={12} md={3}>
                        <FormGroup>
                          <label>รูปภาพประกอบ</label>
                          <Upload
                            accept=".png"
                            //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            id="image_path1"
                            listType="picture-card"
                            fileList={fileimageList}
                            onChange={onChangeImage}
                            onPreview={onPreview}
                            beforeUpload={handleSaveFile}
                          >
                            {fileimageList.length < 1 && "+ Upload"}
                          </Upload>
                        </FormGroup>
                      </Col>
                    )}
                    {datad.menu_id === 272 && (
                      <Col sm={12} md={4}>
                        <FormGroup>
                          <Upload
                            //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            id="file_path"
                            accept=".PDF"
                            fileList={fileList}
                            onChange={onChangeFile}
                            beforeUpload={handleSaveFilePDF}
                          >
                            <Button>
                              <UploadOutlined /> Upload File
                            </Button>
                          </Upload>
                        </FormGroup>
                      </Col>
                    )}
                    {datad.start_date !== null &&
                      datad.start_date !== "" &&
                      datad.start_date !== "0001-01-01T00:00:00" && (
                        <Col sm={12} md={4}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              วันที่อัพเดท
                            </label>
                            <Form.Item>
                              <DatePicker
                                id="start_date"
                                value={
                                  startDate === null
                                    ? ""
                                    : moment(startDate, "YYYY-MM-DD")
                                }
                                className="form-control-alternative"
                                onChange={onChangeDate}
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                      )}
                  </Row>
                </>
              )}
            {/* end addd */}

            {type !== "edit" &&
              datad === undefined &&
              (layoutType === 0 || layoutType === "0") && (
                <>
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
                              required: true,
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
                              required: true,
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
                  </Row>

                  <Row>
                    <Col sm={12}>
                      <FormGroup>
                        <label className="form-control-label">
                          รายละเอียดเนื้อหา ภาษาไทย 1
                        </label>
                        <Form.Item
                          name="description_th"
                          rules={[
                            {
                              required: true,
                              message:
                                "กรุณากรอกข้อมูลรายละเอียดเนื้อหา ภาษาไทย!",
                            },
                          ]}
                        >
                          <Input
                            type="textarea"
                            id="description_th"
                            className="form-control-alternative"
                            placeholder="รายละเอียดเนื้อหา ภาษาไทย 1"
                            rows={5}
                          />
                        </Form.Item>
                      </FormGroup>
                    </Col>
                    <Col sm={12}>
                      <FormGroup>
                        <label className="form-control-label">
                          รายละเอียดเนื้อหา ภาษาอังกฤษ 1
                        </label>
                        <Form.Item
                          name="description_en"
                          rules={[
                            {
                              required: true,
                              message:
                                "กรุณากรอกข้อมูลรายละเอียดเนื้อหา ภาษาอังกฤษ!",
                            },
                          ]}
                        >
                          <Input
                            type="textarea"
                            id="description_en"
                            className="form-control-alternative"
                            placeholder="รายละเอียดเนื้อหา ภาษาอังกฤษ"
                            rows={5}
                          />
                        </Form.Item>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={12} md={3}>
                      <FormGroup>
                        <label>รูปภาพประกอบ</label>
                        <Upload
                          accept=".png"
                          //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          id="image_path1"
                          listType="picture-card"
                          fileList={fileimageList}
                          onChange={onChangeImage}
                          onPreview={onPreview}
                          beforeUpload={handleSaveFile}
                        >
                          {fileimageList.length < 1 && "+ Upload"}
                        </Upload>
                      </FormGroup>
                    </Col>

                    <Col sm={12} md={4}>
                      <FormGroup>
                        <label>อัพโหลดไฟล์ PDF</label>
                        <Upload
                          //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          id="file_path"
                          accept=".PDF"
                          fileList={fileList}
                          onChange={onChangeFile}
                          beforeUpload={handleSaveFilePDF}
                        >
                          <Button>
                            <UploadOutlined /> Upload File
                          </Button>
                        </Upload>
                      </FormGroup>
                    </Col>
                  </Row>
                </>
              )}

            {type === "edit" &&
              datad !== undefined &&
              (layoutType === 0 || layoutType === "0") && (
                <>
                  {datad.topic_th !== null && (
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
                                required: true,
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
                                required: true,
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
                    </Row>
                  )}
                  {regex.test(datad.description_th) === false &&
                    datad.description_th !== null &&
                    datad.menu_id !== 219 && (
                      <Row>
                        <Col sm={12}>
                          <FormGroup>
                            <label className="form-control-label">
                              รายละเอียดเนื้อหา ภาษาไทย 1
                            </label>
                            <Form.Item
                              name="description_th"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "กรุณากรอกข้อมูลรายละเอียดเนื้อหา ภาษาไทย!",
                                },
                              ]}
                            >
                              <Input
                                type="textarea"
                                id="description_th"
                                className="form-control-alternative"
                                placeholder="รายละเอียดเนื้อหา ภาษาไทย 1"
                                rows={5}
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                        <Col sm={12}>
                          <FormGroup>
                            <label className="form-control-label">
                              รายละเอียดเนื้อหา ภาษาอังกฤษ 1
                            </label>
                            <Form.Item
                              name="description_en"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "กรุณากรอกข้อมูลรายละเอียดเนื้อหา ภาษาอังกฤษ!",
                                },
                              ]}
                            >
                              <Input
                                type="textarea"
                                id="description_en"
                                className="form-control-alternative"
                                placeholder="รายละเอียดเนื้อหา ภาษาอังกฤษ"
                                rows={5}
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                      </Row>
                    )}
                  {regex.test(datad.description2_th) === false &&
                    datad.description2_th != null &&
                    datad.menu_id !== 219 && (
                      <Row>
                        <Col sm={12}>
                          <FormGroup>
                            <label className="form-control-label">
                              รายละเอียดเนื้อหา ภาษาไทย 2
                            </label>
                            <Form.Item
                              name="description2_th"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "กรุณากรอกข้อมูลรายละเอียดเนื้อหา ภาษาไทย 2!",
                                },
                              ]}
                            >
                              <Input
                                type="textarea"
                                id="description2_th"
                                className="form-control-alternative"
                                placeholder="รายละเอียดเนื้อหา ภาษาไทย 2"
                                rows={5}
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                        <Col sm={12}>
                          <FormGroup>
                            <label className="form-control-label">
                              รายละเอียดเนื้อหา ภาษาอังกฤษ 2
                            </label>
                            <Form.Item
                              name="description2_en"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "กรุณากรอกข้อมูลรายละเอียดเนื้อหา ภาษาอังกฤษ 2 !",
                                },
                              ]}
                            >
                              <Input
                                type="textarea"
                                id="description2_en"
                                className="form-control-alternative"
                                placeholder="รายละเอียดเนื้อหา ภาษาอังกฤษ 2"
                                rows={5}
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                      </Row>
                    )}
                  {regex.test(datad.description_th) === true &&
                    datad.description_th !== null &&
                    datad.menu_id !== 219 && (
                      <>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            รายละเอียดเนื้อหา ภาษาไทย 1
                          </label>
                            <JoditEditor
                              ref={editor}
                              value={contentTH}
                              config={config}
                              tabIndex={1} // tabIndex of textarea
                              onBlur={(newContent) => setContentTH(newContent)} // preferred to use only this option to update the content for performance reasons
                            />
                        </FormGroup>

                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            รายละเอียดเนื้อหา ภาษาอังกฤษ 1
                          </label>
                        
                            <JoditEditor
                              ref={editor}
                              value={contentEN}
                              config={config}
                              tabIndex={2} // tabIndex of textarea
                              onBlur={(newContent) => setContentEN(newContent)} // preferred to use only this option to update the content for performance reasons
                              onChange={(newContent) => {}}
                            />
                        </FormGroup>
                      </>
                    )}
                  {regex.test(datad.description2_th) === true &&
                    datad.description2_th !== null &&
                    datad.menu_id !== 219 && (
                      <>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            รายละเอียดเนื้อหา ภาษาไทย 2
                          </label>

                          <JoditEditor
                            ref={editor}
                            value={contentTH2}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={(newContent) => setContentTH2(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={(newContent) => {}}
                          />
                        </FormGroup>

                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            รายละเอียดเนื้อหา ภาษาอังกฤษ 2
                          </label>
                          <Form.Item
                            name="description_th"
                            rules={[
                              {
                                required: true,
                                message:
                                  "กรุณากรอกข้อมูลรายละเอียดเนื้อหา ภาษาไทย!",
                              },
                            ]}
                          >
                            <JoditEditor
                              ref={editor}
                              value={contentEN2}
                              config={config}
                              tabIndex={1} // tabIndex of textarea
                              onBlur={(newContent) => setContentEN2(newContent)} // preferred to use only this option to update the content for performance reasons
                              onChange={(newContent) => {}}
                            />
                          </Form.Item>
                        </FormGroup>
                      </>
                    )}
                  {datad.description_th !== null &&
                    datad.menu_id === 219 &&
                    datad.description_th !== null && (
                      <>
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
                                        fieldKey={[
                                          field.fieldKey,
                                          "car_type_name",
                                        ]}
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
                                        fieldKey={[
                                          field.fieldKey,
                                          "num_of_cars",
                                        ]}
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

                        {/* <Col sm={12} md={12}>
                        <Form.List name="description_en_array">
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
                                      fieldKey={[
                                        field.fieldKey,
                                        "car_type_name",
                                      ]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "กรุณากรอกประเภทรถ ภาษาอังกฤษ",
                                        },
                                      ]}
                                    >
                                      <Input placeholder="ประเภทรถ ภาษาอังกฤษ" />
                                    </Form.Item>
                                    <Form.Item
                                      {...field}
                                      name={[field.name, "num_of_cars"]}
                                      fieldKey={[field.fieldKey, "num_of_cars"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "กรุณากรอกจำนวน ภาษาอังกฤษ",
                                        },
                                      ]}
                                    >
                                      <Input placeholder="จำนวน ภาษาอังกฤษ" />
                                    </Form.Item>
                                    <Form.Item
                                      {...field}
                                      name={[field.name, "capacity"]}
                                      fieldKey={[field.fieldKey, "capacity"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "กรุณากรอกความจุ ภาษาอังกฤษ",
                                        },
                                      ]}
                                    >
                                      <Input placeholder="ความจุ ภาษาอังกฤษ" />
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
                      </Col> */}
                      </>
                    )}
                  {regex.test(datad.footer1_th) === false &&
                    datad.footer1_th != null && (
                      <>
                        <Row>
                          <Col sm={12} md={12}>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Footer ภาษาไทย 1
                              </label>
                              <Form.Item name="footer1_th">
                                <Input
                                  type="textarea"
                                  id="footer1_th"
                                  className="form-control-alternative"
                                  rows={5}
                                />
                              </Form.Item>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={12} md={12}>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Footer ภาษาอังกฤษ 1
                              </label>
                              <Form.Item name="footer1_en">
                                <Input
                                  type="textarea"
                                  id="footer1_en"
                                  className="form-control-alternative"
                                  rows={5}
                                />
                              </Form.Item>
                            </FormGroup>
                          </Col>
                        </Row>
                      </>
                    )}
                  {/* {regex.test(datad.footer1_en) === false &&
                    datad.footer1_en != null && (
                     
                    )} */}
                  {regex.test(datad.footer1_th) === true &&
                    datad.footer1_th != null && (
                      <>
                        <Row>
                          <Col sm={12} md={12}>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Footer ภาษาไทย 1
                              </label>
                              <JoditEditor
                                ref={editor}
                                value={footerTH}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={(newContent) => setFooterTH(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={(newContent) => {}}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={12} md={12}>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Footer ภาษาอังกฤษ 1
                              </label>
                              <JoditEditor
                                ref={editor}
                                value={footerEN}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={(newContent) => setFooterEN(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={(newContent) => {}}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </>
                    )}
                  {/* {regex.test(datad.footer1_en) === true &&
                    datad.footer1_en != null && (
                      
                    )} */}
                  {datad.footer2_th !== null && (
                    <Row>
                      <Col sm={12} md={12}>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            footer ภาษาไทย 2
                          </label>
                          <Form.Item name="footer2_th">
                            <Input
                              type="textarea"
                              id="footer2_th"
                              className="form-control-alternative"
                              rows={5}
                            />
                          </Form.Item>
                        </FormGroup>
                      </Col>
                    </Row>
                  )}
                  {datad.footer2_en !== null && (
                    <Row>
                      <Col sm={12} md={12}>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Footer ภาษาอังกฤษ 2
                          </label>
                          <Form.Item name="footer2_en">
                            <Input
                              type="textarea"
                              id="footer1_en"
                              className="form-control-alternative"
                              rows={5}
                            />
                          </Form.Item>
                        </FormGroup>
                      </Col>
                    </Row>
                  )}
                  {datad.beverage_type !== null && (
                    <Row>
                      <Col sm={12} md={3}>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            ประเภทเครื่องดื่ม
                          </label>
                          <Form.Item
                            name="beverage_type"
                            rules={[
                              {
                                required: false,
                                message: "กรุณาเลือกประเภทเครื่องดื่ม!",
                              },
                            ]}
                          >
                            <Input
                              type="select"
                              className="form-control-alternative"
                              disabled={confirmLoading}
                            >
                              <option value="0">กรุณาเลือก</option>
                              {beverageType.map((item) => {
                                return (
                                  <option value={item.id}>{item.name}</option>
                                );
                              })}
                            </Input>
                          </Form.Item>
                        </FormGroup>
                      </Col>
                      <Col sm={12} md={4}>
                        <FormGroup>
                          {drinkType.map((drink, index) => {
                            return (
                              <Form.Item
                                name={drink.name}
                                valuePropName="checked"
                              >
                                <Checkbox value={drink.name}>
                                  {drink.label}
                                </Checkbox>
                              </Form.Item>
                            );
                          })}
                        </FormGroup>
                      </Col>
                      {/* <Col sm={12} md={4}>
                        <FormGroup>
                          {sizeDrinkType.map((drink, index) => {
                            return (
                              <Form.Item
                                name={drink.name}
                                valuePropName="checked"
                              >
                                <Checkbox value={drink.name}>{drink.label}</Checkbox>
                              </Form.Item>
                            );
                          })}
                        </FormGroup>
                      </Col> */}
                    </Row>
                  )}
                  <Row>
                    {datad.capacity_value !== null && (
                      <Col sm={12} md={6}>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            ขนาดความจุ
                          </label>
                          <Form.Item
                            name="capacity_value"
                            rules={[
                              {
                                required: false,
                                message: "กรุณากรอกข้อมูลขนาดความจุ",
                              },
                            ]}
                          >
                            <Input
                              className="form-control-alternative"
                              id="capacity_value"
                              placeholder="ขนาดความจุ"
                              type="text"
                            />
                          </Form.Item>
                        </FormGroup>
                      </Col>
                    )}
                    {datad.capacity_value !== null && (
                      <Col sm={12} md={6}>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            ขนาดความสูง
                          </label>
                          <Form.Item
                            name="height_value"
                            rules={[
                              {
                                required: false,
                                message: "กรุณากรอกข้อมูลขนาดความสูง",
                              },
                            ]}
                          >
                            <Input
                              className="form-control-alternative"
                              id="height_value"
                              placeholder="ความสูง"
                              type="text"
                            />
                          </Form.Item>
                        </FormGroup>
                      </Col>
                    )}
                    {datad.capacity_value !== null && datad.menu_id === 150 && (
                      <Col sm={12} md={6}>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            จำนวนวาล์ว
                          </label>
                          <Form.Item
                            name="valve_value"
                            rules={[
                              {
                                required: false,
                                message: "กรุณากรอกข้อมูลจำนวนวาล์ว",
                              },
                            ]}
                          >
                            <Input
                              className="form-control-alternative"
                              id="valve_value"
                              placeholder="จำนวนวาล์ว"
                              type="text"
                            />
                          </Form.Item>
                        </FormGroup>
                      </Col>
                    )}
                  </Row>
                  {datad.station_all_num !== 0 && (
                    <>
                      <Row>
                        <Col sm={12} md={3}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="station_all_num"
                            >
                              จำนวนสถานีบริการทั้งหมด
                            </label>
                            <Form.Item
                              name="station_all_num"
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณากรอกจำนวนสถานีบริการทั้งหมด!",
                                },
                              ]}
                            >
                              <Input
                                className="form-control-alternative"
                                id="station_all_num"
                                type="number"
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                        <Col sm={12} md={3}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="station_oil_num"
                            >
                              จำนวนสถานีบริการน้ำมัน
                            </label>
                            <Form.Item
                              name="station_oil_num"
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณากรอกจำนวนสถานีบริการน้ำมัน!",
                                },
                              ]}
                            >
                              <Input
                                className="form-control-alternative"
                                id="station_oil_num"
                                type="number"
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                        <Col sm={12} md={3}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="station_lpg_num"
                            >
                              จำนวนสถานีบริการ LPG
                            </label>
                            <Form.Item
                              name="station_lpg_num"
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณากรอกจำนวนสถานีบริการ LPG!",
                                },
                              ]}
                            >
                              <Input
                                className="form-control-alternative"
                                id="station_lpg_num"
                                type="number"
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>

                        <Col sm={12} md={3}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="station_oil_lpg_num"
                            >
                              จำนวนสถานีบริการน้ำมันและ LPG
                            </label>
                            <Form.Item
                              name="station_oil_lpg_num"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "กรุณากรอกข้อมูล สถานีบริการน้ำมันและ LPG!",
                                },
                              ]}
                            >
                              <Input
                                className="form-control-alternative"
                                id="station_oil_lpg_num"
                                type="number"
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                      </Row>
                    </>
                  )}
                  {data !== null && data.tel_no1 !== null && (
                    <>
                      <Row>
                        <Col sm={12} md={3}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              เบอร์โทรศัพท์ 1
                            </label>
                            <Form.Item
                              name="tel_no1"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "กรุณากรอกข้อมูล เบอร์โทรศัwท์ที่ 1!",
                                },
                              ]}
                            >
                              <Input
                                className="form-control-alternative"
                                id="tel_no1"
                                placeholder="เบอร์โทรศัพท์ที่ 1"
                                type="text"
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>

                        {data !== null &&
                          data.fax_no1 !== null &&
                          type === "edit" && (
                            <>
                              <Col sm={12} md={3}>
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                  >
                                    เบอร์แฟกซ์ 1
                                  </label>
                                  <Form.Item
                                    name="fax_no1"
                                    rules={[
                                      {
                                        required: true,
                                        message: "กรุณากรอกข้อมูลเบอร์แฟกซ์ 1!",
                                      },
                                    ]}
                                  >
                                    <Input
                                      className="form-control-alternative"
                                      id="fax_no1"
                                      placeholder="เบอร์แฟกซ์ที่ 1"
                                      type="text"
                                    />
                                  </Form.Item>
                                </FormGroup>
                              </Col>
                            </>
                          )}
                      </Row>
                    </>
                  )}
                  {data !== null && data.map_url !== null && (
                    <Row>
                      <Col sm={12}>
                        <FormGroup>
                          <label className="form-control-label">Map Url</label>
                          <Form.Item
                            name="map_url"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอก Map Url!",
                              },
                            ]}
                          >
                            <Input
                              className="form-control-alternative"
                              id="map_url"
                              placeholder="Map Url"
                              type="text"
                            />
                          </Form.Item>
                        </FormGroup>
                      </Col>
                    </Row>
                  )}
                  {data !== null && data.link_url !== null && (
                    <Row>
                      <Col sm={12}>
                        <FormGroup>
                          <label className="form-control-label">Link Url</label>
                          <Form.Item
                            name="link_url"
                            rules={[
                              {
                                required: true,
                                message: "กรุณากรอก link_url!",
                              },
                            ]}
                          >
                            <Input
                              className="form-control-alternative"
                              id="map_url"
                              placeholder="Link Url"
                              type="text"
                            />
                          </Form.Item>
                        </FormGroup>
                      </Col>
                    </Row>
                  )}
                  {data.menu_id === 291 && (
                    <Row>
                      <Col sm={12} md={3}>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            ประเภทธุรกิจ
                          </label>
                          <Form.Item
                            name="food_type"
                            rules={[
                              {
                                required: true,
                                message: "กรุณาเลือกประเภทธุรกิจ!",
                              },
                            ]}
                          >
                            <Input
                              type="select"
                              className="form-control-alternative"
                              disabled={confirmLoading}
                              value={business}
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
                            </Input>
                          </Form.Item>
                        </FormGroup>
                      </Col>
                    </Row>
                  )}
                  <Row>
                    {datad.image_path1 !== null && datad.image_path1 !== "" && (
                      <Col sm={12} md={3}>
                        <label>รูปภาพประกอบ</label>
                        <Upload
                          accept=".png"
                          //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          id="image_path1"
                          listType="picture-card"
                          fileList={fileimageList}
                          onChange={onChangeImage}
                          onPreview={onPreview}
                          beforeUpload={handleSaveFile}
                        >
                          {fileimageList.length < 1 && "+ Upload"}
                        </Upload>
                      </Col>
                    )}

                    {datad.file_path !== null && datad.file_path !== "" && (
                      <Col sm={12} md={4}>
                        <label>อัพโหลดไฟล์ PDF</label>
                        <Upload
                          //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          id="file_path"
                          accept=".PDF"
                          fileList={fileList}
                          onChange={onChangeFile}
                          beforeUpload={handleSaveFilePDF}
                        >
                          <Button>
                            <UploadOutlined /> Upload File
                          </Button>
                        </Upload>
                      </Col>
                    )}

                    {datad.start_date !== null &&
                      datad.start_date !== "" &&
                      datad.start_date !== "0001-01-01T00:00:00" && (
                        <Col sm={12} md={4}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              วันที่อัพเดท
                            </label>
                            <Form.Item>
                              <DatePicker
                                id="start_date"
                                value={
                                  startDate === null
                                    ? ""
                                    : moment(startDate, "YYYY-MM-DD")
                                }
                                className="form-control-alternative"
                                onChange={onChangeDate}
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                      )}
                    {datad.start_date !== null &&
                      datad.start_date !== "" &&
                      datad.start_date !== "0001-01-01T00:00:00" &&
                      datad.menu_id === 291 && (
                        <Col sm={12} md={4}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              วันที่อัพเดท
                            </label>
                            <Form.Item>
                              <DatePicker
                                id="start_date"
                                value={
                                  startDate === null
                                    ? ""
                                    : moment(startDate, "YYYY-MM-DD")
                                }
                                className="form-control-alternative"
                                onChange={onChangeDate}
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                      )}
                  </Row>
                </>
              )}
          </Container>
        </Form>
      ) : (
        <Skeleton active />
      )}
    </Modal>
  );
};

export default EditContentLayout;
