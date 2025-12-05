import React from 'react';
import { Card } from 'react-bootstrap';

export default function PageHeader({ text }) {
  return (
    <>
      <Card className="bg-light">
        <Card.Body>
          <h4>{text}</h4>
        </Card.Body>
      </Card>
      <br />
    </>
  );
}
