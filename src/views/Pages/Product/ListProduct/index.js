import React, { Component, lazy, Suspense } from "react";
import {
  Input,
  Upload,
  Icon,
  Col,
  Row,
  Button,
  Table,
  Divider,
  Tag,
  notification
} from "antd";
import Axios from "axios";
import { API_URL } from "../../../../Helpers/api";
import { getRandomColor } from "../../../../Helpers/Layout";

class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    Axios.get(API_URL + "product")
      .then(response => {
        if (response.data && response.data.success && response.data.message) {
          this.setState({
            products: response.data.message
          });
        }
      })
      .catch(error => {});
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  };

  handleSubmit = () => {};

  onDelete = _id => {
    Axios.delete(API_URL + "product/" + _id)
      .then(response => {
        if (response.data && response.data.success) {
          notification["success"]({
            message: "Success",
            description: response.data.message,
            placement: "bottomRight"
          });
          this.getProducts();
        } else {
          notification["error"]({
            message: "Error",
            description: response.data.message,
            placement: "bottomRight"
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  getData = () => {
    const { products } = this.state;
    if (products && products.length > 0) {
      let allProduct = [];
      products.map((item, key) => {
        allProduct.push({
          _id: item._id,
          serial_number: item.serialNumber,
          product_name: item.name,
          description: item.description,
          price: item.price,
          totalProducts: item.totalProducts,
          category: <Tag color={getRandomColor()}>{item.category}</Tag>,
          views: item.views ? item.views : 0
        });
      });
      return allProduct;
    } else {
      return [];
    }
  };

  render() {
    const columns = [
      {
        title: "Serial Number",
        dataIndex: "serial_number",
        key: "serial_number",
        render: text => <a>{text}</a>
      },
      {
        title: "Product Name",
        dataIndex: "product_name",
        key: "product_name",
        render: text => <a>{text}</a>
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description"
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price"
      },
      {
        title: "In Stock",
        dataIndex: "totalProducts",
        key: "totalProducts"
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category"
      },
      {
        title: "Views",
        dataIndex: "views",
        key: "views"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <a onClick={() => this.props.history.push("/edit/" + record._id)}>
              Edit
            </a>
            <Divider type="vertical" />
            <a onClick={() => this.onDelete(record._id)}>Delete</a>
          </span>
        )
      }
    ];
    return (
      <div
        className="animated fadeIn"
        style={{ width: "100%", alignItems: "center" }}
      >
        <div className="card">
          <div className="card-header">Products List</div>
          <div className="card-body">
            <Table columns={columns} dataSource={this.getData()} />
          </div>
        </div>
      </div>
    );
  }
}

export default ListProduct;
