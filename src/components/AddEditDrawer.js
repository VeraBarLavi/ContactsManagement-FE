import React, { useEffect } from "react";
import { Drawer, Space, Button, Form, Input, DatePicker, Select } from "antd";
import moment from "moment";

const { Option } = Select;

const AddEditDrawer = (props) => {
  const { show, mode, editedContact, handleOnClose, handleOnFinish } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === "add") form.resetFields();
    else {
      form.setFieldsValue({
        id: editedContact.id,
        fullName: editedContact.fullName,
        email: editedContact.email,
        dateOfBirth:
          editedContact.dateOfBirth && moment(editedContact.dateOfBirth),
        gender: editedContact.gender,
        phoneNumber: editedContact.phoneNumber,
      });
    }
  }, [form, show, mode, editedContact]);

  const handleOnFinnishContact = () => form.submit();

  return (
    <Drawer
      title={`${mode === "add" ? "Add Contact" : "Edit Contact"}`}
      placement="right"
      width={512}
      onClose={handleOnClose}
      visible={show}
      maskClosable={false}
      getContainer={false}
      extra={
        <Space>
          {mode === "add" ? (
            <Button onClick={() => form.resetFields()}>Reset</Button>
          ) : (
            ""
          )}
          <Button type="primary" onClick={handleOnFinnishContact}>
            {mode === "add" ? "Save" : "Edit"}
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" form={form} onFinish={handleOnFinish}>
        <Form.Item
          name="id"
          label="ID"
          rules={[
            { required: true, message: "Contact ID is required" },
            {
              pattern: /^\d{9}$/g,
              message: "ID contains exactly 9 digits!",
            },
          ]}
        >
          <Input
            placeholder="Please enter contact ID"
            disabled={mode === "edit"}
            style={{ width: "60%" }}
          />
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Name"
          rules={[{ required: true, message: "Contact name is required" }]}
        >
          <Input
            placeholder="Please enter contact name"
            style={{ width: "60%" }}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              message: "Enter a valid email address",
              type: "email",
            },
          ]}
        >
          <Input
            placeholder="Please enter contact email"
            style={{ width: "60%" }}
          />
        </Form.Item>
        <Form.Item
          name="dateOfBirth"
          label="Date of birth"
          rules={[
            { required: true, message: "Contact date of birth is required" },
          ]}
        >
          <DatePicker
            placeholder="(DD/MM/YYYY)*"
            format={"DD/MM/YYYY"}
            disabledDate={(d) => !d || d.isAfter(moment())}
          />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <Select placeholder="Select a gender" style={{ width: "33%" }}>
            <Option value="">Select a gender</Option>
            <Option value="Man">Man</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone number"
          rules={[
            {
              pattern: /^\d{10}$/g,
              message: "Phone number contains exactly 10 digits!",
            },
          ]}
        >
          <Input
            placeholder="Please enter contact phone number"
            type="tel"
            style={{ width: "60%" }}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddEditDrawer;
