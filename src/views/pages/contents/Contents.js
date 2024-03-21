import React from "react";
// import { Form, Input } from "antd";

import EditContent from "./EditContent";
import AddContent from "./AddContent";
import EditContentTruck from "./EditContentTruck";
import DataManager from "components/DataManagerContent";
import { useLocation } from "react-router-dom";

const EDITOR = EditContent;
const ADDEDITOR = AddContent;
const TRUCKEDIT = EditContentTruck;

const getSorter = (sorter, sort, sort_type) => {
  sort =
    "u." + sorter.field.substring(0, 1).toUpperCase() + sorter.field.substr(1);
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
  {
    title: "ContentId",
    dataIndex: "menu_content_id",
    sorter: true,
    width: "10%",
  },
  {
    title: "รายละเอียดภาษาไทย",
    dataIndex: "description_th",
    sorter: true,
    width: "90%",
  },
];
const PAGINATION_FIELD = {
  fullName: "",
  username: "",
};

const InputForm = <></>;
const Contents = () => {
  const location = useLocation();
  const path = location.pathname;
  const menuid = path.substr(16);
  const UPDATE_STATUS_URL = "";
  const INIT_ORDER = "";
  const FETCH_URL = "menu/getMenuContent?menu_id=" + menuid;
  const DATA_FETCH = "contents";
  const DATA_BY_ID_URL = "menu/getMenuContent?menu_id=";
  const DELETE_URL = "";
  const DELETE_FIELD = "menu_content_id";
  const SEND_DELETED_FILED = "menu_content_id";
  return (
    <DataManager
      object={{
        EDITOR,
        ADDEDITOR,
        TRUCKEDIT,
        UPDATE_STATUS_URL,
        INIT_ORDER,
        FETCH_URL,
        DATA_FETCH,
        DATA_BY_ID_URL,
        DELETE_URL,
        DELETE_FIELD,
        getSorter,
        STATIC_COLUMNS,
        PAGINATION_FIELD,
        InputForm,
        SEND_DELETED_FILED,
      }}
    ></DataManager>
  );
};

export default Contents;
