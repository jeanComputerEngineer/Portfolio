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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import axios from 'axios';
import styles from './OrderProductComponent.module.css';

function OrderProductComponent() {
  const [orderProducts, setOrderProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderProduct, setSelectedOrderProduct] = useState(null);
  const [productId, setProductId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    productId: '',
    orderId: '',
    quantity: '',
    unitPrice: '',
    discount: '',
  });

  useEffect(() => {
    loadOrderProducts();
    loadProducts();
    loadOrders();
  }, []);

  function loadOrderProducts() {
    axios
      .get('https://devweb.jeanhenrique.site/pedido_produto')
      .then((response) => setOrderProducts(response.data))
      .catch((error) => console.error('Error loading order products:', error));
  }

  function loadProducts() {
    axios
      .get('https://devweb.jeanhenrique.site/produto')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error loading products:', error));
  }

  function loadOrders() {
    axios
      .get('https://devweb.jeanhenrique.site/pedido')
      .then((response) => setOrders(response.data))
      .catch((error) => console.error('Error loading orders:', error));
  }

  function addOrderProduct() {
    if (!validateFields()) return;

    const orderProduct = {
      id_produto: productId,
      id_pedido: orderId,
      quantidade: parseInt(quantity),
      preco_unitario: parseFloat(unitPrice),
      desconto: parseFloat(discount),
    };

    axios
      .post('https://devweb.jeanhenrique.site/pedido_produto/add', orderProduct)
      .then(() => {
        loadOrderProducts();
        setShowModal(false);
        window.location.reload();
      })
      .catch((error) => console.error('Error adding order product:', error));
  }

  function editOrderProduct(orderProduct) {
    setIsEditing(true);
    setSelectedOrderProduct(orderProduct);
    setProductId(orderProduct.id_produto);
    setOrderId(orderProduct.id_pedido);
    setQuantity(orderProduct.quantidade.toString());
    setUnitPrice(orderProduct.preco_unitario.toString());
    setDiscount(orderProduct.desconto.toString());
    setShowModal(true);
  }

  function updateOrderProduct() {
    setIsEditing(false);
    if (!validateFields()) return;

    const updatedOrderProduct = {
      id_produto: parseInt(productId),
      id_pedido: parseInt(orderId),
      quantidade: parseInt(quantity),
      preco_unitario: parseFloat(unitPrice),
      desconto: parseFloat(discount),
    };

    axios
      .put(
        `https://devweb.jeanhenrique.site/pedido_produto/update/${selectedOrderProduct.id_pedido_produto}`,
        updatedOrderProduct,
      )
      .then(() => {
        loadOrderProducts();
        setShowModal(false);
        window.location.reload();
      })
      .catch((error) => console.error('Error updating order product:', error));
  }

  function deleteOrderProduct(id) {
    if (window.confirm('Do you really want to delete the order product?')) {
      axios
        .delete(`https://devweb.jeanhenrique.site/pedido_produto/delete/${id}`)
        .then(() => {
          loadOrderProducts();
          window.location.reload();
        })
        .catch((error) => console.error('Error deleting order product:', error));
    }
  }

  function validateFields() {
    let isValid = true;
    const errors = {
      productId: '',
      orderId: '',
      quantity: '',
      unitPrice: '',
      discount: '',
    };

    if (!productId) {
      errors.productId = 'Product ID is required.';
      isValid = false;
    }
    if (!orderId) {
      errors.orderId = 'Order ID is required.';
      isValid = false;
    }
    if (isNaN(quantity)) {
      errors.quantity = 'Quantity must be a number.';
      isValid = false;
    }
    if (isNaN(unitPrice)) {
      errors.unitPrice = 'Unit price must be a number.';
      isValid = false;
    }
    if (isNaN(discount)) {
      errors.discount = 'Discount must be a number.';
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
        disabled={orderProducts.length >= 5}
      >
        Add products to orders
      </Button>
      {Object.values(errorMessages).map((msg, idx) => msg && <p key={idx}>{msg}</p>)}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Product Relation ID</TableCell>
              <TableCell>Product ID</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(orderProducts) &&
              orderProducts.slice(0, 5).map((orderProduct) => (
                <TableRow key={orderProduct.id_pedido_produto}>
                  <TableCell>{orderProduct.id_pedido_produto}</TableCell>
                  <TableCell>{orderProduct.id_produto}</TableCell>
                  <TableCell>{orderProduct.id_pedido}</TableCell>
                  <TableCell>{orderProduct.quantidade}</TableCell>
                  <TableCell>{orderProduct.preco_unitario}</TableCell>
                  <TableCell>{orderProduct.desconto}</TableCell>
                  <TableCell>
                    <Button onClick={() => editOrderProduct(orderProduct)}>Edit</Button>
                    <Button onClick={() => deleteOrderProduct(orderProduct.id_pedido_produto)}>
                      Delete
                    </Button>
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
          setSelectedOrderProduct(null);
          setProductId('');
          setOrderId('');
          setQuantity('');
          setUnitPrice('');
          setDiscount('');
          setErrorMessages({
            productId: '',
            orderId: '',
            quantity: '',
            unitPrice: '',
            discount: '',
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
            padding: '1%',
            width: '90%',
            maxWidth: '800px',
          }}
        >
          <h2>{isEditing ? 'Edit Order Product' : 'Add Order Product'}</h2>
          <FormControl fullWidth>
            <InputLabel>Product ID</InputLabel>
            <Select value={productId} onChange={(e) => setProductId(e.target.value)}>
              {products.map((product) => (
                <MenuItem key={product.id_produto} value={product.id_produto}>
                  {product.id_produto}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {errorMessages.productId && <p>{errorMessages.productId}</p>}
          <FormControl fullWidth>
            <InputLabel>Order ID</InputLabel>
            <Select value={orderId} onChange={(e) => setOrderId(e.target.value)}>
              {orders.map((order) => (
                <MenuItem key={order.id_pedido} value={order.id_pedido}>
                  {order.id_pedido}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {errorMessages.orderId && <p>{errorMessages.orderId}</p>}
          <TextField
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
          />
          {errorMessages.quantity && <p>{errorMessages.quantity}</p>}
          <TextField
            label="Unit Price"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            fullWidth
          />
          {errorMessages.unitPrice && <p>{errorMessages.unitPrice}</p>}
          <TextField
            label="Discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            fullWidth
          />
          {errorMessages.discount && <p>{errorMessages.discount}</p>}
          <Button
            style={{ marginTop: '2%', width: '100px' }}
            variant="contained"
            onClick={isEditing ? updateOrderProduct : addOrderProduct}
          >
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default OrderProductComponent;
