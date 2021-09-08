import React, { useState, useEffect } from "react";
import { Table, Button, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";

const ContactsTable = (props) => {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date of birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (text, record, index) => {
        return <div>{moment(text).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Tooltip title="Delete" color={"blue"}>
            <Button
              onClick={() => props.handleOnDelete(record)}
              icon={<DeleteOutlined />}
              type="link"
            />
          </Tooltip>
          <Tooltip title="Edit" color={"blue"}>
            <Button
              onClick={() => props.handleOnOpenEdit(record)}
              icon={<EditOutlined />}
              type="link"
            />
          </Tooltip>
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey={"id"}
      dataSource={data}
      size="small"
      className="table-striped-rows"
    ></Table>
  );
};

export default ContactsTable;
