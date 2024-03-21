

import React from "react";
import {
     Form, Tag, Input
} from 'antd';



import EditUser from "./EditUser";
import DataManager from "components/DataManager";

const EDITOR = EditUser;
const UPDATE_STATUS_URL = 'permission/updateAdminUserStatus'
const INIT_ORDER = 'GroupName';
const FETCH_URL = 'permission/searchGroup';
const DATA_FETCH = 'groups';
const DATA_BY_ID_URL = 'permission/getGroupById/';
const DELETE_URL = 'permission/deleteGroup';
const DELETE_FIELD = 'id';
const SEND_DELETED_FILED='groupIDs';
const getSorter = (sorter, sort, sort_type) => {
    sort = sorter.field === 'status' ? 'Active' : 'GroupName';
    sort_type = sorter.order === 'descend' ? 'desc' : 'asc'
    return { sort, sort_type };
}

const STATIC_COLUMNS = [
    {
        title: 'Group Name',
        dataIndex: 'groupName',
        sorter: true,
        width: '35%',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        sorter: true,
        render: (status) => (
            <Tag color={status === 'Active' ? 'green' : 'volcano'} >
                {status}
            </Tag>),
        width: '25%'

    },
]
const PAGINATION_FIELD = {
    groupName: "",
}

const InputForm = (
    <Form.Item
        style={{ textColor: 'white' }}
        name="groupName"
        label={<span style={{ color: 'white' }}>Group Name </span>}

    >
        <Input placeholder='group name' />
    </Form.Item>
)


const UserGroup=()=>{
    return (
        <DataManager object={
            {
                EDITOR,
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
                invisibleStatus:true
            }
        }>
    
        </DataManager>
    )
}


export default UserGroup;
