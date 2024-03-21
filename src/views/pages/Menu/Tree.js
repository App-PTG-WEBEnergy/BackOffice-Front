/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash";
import React, { useState, useEffect, useRef } from "react";
import {
  Tree,
  Modal,
  Form,
  notification,
  Skeleton,
  Button,
  Divider,
  Upload,
  DatePicker,
} from "antd";
import {
  ExclamationCircleOutlined,
  DiffOutlined,
  CheckCircleOutlined,
  PlusCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Header from "components/Headers/Header";
import {
  Row,
  Col,
  Container,
  Card,
  CardHeader,
  ListGroup,
  FormGroup,
  Input,
  ButtonGroup,
} from "reactstrap";
import JwtDecode from "jwt-decode";
import { useLocation, useHistory } from "react-router-dom";
import { post, get, postfile, baseurl } from "services/callAPI";
import JoditEditor from "jodit-react";

import AddContent from "views/pages/contents/EditContentLayout";
import EditContent from "views/pages/contents/EditContentLayout";
import EditNewProContent from "views/pages/contents/EditContentNewsPro";
import EditContentFileList from "views/pages/contents/EditContentFile";
import DataManager from "components/DataModalContent";
import DataManagerNewPro from "components/DataManagerNewPro";
import DataManagerPepleTalk from "components/Career/DataManagerPepleTalk";
import DataManagerGrow from "components/Career/DataManagerGrow";
import DataManagerNews from "components/News/DataManagerNews";
import DataManagerTruck from "components/About/DataManagerTruck";
import DataManagerCSR from "components/Csr/DataManagerCSR";
import DataManagerList from "components/DataManagerList";
import DataManagerProduct from "components/Product/DataManagerProduct";
import DataManagerOppor from "components/Opportunity/DataManagerOppor";

import c from "constant";
import { menuid } from "./datamenuid";
import moment from "moment";
import { baseUrl } from "services/callAPI";

const EDITOR = EditContent;
const ADDEDITOR = AddContent;
const EDITORNEWPRO = EditNewProContent;
const EDITORFILE = EditContentFileList;

const menuTable = menuid;
const layouttype = [
  { id: "1", name: "Text with image" },
  { id: "2", name: "Text with image Card" },
  { id: "3", name: "Text with image Activity" },
  { id: "4", name: "Text with Map" },
  { id: "5", name: "Box Display x3" },
  { id: "6", name: "File PDF" },
  { id: "7", name: "VDO" },
];
const token = localStorage.getItem("token");
const contentlisttrack = [245, 288, 290, 291, 262, 219];
const menu_parent_list = [54, 55, 56, 57, 58, 59, 60, 61];
const menu_oppor_list = [235, 236, 237, 238];
const menuparent_product_fix = [11, 13, 16, 18, 25];
const contentlistFile = [
  // 186,
  189, 190, 191, 195, 196, 197, 198, 199, 251, 252, 200, 268, 240,327,333,344,354,
  358,
  368,
  382,
  385,
  396,
  410,
  420,
  432,
  446,
  459,
  465,
  469,
  471,
  476,
  478,
  482,
  484
];
const contentproduct = [68, 69, 97];
const textareafix = [183];
const img1fix = [188];
const file1fix = [];

const Trees = (props) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [visible, setVisibale] = useState(false);
  const [visibleProduct, setVisibaleProduct] = useState(false);
  const [visiblePopup, setVisibalePopup] = useState(false);
  const [visibleEdit, setVisibaleEdit] = useState(false);
  const [visibleEditNewPro, setVisibaleEditNewPro] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [keys, setKeys] = useState("");
  const location = useLocation();
  const path = location.pathname;
  const [loading, setLoading] = useState(true);
  const [gData, setGdata] = useState([]);
  const [menu, setMenu] = useState(0);
  const [type, setType] = useState("add");
  const [updateId, setUpdateId] = useState({});
  const [updateId2, setUpdateId2] = useState({});
  const [userAuth, setUserAuth] = useState({});
  const [layoutType, SetLayoutType] = useState("0");
  let [dataContent, setDataContent] = useState([]);
  const [dataContentSingle, setDataContentSingle] = useState({});
  const editor = useRef(null);
  const [contentTH, setContentTH] = useState("");
  const [contentEN, setContentEN] = useState("");
  const [footerTH, setFooterTH] = useState("");
  const [footerEN, setFooterEN] = useState("");
  const [content2TH, setContent2TH] = useState("");
  const [content2EN, setContent2EN] = useState("");
  const [footer2TH, setFooter2TH] = useState("");
  const [footer2EN, setFooter2EN] = useState("");
  const [contentFile, setContentFile] = useState([]);
  const [contentFileUrl, setContentFileUrl] = useState("");
  const [contentFileName, setContentFileName] = useState("");
  const [fileList, setFileList] = useState([]);
  const [menuFileList, setMenuFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [menuImageUrl, setMenuImageUrl] = useState("");
  const [menuFileList2, setMenuFileList2] = useState([]);
  const [menuImageUrl2, setMenuImageUrl2] = useState("");
  const [menuFileList3, setMenuFileList3] = useState([]);
  const [menuImageUrl3, setMenuImageUrl3] = useState("");
  const [visibleApprove, setVisibaleApprove] = useState(false);
  const dataConentSave = [];
  const [NEWPRO_TYPE, setNEWPRO_TYPE] = useState("N");
  const [NEWPRO_TYPEP] = useState("P");
  const [menudescTH, setMenudescTH] = useState("");
  const [menudescEN, setMenudescEN] = useState("");
  const [fileVideoList, setFileVideoList] = useState([]);
  const [fileVideoUrl, setFileVideoUrl] = useState("");
  let [datapermission, setDataPermission] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [contentType, setContentType] = useState("");
  const [topicTH, setTopicTH] = useState("");
  const [topicEN, setTopicEN] = useState("");
  const addNode = (key) => {
    console.log(key);
    form.resetFields();
    setKeys(key);
    setFileList([]);
    setMenuFileList([]);
    setMenuImageUrl("");
    setMenuImageUrl2("");
    setMenuImageUrl3("");
    setImageUrl("");
    setDataContent([]);
    setUpdateId({});
    setContentFile([]);
    setContentFileUrl("");
    setFileList([]);
    setImageUrl("");
    setFileVideoList([]);
    setFileVideoUrl("");
    setMenuFileList([]);
    setMenuFileList2([]);
    setMenuFileList3([]);

    setType("add");
    setVisibale(true);
  };

  const addNodeProduct = (key) => {
    console.log(key);
    setKeys(key);
    setFileList([]);
    setMenuFileList([]);
    setMenuImageUrl("");
    setMenuImageUrl2("");
    setMenuImageUrl3("");
    setImageUrl("");
    setType("add");

    form.resetFields();
    setDataContent([]);
    setUpdateId({});
    setContentFile([]);
    setContentFileUrl("");
    setFileList([]);
    setImageUrl("");
    setFileVideoList([]);
    setFileVideoUrl("");
    setMenuFileList([]);
    setMenuFileList2([]);
    setMenuFileList3([]);
    setVisibaleProduct(true);
  };
  //const regex = /(<([^>]+)>)/gi;
  const regex = /<(“[^”]*”|'[^’]*’|[^'”>])*>/;
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
    removeEmptyBlocks: true,
    beautyHTML: false,
    readonly: false,
    toolbarButtonSize: "small",
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

  // const cutHtmltag(substring){

  //   const result = data.description.replace(regex, '');
  //   return result;
  // }

  const onLayoutType = (e) => {
    SetLayoutType(e.target.value);
  };
  const onContentType = (e) => {
    setContentType(e.target.value);
    
  };
  const getData = (data) => {
    console.log(data);
    var d = [];
    const inverse = (data, parent_id) => {
      data.forEach(
        (
          {
            menu_id,
            menu_name_th,
            menu_image_path,
            pattern_type,
            create_by,
            menu_name_en,
            create_date,
            update_date,
            update_by,
            status,
            children,
          },
          index
        ) => {
          d.push({
            menu_id,
            menu_name_th,
            menu_image_path,
            pattern_type,
            create_by,
            menu_name_en,
            create_date,
            update_date,
            update_by,
            status,
            menu_parent_id: parent_id,
            sequence: index,
          });
          inverse([...children], menu_id);
        }
      );
    };
    inverse(data, menu);
    return d;
  };
  const handleOk = async () => {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);
        let data = getData(gData);
        data = data.filter(({ menu_parent_id }) => menu_parent_id === keys);
        var max = 0;
        data.forEach((item) => {
          max = item.sequence > max ? item.sequence : max;
          max++;
        });

        if (
          values.menu_description_th == null &&
          values.menu_description_th === undefined
        ) {
          if (menudescTH !== null && menudescTH !== undefined) {
            values.menu_description_th = menudescTH;
          }
        }
        if (
          values.menu_description_en == null &&
          values.menu_description_en === undefined
        ) {
          if (menudescEN !== null && menudescEN !== undefined) {
            values.menu_description_en = menudescEN;
          }
        }

        const d = {
          ...updateId,
          menu_id: type === "add" ? 0 : updateId.menu_id,
          menu_parent_id: type === "add" ? keys : updateId.menu_parent_id,
          ...values,
          menu_image_path: menuImageUrl,
          pattern_type: "T",
          status: "Y",
          sequence: type === "edit" ? updateId.sequence : max,
        };
        let datacontentArray = [];
        let dataContent = {};
        if (type !== "add") {
          console.log(dataContent);
          dataContent = values;
          dataContent.description_th =
            values.description_th == null ? contentTH : values.description_th;
          dataContent.description_en =
            values.description_en == null ? contentEN : values.description_en;
          dataContent.description2_th =
            values.description2_th == null
              ? content2TH
              : values.description2_th;
          dataContent.description2_en =
               content2EN == null
              ? content2TH
              : content2EN;
          dataContent.footer1_th = footerTH;
          dataContent.footer1_en = footerEN;
          dataContent.footer2_th = footer2TH;
          dataContent.footer2_en = footer2EN;
          dataContent.menu_id =
            dataContentSingle.menu_id === null ? 0 : dataContentSingle.menu_id;
          dataContent.menu_content_id =
            dataContentSingle.menu_content_id === null
              ? 0
              : dataContentSingle.menu_content_id;
          dataContent.menu_content_review_id =
            dataContentSingle.menu_content_review_id === null
              ? 0
              : dataContentSingle.menu_content_review_id;
          datacontentArray.push(dataContent);
        }

        if (values.content_type === "4") {
          dataContent.map_url =
            "https://maps.google.com/maps?q=" +
            dataContent.lat +
            "," +
            dataContent.long +
            "&t=&z=13&ie=UTF8&iwloc=&output=embed";
        }
        // post('menu/saveMenu', d).then((result) => {
        //   form.resetFields();
        //   notification.success({
        //     message: 'บันทึกข้อมูล',
        //     description:
        //       'บันทึกข้อมูลเสร็จสิ้น',
        //     onClick: () => {
        //     },
        //     placement: 'bottomRight'
        //   });
        //   searchMenu(menu);
        //   setConfirmLoading(false);
        //   setVisibale(false);
        //   setType('add')
        // }, err => {
        //   setConfirmLoading(false);
        // })

        var urlsave = "menu/saveContent";
        if (type !== "add") {
          let dataSave = {};
          if (updateId.menu_name_th === "Image Popup" || updateId.menu_name_th === "Image Popup 2") {
            dataSave = {
              menu: {
                ...d,
              },
              contents: [
                {
                  menu_id:
                    dataContentSingle.menu_id === null
                      ? 0
                      : dataContentSingle.menu_id,
                  menu_content_id:
                    dataContentSingle.menu_content_id === null
                      ? 0
                      : dataContentSingle.menu_content_id,
                  menu_content_review_id:
                    dataContentSingle.menu_content_review_id === null
                      ? 0
                      : dataContentSingle.menu_content_review_id,
                  start_date: startDate,
                  end_date: endDate,
                  image_path1: imageUrl,
                  status: "Y",
                },
              ],
            };
            urlsave = "menu/saveContentPopup";
          } else if (
            menuid.filter((x) => x === updateId.menu_id).length === 1
          ) {
            dataSave = {
              menu: {
                ...d,
                menu_image_path: menuImageUrl,
                menu_image_path2: menuImageUrl2,
                menu_image_path3: menuImageUrl3,
              },
              contents: [],
            };
            urlsave = "menu/saveContent";
          } else {
            dataSave = {
              menu: {
                ...d,
                menu_image_path: menuImageUrl,
                menu_image_path2: menuImageUrl2,
                menu_image_path3: menuImageUrl3,
              },
              contents: [
                {
                  ...dataContent,
                  image_path1: imageUrl,
                  file_path: contentFileUrl,
                  file_name: contentFileName,
                },
              ],
            };
            urlsave = "menu/saveContent";
          }
          console.log(dataSave);
          post(urlsave, dataSave).then(
            (result) => {
              form.resetFields();
              notification.success({
                message: "บันทึกเมนู",
                description: "บันทึกเมนูเสร็จสิ้น",
                onClick: () => {},
                placement: "bottomRight",
              });
              searchMenu(menu);
              setConfirmLoading(false);
              setVisibaleEdit(false);
              setVisibaleEditNewPro(false);
              setVisibalePopup(false);
              setUpdateId({});
              setType("add");
            },
            (err) => {
              setConfirmLoading(false);
            }
          );
        }
        if (type === "add") {
          //console.log("contentTH"+contentTH);
          let dataSave = {
            menu: {
              ...d,
              action_name: "IndexPTG",
              controller_name: "MenuPTG",
              create_by: contentType
            },
            contents: [
              {
                description_th: contentType=="CONTENTFILE"? values.contentTH :contentTH,
                description_en: contentType=="CONTENTFILE"? values.contentEN :contentEN,
                description2_th: content2TH,
                description2_en: content2EN,
                topic_th: values.topic_th,
                topic_en: values.topic_en
              },
            ],
          };
          post("menu/saveContent", dataSave).then(
            (result) => {
              form.resetFields();
              notification.success({
                message: "บันทึกเมนู",
                description: "บันทึกเมนูเสร็จสิ้น",
                onClick: () => {},
                placement: "bottomRight",
              });
              searchMenu(menu);
              setConfirmLoading(false);
              setVisibale(false);
              setVisibaleEditNewPro(false);
              setUpdateId({});
              setType("add");
            },
            (err) => {
              setConfirmLoading(false);
            }
          );
        }
      })
      .catch((info) => {console.log(info)});
  };

  const handleAddProduct = async () => {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);
        let data = getData(gData);
        data = data.filter(({ menu_parent_id }) => menu_parent_id === keys);
        var max = 0;
        data.forEach((item) => {
          max = item.sequence > max ? item.sequence : max;
        });
        max++;

        if (
          values.menu_description_th == null &&
          values.menu_description_th === undefined
        ) {
          if (menudescTH !== null && menudescTH !== undefined) {
            values.menu_description_th = menudescTH;
          }
        }
        if (
          values.menu_description_en == null &&
          values.menu_description_en === undefined
        ) {
          if (menudescEN !== null && menudescEN !== undefined) {
            values.menu_description_en = menudescEN;
          }
        }

        const d = {
          ...updateId,
          menu_id: type === "add" ? 0 : updateId.menu_id,
          menu_parent_id: type === "add" ? keys : updateId.menu_parent_id,
          ...values,
          menu_image_path: menuImageUrl,
          menu_image_path2: menuImageUrl2,
          pattern_type: "T",
          action_name: type === "add" ? "Index" : updateId.action_name,
          controller_name:
            type === "add" ? "MenuProducts" : updateId.controller_name,
          status: "Y",
          sequence: type === "edit" ? updateId.sequence : max,
        };
        console.log(d);
        const menus = [];
        menus.push(d);
        let dataSave = {
          menu: {
            ...d,
          },
          contents: [
            {
              menu_id:
                dataContentSingle.menu_id === null
                  ? 0
                  : dataContentSingle.menu_id,
              menu_content_id:
                dataContentSingle.menu_content_id === null
                  ? 0
                  : dataContentSingle.menu_content_id,
              menu_content_review_id:
                dataContentSingle.menu_content_review_id === null
                  ? 0
                  : dataContentSingle.menu_content_review_id,
              description_th: values.description_th,
              description_en: values.description_en,
              image_path1: imageUrl,
            },
          ],
        };
        console.log(dataSave);

        // let dataSave = {
        //   menu: {
        //     ...d,
        //   },
        //   contents: [
        //     {
        //       description_th: contentTH,
        //       description_en: contentEN,
        //     },
        //   ],
        // };

        if (type === "add") {
          post("menu/saveContent", dataSave).then(
            async (result) => {
              console.log(result);

              for (let index = 0; index < 5; index++) {
                const menuList = {
                  ...updateId,
                  menu_id: type === "add" ? 0 : 0,
                  menu_parent_id: result["menu"].menu_id,
                  menu_name_th: "Tab" + (index + 1),
                  menu_name_en: "Tab" + (index + 1),
                  menu_image_path: null,
                  pattern_type: "T",
                  status: "Y",
                  sequence: type === "edit" ? 0 : index + 1,
                };
                let dataAddNew = {
                  menu: {
                    ...menuList,
                  },
                  contents: [
                    {
                      description_th: "กรอกข้อมูลเพิ่มเติม",
                      description_en: "กรอกข้อมูลเพิ่มเติม",
                    },
                  ],
                };
                await post("menu/saveContent", dataAddNew).then(
                  async (result) => {
                    //form.resetFields();
                    console.log(result);
                  },
                  (err) => {
                    //setConfirmLoading(false);
                  }
                );
              }

              form.resetFields();

              await notification.success({
                message: "บันทึกเมนู",
                description: "บันทึกเมนูเสร็จสิ้น",
                onClick: () => {},
                placement: "bottomRight",
              });
              await searchMenu(menu);
              await setConfirmLoading(false);
              await setVisibaleProduct(false);
              await setUpdateId({});
              await setType("add");
            },
            (err) => {
              setConfirmLoading(false);
            }
          );
        } else {
          post("menu/saveContent", dataSave).then(
            (result) => {
              form.resetFields();
              notification.success({
                message: "บันทึกเมนู",
                description: "บันทึกเมนูเสร็จสิ้น",
                onClick: () => {},
                placement: "bottomRight",
              });
              searchMenu(menu);
              setConfirmLoading(false);
              setVisibaleEdit(false);
              setVisibalePopup(false);
              setVisibaleProduct(false);
              setUpdateId({});
              setType("add");
            },
            (err) => {
              setConfirmLoading(false);
            }
          );
        }
      })
      .catch((info) => {});
  };
  const menu_type = {
    home: 10,
    aboutptg: 1,
    sustainability: 2,
    productservice: 3,
    opportunity: 4,
    procurement: 7,
    activitysocial: 5,
    news: 6,
    joinus: 8,
  };
  const getCurrentMenu = () => {
    if (path.length === 20) {
      return menu_type[path.substr(14)];
    }
    return menu_type[path.substr(7)];
  };
  let dataMenu_ = {};
  const deleteMenu = (menu_id) => {
    Modal.confirm({
      title: "ต้องการลบข้อมูลหรือไม่?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      okText: "Delete",
      okType: "danger",
      onOk() {
        post("/menu/deleteMenu", { menu_ids: [menu_id] }).then((result) => {
          notification.success({
            message: "ลบข้อมูลเมนูเสร็จสิ้น",
            description: "เมนูถูกลบเสร็จสิ้น",
            onClick: () => {},
            placement: "bottomRight",
          });
          searchMenu(getCurrentMenu());
        });
      },
      onCancel() {},
    });
  };
  const approveMenu = (h) => {
    console.log(h);
    if (h.menu_id == 260 || h.menu_id == 261) {
      approveNewPros(h);
    } else {
      get(FETCH_URL + h.menu_id).then((data) => {
        let data_ = data[DATA_FETCH];
        data_ = data_.filter(
          ({ menu_content_review_id }) => menu_content_review_id > 0
        );
        //console.log(data_);
        post("/menu/approveMenu", {
          menu_id: h.menu_id,
          menu_review_id: h.menu_review_id,
          contents: data_,
        }).then((result) => {
          notification.success({
            message: "Approve ข้อมูลเสร็จสิ้น",
            description: "Approve เสร็จสิ้น",
            onClick: () => {},
            placement: "bottomRight",
          });
          setVisibaleApprove(false);
          setVisibaleEdit(false);
          setVisibaleEditNewPro(false);
          searchMenu(getCurrentMenu());
        });
      });
    }
  };

  const approveNewPros = (menu) => {
    let nptype = "";
    if (menu.menu_id == 260) {
      nptype = "N";
    } else if (menu.menu_id == 261) {
      nptype = "P";
    }

    console.log(nptype);

    get(FETCH_URL_NEWPRO + nptype).then((data) => {
      let data_ = data[DATA_FETCH_NEWPRO];
      data_ = data_.filter(({ news_pro_review_id }) => news_pro_review_id > 0);
      console.log(data_);
      post("/newpro/approveNewpro", {
        menu_id: menu.menu_id,
        menu_review_id: menu.menu_review_id,
        content_type: nptype,
        contents: data_,
      }).then((result) => {
        notification.success({
          message: "Approve ข้อมูลเสร็จสิ้น",
          description: "Approve เสร็จสิ้น",
          onClick: () => {},
          placement: "bottomRight",
        });
        setVisibaleApprove(false);
        setVisibaleEdit(false);
        setVisibaleEditNewPro(false);
        searchMenu(getCurrentMenu());
      });
    });
  };

  const rejectMenu = (h) => {
    
    if (h.menu_id == 260 || h.menu_id == 261) {
      rejectNewpro(h);
    } else {
      post("/menu/rejectMenu", {
        menu_id: h.menu_id,
      }).then((result) => {
        notification.success({
          message: "Reject ข้อมูลเสร็จสิ้น",
          description: "Reject เสร็จสิ้น",
          onClick: () => {},
          placement: "bottomRight",
        });
        setVisibaleApprove(false);
        setVisibaleEdit(false);
        setVisibaleEditNewPro(false);
        searchMenu(getCurrentMenu());
      });
    }
  };

  const rejectNewpro = (menu) => {
    let nptype = "";
    if (menu.menu_id == 260) {
      nptype = "N";
    } else if (menu.menu_id == 261) {
      nptype = "P";
    }

    post("/newpro/rejectNewsPro", {
      menu_id: menu.menu_id,
      content_type : nptype
    }).then((result) => {
      notification.success({
        message: "Reject ข้อมูลเสร็จสิ้น",
        description: "Reject เสร็จสิ้น",
        onClick: () => {},
        placement: "bottomRight",
      });
      setVisibaleApprove(false);
      setVisibaleEdit(false);
      setVisibaleEditNewPro(false);
      searchMenu(getCurrentMenu());
    });
  };

  const approveConfirmOnModal = () => {
    setVisibaleApprove(true);
  };
  const approveConfirm = (row) => {
    setUpdateId(row);
    setVisibaleApprove(true);
  };
  const editMenu = (row) => {
    console.log("XXXXXXXXXXXX");
    console.log(row);
    setDataContent([]);
    setUpdateId({});
    SetLayoutType("0");
    setContentFile([]);
    setContentFileUrl("");
    setFileList([]);
    setImageUrl("");
    setFileVideoList([]);
    setFileVideoUrl("");
    setMenuFileList([]);
    setMenuFileList2([]);
    setMenuFileList3([]);
    setMenuImageUrl("");
    setMenuImageUrl2("");
    setMenuImageUrl3("");

    form.resetFields();

    let menuImageData = [];
    let menuImageData2 = [];
    let menuImageData3 = [];
    let imagepath1Data = [];
    let contentfileData = [];
    if (row.menu_image_path !== null && row.menu_image_path !== undefined) {
      menuImageData.push({
        uid: "-1",
        name: row.menu_image_path,
        status: "done",
        url: row.menu_image_path,
      });
    }

    setMenuFileList(menuImageData);
    setMenuImageUrl(row.menu_image_path);

    if (row.menu_image_path2 !== null && row.menu_image_path2 !== undefined) {
      menuImageData2.push({
        uid: "-1",
        name: row.menu_image_path2,
        status: "done",
        url: row.menu_image_path2,
      });
    }

    setMenuFileList2(menuImageData2);
    setMenuImageUrl2(row.menu_image_path2);

    if (row.menu_image_path3 !== null && row.menu_image_path3 !== undefined) {
      menuImageData3.push({
        uid: "-1",
        name: row.menu_image_path3,
        status: "done",
        url: row.menu_image_path3,
      });
    }

    setMenuFileList3(menuImageData3);
    setMenuImageUrl3(row.menu_image_path3);

    let contentData_ = {};
    get(FETCH_URL + row.menu_id).then((data) => {
      if (data[DATA_FETCH]) {
        console.log("data[DATA_FETCH]");
        console.log(data[DATA_FETCH]);
        contentData_ = data[DATA_FETCH][0];
        setDataContent(data[DATA_FETCH]);
      }
      if (contentData_ !== undefined || contentData_ != null) {
        setContentTH(contentData_.description_th);
        setContentEN(contentData_.description_en);
        setContent2TH(contentData_.description2_th);
        setContent2EN(contentData_.description2_en);
        setFooter2EN(contentData_.footer2_en);
        setFooter2TH(contentData_.footer2_th);
        setFooterTH(contentData_.footer1_th);
        setFooterEN(contentData_.footer1_en);
        if (
          contentData_.start_date !== undefined ||
          contentData_.start_date != null
        ) {
          setStartDate(contentData_.start_date);
        }
        if (
          contentData_.end_date !== undefined ||
          contentData_.end_date != null
        ) {
          setEndDate(contentData_.end_date);
        }
      }
      console.log("YYYYYYYYYYYYYYYY");
      setDataContentSingle({
        menu_name_en: row.menu_name_en,
        menu_name_th: row.menu_name_th,
        menu_description_th: row.menu_description_th,
        menu_description_en: row.menu_description_en,
        ...contentData_,
      });
      console.log("ZZZZZZZZZZZZZ");
      setMenudescTH(row.menu_description_th);
      setMenudescEN(row.menu_description_en);
      if (contentData_ !== undefined) {
        if (
          contentData_.image_path1 !== null &&
          contentData_.image_path1 !== undefined
        ) {
          imagepath1Data.push({
            uid: "-1",
            name: "image.png",
            status: "done",
            url: contentData_.image_path1,
          });
          setFileList(imagepath1Data);
          setImageUrl(contentData_.image_path1);
        }
        if (
          contentData_.file_path !== null &&
          contentData_.file_path !== undefined
        ) {
          contentfileData.push({
            uid: "-1",
            name: contentData_.file_path,
            status: "done",
            url: contentData_.file_path,
          });
          setContentFile(contentfileData);
          setContentFileUrl(contentData_.file_path);
        }
      }
      if(row.create_by == "CONTENTFILE"){
        if(!contentlistFile.includes(row.menu_id)){
          contentlistFile.push(row.menu_id);
        }
        if(!menuid.includes(row.menu_id)){
          menuid.push(row.menu_id);
        }
       
      }
      //console.log(menuImageUrl);
      //console.log("xx", regex.test(row.menu_description_th));
      setTimeout(() => {
        setType("edit");
        if (row.menu_id === 260) {
          setNEWPRO_TYPE("N");
          setVisibaleEditNewPro(true);
        } else if (row.menu_id === 261) {
          setNEWPRO_TYPE("P");
          setVisibaleEditNewPro(true);
        } else if (row.menu_name_th === "Image Popup" || row.menu_name_th === "Image Popup 2") {
          setVisibalePopup(true);
          // } else if (
          //   row.menu_id > 292 &&
          //   row.menu_parent_id !== 3 &&
          //   row.menu_parent_id !== 11 &&
          //   row.menu_parent_id !== 13 &&
          //   row.menu_parent_id !== 16 &&
          //   row.menu_parent_id !== 18 &&
          //   row.menu_parent_id !== 25
          // ) {
          //   setVisibale(true);
          // } else if (
          //   row.menu_id > 292 &&
          //   row.menu_parent_id === 11 &&
          //   row.menu_parent_id === 13 &&
          //   row.menu_parent_id === 16 &&
          //   row.menu_parent_id === 18 &&
          //   row.menu_parent_id === 25
          // ) {
          //   setVisibaleProduct(true);
        } else if (menuparent_product_fix.includes(row.menu_parent_id)) {
          setVisibaleProduct(true);
        } else {
          setVisibaleEdit(true);
        }
        form.setFieldsValue({
          menu_name_en: row.menu_name_en,
          menu_name_th: row.menu_name_th,
          menu_description_th: row.menu_description_th,
          menu_description_en: row.menu_description_en,
          ...contentData_,
        });
      }, 500);
    });
    setUpdateId(row);
    console.log("ENDDDDDDDDDDDD");
  };
  const handleSaveFile = (file) => {
    setImageUrl("");
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
        setImageUrl(result.file_path);
        setConfirmLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const onChangeImage = ({ file }) => {
    console.log(file);
    if (file.status === c.status.removed) {
      setFileList([]);
      setImageUrl("");
    }
    // setFileImageList(newFileList);
  };
  const handleSaveMenuFile1 = (file) => {
    setMenuImageUrl("");
    setConfirmLoading(true);
    postfile("files/uploadimage", file).then(
      (result) => {
        getBase64(file, (imageUrl) => {
          setMenuFileList([
            {
              uid: "-1",
              name: imageUrl,
              status: "done",
              url: imageUrl,
            },
          ]);
        });
        setMenuImageUrl(result.file_path);
        setConfirmLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleSaveMenuFile2 = (file) => {
    setMenuImageUrl2("");
    setConfirmLoading(true);
    postfile("files/uploadimage", file).then(
      (result) => {
        getBase64(file, (imageUrl) => {
          setMenuFileList2([
            {
              uid: "-1",
              name: imageUrl,
              status: "done",
              url: imageUrl,
            },
          ]);
        });
        setMenuImageUrl2(result.file_path);
        setConfirmLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleSaveMenuFile3 = (file) => {
    setMenuImageUrl3("");
    setConfirmLoading(true);
    postfile("files/uploadimage", file).then(
      (result) => {
        getBase64(file, (imageUrl) => {
          setMenuFileList3([
            {
              uid: "-1",
              name: imageUrl,
              status: "done",
              url: imageUrl,
            },
          ]);
        });
        setMenuImageUrl3(result.file_path);
        setConfirmLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const onChangeMenuImage = ({ file }) => {
    console.log(file);
    if (file.status === c.status.removed) {
      setMenuFileList([]);
      setMenuImageUrl("");
    }
  };
  const onChangeMenuImage2 = ({ file }) => {
    console.log(file);
    if (file.status === c.status.removed) {
      setMenuFileList2([]);
      setMenuImageUrl2("");
    }
  };
  const onChangeMenuImage3 = ({ file }) => {
    console.log(file);
    if (file.status === c.status.removed) {
      setMenuFileList3([]);
      setMenuImageUrl3("");
    }
  };

  const handleSaveFilePDF = (file) => {
    setContentFileUrl("");
    setConfirmLoading(true);
    postfile("files/uploadfile", file).then(
      (result) => {
        getBase64(file, (Url) => {
          setContentFile([
            {
              uid: "-1",
              name: result.file_path,
              status: "done",
              url: Url,
            },
          ]);
        });
        setContentFileUrl(result.file_path);
        setContentFileName(result.file_name);
        setConfirmLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const onChangeFile = (file) => {
    if (file.status === c.status.removed) {
      setContentFile([]);
      setContentFileUrl("");
      setContentFileName("");
    }
  };
  const handleSaveVideo = (file) => {
    setContentFileUrl("");
    setConfirmLoading(true);
    postfile("files/uploadvideo", file).then(
      (result) => {
        getBase64(file, (Url) => {
          setContentFile([
            {
              uid: "-1",
              name: result.file_path,
              status: "done",
              url: Url,
            },
          ]);
        });
        setContentFileUrl(result.file_path);
        setContentFileName(result.file_name);
        setConfirmLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const onChangeVideo = (file) => {
    if (file.status === c.status.removed) {
      setContentFile([]);
      setContentFileUrl("");
    }
  };

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const callbackDataContent = (data) => {
    dataConentSave.push(data);
    console.log(dataConentSave);
  };
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
  const generateData = (data, userGroup) => {
    var dataStep = [];
    var auth = {};
    auth = checkUserGroup(userGroup);
    setDataPermission(auth);
    setUserAuth(auth);

    const doProcess = (data) => {
      dataStep.push(0);
      let m = getCurrentMenu();
      return data.map((row, index) => {
        let {
          menu_id,
          menu_name_th,
          nodes,
          menu_image_path,
          pattern_type,
          create_by,
          menu_name_en,
          create_date,
          update_date,
          update_by,
          status,
          menu_review_id,
          menu_parent_id,
        } = row;
        dataStep[dataStep.length - 1] = index;
        if (
          row.menu_parent_id === 3 ||
          row.menu_id === 1 ||
          row.menu_id === 2 ||
          row.menu_id === 4 ||
          row.menu_id === 5 ||
          row.menu_id === 6 ||
          row.menu_id === 7 ||
          row.menu_id === 8 ||
          (getCurrentMenu() === 2 && row.create_by.indexOf("CONTENT") < 0)
        ) {
          return {
            title: (
              <Row
                style={{
                  backgroundColor: "#f8faff",
                  textCoolor: "#7c9eb2",
                  padding: 4,
                  border: "1px solid #dae2e]a",
                }}
              >
                <Col sm={6} style={{ cursor: "" }}>
                  <div className="pl-0">{menu_name_th}</div>
                </Col>
                <Col sm={6}>
                  <div style={{ float: "right" }}>
                    <ButtonGroup>
                      <Button
                        className="ant-btn-success"
                        size="sm"
                        disabled={auth.modify === "N"}
                        onClick={() =>
                          menu_parent_id === 3
                            ? addNodeProduct(menu_id)
                            : addNode(menu_id)
                        }
                        icon={<PlusCircleOutlined />}
                      ></Button>
                      <Button
                        className="ant-btn-success"
                        size="sm"
                        disabled={menu_review_id === 0 || auth.approve === "N"}
                        onClick={() => approveConfirm(row)}
                        icon={<CheckCircleOutlined />}
                      ></Button>
                      <Button
                        className="ant-btn-primary"
                        size="sm"
                        disabled={auth.modify === "N"}
                        onClick={() => editMenu(row)}
                        icon={<DiffOutlined />}
                      ></Button>
                      <Button
                        className="ant-btn-danger"
                        size="sm"
                        disabled={row.create_by == "SYSTEM" || auth.modify === "N"}
                        onClick={() => deleteMenu(menu_id)}
                        icon={<DeleteOutlined />}
                      ></Button>
                    </ButtonGroup>
                  </div>
                </Col>
              </Row>
            ),
            key: menu_id + Math.random(),
            children: nodes ? doProcess(nodes) : [],
            menu_id: menu_id,
            menu_name_th: menu_name_th,
            menu_name_en: menu_name_en,
            menu_image_path: menu_image_path,
            pattern_type: pattern_type,
            status: status,
            create_by: create_by,
            create_date: create_date,
            update_by: update_by,
            update_date: update_date,
            sqmax: index,
          };
        } else {
          return {
            title: (
              <Row
                style={{
                  backgroundColor: "#f8faff",
                  textCoolor: "#7c9eb2",
                  padding: 4,
                  border: "1px solid #dae2e]a",
                }}
              >
                <Col sm={6} style={{ cursor: "" }}>
                  <div className="pl-0">{menu_name_th}</div>
                </Col>
                <Col sm={6}>
                  <div style={{ float: "right" }}>
                    <ButtonGroup>
                      <Button
                        className="ant-btn-success"
                        size="sm"
                        disabled={menu_review_id === 0 || auth.approve === "N"}
                        onClick={() => approveConfirm(row)}
                        icon={<CheckCircleOutlined />}
                      ></Button>
                      <Button
                        className="ant-btn-primary"
                        size="sm"
                        disabled={auth.modify === "N"}
                        onClick={() => editMenu(row)}
                        icon={<DiffOutlined />}
                      ></Button>
                      <Button
                        className="ant-btn-danger"
                        size="sm"
                        disabled={(row.create_by === "SYSTEM") || auth.modify === "N"}
                        onClick={() => deleteMenu(menu_id)}
                        icon={<DeleteOutlined />}
                      ></Button>
                    </ButtonGroup>
                  </div>
                </Col>
              </Row>
            ),
            key: menu_id + Math.random(),
            children: nodes ? doProcess(nodes) : [],
            menu_id: menu_id,
            menu_name_th: menu_name_th,
            menu_name_en: menu_name_en,
            menu_image_path: menu_image_path,
            pattern_type: pattern_type,
            status: status,
            create_by: create_by,
            create_date: create_date,
            update_by: update_by,
            update_date: update_date,
            sqmax: index,
          };
        }
      });
    };
    const d = doProcess(data);
    return d;
  };
  const searchMenu = (m) => {
    let tokenData = JwtDecode(localStorage.getItem("token"));
    setLoading(true);
    post("menu/searchMenu", { menu_id: getCurrentMenu() }).then(
      (result) => {
        if (result.menus) {
          if (result.menus.length > 0) {
            get("/permission/getAdminUserData/" + tokenData.ID).then(
              (result_user) => {
                console.log(result_user);
                get("/permission/getGroupById/" + result_user.groupID).then(
                  (result_) => {
                    setGdata([]);
                    setTimeout(() => {
                      setGdata(generateData(result.menus, result_));
                      setLoading(false);
                    }, 500);
                  }
                );
              },
              (err) => {}
            );
          }
        } else {
          notification.error({
            message: "เกิดข้อผิดพลาด",
            description: "ไม่สามารถดึงข้อมูลได้",
            placement: "bottomRight",
          });
          setLoading(false);
        }
      },
      (err) => {}
    );
  };

  const checkUserGroup = (userGroupData) => {
    let { view, modify, approve } = {};
    if (path.length === 20) {
      view = userGroupData["view_" + path.substr(14)];
      modify = userGroupData["modify_" + path.substr(14)];
      approve = userGroupData["approve_" + path.substr(14)];
    } else {
      view = userGroupData["view_" + path.substr(7)];
      modify = userGroupData["modify_" + path.substr(7)];
      approve = userGroupData["approve_" + path.substr(7)];
    }

    return { view, modify, approve };
  };

  const onDragEnter = (info) => {};

  const onDrop = (info) => {
    //console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    setGdata(data);
  };

  const handleCancel = (e) => {
    setUpdateId({});
    setVisibale(false);
    setType("add");
  };
  const handleProductCancel = (e) => {
    setVisibaleProduct(false);
    setType("add");
  };

  const handleEditCancel = (e) => {
    setUpdateId({});
    setDataContent([]);
    console.log("handleEditCancel Fired!");
    setVisibaleEdit(false);
    setType("add");
  };

  const handleNewProCancel = (e) => {
    setVisibaleEditNewPro(false);
    setType("add");
  };

  const handlePopupCancel = (e) => {
    setVisibalePopup(false);
  };

  const handleApproveCancel = (e) => {
    setVisibaleApprove(false);
    setType("add");
  };

  const save = () => {
    Modal.confirm({
      title: "ท่านต้องการบันทึกข้อมูลหรือไม่?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      onOk() {
        const data = getData(gData);
        console.log(data);
        // post('menu/saveMenu', data).then((result) => {
        //     notification.success({
        //         message: 'บันทึกข้อมูลเสร็จสิ้น',
        //         description:
        //             'บันทึกข้อมูล Menu เสร็จสิ้น',
        //         onClick: () => {
        //             //console.log('Notification Clicked!');
        //         },
        //         placement: 'bottomRight'
        //     });
        //     searchMenu(getCurrentMenu());
        // })
      },
      onCancel() {
        //console.log('Cancel');
      },
    });
  };

  function argStr(arg) {
    return arg + " ";
  }

  useEffect(() => {
    form.resetFields();
    let m = getCurrentMenu();
    console.log(m);
    setMenu(m);
    searchMenu(m);
  }, []);

  useEffect(() => {
    setDataContent([]);
    setUpdateId({});
    SetLayoutType("0");
    setContentTH("");
    setContentEN("");
    setContent2TH("");
    setContent2EN("");
    setFooterTH("");
    setFooterEN("");
    setFooter2TH("");
    setFooter2EN("");
    setMenudescTH("");
    setMenudescEN("");
    setContentFile([]);
    setContentFileUrl([]);
    setFileList([]);
    setMenuFileList([]);
    setMenuFileList2([]);
    setMenuFileList3([]);
    setMenuImageUrl("");
    setMenuImageUrl2("");
    setMenuImageUrl3("");
    form.resetFields();
  }, [visible]);

  const getSorter = (sorter, sort, sort_type) => {
    sort =
      "u." +
      sorter.field.substring(0, 1).toUpperCase() +
      sorter.field.substr(1);
    sort =
      sorter.field === "status"
        ? "u.Activated"
        : sorter.field === "groupName"
        ? "GroupName"
        : sort;
    sort_type = sorter.order === "descend" ? "desc" : "asc";
    return { sort, sort_type };
  };

  const STATIC_COLUMNS = [
    // {
    //   title: "ContentId",
    //   dataIndex: "menu_content_id",
    //   sorter: true,
    //   width: "10%",
    // },
    {
      title: "หัวข้อ",
      dataIndex: "topic_th",
      sorter: true,
      width: "40%",
    },
    {
      title: "เนื้อหา",
      dataIndex: "description_title_th",
      sorter: true,
      width: "90%",
    },
  ];

  const STATIC_COLUMNS_NEWPRO = [
    {
      title: "Topic",
      dataIndex: "topic_th",
      sorter: true,
      width: "30%",
    },
    {
      title: "รายละเอียดภาษาไทย",
      dataIndex: "description_title_th",
      sorter: true,
      width: "70%",
    },
  ];
  const PAGINATION_FIELD = {
    fullName: "",
    username: "",
  };
  const UPDATE_STATUS_URL = "";
  const INIT_ORDER = "";
  const FETCH_URL = "menu/getMenuContent?menu_id=";
  const DATA_FETCH = "contents";
  const DATA_BY_ID_URL = "menu/getMenuContent?menu_id=";
  const DELETE_URL = "menu/deleteContent";
  const DELETE_FIELD = "menu_content_id";
  const SEND_DELETED_FILED = "menu_content_ids";

  const FETCH_URL_NEWPRO = "newpro/getNewsContent?newspro_type=";
  const DATA_FETCH_NEWPRO = "newspros";
  const DELETE_URL_NEWPRO = "newpro/deleteNewPros";
  const DELETE_FIELD_NEWPRO = "news_pro_id";
  const SEND_DELETED_FILED_NEWPRO = "news_pro_ids";
  function onChangeDate(date, dateString) {
    setStartDate(dateString);
  }

  function onChangeEndDate(date, dateString) {
    setEndDate(dateString);
  }
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col sm="8">
                    <h3>Edit Menu</h3>
                  </Col>
                  <Col sm="4" style={{ textAlign: "right" }}>
                    {/* <Button
                      className="ant-btn-primary"
                      size="sm"
                      disabled={userAuth.modify === "N"}
                      icon={<SaveOutlined />}
                      onClick={() => save()}
                    >
                      Save
                    </Button>
                    <Button
                      className="bg-success text-white"
                      icon={<PlusCircleOutlined />}
                      disabled={userAuth.modify === "N"}
                      onClick={() => addNode(getCurrentMenu(), 0)}
                    >
                      Add
                    </Button> */}
                  </Col>
                </Row>
              </CardHeader>
              <ListGroup>
                <div style={{ padding: "20px", minHeight: "400px" }}>
                  {loading ? (
                    <Skeleton active />
                  ) : gData.length ? (
                    <Tree
                      className="draggable-tree"
                      showLine={true}
                      showIcon={false}
                      defaultExpandAll={true}
                      blockNode
                      onDragEnter={onDragEnter}
                      onDrop={onDrop}
                      treeData={gData}
                    />
                  ) : (
                    <p>No Data found</p>
                  )}

                  <Modal
                    title={type === "add" ? "Add Menu" : "Edit Menu"}
                    visible={visible}
                    onOk={handleOk}
                    width="90%"
                    style={{ maxWidth: "1024px" }}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    maskClosable={false}
                    footer={
                      type === "edit"
                        ? [
                            // <Button
                            //   className="ant-btn-warning-primary"
                            //   onClick={editContent}
                            // >
                            //   edit content
                            // </Button>,
                            <Button
                              type="primary"
                              loading={confirmLoading}
                              onClick={handleOk}
                            >
                              Save
                            </Button>,
                          ]
                        : [
                            <Button
                              type="primary"
                              loading={confirmLoading}
                              onClick={handleOk}
                            >
                              Save
                            </Button>,
                          ]
                    }
                  >
                    <Divider>Menu</Divider>
                    <Form form={form} layout="vertical" name="form_in_modal">
                    
                      <FormGroup>
                        <label
                          className="form-control-label required"
                          htmlFor="input-username"
                        >
                          ชื่อ​เมนู ภาษาไทย
                        </label>
                        <Form.Item
                          name="menu_name_th"
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกชื่อเมนูภาษาไทย!",
                            },
                          ]}
                        >
                          <Input
                            className="form-control-alternative"
                            id="menu_name_th"
                            placeholder="กรุณากรอกชื่อเมนูภาษาไทย"
                            type="text"
                          />
                        </Form.Item>
                      </FormGroup>
                      <FormGroup>
                        <label
                          className="form-control-label required"
                          htmlFor="input-username"
                        >
                          ชื่อ​เมนู ภาษาอังกฤษ
                        </label>
                        <Form.Item
                          name="menu_name_en"
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกชื่อเมนูภาษาอังกฤษ!",
                            },
                          ]}
                        >
                          <Input
                            id="menu_name_en"
                            className="form-control-alternative"
                            placeholder="กรุณากรอกชื่อเมนูภาษาอังกฤษ"
                            type="text"
                            // disabled={confirmLoading}
                          />
                        </Form.Item>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">
                          รายละเอียดเมนูภาษาไทย
                        </label>
                        <Form.Item
                          name="menu_description_th"
                          rules={[
                            {
                              required: false,
                              message: "กรุณากรอกข้อมูลรายละเอียดเมนูภาษาไทย!",
                            },
                          ]}
                        >
                          <Input
                            type="textarea"
                            id="menu_description_th"
                            className="form-control-alternative"
                            placeholder="รายละเอียดเมนูภาษาไทย"
                            rows={5}
                          />
                        </Form.Item>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">
                          รายละเอียดเมนูภาษาอังกฤษ
                        </label>
                        <Form.Item
                          name="menu_description_en"
                          rules={[
                            {
                              required: false,
                              message:
                                "กรุณากรอกข้อมูลรายละเอียดเมนูภาษาอังกฤษ!",
                            },
                          ]}
                        >
                          <Input
                            type="textarea"
                            id="menu_description_en"
                            className="form-control-alternative"
                            placeholder="รายละเอียดเมนูภาษาอังกฤษ"
                            rows={5}
                          />
                        </Form.Item>
                      </FormGroup>
                      {getCurrentMenu() === 2 && (
                          <FormGroup>
                          <Row>
                            <Col sm={4} md={4}>
                            <label
                              className="form-control-label required"
                              htmlFor="input-layouttype"
                            >
                              รูปแบบเนื้อหา
                            </label>
                            <Input
                                        type="select"
                                        className="form-control-alternative"
                                        disabled={confirmLoading}
                                        defaultValue={contentType}
                                        onChange={onContentType}
                                        >
                                    <option value="">เมนู</option>
                                    <option value="CONTENTHEAD">ข้อความและรูปภาพ(หัวข้อ)</option>
                                    <option value="CONTENTDETAIL">ข้อความและรูปภาพ</option>
                                    <option value="CONTENTFILE">ไฟล์ PDF ดาวน์โหลด</option>
                        </Input>
                              </Col>
                              </Row>
                           
                          </FormGroup>
                        )}
                      
                      {/* <Row>
                        <Col sm={12} md={3}>
                          <label>รูปภาพประกอบที่ 1</label>
                          <Upload
                            accept=".png"
                            //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            id="menu_image_path"
                            listType="picture-card"
                            fileList={menuFileList}
                            onChange={onChangeMenuImage}
                            beforeUpload={handleSaveMenuFile1}
                            onPreview={onPreview}
                          >
                            {menuFileList.length < 1 && "+ Upload"}
                          </Upload>
                        </Col>
                      </Row> */}
                    </Form>
                    <Divider>Content</Divider>

                    <Form form={form} layout="vertical" name="form_in_modal">
                      <Row>
                        <Col sm={12} md={12}>
                        {(contentType === "" || contentType === "CONTENTHEAD"|| contentType === "CONTENTDETAIL") && (<FormGroup>
                            <label className="form-control-label">
                              เนื้อหาภาษาไทย
                            </label>
                            {/* <Form.Item
                              name="description_th"
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณากรอกเนื้อหาภาษาไทย!",
                                },
                              ]}
                            >
                              <Input
                                className="form-control-alternative"
                                id="description_th"
                                placeholder="กรุณากรอกเนื้อหาภาษาไทย"
                                type="text"
                              />
                            </Form.Item> */}
                            <JoditEditor
                              ref={editor}
                              value={contentTH}
                              config={config}
                              tabIndex={1} // tabIndex of textarea
                              onBlur={(newContent) => setContentTH(newContent)} // newContent
                              onChange={(newContent) => {}}
                            />
                          </FormGroup>)}
                          
                        </Col>
                        <Col sm={12} md={12}>
                        {(contentType === "" || contentType === "CONTENTHEAD"|| contentType === "CONTENTDETAIL") && (<FormGroup>
                            <label className="form-control-label">
                              เนื้อหาภาษาอังกฤษ
                            </label>
                            {/* <Form.Item
                              name="description_en"
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณากรอกเนื้อหาภาษาอังกฤษ!",
                                },
                              ]}
                            >
                              <Input
                                className="form-control-alternative"
                                id="description_en"
                                placeholder="กรุณากรอกเนื้อหาภาษาอังกฤษ"
                                type="text"
                              />
                            </Form.Item> */}
                            <JoditEditor
                              ref={editor}
                              value={contentEN}
                              config={config}
                              tabIndex={1} // tabIndex of textarea
                              onBlur={(newContent) => setContentEN(newContent)} // preferred to use only this option to update the content for performance reasons
                              onChange={(newContent) => {}}
                              
                            />
                          </FormGroup>)}
                          
                        </Col>
                        <Col sm={12} md={12}>
                        {(contentType === "CONTENTHEAD"|| contentType === "CONTENTDETAIL") && (<FormGroup>
                            <label className="form-control-label">
                              เนื้อหาภาษาไทย 2
                            </label>
                            {}
                            <JoditEditor
                              ref={editor}
                              value={content2TH}
                              config={config}
                              tabIndex={1} // tabIndex of textarea
                              onBlur={(newContent) => setContent2TH(newContent)} // preferred to use only this option to update the content for performance reasons
                              onChange={(newContent) => {}}
                            />
                          </FormGroup>)}
                          
                        </Col>
                        <Col sm={12} md={12}>
                        {(contentType === "CONTENTHEAD"|| contentType === "CONTENTDETAIL") && (<FormGroup>
                            <label className="form-control-label">
                              เนื้อหาภาษาอังกฤษ 2
                            </label>
                            {}
                            <JoditEditor
                              ref={editor}
                              value={content2EN}
                              config={config}
                              tabIndex={1} // tabIndex of textarea
                              onBlur={(newContent) => setContent2EN(newContent)} // preferred to use only this option to update the content for performance reasons
                              onChange={(newContent) => {}}
                            />
                          </FormGroup>)}
                          
                        </Col>
                        <Col sm={12} md={6}>
                        {(contentType === "CONTENTFILE") && (<FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-username"
                                    >
                                      ชื่อไฟล์ภาษาไทย
                                    </label>
                                    <Form.Item
                                      name="topic_th"
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "กรุณากรอกข้อมูล ชื่อไฟล์ภาษาไทย!",
                                        },
                                      ]}
                                    >
                                      <Input
                                        className="form-control-alternative"
                                        id="topic_th"
                                        placeholder="ชื่อไฟล์ภาษาไทย"
                                        type="text"
                                        onBlur={(newContent) => setTopicTH(newContent.value)}
                                      />
                                    </Form.Item>
                                  </FormGroup>)}
                                </Col>
                                <Col sm={12} md={6}>
                        {(contentType === "CONTENTFILE") && (<FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-username"
                                    >
                                      ชื่อไฟล์ภาษาอังกฤษ
                                    </label>
                                    <Form.Item
                                      name="topic_en"
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "กรุณากรอกข้อมูล ชื่อไฟล์ภาษาอังกฤษ!",
                                        },
                                      ]}
                                    >
                                      <Input
                                        className="form-control-alternative"
                                        id="topic_en"
                                        placeholder="ชื่อไฟล์ภาษาอังกฤษ"
                                        type="text"
                                        onBlur={(newContent) => setTopicEN(newContent.value)}
                                      />
                                    </Form.Item>
                                  </FormGroup>)}
                                </Col>
                                <Col sm={12} md={6}>
                        {(contentType === "CONTENTFILE") && (<FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-username"
                                    >
                                      รายละเอียดไฟล์ภาษาไทย
                                    </label>
                                    <Form.Item
                                      name="contentTH"
                                      rules={[
                                        {
                                          required: false,
                                          message:
                                            "กรุณากรอกข้อมูล รายละเอียดไฟล์ภาษาไทย!",
                                        },
                                      ]}
                                    >
                                      <Input
                                        className="form-control-alternative"
                                        id="contentTH"
                                        placeholder="รายละเอียดไฟล์ภาษาไทย"
                                        type="text"
                                        onBlur={(newContent) => setContentTH(newContent.value)}
                                      />
                                    </Form.Item>
                                  </FormGroup>)}
                                </Col>
                                <Col sm={12} md={6}>
                        {(contentType === "CONTENTFILE") && (<FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-username"
                                    >
                                      รายละเอียดไฟล์ภาษาอังกฤษ
                                    </label>
                                    <Form.Item
                                      name="contentEN"
                                      rules={[
                                        {
                                          required: false,
                                          message:
                                            "กรุณากรอกข้อมูล รายละเอียดไฟล์ภาษาอังกฤษ!",
                                        },
                                      ]}
                                    >
                                      <Input
                                        className="form-control-alternative"
                                        id="contentEN"
                                        placeholder="รายละเอียดไฟล์ภาษาอังกฤษ"
                                        type="text"
                                        onBlur={(newContent) => setContentEN(newContent.value)}
                                      />
                                    </Form.Item>
                                  </FormGroup>)}
                                </Col>
                                <Col sm={12} md={3}>
                                {(contentType === "CONTENTFILE") && (<FormGroup><label>รูปภาพประกอบ</label>
                        <div class="ant-upload-list-picture-card-container">
                          <div class="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture-card">
                            <div class="ant-upload-list-item-info">
                              <span class="ant-upload-span">
                                <a class="ant-upload-list-item-thumbnail" href="https://asv-ptgenergy-backoffice-api-devuat.azurewebsites.net/images/file-down.png" target="_blank" rel="noopener noreferrer">
                                  <img src="https://asv-ptgenergy-backoffice-api-devuat.azurewebsites.net/images/file-down.png" alt="image.png" class="ant-upload-list-item-image"/>
                                  </a></span></div><span class="ant-upload-list-item-actions"><a href="https://asv-ptgenergy-backoffice-api-devuat.azurewebsites.net/images/file-down.png" target="_blank" rel="noopener noreferrer" title="Preview file"></a></span></div></div></FormGroup>)}
                      </Col>
                      </Row>
                    </Form>
                  </Modal>

                  <Modal
                    title={type === "add" ? "Add Menu" : "Edit Menu"}
                    visible={visibleProduct}
                    onOk={handleAddProduct}
                    width="90%"
                    style={{ maxWidth: "1024px" }}
                    confirmLoading={confirmLoading}
                    onCancel={handleProductCancel}
                    maskClosable={false}
                    footer={
                      type === "edit"
                        ? [
                            <Button
                              type="primary"
                              loading={confirmLoading}
                              onClick={handleAddProduct}
                            >
                              Save
                            </Button>,
                          ]
                        : [
                            <Button
                              type="primary"
                              loading={confirmLoading}
                              onClick={handleAddProduct}
                            >
                              Save
                            </Button>,
                          ]
                    }
                  >
                    <Divider>Menu</Divider>
                    <Form
                      form={form}
                      layout="vertical"
                      name="form_in_modal_Product"
                    >
                      <FormGroup>
                        <label
                          className="form-control-label required"
                          htmlFor="input-username"
                        >
                          ชื่อ​เมนู ภาษาไทย
                        </label>
                        <Form.Item
                          name="menu_name_th"
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกชื่อเมนูภาษาไทย!",
                            },
                          ]}
                        >
                          <Input
                            className="form-control-alternative"
                            id="menu_name_th"
                            placeholder="กรุณากรอกชื่อเมนูภาษาไทย"
                            type="text"
                          />
                        </Form.Item>
                      </FormGroup>
                      <FormGroup>
                        <label
                          className="form-control-label required"
                          htmlFor="input-username"
                        >
                          ชื่อ​เมนู ภาษาอังกฤษ
                        </label>
                        <Form.Item
                          name="menu_name_en"
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกชื่อเมนูภาษาอังกฤษ!",
                            },
                          ]}
                        >
                          <Input
                            id="menu_name_en"
                            className="form-control-alternative"
                            placeholder="กรุณากรอกชื่อเมนูภาษาอังกฤษ"
                            type="text"
                            // disabled={confirmLoading}
                          />
                        </Form.Item>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">
                          รายละเอียดเมนูภาษาไทย
                        </label>
                        <Form.Item
                          name="menu_description_th"
                          rules={[
                            {
                              required: false,
                              message: "กรุณากรอกข้อมูลรายละเอียดเมนูภาษาไทย!",
                            },
                          ]}
                        >
                          <Input
                            type="textarea"
                            id="menu_description_th"
                            className="form-control-alternative"
                            placeholder="รายละเอียดเมนูภาษาไทย"
                            rows={5}
                          />
                        </Form.Item>
                      </FormGroup>
                      <FormGroup>
                        <label className="form-control-label">
                          รายละเอียดเมนูภาษาอังกฤษ
                        </label>
                        <Form.Item
                          name="menu_description_en"
                          rules={[
                            {
                              required: false,
                              message:
                                "กรุณากรอกข้อมูลรายละเอียดเมนูภาษาอังกฤษ!",
                            },
                          ]}
                        >
                          <Input
                            type="textarea"
                            id="menu_description_en"
                            className="form-control-alternative"
                            placeholder="รายละเอียดเมนูภาษาอังกฤษ"
                            rows={5}
                          />
                        </Form.Item>
                      </FormGroup>

                      <Row>
                        <Col sm={12} md={3}>
                          <label>รูปภาพ</label>
                          <Upload
                            accept=".png"
                            //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            id="menu_image_path"
                            listType="picture-card"
                            fileList={menuFileList}
                            onChange={onChangeMenuImage}
                            beforeUpload={handleSaveMenuFile1}
                            onPreview={onPreview}
                          >
                            {menuFileList.length < 1 && "+ Upload"}
                          </Upload>
                        </Col>
                        <Col sm={12} md={3}>
                          <label>รูปภาพ CoverPage</label>
                          <Upload
                            accept=".png"
                            //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            id="menu_image_path2"
                            listType="picture-card"
                            fileList={menuFileList2}
                            onChange={onChangeMenuImage2}
                            beforeUpload={handleSaveMenuFile2}
                            onPreview={onPreview}
                          >
                            {menuFileList2.length < 1 && "+ Upload"}
                          </Upload>
                        </Col>
                        <Divider>Content</Divider>
                        <Col sm={12} md={12}>
                          <FormGroup>
                            <label className="form-control-label">
                              รายละเอียดเนื้อหาภาษาไทย
                            </label>
                            <Form.Item
                              name="description_th"
                              rules={[
                                {
                                  required: false,
                                  message:
                                    "กรุณากรอกข้อมูลรายละเอียดเนื้อหาภาษาไทย!",
                                },
                              ]}
                            >
                              <Input
                                type="textarea"
                                id="description_th"
                                className="form-control-alternative"
                                placeholder="รายละเอียดเนื้อหาภาษาไทย"
                                rows={5}
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                        <Col sm={12} md={12}>
                          <FormGroup>
                            <label className="form-control-label">
                              รายละเอียดเนื้อหาภาษาอังกฤษ
                            </label>
                            <Form.Item
                              name="description_en"
                              rules={[
                                {
                                  required: false,
                                  message:
                                    "กรุณากรอกข้อมูลรายละเอียดเนื้อหาภาษาอังกฤษ!",
                                },
                              ]}
                            >
                              <Input
                                type="textarea"
                                id="description_en"
                                className="form-control-alternative"
                                placeholder="รายละเอียดเนื้อหาภาษาอังกฤษ"
                                rows={5}
                              />
                            </Form.Item>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Col sm={12} md={3}>
                        <label>รูปภาพประกอบ</label>
                        <Upload
                          accept=".png"
                          id="image_path1"
                          listType="picture-card"
                          fileList={fileList}
                          onChange={onChangeImage}
                          onPreview={onPreview}
                          beforeUpload={handleSaveFile}
                        >
                          {fileList.length < 1 && "+ Upload"}
                        </Upload>
                      </Col>
                    </Form>
                  </Modal>

                  <Modal
                    title={type === "add" ? "Add Menu" : "Edit Menu"}
                    visible={visibleEdit}
                    width="90%"
                    style={{ maxWidth: "1024px" }}
                    confirmLoading={confirmLoading}
                    onCancel={handleEditCancel}
                    maskClosable={false}
                    destroyOnClose={true}
                    footer={
                      type === "edit"
                        ? [
                            <Button
                              className="ant-btn"
                              onClick={handleEditCancel}
                            >
                              Cancel
                            </Button>,
                            <Button
                              type="success"
                              disabled={
                                updateId.menu_review_id === 0 ||
                                datapermission.approve === "N"
                              }
                              onClick={approveConfirmOnModal}
                            >
                              Approve
                            </Button>,
                            <Button
                              type="primary"
                              loading={confirmLoading}
                              onClick={handleOk}
                            >
                              Save
                            </Button>,
                          ]
                        : [
                            <Button
                              className="ant-btn"
                              onClick={handleEditCancel}
                            >
                              Cancel
                            </Button>,
                            <Button
                              type="primary"
                              loading={confirmLoading}
                              onClick={handleOk}
                            >
                              Save
                            </Button>,
                          ]
                    }
                  >
                    <Divider>Menu</Divider>
                    <Form form={form} layout="vertical">
                      <FormGroup>
                        <label
                          className="form-control-label required"
                          htmlFor="input-username"
                        >
                          ชื่อ​เมนู ภาษาไทย
                        </label>
                        <Form.Item
                          name="menu_name_th"
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกชื่อเมนูภาษาไทย!",
                            },
                          ]}
                        >
                          <Input
                            className="form-control-alternative"
                            id="menu_name_th"
                            placeholder="กรุณากรอกชื่อเมนูภาษาไทย"
                            type="text"
                          />
                        </Form.Item>
                      </FormGroup>
                      <FormGroup>
                        <label
                          className="form-control-label required"
                          htmlFor="input-username"
                        >
                          ชื่อ​เมนู ภาษาอังกฤษ
                        </label>
                        <Form.Item
                          name="menu_name_en"
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกชื่อเมนูภาษาอังกฤษ!",
                            },
                          ]}
                        >
                          <Input
                            id="menu_name_en"
                            className="form-control-alternative"
                            placeholder="กรุณากรอกชื่อเมนูภาษาอังกฤษ"
                            type="text"
                            // disabled={confirmLoading}
                          />
                        </Form.Item>
                      </FormGroup>
                      {regex.test(updateId.menu_description_th) === false && (
                        <>
                          <FormGroup>
                            <label className="form-control-label">
                              รายละเอียดเมนูภาษาไทย
                            </label>
                            <Form.Item
                              name="menu_description_th"
                              rules={[
                                {
                                  required: false,
                                  message:
                                    "กรุณากรอกข้อมูลรายละเอียดเมนูภาษาไทย!",
                                },
                              ]}
                            >
                              <Input
                                type="textarea"
                                id="menu_description_th"
                                className="form-control-alternative"
                                placeholder="รายละเอียดเมนูภาษาไทย"
                                rows={5}
                              />
                            </Form.Item>
                          </FormGroup>
                          <FormGroup>
                            <label className="form-control-label">
                              รายละเอียดเมนูภาษาอังกฤษ
                            </label>
                            <Form.Item
                              name="menu_description_en"
                              rules={[
                                {
                                  required: false,
                                  message:
                                    "กรุณากรอกข้อมูลรายละเอียดเมนูภาษาอังกฤษ!",
                                },
                              ]}
                            >
                              <Input
                                type="textarea"
                                id="menu_description_en"
                                className="form-control-alternative"
                                placeholder="รายละเอียดเมนูภาษาอังกฤษ"
                                rows={5}
                              />
                            </Form.Item>
                          </FormGroup>
                        </>
                      )}
                      {regex.test(updateId.menu_description_th) === true && (
                        <>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              รายละเอียดเมนูภาษาไทย
                            </label>

                            <JoditEditor
                              ref={editor}
                              value={menudescTH}
                              config={config}
                              key={0}
                              tabIndex={1} // tabIndex of textarea
                              onBlur={(newContent) => setMenudescTH(newContent)} // preferred to use only this option to update the content for performance reasons
                              onChange={(newContent) => {}}
                            />
                          </FormGroup>

                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              รายละเอียดเมนูภาษาอังกฤษ
                            </label>

                            <JoditEditor
                              ref={editor}
                              value={menudescEN}
                              config={config}
                              tabIndex={1} // tabIndex of textarea
                              onBlur={(newContent) => setMenudescEN(newContent)} // preferred to use only this option to update the content for performance reasons
                              onChange={(newContent) => {}}
                            />
                          </FormGroup>
                        </>
                      )}
                      <Row>
                        {/* && updateId.controller_name !== "MenuPTG" && updateId.controller_name !== "MenuProducts" */}
                        {updateId.menu_image_path != null && (
                          <Col sm={12} md={3}>
                            <label>รูปภาพประกอบที่ 1</label>
                            <Upload
                              accept=".png"
                              //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                              id="menu_image_path"
                              listType="picture-card"
                              fileList={menuFileList}
                              onChange={onChangeMenuImage}
                              beforeUpload={handleSaveMenuFile1}
                              onPreview={onPreview}
                            >
                              {menuFileList.length < 1 && "+ Upload"}
                            </Upload>
                          </Col>
                        )}
                        {updateId.menu_image_path == null &&
                          updateId.controller_name == "MenuProducts" && (
                            <>
                              <Col sm={12} md={3}>
                                <label>รูปภาพประกอบที่ 1</label>
                                <Upload
                                  accept=".png"
                                  //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                  id="menu_image_path"
                                  listType="picture-card"
                                  fileList={menuFileList}
                                  onChange={onChangeMenuImage}
                                  beforeUpload={handleSaveMenuFile1}
                                  onPreview={onPreview}
                                >
                                  {menuFileList.length < 1 && "+ Upload"}
                                </Upload>
                              </Col>
                            </>
                          )}
                        {updateId.menu_image_path2 != null && (
                          <Col sm={12} md={3}>
                            <label>รูปภาพประกอบที่ 2</label>
                            <Upload
                              accept=".png"
                              //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                              id="menu_image_path2"
                              listType="picture-card"
                              fileList={menuFileList2}
                              onChange={onChangeMenuImage2}
                              beforeUpload={handleSaveMenuFile2}
                              onPreview={onPreview}
                            >
                              {menuFileList2.length < 1 && "+ Upload"}
                            </Upload>
                          </Col>
                        )}
                        {updateId.menu_image_path2 == null &&
                          updateId.controller_name === "MenuProducts" && (
                            <>
                              <Col sm={12} md={3}>
                                <label>รูปภาพประกอบที่ 2</label>
                                <Upload
                                  accept=".png"
                                  //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                  id="menu_image_path2"
                                  listType="picture-card"
                                  fileList={menuFileList2}
                                  onChange={onChangeMenuImage2}
                                  beforeUpload={handleSaveMenuFile2}
                                  onPreview={onPreview}
                                >
                                  {menuFileList2.length < 1 && "+ Upload"}
                                </Upload>
                              </Col>
                            </>
                          )}
                      </Row>
                    </Form>
                    <Divider>Content</Divider>
                    <Form form={form} layout="vertical">
                      {/* <Row>
                        {type !== "edit" &&
                          (dataContentSingle.menu_content_id === undefined ||
                            dataContentSingle.menu_content_id === null) && (
                            <Col sm={12} md={4}>
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  เลือกประเภท
                                </label>
                                <Form.Item
                                  name="content_type"
                                  rules={[
                                    {
                                      required: false,
                                      message: "",
                                    },
                                  ]}
                                >
                                  <Input
                                    type="select"
                                    className="form-control-alternative"
                                    disabled={confirmLoading}
                                    defaultValue={layoutType}
                                    onChange={onLayoutType}
                                  >
                                    <option value="0">กรุณาเลือก</option>
                                    {layouttype.map((item) => {
                                      return (
                                        <option value={item.id}>
                                          {item.name}
                                        </option>
                                      );
                                    })}
                                  </Input>
                                </Form.Item>
                              </FormGroup>
                            </Col>
                          )}
                      </Row> */}

                      {menuid.filter((x) => x === updateId.menu_id).length !==
                        1 && (
                        <>
                          <Row>
                            {dataContentSingle.topic_th != null && (
                              <>
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
                                          message:
                                            "กรุณากรอกข้อมูล Topic ภาษาไทย!",
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
                                          message:
                                            "กรุณากรอกข้อมูล Topic ภาษาอังกฤษ!",
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
                              </>
                            )}
                          </Row>
                          <Row>
                            {dataContentSingle.description_th != null &&
                              updateId.controller_name !== "MenuPTG" &&
                              menu_parent_list.filter(
                                (x) => x === updateId.menu_id
                              ).length !== 1 &&
                              textareafix.includes(updateId.menu_id) ===
                                false && (
                                <>
                                  <Col sm={12} md={12}>
                                    <FormGroup>
                                      <label className="form-control-label">
                                        เนื้อหาภาษาไทย
                                      </label>
                                      <JoditEditor
                                        ref={editor}
                                        value={contentTH}
                                        config={config}
                                        tabIndex={1} // tabIndex of textarea
                                        onBlur={(newContent) => {
                                          setContentTH(newContent);
                                        }} // preferred to use only this option to update the content for performance reasons
                                        onChange={(newContent) => {}}
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col sm={12} md={12}>
                                    <FormGroup>
                                      <label className="form-control-label">
                                        เนื้อหาภาษาอังกฤษ
                                      </label>
                                      <JoditEditor
                                        ref={editor}
                                        value={contentEN}
                                        config={config}
                                        tabIndex={3} // tabIndex of textarea
                                        onBlur={(newContent) =>
                                          setContentEN(newContent)
                                        } // preferred to use only this option to update the content for performance reasons
                                      />
                                    </FormGroup>
                                  </Col>
                                </>
                              )}
                            {textareafix.includes(updateId.menu_id) ===
                              true && (
                              <>
                                <Col sm={12} md={12}>
                                  <FormGroup>
                                    <label className="form-control-label">
                                      เนื้อหาภาษาไทย
                                    </label>
                                    <Form.Item
                                      name="description_th"
                                      rules={[
                                        {
                                          required: false,
                                          message:
                                            "กรุณากรอกข้อมูลเนื้อหาภาษาไทย!",
                                        },
                                      ]}
                                    >
                                      <Input
                                        type="textarea"
                                        id="description_th"
                                        className="form-control-alternative"
                                        placeholder="เนื้อหาภาษาไทย"
                                        rows={5}
                                      />
                                    </Form.Item>
                                  </FormGroup>
                                </Col>
                                <Col sm={12} md={12}>
                                  <FormGroup>
                                    <label className="form-control-label">
                                      เนื้อหาภาษาอังกฤษ
                                    </label>
                                    <Form.Item
                                      name="description_en"
                                      rules={[
                                        {
                                          required: false,
                                          message:
                                            "กรุณากรอกข้อมูลเนื้อหาภาษาอังกฤษ!",
                                        },
                                      ]}
                                    >
                                      <Input
                                        type="textarea"
                                        id="description_en"
                                        className="form-control-alternative"
                                        placeholder="เนื้อหาภาษาอังกฤษ"
                                        rows={5}
                                      />
                                    </Form.Item>
                                  </FormGroup>
                                </Col>
                              </>
                            )}
                            {updateId.controller_name === "MenuPTG" && (
                              <>
                                <Col sm={12} md={12}>
                                  <FormGroup>
                                    <label className="form-control-label">
                                      เนื้อหาภาษาไทย
                                    </label>
                                    <JoditEditor
                                      ref={editor}
                                      value={contentTH}
                                      config={config}
                                      tabIndex={1} // tabIndex of textarea
                                      onBlur={(newContent) => {
                                        setContentTH(newContent);
                                      }} // preferred to use only this option to update the content for performance reasons
                                      onChange={(newContent) => {}}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col sm={12} md={12}>
                                  <FormGroup>
                                    <label className="form-control-label">
                                      เนื้อหาภาษาอังกฤษ
                                    </label>
                                    <JoditEditor
                                      ref={editor}
                                      value={contentEN}
                                      config={config}
                                      tabIndex={3} // tabIndex of textarea
                                      onBlur={(newContent) =>
                                        setContentEN(newContent)
                                      } // preferred to use only this option to update the content for performance reasons
                                    />
                                  </FormGroup>
                                </Col>
                              </>
                            )}
                            {dataContentSingle.description2_th != null && (
                              <>
                                <Col sm={12} md={12}>
                                  <FormGroup>
                                    <label className="form-control-label">
                                      เนื้อหาภาษาไทย 2
                                    </label>
                                    <JoditEditor
                                      ref={editor}
                                      value={content2TH}
                                      config={config}
                                      tabIndex={2} // tabIndex of textarea
                                      onBlur={(newContent) =>
                                        setContent2TH(newContent)
                                      } // preferred to use only this option to update the content for performance reasons
                                      onChange={(newContent) => {}}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col sm={12} md={12}>
                                  <FormGroup>
                                    <label className="form-control-label">
                                      เนื้อหาภาษาอังกฤษ 2
                                    </label>
                                    <JoditEditor
                                      ref={editor}
                                      value={content2EN}
                                      config={config}
                                      tabIndex={4} // tabIndex of textarea
                                      onBlur={(newContent) =>
                                        setContent2EN(newContent)
                                      } // preferred to use only this option to update the content for performance reasons
                                      onChange={(newContent) => {}}
                                    />
                                  </FormGroup>
                                </Col>
                              </>
                            )}
                            {dataContentSingle.footer1_th != null && (
                              <>
                                <Col sm={12} md={12}>
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-username"
                                    >
                                      Footer ภาษาไทย
                                    </label>
                                    
                                      <JoditEditor
                                        ref={editor}
                                        value={footerTH}
                                        config={config}
                                        tabIndex={5} // tabIndex of textarea
                                        onBlur={(newContent) =>
                                          setFooterTH(newContent)
                                        } // preferred to use only this option to update the content for performance reasons
                                        onChange={(newContent) => {}}
                                      />
                                   
                                  </FormGroup>
                                </Col>
                                <Col sm={12} md={12}>
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-username"
                                    >
                                      Footer ภาษาอังกฤษ
                                    </label>
                                   
                                      <JoditEditor
                                        ref={editor}
                                        value={footerEN}
                                        config={config}
                                        tabIndex={6} // tabIndex of textarea
                                        onBlur={(newContent) =>
                                          setFooterEN(newContent)
                                        } // preferred to use only this option to update the content for performance reasons
                                        onChange={(newContent) => {}}
                                      />
                                    
                                  </FormGroup>
                                </Col>
                              </>
                            )}
                            {dataContentSingle.footer1_en != null && <></>}
                            {dataContentSingle.footer2_th != null && (
                              <>
                                <Col sm={12} md={12}>
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-username"
                                    >
                                      Footer ภาษาไทย 2
                                    </label>
                                   
                                      <JoditEditor
                                        ref={editor}
                                        value={footer2TH}
                                        config={config}
                                        tabIndex={7} // tabIndex of textarea
                                        onBlur={(newContent) =>
                                          setFooter2TH(newContent)
                                        } // preferred to use only this option to update the content for performance reasons
                                        onChange={(newContent) => {}}
                                      />
                                    
                                  </FormGroup>
                                </Col>
                                <Col sm={12} md={12}>
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-username"
                                    >
                                      Footer ภาษาอังกฤษ 2
                                    </label>
                                    <Form.Item
                                      name="footer1_en"
                                      rules={[
                                        {
                                          required: false,
                                          message: "Please input footer text!",
                                        },
                                      ]}
                                    >
                                      <JoditEditor
                                        ref={editor}
                                        value={footer2EN}
                                        config={config}
                                        tabIndex={8} // tabIndex of textarea
                                        onBlur={(newContent) =>
                                          setFooter2EN(newContent)
                                        } // preferred to use only this option to update the content for performance reasons
                                        onChange={(newContent) => {}}
                                      />
                                    </Form.Item>
                                  </FormGroup>
                                </Col>
                              </>
                            )}
                            {dataContentSingle.footer1_en && <></>}
                            {dataContentSingle.map_url != null && (
                              <Col sm={12}>
                                <FormGroup>
                                  <label className="form-control-label">
                                    Map Url
                                  </label>
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
                            )}
                            {dataContentSingle.tel_no1 != null && (
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
                            )}
                            {dataContentSingle.tel_no2 && (
                              <Col sm={12} md={3}>
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                  >
                                    เบอร์โทรศัพท์ 2
                                  </label>
                                  <Form.Item
                                    name="tel_no2"
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "กรุณากรอกข้อมูล เบอร์โทรศัwท์ที่ 2!",
                                      },
                                    ]}
                                  >
                                    <Input
                                      className="form-control-alternative"
                                      id="tel_no2"
                                      placeholder="เบอร์โทรศัwท์ที่ 2"
                                      type="text"
                                    />
                                  </Form.Item>
                                </FormGroup>
                              </Col>
                            )}
                            {dataContentSingle.fax_no1 && (
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
                            )}
                            {dataContentSingle.fax_no2 && (
                              <Col sm={12} md={3}>
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                  >
                                    เบอร์แฟกซ์ 2
                                  </label>
                                  <Form.Item
                                    name="fax_no2"
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "กรุณากรอกข้อมูลเบอร์แฟกซ์ที่ 2!",
                                      },
                                    ]}
                                  >
                                    <Input
                                      className="form-control-alternative"
                                      id="fax_no2"
                                      placeholder="เบอร์แฟกซ์ที่ 2"
                                      type="text"
                                    />
                                  </Form.Item>
                                </FormGroup>
                              </Col>
                            )}
                          </Row>
                          {dataContentSingle.station_all_num !== 0 &&
                            dataContentSingle.station_all_num != null && (
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
                                            message:
                                              "กรุณากรอกจำนวนสถานีบริการทั้งหมด!",
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
                                            message:
                                              "กรุณากรอกจำนวนสถานีบริการน้ำมัน!",
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
                                            message:
                                              "กรุณากรอกจำนวนสถานีบริการ LPG!",
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
                          {((dataContentSingle.image_path1 !== null &&
                            dataContentSingle.image_path1 !== undefined &&
                            dataContentSingle.image_path1 !== "") || (img1fix.includes(dataContentSingle.menu_id))) && (
                              <Col sm={12} md={3}>
                                <label>รูปภาพประกอบ</label>
                                <Upload
                                  accept=".png"
                                  //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                  id="image_path1"
                                  listType="picture-card"
                                  fileList={fileList}
                                  onChange={onChangeImage}
                                  onPreview={onPreview}
                                  beforeUpload={handleSaveFile}
                                >
                                  {fileList.length < 1 && "+ Upload"}
                                </Upload>
                              </Col>
                            )}
                          {dataContentSingle.file_path !== null &&
                            dataContentSingle.file_path !== undefined &&
                            dataContentSingle.file_path !== "" &&
                            dataContentSingle.file_path.includes("file") && (
                              <Col sm={12} md={6}>
                                <label>อัพโหลดไฟล์ PDF</label>
                                <FormGroup>
                                  <Upload
                                    //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    id="file_path"
                                    accept=".PDF"
                                    fileList={contentFile}
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
                          {dataContentSingle.file_path !== null &&
                            dataContentSingle.file_path !== undefined &&
                            dataContentSingle.file_path !== "" &&
                            dataContentSingle.file_path.includes("video") && (
                              <Col sm={12} md={6}>
                                <label>อัพโหลดไฟล์ MP4</label>
                                <FormGroup>
                                  <Upload
                                    id="file_path"
                                    accept=".MP4"
                                    fileList={contentFile}
                                    onChange={onChangeVideo}
                                    beforeUpload={handleSaveVideo}
                                  >
                                    <Button>
                                      <UploadOutlined /> Upload File
                                    </Button>
                                  </Upload>
                                </FormGroup>
                              </Col>
                            )}
                        </>
                      )}

                      {menuid.filter((x) => x === updateId.menu_id).length ===
                        1 &&
                        updateId.menu_id === 291 && (
                          <>
                            <Row>
                              <DataManagerPepleTalk
                                object={{
                                  ADDEDITOR,
                                  UPDATE_STATUS_URL,
                                  INIT_ORDER,
                                  FETCH_URL,
                                  DATA_FETCH,
                                  DELETE_URL,
                                  DELETE_FIELD,
                                  getSorter,
                                  STATIC_COLUMNS,
                                  PAGINATION_FIELD,
                                  SEND_DELETED_FILED,
                                  updateId,
                                  layoutType,
                                }}
                              ></DataManagerPepleTalk>
                            </Row>
                          </>
                        )}
                      {menuid.filter((x) => x === updateId.menu_id).length ===
                        1 &&
                        (updateId.menu_id === 290 ||
                          updateId.menu_id === 288) && (
                          <>
                            <Row>
                              <DataManagerGrow
                                object={{
                                  ADDEDITOR,
                                  UPDATE_STATUS_URL,
                                  INIT_ORDER,
                                  FETCH_URL,
                                  DATA_FETCH,
                                  DELETE_URL,
                                  DELETE_FIELD,
                                  getSorter,
                                  STATIC_COLUMNS,
                                  PAGINATION_FIELD,
                                  SEND_DELETED_FILED,
                                  updateId,
                                  layoutType,
                                }}
                              ></DataManagerGrow>
                            </Row>
                          </>
                        )}
                      {menuid.filter((x) => x === updateId.menu_id).length ===
                        1 &&
                        updateId.menu_id === 262 && (
                          <>
                            <Row>
                              <DataManagerNews
                                object={{
                                  ADDEDITOR,
                                  UPDATE_STATUS_URL,
                                  INIT_ORDER,
                                  FETCH_URL,
                                  DATA_FETCH,
                                  DELETE_URL,
                                  DELETE_FIELD,
                                  getSorter,
                                  STATIC_COLUMNS,
                                  PAGINATION_FIELD,
                                  SEND_DELETED_FILED,
                                  updateId,
                                  layoutType,
                                }}
                              ></DataManagerNews>
                            </Row>
                          </>
                        )}
                      {menuid.filter((x) => x === updateId.menu_id).length ===
                        1 &&
                        updateId.menu_id === 219 && (
                          <>
                            <Row>
                              <DataManagerTruck
                                object={{
                                  ADDEDITOR,
                                  UPDATE_STATUS_URL,
                                  INIT_ORDER,
                                  FETCH_URL,
                                  DATA_FETCH,
                                  DELETE_URL,
                                  DELETE_FIELD,
                                  getSorter,
                                  STATIC_COLUMNS,
                                  PAGINATION_FIELD,
                                  SEND_DELETED_FILED,
                                  updateId,
                                  layoutType,
                                }}
                              ></DataManagerTruck>
                            </Row>
                          </>
                        )}
                      {menuid.filter((x) => x === updateId.menu_id).length ===
                        1 &&
                        updateId.menu_id === 245 && (
                          <>
                            <Row>
                              <DataManagerCSR
                                object={{
                                  ADDEDITOR,
                                  UPDATE_STATUS_URL,
                                  INIT_ORDER,
                                  FETCH_URL,
                                  DATA_FETCH,
                                  DELETE_URL,
                                  DELETE_FIELD,
                                  getSorter,
                                  STATIC_COLUMNS,
                                  PAGINATION_FIELD,
                                  SEND_DELETED_FILED,
                                  updateId,
                                  layoutType,
                                }}
                              ></DataManagerCSR>
                            </Row>
                          </>
                        )}

                      {(menuid.filter((x) => x === updateId.menu_id).length ===
                        1 )&& 
                        !contentlisttrack.includes(updateId.menu_id) &&
                        (!contentlistFile.includes(updateId.menu_id)) &&
                        !menu_oppor_list.includes(updateId.menu_id) &&
                        !contentproduct.includes(updateId.menu_id) && (
                          <>
                            <Row>
                              <DataManager
                                object={{
                                  EDITOR,
                                  ADDEDITOR,
                                  UPDATE_STATUS_URL,
                                  INIT_ORDER,
                                  FETCH_URL,
                                  DATA_FETCH,
                                  DELETE_URL,
                                  DELETE_FIELD,
                                  getSorter,
                                  STATIC_COLUMNS,
                                  PAGINATION_FIELD,
                                  SEND_DELETED_FILED,
                                  updateId,
                                  layoutType,
                                }}
                              ></DataManager>
                            </Row>
                          </>
                        )}
                    </Form>
                    {(menuid.filter((x) => x === updateId.menu_id).length ===
                      1) &&
                      (contentlistFile.includes(updateId.menu_id)) && (
                        <>
                          <Row>
                            <DataManagerList
                              object={{
                                EDITORFILE,
                                ADDEDITOR,
                                UPDATE_STATUS_URL,
                                INIT_ORDER,
                                FETCH_URL,
                                DATA_FETCH,
                                DELETE_URL,
                                DELETE_FIELD,
                                getSorter,
                                STATIC_COLUMNS,
                                PAGINATION_FIELD,
                                SEND_DELETED_FILED,
                                updateId,
                                layoutType,
                              }}
                            ></DataManagerList>
                          </Row>
                        </>
                      )}
                    {menuid.filter((x) => x === updateId.menu_id).length ===
                      1 &&
                      contentproduct.includes(updateId.menu_id) && (
                        <>
                          <Row>
                            <DataManagerProduct
                              object={{
                                ADDEDITOR,
                                UPDATE_STATUS_URL,
                                INIT_ORDER,
                                FETCH_URL,
                                DATA_FETCH,
                                DELETE_URL,
                                DELETE_FIELD,
                                getSorter,
                                STATIC_COLUMNS,
                                PAGINATION_FIELD,
                                SEND_DELETED_FILED,
                                updateId,
                                layoutType,
                              }}
                            ></DataManagerProduct>
                          </Row>
                        </>
                      )}
                    {menuid.filter((x) => x === updateId.menu_id).length ===
                      1 &&
                      menu_oppor_list.includes(updateId.menu_id) && (
                        <>
                          <Row>
                            <DataManagerOppor
                              object={{
                                ADDEDITOR,
                                UPDATE_STATUS_URL,
                                INIT_ORDER,
                                FETCH_URL,
                                DATA_FETCH,
                                DELETE_URL,
                                DELETE_FIELD,
                                getSorter,
                                STATIC_COLUMNS,
                                PAGINATION_FIELD,
                                SEND_DELETED_FILED,
                                updateId,
                                layoutType,
                              }}
                            ></DataManagerOppor>
                          </Row>
                        </>
                      )}
                  </Modal>
                </div>
              </ListGroup>
            </Card>
          </Col>
        </Row>

        <Modal
          title={type === "add" ? "Add Menu" : "Edit Manage Popup"}
          visible={visiblePopup}
          width="90%"
          style={{ maxWidth: "1024px" }}
          confirmLoading={confirmLoading}
          onCancel={handlePopupCancel}
          maskClosable={false}
          footer={
            type === "edit"
              ? [
                  <Button className="ant-btn" onClick={handlePopupCancel}>
                    Cancel
                  </Button>,
                  <Button
                    type="primary"
                    loading={confirmLoading}
                    onClick={handleOk}
                  >
                    Save
                  </Button>,
                ]
              : [
                  <Button className="ant-btn" onClick={handlePopupCancel}>
                    Cancel
                  </Button>,
                  <Button
                    type="primary"
                    loading={confirmLoading}
                    onClick={handleOk}
                  >
                    Save
                  </Button>,
                ]
          }
        >
          <Form form={form} layout="vertical">
            <Row>
              <Col sm={12} md={3}>
                <label>รูปภาพ</label>
                <Upload
                  accept=".png"
                  //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  id="image_path1"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChangeImage}
                  onPreview={onPreview}
                  beforeUpload={handleSaveFile}
                >
                  {fileList.length < 1 && "+ Upload"}
                </Upload>
              </Col>
              <Col sm={12} md={4}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    วันที่เริ่มต้น
                  </label>
                  <Form.Item>
                    <DatePicker
                      defaultValue={moment("", "YYYY-MM-DD")}
                      value={
                        startDate === null || startDate === ""
                          ? ""
                          : moment(startDate, "YYYY-MM-DD")
                      }
                      className="form-control-alternative"
                      onChange={onChangeDate}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={4}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    วันที่สิ้นสุด
                  </label>
                  <Form.Item>
                    <DatePicker
                      defaultValue={moment("", "YYYY-MM-DD")}
                      value={
                        endDate === null || endDate === ""
                          ? ""
                          : moment(endDate, "YYYY-MM-DD")
                      }
                      className="form-control-alternative"
                      onChange={onChangeEndDate}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Modal>

        <Modal
          title={type === "add" ? "Add Menu" : "Edit Menu"}
          visible={visibleEditNewPro}
          width="90%"
          style={{ maxWidth: "1024px" }}
          confirmLoading={confirmLoading}
          onCancel={handleNewProCancel}
          maskClosable={false}
          footer={
            type === "edit"
              ? [
                  <Button className="ant-btn" onClick={handleNewProCancel}>
                    Cancel
                  </Button>,
                  <Button
                    type="success"
                    disabled={updateId.menu_review_id === 0 || datapermission.approve === "N"}
                    onClick={approveConfirmOnModal}
                  >
                    Approve
                  </Button>,
                  <Button
                    type="primary"
                    loading={confirmLoading}
                    onClick={handleOk}
                  >
                    Save
                  </Button>,
                ]
              : [
                  <Button className="ant-btn" onClick={handleNewProCancel}>
                    Cancel
                  </Button>,
                  <Button
                    type="primary"
                    loading={confirmLoading}
                    onClick={handleOk}
                  >
                    Save
                  </Button>,
                ]
          }
        >
          <Divider>Menu</Divider>
          <Form form={form} layout="vertical">
            <FormGroup>
              <label
                className="form-control-label required"
                htmlFor="input-username"
              >
                ชื่อ​เมนู ภาษาไทย
              </label>
              <Form.Item
                name="menu_name_th"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อเมนูภาษาไทย!",
                  },
                ]}
              >
                <Input
                  className="form-control-alternative"
                  id="menu_name_th"
                  placeholder="กรุณากรอกชื่อเมนูภาษาไทย"
                  type="text"
                />
              </Form.Item>
            </FormGroup>
            <FormGroup>
              <label
                className="form-control-label required"
                htmlFor="input-username"
              >
                ชื่อ​เมนู ภาษาอังกฤษ
              </label>
              <Form.Item
                name="menu_name_en"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อเมนูภาษาอังกฤษ!",
                  },
                ]}
              >
                <Input
                  id="menu_name_en"
                  className="form-control-alternative"
                  placeholder="กรุณากรอกชื่อเมนูภาษาอังกฤษ"
                  type="text"
                  // disabled={confirmLoading}
                />
              </Form.Item>
            </FormGroup>
            <FormGroup>
              <label className="form-control-label">
                รายละเอียดเมนูภาษาไทย
              </label>
              <Form.Item
                name="menu_description_th"
                rules={[
                  {
                    required: false,
                    message: "กรุณากรอกข้อมูลรายละเอียดเมนูภาษาไทย!",
                  },
                ]}
              >
                <Input
                  type="textarea"
                  id="menu_description_th"
                  className="form-control-alternative"
                  placeholder="รายละเอียดเมนูภาษาไทย"
                  rows={5}
                />
              </Form.Item>
            </FormGroup>
            <FormGroup>
              <label className="form-control-label">
                รายละเอียดเมนูภาษาอังกฤษ
              </label>
              <Form.Item
                name="menu_description_en"
                rules={[
                  {
                    required: false,
                    message: "กรุณากรอกข้อมูลรายละเอียดเมนูภาษาอังกฤษ!",
                  },
                ]}
              >
                <Input
                  type="textarea"
                  id="menu_description_en"
                  className="form-control-alternative"
                  placeholder="รายละเอียดเมนูภาษาอังกฤษ"
                  rows={5}
                />
              </Form.Item>
            </FormGroup>
          </Form>
          <Divider>Content</Divider>
          <Row>
            {NEWPRO_TYPE === "N" && (
              <DataManagerNewPro
                object={{
                  EDITORNEWPRO,
                  ADDEDITOR,
                  UPDATE_STATUS_URL,
                  INIT_ORDER,
                  FETCH_URL_NEWPRO,
                  DATA_FETCH_NEWPRO,
                  DELETE_URL_NEWPRO,
                  DELETE_FIELD_NEWPRO,
                  getSorter,
                  STATIC_COLUMNS_NEWPRO,
                  PAGINATION_FIELD,
                  SEND_DELETED_FILED_NEWPRO,
                  updateId,
                  NEWPRO_TYPE,
                }}
              ></DataManagerNewPro>
            )}
            {NEWPRO_TYPE === "P" && (
              <DataManagerNewPro
                object={{
                  EDITORNEWPRO,
                  ADDEDITOR,
                  UPDATE_STATUS_URL,
                  INIT_ORDER,
                  FETCH_URL_NEWPRO,
                  DATA_FETCH_NEWPRO,
                  DELETE_URL_NEWPRO,
                  DELETE_FIELD_NEWPRO,
                  getSorter,
                  STATIC_COLUMNS_NEWPRO,
                  PAGINATION_FIELD,
                  SEND_DELETED_FILED_NEWPRO,
                  updateId,
                  NEWPRO_TYPE,
                }}
              ></DataManagerNewPro>
            )}
          </Row>
        </Modal>
        <Modal
          title="Approve Menu"
          visible={visibleApprove}
          onCancel={handleApproveCancel}
          footer={[
            <Button className="ant-btn" onClick={handleApproveCancel}>
              Cancel
            </Button>,
            <Button type="danger" onClick={() => rejectMenu(updateId)}>
              Reject
            </Button>,
            <Button type="success" onClick={() => approveMenu(updateId)}>
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
export default Trees;
