import React, { useState, useEffect } from 'react';
import {
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Modal,
  TextField,
} from '@mui/material';
import axios from 'axios';
import styles from './OrderComponent.module.css';

function OrderComponent() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [setOrderId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [clientId, setClientId] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [shipmentDate, setShipmentDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    employeeId: '',
    clientId: '',
    orderDate: '',
    shipmentDate: '',
  });

  useEffect(() => {
    loadOrders();
  }, []);

  function loadOrders() {
    axios
      .get('https://devweb.jeanhenrique.site/pedido')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error loading orders:', error);
      });
  }

  function addOrder() {
    if (!validateFields()) {
      return;
    }

    const order = {
      id_funcionario: employeeId,
      id_cliente: clientId,
      data_pedido: orderDate,
      data_remessa: shipmentDate,
    };

    axios
      .post('https://devweb.jeanhenrique.site/pedido/add', order)
      .then(() => {
        loadOrders();
        setShowModal(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error adding order:', error);
      });
  }

  function editOrder(order) {
    setIsEditing(true);
    setSelectedOrder(order);
    setOrderId(order.id_pedido);
    setEmployeeId(order.id_funcionario);
    setClientId(order.id_cliente);
    setOrderDate(order.data_pedido);
    setShipmentDate(order.data_remessa);
    setShowModal(true);
  }

  function updateOrder() {
    setIsEditing(false);

    if (!validateFields()) {
      return;
    }

    const updatedOrder = {
      ...selectedOrder,
      id_funcionario: employeeId,
      id_cliente: clientId,
      data_pedido: orderDate,
      data_remessa: shipmentDate,
    };

    axios
      .put(
        `https://devweb.jeanhenrique.site/pedido/update/${selectedOrder.id_pedido}`,
        updatedOrder,
      )
      .then(() => {
        loadOrders();
        setShowModal(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating order:', error);
      });
  }

  function deleteOrder(orderId) {
    if (window.confirm('Do you really want to delete the order?')) {
      axios
        .delete(`https://devweb.jeanhenrique.site/pedido/delete/${orderId}`)
        .then(() => {
          loadOrders();
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error deleting order:', error);
        });
    }
  }

  function validateFields() {
    let isValid = true;
    const errors = {
      employeeId: '',
      clientId: '',
      orderDate: '',
      shipmentDate: '',
    };

    if (!employeeId) {
      errors.employeeId = 'The Employee ID field is required.';
      isValid = false;
    }

    if (!clientId) {
      errors.clientId = 'The Client ID field is required.';
      isValid = false;
    }

    if (!orderDate) {
      errors.orderDate = 'The Order Date field is required.';
      isValid = false;
    }

    if (!shipmentDate) {
      errors.shipmentDate = 'The Shipment Date field is required.';
      isValid = false;
    }

    setErrorMessages(errors);
    return isValid;
  }

  return (
    <div className={styles.container}>
      <Button
        style={{
          marginBottom: '0.5%',
          width: '210px',
          fontSize: '12px',
          paddingLeft: '0.5%',
          paddingRight: '0.5%',
        }}
        variant="contained"
        onClick={() => setShowModal(true)}
        disabled={orders.length >= 5}
      >
        Add Order
      </Button>
      {errorMessages.employeeId && <p>{errorMessages.employeeId}</p>}
      {errorMessages.clientId && <p>{errorMessages.clientId}</p>}
      {errorMessages.orderDate && <p>{errorMessages.orderDate}</p>}
      {errorMessages.shipmentDate && <p>{errorMessages.shipmentDate}</p>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Client ID</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Shipment Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(orders) &&
              orders.slice(0, 5).map((order) => (
                <TableRow key={order.id_pedido}>
                  <TableCell>{order.id_pedido}</TableCell>
                  <TableCell>{order.id_funcionario}</TableCell>
                  <TableCell>{order.id_cliente}</TableCell>
                  <TableCell>{order.data_pedido}</TableCell>
                  <TableCell>{order.data_remessa}</TableCell>
                  <TableCell>
                    <Button onClick={() => editOrder(order)}>Edit</Button>
                    <Button onClick={() => deleteOrder(order.id_pedido)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setIsEditing(false);
          setSelectedOrder(null);
          setOrderId('');
          setEmployeeId('');
          setClientId('');
          setOrderDate('');
          setShipmentDate('');
          setErrorMessages({
            employeeId: '',
            clientId: '',
            orderDate: '',
            shipmentDate: '',
          });
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            boxShadow: 24,
            p: 4,
            padding: '1%',
            width: '90%',
            maxWidth: '800px',
          }}
        >
          <h2>{isEditing ? 'Edit Order' : 'Add Order'}</h2>
          <TextField
            label="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            fullWidth
          />
          {errorMessages.employeeId && <p>{errorMessages.employeeId}</p>}
          <TextField
            label="Client ID"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            fullWidth
          />
          {errorMessages.clientId && <p>{errorMessages.clientId}</p>}
          <TextField
            label="Order Date"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            fullWidth
          />
          {errorMessages.orderDate && <p>{errorMessages.orderDate}</p>}
          <TextField
            label="Shipment Date"
            value={shipmentDate}
            onChange={(e) => setShipmentDate(e.target.value)}
            fullWidth
          />
          {errorMessages.shipmentDate && <p>{errorMessages.shipmentDate}</p>}
          <Button
            style={{ marginTop: '2%', width: '100px' }}
            variant="contained"
            onClick={isEditing ? updateOrder : addOrder}
          >
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default OrderComponent;
