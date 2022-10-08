import React from "react";
import { Card, Col, Row } from "reactstrap";

export default function ProductsOwner() {
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
                <h1>Products</h1>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
