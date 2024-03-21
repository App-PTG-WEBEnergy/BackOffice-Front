/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Skeleton, Upload, Checkbox } from "antd";
import { Row, Col, FormGroup, Input, Container } from "reactstrap";
import { drinkType, sizeDrinkType } from "./data";
// import ImgCrop from "antd-img-crop";
import { post } from "services/callAPI";
import JoditEditor from "jodit-react";

const SAVE_URL = "menu/saveContent";

const contentType = [
    { id: 1, name: "Normal" },
    { id: 2, name: "Html Editor" },
];

const langType = [
    { id: 1, name: "ภาษาไทย" },
    { id: 2, name: "ภาษาอังกฤษ" },
];

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

const foodType = [
    { id: "SW", name: "แซนด์วิช" },
    { id: "WT", name: "วาฟเฟิลและโทสต์" },
];

const storeType = [
    { id: "PT", name: "ร้านค้าภายในเครือ PTG" },
    { id: "OT", name: "ร้านค้าพันธมิตรที่ร่วมรายการ" },
];

const AddContent = ({ data, visible, callback, setVisable, type, done }) => {
        const [confirmLoading, setConfirmLoading] = useState(false);
        const [content_type, setContent_type] = useState("0");
        const [text_type, setText_type] = useState(0);
        const [lang_type, setLang_Type] = useState("0");
        const [form] = Form.useForm();
        const editor = useRef(null);
        const [contentTH, setContentTH] = useState("");
        const [contentEN, setContentEN] = useState("");
        const [content2TH, setContent2TH] = useState("");
        const [content2EN, setContent2EN] = useState("");
        const [footerTH, setFooterTH] = useState("");
        const [footerEN, setFooterEN] = useState("");
        const [footer2TH, setFooter2TH] = useState("");
        const [footer2EN, setFooter2EN] = useState("");
        const config = {
            readonly: false,
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
                "table",
                "link",
                "|",
                "align",
                "undo",
                "redo",
            ], // all options from https://xdsoft.net/jodit/doc/
        };
        const handleOk = () => {
            form.validateFields().then((values) => {
                if (lang_type === "1" && content_type === "2") {
                    values.description_th = contentTH;
                    values.description2_th = content2TH;
                    values.footer1_th = footerTH;
                    values.footer2_th = footer2TH;
                } else if (lang_type === "2" && content_type === "2") {
                    values.description_en = contentEN;
                    values.description2_en = content2EN;
                    values.footer1_en = footerEN;
                    values.footer2_en = footer2EN;
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

                if (values.small_drink === true) {
                    values.small_drink = "Y";
                } else if (values.small_drink === false) {
                    values.small_drink = "N";
                }
                if (values.medium_drink === true) {
                    values.medium_drink = "Y";
                } else if (values.medium_drink === false) {
                    values.medium_drink = "N";
                }

                if (values.large_drink === true) {
                    values.large_drink = "Y";
                } else if (values.large_drink === false) {
                    values.large_drink = "N";
                }

                if (type === "edit") {
                    values = {...values, id: data.menu_content_id };
                } else {
                    values = {...values, id: 0 };
                }
                console.log(values);
                setConfirmLoading(true);
                callback({ success: true });
                setConfirmLoading(false);
                setVisable(false);

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
        const onContentTypeChange = (e) => {
            setContent_type(e.target.value);
        };
        const onTextTypeChange = (e) => {
            setText_type(e.target.value);
        };

        const onLangTypeChange = (e) => {
            setLang_Type(e.target.value);
        };

        const [fileList, setFileList] = useState([]);
        const [fileList2, setFileList2] = useState([]);
        const [imageUrl, setImageUrl] = useState("");
        const [imageUrl2, setImageUrl2] = useState("");

        useEffect(() => {
            setContent_type("0");
            setLang_Type("0");

            if (type === "edit") {
                setContentTH(data.description_th);
                setContentEN(data.description_en);
                setContent2TH(data.description2_th);
                setContent2EN(data.description2_en);
                let imageData = [];
                let imageData2 = [];
                if (data.image_path1 !== null && data.image_path1 !== undefined) {
                    imageData.push({
                        uid: "-1",
                        name: "image.png",
                        status: "done",
                        url: data.image_path1,
                    });
                }
                if (data.image_path2 !== null && data.image_path2 !== undefined) {
                    imageData2.push({
                        uid: "-2",
                        name: "image.png",
                        status: "done",
                        url: data.image_path2,
                    });
                }
                setFileList(imageData);
                setFileList2(imageData2);
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

                form.setFieldsValue(data);
            } else {
                setContentTH("");
                setContentEN("");
                setContent2TH("");
                setContent2EN("");
                setFooterTH("");
                setFooterEN("");
                setFooter2TH("");
                setFooter2EN("");
                form.resetFields();
            }
        }, [visible, done]);

        const onChangeImage = ({ fileList: newFileList }) => {
            if (newFileList[0].status === "done") {
                getBase64(newFileList[0].originFileObj, (imageUrl) =>
                    setImageUrl(imageUrl)
                );
            }
            setFileList(newFileList);
        };

        const onChangeImage2 = ({ fileList: newFileList }) => {
            if (newFileList[0].status === "done") {
                // Get this url from response in real world.
                getBase64(newFileList[0].originFileObj, (imageUrl) =>
                    setImageUrl2(imageUrl)
                );
            }
            setFileList2(newFileList);
        };

        function getBase64(img, callback) {
            const reader = new FileReader();
            reader.addEventListener("load", () => callback(reader.result));
            reader.readAsDataURL(img);
        }

        const onPreview = async(file) => {
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

        return ( <Modal title = { type === "edit" ? "Edit Content" : "Add Content" }
                visible = { visible }
                onOk = { handleOk }
                width = "90%"
                style = {
                    { maxWidth: "1024px" }
                }
                confirmLoading = { confirmLoading }
                onCancel = { handleCancel } > {
                    done || type !== "edit" ? ( <Form form = { form }
                        layout = "inline"
                        name = "form_in_modal"
                        // {...layout}
                        initialValues = {
                            {
                                modifier: "public",
                            }
                        } >
                        <Container fluid >
                        <Row >
                        <Col sm = { 12 }
                        md = { 3 } >
                        <FormGroup >
                        <label className = "form-control-label required"
                        htmlFor = "input-username" >
                        เลือกภาษา </label> <Form.Item name = "lang_Type"
                        rules = {
                            [{
                                required: true,
                                message: "กรุณาเลือก!",
                            }, ]
                        } >
                        <Input type = "select"
                        className = "form-control-alternative"
                        disabled = { confirmLoading }
                        onChange = { onLangTypeChange } >
                        <option value = "0" > กรุณาเลือก </option> {
                        langType.map((item) => {
                            return <option value = { item.id } > { item.name } </option>;
                        })
                    } </Input> </Form.Item > </FormGroup> </Col > <Col sm = { 12 } md = { 3 } >
                    <FormGroup >
                    <label className = "form-control-label required"
                    htmlFor = "input-username" >
                    เลือกประเภทข้อความ </label> <Form.Item name = "content_type"
                    rules = {
                        [{
                            required: false,
                            message: "กรุณาเลือกประเภทข้อความ!",
                        }, ]
                    } >
                    <
                    Input type = "select"
                    className = "form-control-alternative"
                    disabled = { confirmLoading }
                    onChange = { onContentTypeChange } >
                    <
                    option value = "0" > กรุณาเลือก < /option> {
                    contentType.map((item) => {
                        return <option value = { item.id } > { item.name } < /option>;
                    })
                } <
                /Input> < /
                Form.Item > <
                /FormGroup> < /
                Col >

                {
                    (lang_type === "1" || lang_type === 1) && ( <
                        >
                        <
                        Col sm = { 12 }
                        md = { 6 } >
                        <
                        FormGroup >
                        <
                        label className = "form-control-label"
                        htmlFor = "input-username" >
                        Topic ภาษาไทย <
                        /label> <
                        Form.Item name = "topic_th"
                        rules = {
                            [{
                                required: false,
                                message: "กรุณากรอกข้อมูล Topic ภาษาไทย!",
                            }, ]
                        } >
                        <
                        Input className = "form-control-alternative"
                        id = "topic_th"
                        placeholder = "Topic"
                        type = "text" /
                        >
                        <
                        /Form.Item> < /
                        FormGroup > <
                        /Col>

                        {
                            (content_type === "1" || content_type === 1) && ( <
                                >
                                <
                                Col sm = { 12 } >
                                <
                                FormGroup >
                                <
                                label className = "form-control-label required" >
                                รายละเอียดเนื้ อหา ภาษาไทย 1 <
                                /label> <
                                Form.Item name = "description_th"
                                rules = {
                                    [{
                                        required: false,
                                        message: "กรุณากรอกข้อมูลรายละเอียดเนื้อหา ภาษาไทย!",
                                    }, ]
                                } >
                                <
                                Input type = "textarea"
                                id = "description_th"
                                className = "form-control-alternative"
                                placeholder = "รายละเอียดเนื้อหา ภาษาไทย 1"
                                rows = { 5 }
                                /> < /
                                Form.Item > <
                                /FormGroup> < /
                                Col > <
                                Col sm = { 12 } >
                                <
                                FormGroup >
                                <
                                label className = "form-control-label required" >
                                รายละเอียดเนื้ อหา ภาษาไทย 2 <
                                /label> <
                                Form.Item name = "description2_th"
                                rules = {
                                    [{
                                        required: false,
                                        message: "กรุณากรอกข้อมูลรายละเอียดเนื้อหา ภาษาไทย!",
                                    }, ]
                                } >
                                <
                                Input type = "textarea"
                                id = "description2_th"
                                className = "form-control-alternative"
                                placeholder = "รายละเอียดเนื้อหา ภาษาไทย 2"
                                rows = { 5 }
                                /> < /
                                Form.Item > <
                                /FormGroup> < /
                                Col >

                                <
                                Col sm = { 12 }
                                md = { 6 } >
                                <
                                FormGroup >
                                <
                                label className = "form-control-label"
                                htmlFor = "input-username" >
                                ข้ อความสุดท้ ายเนื้ อหา ภาษาไทย 1 <
                                /label> <
                                Form.Item name = "footer1_th"
                                rules = {
                                    [{
                                        required: false,
                                        message: "Please input footer text!",
                                    }, ]
                                } >
                                <
                                Input type = "textarea"
                                id = "footer1_th"
                                className = "form-control-alternative"
                                rows = { 5 }
                                /> < /
                                Form.Item > <
                                /FormGroup> < /
                                Col > <
                                Col sm = { 12 }
                                md = { 6 } >
                                <
                                FormGroup >
                                <
                                label className = "form-control-label"
                                htmlFor = "input-username" >
                                ข้ อความสุดท้ ายเนื้ อหา ภาษาไทย 2 <
                                /label> <
                                Form.Item name = "footer2_th"
                                rules = {
                                    [{
                                        required: false,
                                        message: "Please input footer text!",
                                    }, ]
                                } >
                                <
                                Input type = "textarea"
                                id = "footer2_th"
                                className = "form-control-alternative"
                                rows = { 5 }
                                /> < /
                                Form.Item > <
                                /FormGroup> < /
                                Col > <
                                />
                            )
                        } {
                            (content_type === "2" || content_type === 2) && ( <
                                >
                                <
                                Col sm = { 12 } >
                                <
                                FormGroup >
                                <
                                label className = "form-control-label required" >
                                รายละเอียดเนื้ อหา ภาษาไทย 1 <
                                /label> <
                                JoditEditor ref = { editor }
                                value = { contentTH }
                                config = { config }
                                tabIndex = { 1 } // tabIndex of textarea
                                onBlur = {
                                    (newContent) => setContentTH(newContent)
                                } // preferred to use only this option to update the content for performance reasons
                                onChange = {
                                    (newContent) => {}
                                }
                                /> < /
                                FormGroup > <
                                /Col> <
                                Col sm = { 12 } >
                                <
                                FormGroup >
                                <
                                label className = "form-control-label required" >
                                รายละเอียดเนื้ อหา ภาษาไทย 2 <
                                /label> <
                                JoditEditor ref = { editor }
                                value = { content2TH }
                                config = { config }
                                tabIndex = { 1 } // tabIndex of textarea
                                onBlur = {
                                    (newContent) => setContent2TH(newContent)
                                } // preferred to use only this option to update the content for performance reasons
                                onChange = {
                                    (newContent) => {}
                                }
                                /> < /
                                FormGroup > <
                                /Col>

                                <
                                Col sm = { 12 }
                                md = { 12 } >
                                <
                                FormGroup >
                                <
                                label className = "form-control-label"
                                htmlFor = "input-username" >
                                ข้ อความสุดท้ ายเนื้ อหา ภาษาไทย 1 <
                                /label> <
                                Form.Item name = "footer1_th"
                                rules = {
                                    [{
                                        required: false,
                                        message: "Please input footer text!",
                                    }, ]
                                } > {
                                    /* <Input
                                                                  type="textarea"
                                                                  id="footer1_th"
                                                                  className="form-control-alternative"
                                                                  placeholder="Footer Text"
                                                                  rows={5}
                                                                /> */
                                } <
                                JoditEditor ref = { editor }
                                value = { footerTH }
                                config = { config }
                                tabIndex = { 1 } // tabIndex of textarea
                                onBlur = {
                                    (newContent) => setFooterTH(newContent)
                                } // preferred to use only this option to update the content for performance reasons
                                onChange = {
                                    (newContent) => {}
                                }
                                /> < /
                                Form.Item > <
                                /FormGroup> < /
                                Col > <
                                Col sm = { 12 }
                                md = { 12 } >
                                <
                                FormGroup >
                                <
                                label className = "form-control-label"
                                htmlFor = "input-username" >
                                ข้ อความสุดท้ ายเนื้ อหา ภาษาไทย 2 <
                                /label> <
                                Form.Item name = "footer2_th"
                                rules = {
                                    [{
                                        required: false,
                                        message: "Please input footer text!",
                                    }, ]
                                } > {
                                    /* <Input
                                                                  type="textarea"
                                                                  id="footer2_th"
                                                                  className="form-control-alternative"
                                                                  placeholder="Footer Text"
                                                                  rows={5}
                                                                /> */
                                } <
                                JoditEditor ref = { editor }
                                value = { footer2TH }
                                config = { config }
                                tabIndex = { 1 } // tabIndex of textarea
                                onBlur = {
                                    (newContent) => setFooter2TH(newContent)
                                } // preferred to use only this option to update the content for performance reasons
                                onChange = {
                                    (newContent) => {}
                                }
                                /> < /
                                Form.Item > <
                                /FormGroup> < /
                                Col > <
                                />
                            )
                        } <
                        />
                    )
                } {
                    (lang_type === "2" || lang_type === 2) && ( <
                        >
                        <
                        Col sm = { 12 }
                        md = { 6 } >
                        <
                        FormGroup >
                        <
                        label className = "form-control-label"
                        htmlFor = "input-username" >
                        Topic ภาษาอั งกฤษ <
                        /label> <
                        Form.Item name = "topic_en"
                        rules = {
                            [{
                                required: false,
                                message: "กรุณากรอกข้อมูล Topic ภาษาอังกฤษ!",
                            }, ]
                        } >
                        <
                        Input className = "form-control-alternative"
                        id = "topic_en"
                        placeholder = "Topic"
                        type = "text" /
                        >
                        <
                        /Form.Item> < /
                        FormGroup > <
                        /Col> {
                        (content_type === "1" || content_type === 1) && ( <
                            >
                            <
                            Col sm = { 12 } >
                            <
                            FormGroup >
                            <
                            label className = "form-control-label required" >
                            รายละเอียดเนื้ อหา ภาษาอั งกฤษ 1 <
                            /label> <
                            Form.Item name = "description_en"
                            rules = {
                                [{
                                    required: false,
                                    message: "กรุณากรอกข้อมูลรายละเอียดเนื้อหา ภาษาอังกฤษ!",
                                }, ]
                            } >
                            <
                            Input type = "textarea"
                            id = "description_en"
                            className = "form-control-alternative"
                            placeholder = "รายละเอียดเนื้อหา ภาษาอังกฤษ"
                            rows = { 5 }
                            /> < /
                            Form.Item > <
                            /FormGroup> < /
                            Col > <
                            Col sm = { 12 } >
                            <
                            FormGroup >
                            <
                            label className = "form-control-label required" >
                            รายละเอียดเนื้ อหา ภาษาอั งกฤษ 2 <
                            /label> <
                            Form.Item name = "description2_en"
                            rules = {
                                [{
                                    required: false,
                                    message: "กรุณากรอกข้อมูลรายละเอียดเนื้อหา ภาษาอังกฤษ!",
                                }, ]
                            } >
                            <
                            Input type = "textarea"
                            id = "description2_en"
                            className = "form-control-alternative"
                            placeholder = "รายละเอียดเนื้อหา ภาษาอังกฤษ"
                            rows = { 5 }
                            /> < /
                            Form.Item > <
                            /FormGroup> < /
                            Col >

                            <
                            Col sm = { 12 }
                            md = { 6 } >
                            <
                            FormGroup >
                            <
                            label className = "form-control-label"
                            htmlFor = "input-username" >
                            ข้ อความสุดท้ ายเนื้ อหา ภาษาอั งกฤษ 1 <
                            /label> <
                            Form.Item name = "footer1_en"
                            rules = {
                                [{
                                    required: false,
                                    message: "Please input footer text!",
                                }, ]
                            } >
                            <
                            Input id = "footer1_en"
                            type = "textarea"
                            className = "form-control-alternative"
                            rows = { 5 }
                            /> < /
                            Form.Item > <
                            /FormGroup> < /
                            Col > <
                            Col sm = { 12 }
                            md = { 6 } >
                            <
                            FormGroup >
                            <
                            label className = "form-control-label"
                            htmlFor = "input-username" >
                            ข้ อความสุดท้ ายเนื้ อหา ภาษาอั งกฤษ 2 <
                            /label> <
                            Form.Item name = "footer1_en"
                            rules = {
                                [{
                                    required: false,
                                    message: "Please input footer text!",
                                }, ]
                            } >
                            <
                            Input id = "footer1_en"
                            type = "textarea"
                            className = "form-control-alternative"
                            rows = { 5 }
                            /> < /
                            Form.Item > <
                            /FormGroup> < /
                            Col > <
                            />
                        )
                    } {
                        (content_type === "2" || content_type === 2) && ( <
                            >
                            <
                            Col sm = { 12 } >
                            <
                            FormGroup >
                            <
                            label className = "form-control-label required" >
                            รายละเอียดเนื้ อหา ภาษาอั งกฤษ 1 <
                            /label> <
                            JoditEditor ref = { editor }
                            value = { contentEN }
                            config = { config }
                            tabIndex = { 1 } // tabIndex of textarea
                            onBlur = {
                                (newContent) => setContentEN(newContent)
                            } // preferred to use only this option to update the content for performance reasons
                            onChange = {
                                (newContent) => {}
                            }
                            /> < /
                            FormGroup > <
                            /Col>

                            <
                            Col sm = { 12 } >
                            <
                            FormGroup >
                            <
                            label className = "form-control-label required" >
                            รายละเอียดเนื้ อหา ภาษาอั งกฤษ 2 <
                            /label> <
                            JoditEditor ref = { editor }
                            value = { content2EN }
                            config = { config }
                            tabIndex = { 1 } // tabIndex of textarea
                            onBlur = {
                                (newContent) => setContent2EN(newContent)
                            } // preferred to use only this option to update the content for performance reasons
                            onChange = {
                                (newContent) => {}
                            }
                            /> < /
                            FormGroup > <
                            /Col>

                            <
                            Col sm = { 12 }
                            md = { 12 } >
                            <
                            FormGroup >
                            <
                            label className = "form-control-label"
                            htmlFor = "input-username" >
                            ข้ อความสุดท้ ายเนื้ อหา ภาษาอั งกฤษ 1 <
                            /label> <
                            Form.Item name = "footer1_en"
                            rules = {
                                [{
                                    required: false,
                                    message: "Please input footer text!",
                                }, ]
                            } > {
                                /* <Input
                                                              id="footer1_en"
                                                              type="textarea"
                                                              className="form-control-alternative"
                                                              placeholder="Footer Text"
                                                              rows={5}
                                                            /> */
                            } <
                            JoditEditor ref = { editor }
                            value = { footerEN }
                            config = { config }
                            tabIndex = { 1 } // tabIndex of textarea
                            onBlur = {
                                (newContent) => setFooterEN(newContent)
                            } // preferred to use only this option to update the content for performance reasons
                            onChange = {
                                (newContent) => {}
                            }
                            /> < /
                            Form.Item > <
                            /FormGroup> < /
                            Col >

                            <
                            Col sm = { 12 }
                            md = { 12 } >
                            <
                            FormGroup >
                            <
                            label className = "form-control-label"
                            htmlFor = "input-username" >
                            ข้ อความสุดท้ ายเนื้ อหา ภาษาอั งกฤษ 2 <
                            /label> <
                            Form.Item name = "footer2_en"
                            rules = {
                                [{
                                    required: false,
                                    message: "Please input footer text!",
                                }, ]
                            } > {
                                /* <Input
                                                              id="footer2_en"
                                                              type="textarea"
                                                              className="form-control-alternative"
                                                              placeholder="Footer Text"
                                                              rows={5}
                                                            /> */
                            } <
                            JoditEditor ref = { editor }
                            value = { footer2EN }
                            config = { config }
                            tabIndex = { 1 } // tabIndex of textarea
                            onBlur = {
                                (newContent) => setFooter2EN(newContent)
                            } // preferred to use only this option to update the content for performance reasons
                            onChange = {
                                (newContent) => {}
                            }
                            /> < /
                            Form.Item > <
                            /FormGroup> < /
                            Col > <
                            />
                        )
                    } <
                    />
                )
            } <
            /Row> <
        Row >
            <
            Col sm = { 12 } >
            <
            FormGroup >
            <
            label className = "form-control-label" > Map Url < /label> <
        Form.Item name = "map_url"
        rules = {
                [{
                    required: false,
                    message: "กรุณากรอก Map Url!",
                }, ]
            } >
            <
            Input className = "form-control-alternative"
        id = "map_url"
        placeholder = "Map Url"
        type = "text" /
            >
            <
            /Form.Item> < /
            FormGroup > <
            /Col> < /
            Row > <
            >
            <
            Row >
            <
            Col sm = { 12 }
        md = { 3 } >
            <
            FormGroup >
            <
            label className = "form-control-label"
        htmlFor = "input-username" >
            เบอร์ โทรศั พท์ 1 <
            /label> <
        Form.Item name = "tel_no1"
        rules = {
                [{
                    required: false,
                    message: "กรุณากรอกข้อมูล เบอร์โทรศัwท์ที่ 1!",
                }, ]
            } >
            <
            Input className = "form-control-alternative"
        id = "tel_no1"
        placeholder = "เบอร์โทรศัพท์ที่ 1"
        type = "text" /
            >
            <
            /Form.Item> < /
            FormGroup > <
            /Col> <
        Col sm = { 12 }
        md = { 3 } >
            <
            FormGroup >
            <
            label className = "form-control-label"
        htmlFor = "input-username" >
            เบอร์ โทรศั พท์ 2 <
            /label> <
        Form.Item name = "tel_no2"
        rules = {
                [{
                    required: false,
                    message: "กรุณากรอกข้อมูล เบอร์โทรศัwท์ที่ 2!",
                }, ]
            } >
            <
            Input className = "form-control-alternative"
        id = "tel_no2"
        placeholder = "เบอร์โทรศัwท์ที่ 2"
        type = "text" /
            >
            <
            /Form.Item> < /
            FormGroup > <
            /Col>

        <
        >
        <
        Col sm = { 12 }
        md = { 3 } >
            <
            FormGroup >
            <
            label className = "form-control-label"
        htmlFor = "input-username" >
            เบอร์ แฟกซ์ 1 <
            /label> <
        Form.Item name = "fax_no1"
        rules = {
                [{
                    required: false,
                    message: "กรุณากรอกข้อมูลเบอร์แฟกซ์ 1!",
                }, ]
            } >
            <
            Input className = "form-control-alternative"
        id = "fax_no1"
        placeholder = "เบอร์แฟกซ์ที่ 1"
        type = "text" /
            >
            <
            /Form.Item> < /
            FormGroup > <
            /Col>

        <
        Col sm = { 12 }
        md = { 3 } >
            <
            FormGroup >
            <
            label className = "form-control-label"
        htmlFor = "input-username" >
            เบอร์ แฟกซ์ 2 <
            /label> <
        Form.Item name = "fax_no2"
        rules = {
                [{
                    required: false,
                    message: "กรุณากรอกข้อมูลเบอร์แฟกซ์ที่ 2!",
                }, ]
            } >
            <
            Input className = "form-control-alternative"
        id = "fax_no2"
        placeholder = "เบอร์แฟกซ์ที่ 2"
        type = "text" /
            >
            <
            /Form.Item> < /
            FormGroup > <
            /Col> < /
            > <
            /Row> < /
            > <
            Row >
            <
            Col sm = { 12 }
        md = { 3 } >
            <
            label > รูปภาพประกอบที่ 1 < /label> <
        Upload
        //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        id = "image_path1"
        listType = "picture-card"
        fileList = { fileList }
        onChange = { onChangeImage }
        onPreview = { onPreview } > { fileList.length < 1 && "+ Upload" } <
            /Upload> < /
            Col >

            <
            Col sm = { 12 }
        md = { 3 } >
            <
            label > รูปภาพประกอบที่ 2 < /label> <
        Upload
        //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        id = "image_path2"
        listType = "picture-card"
        fileList = { fileList2 }
        onChange = { onChangeImage2 }
        onPreview = { onPreview } > { fileList2.length < 1 && "+ Upload" } <
            /Upload> < /
            Col > <
            /Row> < >
            <
            Row >
            <
            Col sm = { 12 }
        md = { 3 } >
            <
            FormGroup >
            <
            label className = "form-control-label"
        htmlFor = "station_all_num" >
            จำนวนสถานีบริการทั้ งหมด <
            /label> <
        Form.Item name = "station_all_num"
        rules = {
                [{
                    required: false,
                    message: "กรุณากรอกจำนวนสถานีบริการทั้งหมด!",
                }, ]
            } >
            <
            Input className = "form-control-alternative"
        id = "station_all_num"
        type = "number" /
            >
            <
            /Form.Item> < /
            FormGroup > <
            /Col> <
        Col sm = { 12 }
        md = { 3 } >
            <
            FormGroup >
            <
            label className = "form-control-label"
        htmlFor = "station_oil_num" >
            จำนวนสถานีบริการน้ ำมั น <
            /label> <
        Form.Item name = "station_oil_num"
        rules = {
                [{
                    required: false,
                    message: "กรุณากรอกจำนวนสถานีบริการน้ำมัน!",
                }, ]
            } >
            <
            Input className = "form-control-alternative"
        id = "station_oil_num"
        type = "number" /
            >
            <
            /Form.Item> < /
            FormGroup > <
            /Col> <
        Col sm = { 12 }
        md = { 3 } >
            <
            FormGroup >
            <
            label className = "form-control-label"
        htmlFor = "station_lpg_num" >
            จำนวนสถานีบริการ LPG <
            /label> <
        Form.Item name = "station_lpg_num"
        rules = {
                [{
                    required: false,
                    message: "กรุณากรอกจำนวนสถานีบริการ LPG!",
                }, ]
            } >
            <
            Input className = "form-control-alternative"
        id = "station_lpg_num"
        type = "number" /
            >
            <
            /Form.Item> < /
            FormGroup > <
            /Col>

        <
        Col sm = { 12 }
        md = { 3 } >
            <
            FormGroup >
            <
            label className = "form-control-label"
        htmlFor = "station_oil_lpg_num" >
            จำนวนสถานีบริการน้ ำมั นและ LPG <
            /label> <
        Form.Item name = "station_oil_lpg_num"
        rules = {
                [{
                    required: false,
                    message: "กรุณากรอกข้อมูล สถานีบริการน้ำมันและ LPG!",
                }, ]
            } >
            <
            Input className = "form-control-alternative"
        id = "station_oil_lpg_num"
        type = "number" /
            >
            <
            /Form.Item> < /
            FormGroup > <
            /Col> < /
            Row > <
            /> < >
            <
            Row >
            <
            Col sm = { 12 }
        md = { 3 } >
            <
            FormGroup >
            <
            label className = "form-control-label"
        htmlFor = "input-username" >
            ประเภทเครื่ องดื่ ม <
            /label> <
        Form.Item name = "beverage_type"
        rules = {
                [{
                    required: false,
                    message: "กรุณาเลือกประเภทเครื่องดื่ม!",
                }, ]
            } >
            <
            Input type = "select"
        className = "form-control-alternative"
        disabled = { confirmLoading } >
            <
            option value = "0" > กรุณาเลือก < /option> {
        beverageType.map((item) => {
            return <option value = { item.id } > { item.name } < /option>;
        })
    } <
    /Input> < /
    Form.Item > <
    /FormGroup> < /
    Col >

    <
    Col sm = { 12 }
md = { 3 } >
    <
    FormGroup >
    <
    label className = "form-control-label"
htmlFor = "input-username" >
    ประเภทอาหาร <
    /label> <
Form.Item name = "food_type"
rules = {
        [{
            required: false,
            message: "กรุณาเลือกประเภทอาหาร!",
        }, ]
    } >
    <
    Input type = "select"
className = "form-control-alternative"
disabled = { confirmLoading } >
    <
    option value = "0" > กรุณาเลือก < /option> {
foodType.map((item) => {
    return <option value = { item.id } > { item.name } < /option>;
})
} <
/Input> < /
Form.Item > <
    /FormGroup> < /
    Col > <
    /Row> <
Row >
    <
    Col sm = { 12 }
md = { 3 } >
    <
    FormGroup > {
        drinkType.map((drink, index) => {
            return ( <
                Form.Item name = { drink.name }
                valuePropName = "checked" >
                <
                Checkbox > { drink.label } < /Checkbox> < /
                Form.Item >
            );
        })
    } <
    /FormGroup> < /
    Col > <
    Col sm = { 12 }
md = { 3 } >
    <
    FormGroup > {
        sizeDrinkType.map((drink, index) => {
            return ( <
                Form.Item name = { drink.name }
                valuePropName = "checked" >
                <
                Checkbox > { drink.label } < /Checkbox> < /
                Form.Item >
            );
        })
    } <
    /FormGroup> < /
    Col > <
    /Row> <
Row >
    <
    Col sm = { 12 }
md = { 3 } >
    <
    FormGroup >
    <
    label className = "form-control-label"
htmlFor = "input-username" >
    สถานีบริการ <
    /label> <
Form.Item name = "store_type"
rules = {
        [{
            required: false,
            message: "กรุณาเลือก!",
        }, ]
    } >
    <
    Input type = "select"
className = "form-control-alternative"
disabled = { confirmLoading } >
    <
    option value = "0" > กรุณาเลือก < /option> {
storeType.map((item) => {
    return <option value = { item.id } > { item.name } < /option>;
})
} <
/Input> < /
Form.Item > <
    /FormGroup> < /
    Col > <
    Col sm = { 12 }
md = { 3 } >
    <
    FormGroup >
    <
    label className = "form-control-label"
htmlFor = "num_use" >
    การใช้ จ่ าย <
    /label> <
Form.Item name = "num_use"
rules = {
        [{
            required: false,
            message: "กรุณากรอกข้อมูล!",
        }, ]
    } >
    <
    Input className = "form-control-alternative"
id = "num_use"
type = "text" /
    >
    <
    /Form.Item> < /
    FormGroup > <
    /Col> <
Col sm = { 12 }
md = { 3 } >
    <
    FormGroup >
    <
    label className = "form-control-label"
htmlFor = "num_use_unit" >
    หน่ วย <
    /label> <
Form.Item name = "num_use_unit"
rules = {
        [{
            required: false,
            message: "กรุณากรอกข้อมูล!",
        }, ]
    } >
    <
    Input className = "form-control-alternative"
id = "num_use_unit"
type = "text" /
    >
    <
    /Form.Item> < /
    FormGroup > <
    /Col> <
Col sm = { 12 }
md = { 3 } >
    <
    FormGroup >
    <
    label className = "form-control-label"
htmlFor = "num_receive" >
    ได้ รั บแต้ ม <
    /label> <
Form.Item name = "num_receive"
rules = {
        [{
            required: false,
            message: "กรุณากรอกข้อมูล!",
        }, ]
    } >
    <
    Input className = "form-control-alternative"
id = "num_receive"
type = "text" /
    >
    <
    /Form.Item> < /
    FormGroup > <
    /Col> < /
    Row > <
    /> < /
    Container > <
    /Form>
): ( <
    Skeleton active / >
)
} <
/Modal>
);
};

export default AddContent;