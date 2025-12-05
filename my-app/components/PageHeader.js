import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function PageHeader({ text, subtext }) {
  return (
    <Container className="my-4">
      <Row>
        <Col>
          <div className="p-4 rounded-3 bg-light shadow-sm">
            <h1 className="display-6 mb-1">{text}</h1>
            {subtext && <p className="lead mb-0">{subtext}</p>}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
