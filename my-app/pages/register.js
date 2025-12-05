import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { registerUser } from '@/lib/authenticate';
import { useRouter } from 'next/router';

export default function Register() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await registerUser(userName, password, password2);
      router.push('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  }

  return (
    <Container>
      <h2>Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control value={userName} onChange={(e)=>setUserName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" value={password2} onChange={(e)=>setPassword2(e.target.value)} />
        </Form.Group>
        <Button type="submit">Register</Button>
      </Form>
    </Container>
  );
}
