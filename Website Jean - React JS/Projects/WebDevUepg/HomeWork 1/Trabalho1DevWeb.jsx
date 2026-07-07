import Layout from './Layout';
import Order from './Order/OrderComponent';
import Product from './Product/ProductComponent';
import OrderProduct from './OrderProduct/OrderProductComponent';

const WebDevAssignment = () => {
  return (
    <Layout>
      <Product />
      <Order />
      <OrderProduct />
    </Layout>
  );
};

export default WebDevAssignment;
