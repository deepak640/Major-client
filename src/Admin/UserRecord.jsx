import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";

import ApiRequest from "src/API/apirequest";
import { v4 as uuidv } from 'uuid'

const UserRecord = () => {
    const [ dataSource, setDataSource ] = useState([]);
    const [ pagination, setPagination ] = useState({ current: 1, pageSize: 4, total: 0 });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await ApiRequest("Userrecord", "GET", null, { authorization: false });
        if (res) {
            const data = Object.values(res);
            const newData = data.flatMap((item, index) => item.map(record => ({
                key: uuidv(),
                name: record.name,
                accountType: index === 1 ? "Teacher" : "Student",
                email: record.email,
                password: "xxxx",
                subject: record.subjects || '----',
                class: record.class || '----'
            })));
            setDataSource(newData);
            setPagination({ ...pagination, total: newData.length });
        }
    };

    const handleTableChange = pagination => {
        setPagination(pagination);
    };

    const handleDelete = record => {
        const data = {
            email: record.email,
            accountType: record.accountType
        }
        const newDataSource = dataSource.filter(item =>
            item.key !== record.key);
        ApiRequest('deleteUser', 'POST', data, { authorization: false })
        setDataSource(newDataSource);
        setPagination({ ...pagination, total: newDataSource.length });
    };

    const columns = [
        { title: "Name", dataIndex: "name",align:'center', key: "name" },
        { title: "Account Type", dataIndex: "accountType",align:'center', key: "accountType" },
        { title: "Email", dataIndex: "email",align:'center', key: "email" },
        { title: "Password", dataIndex: "password",align:'center', key: "password" },
        { title: "Subject", dataIndex: "subject",align:'center', key: "subject" },
        { title: "Class", dataIndex: "class",align:'center', key: "class" },
        {
            title: "Action", key: "action",align:'center', render: (_, record) => (
                <Button type="primary" danger onClick={() => handleDelete(record)}>
                    Delete
                </Button>
            )
        }
    ];

    return (
        <div style={{ margin: "auto", width: "90%" }}>
            <h1 align="center" style={{ padding: "50px" }}>Admin Page</h1>
            <Table dataSource={dataSource} onChange={handleTableChange}
                scroll={{ x: true }}
                pagination={pagination} columns={columns} />
        </div>
    );
};

export default UserRecord;
