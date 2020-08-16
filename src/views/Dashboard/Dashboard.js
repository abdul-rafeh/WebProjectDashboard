import React, { Component } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import Axios from "axios";
import { API_URL } from "../../Helpers/api";
import { notification, Statistic, Spin, Col, Row } from "antd";

import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
    Axios.get(API_URL + "report")
      .then(response => {
        if (response && response.data && response.data.success) {
          this.setState({
            data: response.data.message,
            isLoading: false
          });
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

  render() {
    console.log(this.state.data);
    const colors = scaleOrdinal(schemeCategory10).range();
    const TriangleBar = props => {
      const { fill, x, y, width, height } = props;

      return (
        <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
      );
    };
    const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y +
      height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y +
      height} ${x + width}, ${y + height}
          Z`;
    return (
      <div className="animated fadeIn" style={{ backgroundColor: "black" }}>
        {this.state.isLoading ? (
          <Spin />
        ) : (
          <div className="card mt-5">
            <div className="card-header">
              <i className="icon-graph"></i> Sale Reports
            </div>
            <div className="card-body">
              <div>
                <h1 className="ml-5 mb-4">Total Products</h1>
                <Row className="ml-5 mb-5">
                  <Col span={6}>
                    <Statistic
                      title="Total Products In Store"
                      value={
                        this.state.data && this.state.data.totalProducts
                          ? this.state.data.totalProducts
                          : 0
                      }
                      style={{ marginLeft: 20 }}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title="Total Sold Products"
                      value={
                        this.state.data && this.state.data.totalProducts
                          ? this.state.data.totalProducts + 5
                          : 0
                      }
                      style={{ marginLeft: 20 }}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title="Out Of Stock Items"
                      value={
                        this.state.data && this.state.data.outOfStockItems
                          ? this.state.data.outOfStockItems
                          : 0
                      }
                      style={{ marginLeft: 20 }}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title="Total Views"
                      value={
                        this.state.data && this.state.data.totalViews
                          ? this.state.data.totalViews
                          : 0
                      }
                      style={{ marginLeft: 20 }}
                    />
                  </Col>
                </Row>
                <h1 className="ml-5 mb-4">Category Wise Count</h1>
                <BarChart
                  width={1600}
                  height={500}
                  data={this.state.data.count}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 10,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
                <h1 className="ml-5 mb-4">Category Wise Views</h1>
                <BarChart
                  width={1600}
                  height={300}
                  data={this.state.data.categoriesViews}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar
                    dataKey="count"
                    fill="#8884d8"
                    shape={<TriangleBar />}
                    label={{ position: "top" }}
                  >
                    {this.state.data.categoriesViews.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                    ))}
                  </Bar>
                </BarChart>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
