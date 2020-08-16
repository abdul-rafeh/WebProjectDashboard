import React, { Component, lazy, Suspense } from "react";
import {
  Input,
  Upload,
  Icon,
  Col,
  Row,
  Button,
  notification,
  Spin,
  Select
} from "antd";
import Axios from "axios";
import { API_URL } from "../../../../Helpers/api";
import { reset } from "ansi-colors";

const Option = Select.Option;

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      isLoading: true
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    Axios.get(API_URL + "product/" + id)
      .then(response => {
        if (response && response.data && response.data.success) {
          this.setState({ product: response.data.message, isLoading: false });
        }
      })
      .catch(error => {
        notification.error({
          message: "Error",
          description:
            "There was a problem fetching your data. Please try again later."
        });
      });
  }

  handleSubmit = async () => {
    Axios.put(API_URL + "product/" + this.state.product._id, this.state.product)
      .then(response => {
        if (response.data && response.data.success) {
          notification.success({
            message: "Success",
            description: "Product edited successfully"
          });
        } else {
          notification.error({
            message: "Error",
            description: response.data.message
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div
        className="animated fadeIn"
        style={{ width: "100%", alignItems: "center" }}
      >
        {this.state.isLoading ? (
          <Spin />
        ) : (
          <Row>
            <Col span={5} />
            <Col span={15}>
              <div className="card">
                <div className="card-header">Update Product</div>
                <div className="card-body">
                  <label>Product Name</label>
                  <Input
                    placeholder="Product Name"
                    onChange={event =>
                      this.setState({
                        product: {
                          ...this.state.product,
                          name: event.target.value
                        }
                      })
                    }
                    value={this.state.product.name}
                  />
                  <label className="mt-3">Product Serial</label>
                  <Input
                    placeholder="Product Serial"
                    onChange={event =>
                      this.setState({
                        product: {
                          ...this.state.product,
                          serialNumber: event.target.value
                        }
                      })
                    }
                    value={this.state.product.serialNumber}
                  />
                  <label className="mt-3">Description</label>
                  <Input.TextArea
                    placeholder="Product Description"
                    value={this.state.product.description}
                    onChange={event =>
                      this.setState({
                        product: {
                          ...this.state.product,
                          description: event.target.value
                        }
                      })
                    }
                  />
                  <label className="mt-3">Product Price</label>
                  <Input
                    addonAfter="PKR"
                    placeholder="Enter product price (0-999)"
                    onChange={event =>
                      this.setState({
                        product: {
                          ...this.state.product,
                          price: event.target.value
                        }
                      })
                    }
                    value={this.state.product.price}
                  />
                  <label className="mt-3">Product Stock</label>
                  <Input
                    placeholder="Enter stock (0-999)"
                    onChange={event =>
                      this.setState({
                        product: {
                          ...this.state.product,
                          totalProducts: event.target.value
                        }
                      })
                    }
                    value={this.state.product.totalProducts}
                  />
                  <label className="mt-3">Product Category</label>
                  <Select
                    placeholder="Select Category"
                    defaultValue={this.state.product.category}
                    onChange={value =>
                      this.setState({
                        product: { ...this.state.product, category: value }
                      })
                    }
                    style={{ width: "100%" }}
                  >
                    <Option value="Clothes">Clothes</Option>
                    <Option value="Watches">Watches</Option>
                    <Option value="Kitchen Items">Kitchen Items</Option>
                    <Option value="Cosmetics">Cosmetics</Option>
                    <Option value="Groceries">Groceries</Option>
                    <Option value="Technology">Technology</Option>
                  </Select>
                </div>
                <div className="card-footer">
                  <Button
                    type="primary float-right"
                    onClick={() => {
                      this.handleSubmit();
                      reset();
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Col>
            <Col span={5} />
          </Row>
        )}
      </div>
    );
  }
}

export default AddProduct;
