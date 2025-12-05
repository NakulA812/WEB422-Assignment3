import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { authenticateUser } from '@/lib/authenticate';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { getFavourites } from '@/lib/userData';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [, setFavouritesList] = useAtom(favouritesAtom);

  async function updateAtom() {
    const favs = await getFavourites();
    setFavouritesList(favs);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await authenticateUser(userName, password);
      await updateAtom();
      router.push('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  }

  return (
    <Container>
      <h2>Login</h2>
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
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}
