import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { customersData, customersGrid } from '../data/dummy';

const Customers = () => {
  const [customersData, setCustomersData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCustomersData = async () => {
      try {
        const response = customersData;
        setCustomersData(response.data);
      } catch (error) {
        console.error('Error fetching customers data:', error);
      }
    };

    fetchCustomersData();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        setIsModalVisible(false);
        console.log('Form values:', values);
        // Add logic to handle form submission, e.g., updating customersData
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-rgb(3,201,215) rounded-3xl">
      <Header category="Page" title="Customers" />
      <Button type="primary" onClick={showModal} style={{ marginBottom: '10px', backgroundColor: 'rgb(3,201,215)', borderColor: 'rgb(3,201,215)' }}>
        Open Modal
      </Button>
      <Modal
        title="Add Customer"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: 'rgb(3,201,215)', borderColor: 'rgb(3,201,215)' } }}
        cancelButtonProps={{ style: { backgroundColor: 'rgb(3,201,215)', borderColor: 'rgb(3,201,215)', color: 'white' } }}
      >
        <Form
          form={form}
          layout="vertical"
          name="customerForm"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input the email!', type: 'email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contact"
            label="Contact"
            rules={[{ required: true, message: 'Please input the contact number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="learnerId"
            label="Learner's ID"
            rules={[{ required: true, message: 'Please input the learner\'s ID!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="course"
            label="Course"
            rules={[{ required: true, message: 'Please input the course!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="fees"
            label="Fees"
            rules={[{ required: true, message: 'Please input the fees!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <GridComponent
        dataSource={customersData}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
