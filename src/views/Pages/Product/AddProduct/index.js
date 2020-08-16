import React, { Component, lazy, Suspense } from "react";
import {
  Input,
  Upload,
  Icon,
  Col,
  Row,
  Button,
  notification,
  Select,
  message,
  InputNumber
} from "antd";
import Axios from "axios";
import { API_URL } from "../../../../Helpers/api";
import { NUMBER } from "../../../../Helpers/Regex";

const Option = Select.Option;

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      name: "",
      description: "",
      price: "",
      serialNumber: "",
      base64Images: []
    };
  }

  handleChange = async ({ file, fileList }) => {
    let convertedObj = await this.getBase64(file.originFileObj);
    convertedObj = convertedObj.substring(22, convertedObj.length);
    if (!this.state.base64Images.includes(convertedObj)) {
      this.setState({
        base64Images: [...this.state.base64Images, convertedObj]
      });
    }
    this.setState({ fileList });
  };

  getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  handleSubmit = async () => {
    const data = {
      name: this.state.name,
      description: this.state.description,
      images: this.state.base64Images,
      price: this.state.price,
      serialNumber: this.state.serialNumber,
      totalProducts: this.state.totalProducts,
      category: this.state.category
    };
    if (!this.state.name) {
      return message.error("Please enter a name of your product");
    }
    if (!this.state.description) {
      return message.error("Please enter description of your product");
    }
    if (!this.state.serialNumber) {
      return message.error("Please enter a serial of your product");
    }
    if (!this.state.totalProducts) {
      return message.error(
        "Please enter total products in stock and it should be a number"
      );
    }
    if (!this.state.price) {
      return message.error(
        "Please enter total price of product and it should be a number"
      );
    }
    if (!this.state.category) {
      return message.error("Please select the category");
    }
    if (this.state.base64Images.length === 0) {
      return message.error("Please attach an image");
    }
    Axios.post(API_URL + "product", data)
      .then(response => {
        if (response.data && response.data.success) {
          notification["success"]({
            message: "Success",
            description: response.data.message,
            placement: "bottomRight"
          });
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

  render() {
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { fileList } = this.state;
    return (
      <div
        className="animated fadeIn"
        style={{ width: "100%", alignItems: "center" }}
      >
        <Row>
          <Col span={5} />
          <Col span={15}>
            <div className="card">
              <div className="card-header">Add Product</div>
              <div className="card-body">
                <label>Product Name</label>
                <Input
                  placeholder="Product Name"
                  onChange={event =>
                    this.setState({ name: event.target.value })
                  }
                  value={this.state.name}
                />
                <label className="mt-3">Product Serial</label>
                <Input
                  placeholder="Product Serial"
                  onChange={event =>
                    this.setState({ serialNumber: event.target.value })
                  }
                  value={this.state.serialNumber}
                />
                <label className="mt-3">Description</label>
                <Input.TextArea
                  placeholder="Product Description"
                  value={this.state.description}
                  onChange={event =>
                    this.setState({ description: event.target.value })
                  }
                />
                <label className="mt-3">Product Price</label>
                <InputNumber
                  placeholder="Enter product price"
                  style={{ width: "100%" }}
                  min={1}
                  value={this.state.price}
                  onChange={event => this.setState({ price: event })}
                />
                <label className="mt-3">Products In Stock</label>
                <InputNumber
                  placeholder="Enter product Stock (0-999)"
                  style={{ width: "100%" }}
                  min={1}
                  value={this.state.totalProducts}
                  onChange={event => this.setState({ totalProducts: event })}
                />
                <label className="mt-3">Product Category</label>
                <Select
                  placeholder="Select Category"
                  onChange={value => this.setState({ category: value })}
                  style={{ width: "100%" }}
                >
                  <Option value="Clothes">Clothes</Option>
                  <Option value="Watches">Watches</Option>
                  <Option value="Kitchen Items">Kitchen Items</Option>
                  <Option value="Cosmetics">Cosmetics</Option>
                  <Option value="Groceries">Groceries</Option>
                  <Option value="Technology">Technology</Option>
                </Select>
                <label className="mt-3">Product Images</label>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={file => this.handleChange(file)}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
              </div>
              <div className="card-footer">
                <Button
                  type="primary float-right"
                  onClick={() => {
                    this.handleSubmit();
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Col>
          <Col span={5} />
        </Row>
      </div>
    );
  }
}

export default AddProduct;
