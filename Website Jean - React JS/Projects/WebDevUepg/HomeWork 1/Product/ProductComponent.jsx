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
import styles from './ProductComponent.module.css';

function ProductComponent() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [setProductId] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [costValue, setCostValue] = useState('');
  const [saleValue, setSaleValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    code: '',
    description: '',
    costValue: '',
    saleValue: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  function loadProducts() {
    axios
      .get('https://devweb.jeanhenrique.site/product')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error loading products:', error);
      });
  }

  function addProduct() {
    if (!validateFields()) {
      return;
    }

    const product = {
      code: code,
      description: description,
      cost_value: parseFloat(costValue),
      sale_value: parseFloat(saleValue),
    };

    axios
      .post('https://devweb.jeanhenrique.site/product/add', product)
      .then(() => {
        loadProducts();
        setShowModal(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  }

  function editProduct(product) {
    setIsEditing(true);
    setSelectedProduct(product);
    setProductId(product.id_product);
    setCode(product.code);
    setDescription(product.description);
    setCostValue(product.cost_value.toString());
    setSaleValue(product.sale_value.toString());
    setShowModal(true);
  }

  function updateProduct() {
    setIsEditing(false);

    if (!validateFields()) {
      return;
    }

    const updatedProduct = {
      ...selectedProduct,
      code: code,
      description: description,
      cost_value: parseFloat(costValue),
      sale_value: parseFloat(saleValue),
    };

    axios
      .put(
        `https://devweb.jeanhenrique.site/product/update/${selectedProduct.id_product}`,
        updatedProduct,
      )
      .then(() => {
        loadProducts();
        setShowModal(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  }

  function deleteProduct(id_product) {
    if (window.confirm('Do you really want to delete this product?')) {
      axios
        .delete(`https://devweb.jeanhenrique.site/product/delete/${id_product}`)
        .then(() => {
          loadProducts();
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        });
    }
  }

  function validateFields() {
    let isValid = true;
    const errors = {
      code: '',
      description: '',
      costValue: '',
      saleValue: '',
    };

    if (!code) {
      errors.code = 'The Code field is required.';
      isValid = false;
    }

    if (!description) {
      errors.description = 'The Description field is required.';
      isValid = false;
    }

    if (isNaN(costValue)) {
      errors.costValue = 'The Cost Value field must contain only numbers.';
      isValid = false;
    }

    if (isNaN(saleValue)) {
      errors.saleValue = 'The Sale Value field must contain only numbers.';
      isValid = false;
    }

    setErrorMessages(errors);
    return isValid;
  }

  return (
    <div className={styles.container}>
      <h1>Welcome to Our Sales System!</h1>
      <h2>Below are our product and order tables! Register products to make sales (orders)</h2>
      <h2>A maximum of 5 items are allowed per table.</h2>
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
        disabled={products.length >= 5}
      >
        Add Product
      </Button>
      {errorMessages.code && <p>{errorMessages.code}</p>}
      {errorMessages.description && <p>{errorMessages.description}</p>}
      {errorMessages.costValue && <p>{errorMessages.costValue}</p>}
      {errorMessages.saleValue && <p>{errorMessages.saleValue}</p>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Cost Value</TableCell>
              <TableCell>Sale Value</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(products) &&
              products.slice(0, 5).map((product) => (
                <TableRow key={product.id_product}>
                  <TableCell>{product.id_product}</TableCell>
                  <TableCell>{product.code}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.cost_value}</TableCell>
                  <TableCell>{product.sale_value}</TableCell>
                  <TableCell>
                    <Button onClick={() => editProduct(product)}>Edit</Button>
                    <Button onClick={() => deleteProduct(product.id_product)}>Delete</Button>
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
          setSelectedProduct(null);
          setCode('');
          setDescription('');
          setCostValue('');
          setSaleValue('');
          setErrorMessages({
            code: '',
            description: '',
            costValue: '',
            saleValue: '',
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
          <h2>{isEditing ? 'Edit Product' : 'Add Product'}</h2>
          <TextField
            label="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            fullWidth
          />
          {errorMessages.code && <p>{errorMessages.code}</p>}
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          {errorMessages.description && <p>{errorMessages.description}</p>}
          <TextField
            label="Cost Value"
            value={costValue}
            onChange={(e) => setCostValue(e.target.value)}
            fullWidth
          />
          {errorMessages.costValue && <p>{errorMessages.costValue}</p>}
          <TextField
            label="Sale Value"
            value={saleValue}
            onChange={(e) => setSaleValue(e.target.value)}
            fullWidth
          />
          {errorMessages.saleValue && <p>{errorMessages.saleValue}</p>}
          <Button
            style={{ marginTop: '2%', width: '100px' }}
            variant="contained"
            onClick={isEditing ? updateProduct : addProduct}
          >
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default ProductComponent;
