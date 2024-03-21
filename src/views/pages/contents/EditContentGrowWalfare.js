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
const EditContentGrow = ({
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
            if (type === "edit") {
                values = {
                    ...values,
                    menu_content_id: data.menu_content_id,
                    menu_content_review_id: data.menu_content_review_id,
                };
            } else {
                values = { ...values, menu_content_id: 0, menu_content_review_id: 0 };
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
            const layoutListNoContent = [0, 6];
            if (
                contentTH !== null &&
                contentTH !== "" &&
                menudata.menu_id !== 219 &&
                !layoutListNoContent.includes(type)
            ) {
                dataContent.description_th = contentTH;
            }
            if (
                contentEN !== null &&
                contentEN !== "" &&
                menudata.menu_id !== 219 &&
                !layoutListNoContent.includes(type)
            ) {
                dataContent.description_en = contentEN;
            }

            if (startDate !== "") {
                dataContent.start_date = startDate;
            }
            if (endDate !== "") {
                dataContent.start_date = endDate;
            }

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

  
    useEffect(() => {
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
                    } catch (error) { }
                }

                if (data.footer1_th !== null) {
                    setFooterTH(data.footer1_th);
                    setFooterEN(data.footer1_en);
                }

                console.log(layouttype);
                

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
                }
                else if (data.menu_id === 291 && data.food_type === null) {
                    data.food_type = "0";
                }
                console.log(data);
                setFileImageList(imageData);
                setFileList(fileData);
                setFileUrl(data.file_path);
                setImageUrl(data.image_path1);
            });
            form.setFieldsValue(data);
        } else {
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
            });
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
                            <Col sm={12}>
                                <FormGroup>
                                    <label className="form-control-label">
                                        รายละเอียดเนื้อหา ภาษาไทย 1
                                            </label>
                                    <Form.Item
                                        name="description_th"
                                        rules={[
                                            {
                                                required: false,
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
                                                required: false,
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
                        </Row>
                    </Container>
                </Form>
            ) : (
                    <Skeleton active />
                )}
        </Modal>
    );
};

export default EditContentGrow;
