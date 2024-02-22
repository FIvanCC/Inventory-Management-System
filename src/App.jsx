import React, { useState, useEffect } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { API_URL } from "../constants.json";

function InventoryManagement() {
  const [inventory, setInventory] = useState([]);
  const [priceInput, setPriceInput] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/getELabels/`)
      .then((response) => response.json())
      .then((data) => setInventory(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const changePrice = (name, newPrice) => {
    fetch(`${API_URL}/putELabel/${name}/price/${newPrice}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data:", data);
        setInventory(
          inventory.map((item) =>
            item.name === name ? { ...item, price: newPrice } : item
          )
        );
        alert("Change Success");
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <Container>
      <h1 className="text-center my-3">Inventory Management</h1>
      <Row>
        {inventory.map((item, index) => (
          <Col sm={6} md={4} lg={3} key={index}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Quantity: {item.quantity}</Card.Text>
                <Card.Text>Price: {item.price}</Card.Text>
                <Form.Group>
                  <Form.Label>Change Price</Form.Label>
                  <Form.Control
                    type="number"
                    defaultValue={item.price}
                    onChange={(e) =>
                      setPriceInput({ name: item.name, price: e.target.value })
                    }
                  />
                  <Button
                    variant="success"
                    onClick={() => changePrice(item.name, priceInput.price)}
                  >
                    Change Price
                  </Button>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default InventoryManagement;
