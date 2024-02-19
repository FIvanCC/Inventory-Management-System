import React, { useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";

function InventoryManagement() {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Lemon Tea", quantity: 5, price: 5.5 },
    { id: 2, name: "Apple Juice ", quantity: 10, price: 6 },
    { id: 3, name: "Milk ", quantity: 15, price: 10 },
    { id: 4, name: "Coke ", quantity: 20, price: 7 },
  ]);
  const [priceInput, setPriceInput] = useState({});
  const incrementQuantity = (id) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setInventory(
      inventory.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const changePrice = (id, newPrice) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? { ...item, price: newPrice } : item
      )
    );
  };
  return (
    <Container>
      <h1 className="text-center my-3">Inventory Management</h1>
      <Row>
        {inventory.map((item) => (
          <Col sm={6} md={4} lg={3} key={item.id}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Quantity: {item.quantity}</Card.Text>
                <Card.Text>Price: {item.price}</Card.Text>
                <Form.Group>
                  <Form.Label>Change Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={priceInput[item.id] || item.price}
                    onChange={(e) =>
                      setPriceInput({
                        ...priceInput,
                        [item.id]: Number(e.target.value),
                      })
                    }
                  />
                  <Button
                    variant="success"
                    onClick={() => changePrice(item.id)}
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
