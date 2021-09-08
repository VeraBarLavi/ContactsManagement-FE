import React, { Fragment, useState, useEffect } from "react";
import { Layout, PageHeader, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddEditDrawer from "./AddEditDrawer";
import {
  GetContacts,
  NewContact,
  EditContact,
  DeleteContact,
  getErrorFromResponse,
} from "../services/contacts";
import ContactsTable from "./ContactsTable";

const { Header, Footer, Content } = Layout;

const MainPage = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [mode, setMode] = useState("add");
  const [contacts, setContacts] = useState([]);
  const [editedContact, setEditedContact] = useState({});

  useEffect(() => {
    GetContacts()
      .then((res) => {
        if (res.status === 200 && res?.data?.length > 0) {
          console.log("GetContacts: ", res.data);
          setContacts(res.data);
        } else {
          console.log("GetContacts: No contacts data exist!");
        }
      })
      .catch((error) => {
        const msgErr = getErrorFromResponse(error);
        console.log("GetContacts error: ", msgErr);
        message.error(msgErr);
      });
  }, []);

  const handleOnFinishContact = (values) => {
    let msgErr = "";
    const cont = {
      id: values.id,
      fullName: values.fullName,
      email: values.email,
      dateOfBirth: values.dateOfBirth,
      gender: values.gender,
      phoneNumber: values.phoneNumber,
    };
    if (mode === "add") {
      NewContact(cont)
        .then((res) => {
          if (res.status === 201) {
            setContacts([...contacts, cont]);
            setShowDrawer(false);
            message.success("New Contact added successfully!");
          }
        })
        .catch((error) => {
          msgErr = getErrorFromResponse(error);
          console.log("GetContacts error: ", msgErr);
          message.error(msgErr);
        });
    } else {
      EditContact(cont)
        .then((res) => {
          if (res.status === 200) {
            const editedContacts = contacts.filter(
              (contact) => contact.id !== cont.id
            );
            setContacts([...editedContacts, cont]);
            setMode("add");
            setEditedContact({});
            setShowDrawer(false);
            message.success("Contact editted successfully!");
          }
        })
        .catch((error) => {
          msgErr = getErrorFromResponse(error);
          console.log("GetContacts error: ", msgErr);
          message.error(msgErr);
        });
    }
  };

  const handleOnDeleteContact = (record) => {
    DeleteContact(record)
      .then((res) => {
        if (res.status === 200) {
          setContacts(contacts.filter((contact) => contact.id !== record.id));
          message.success("Contact deleted successfully!");
        }
      })
      .catch((error) => {
        const msg = getErrorFromResponse(error);
        console.log("DeleteContact error: ", msg);
        message.error(msg);
      });
  };

  const handleOnOpenEdit = (record) => {
    setEditedContact(record);
    setMode("edit");
    setShowDrawer(true);
  };

  const handleOnClose = () => {
    setShowDrawer(false);
    setEditedContact({});
    setMode("add");
  };

  return (
    <>
      <Layout>
        <Header style={{ padding: 0, background: "#fff" }}>
          <PageHeader title="Contacts Managment" />
        </Header>
        <Content style={{ padding: "20px" }}>
          <Fragment>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <div></div>
              <div>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setShowDrawer(true);
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
            <ContactsTable
              data={contacts}
              handleOnDelete={handleOnDeleteContact}
              handleOnOpenEdit={handleOnOpenEdit}
            />
            <AddEditDrawer
              show={showDrawer}
              mode={mode}
              editedContact={editedContact}
              handleOnClose={handleOnClose}
              handleOnFinish={handleOnFinishContact}
            />
          </Fragment>
        </Content>
        <Footer style={{ padding: 0, background: "#fff" }}></Footer>
      </Layout>
    </>
  );
};

export default MainPage;
