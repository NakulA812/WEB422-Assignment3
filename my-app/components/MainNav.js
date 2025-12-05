import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { readToken, removeToken } from '../lib/authenticate';
import { useRouter } from 'next/router';

export default function MainNav() {
  const router = useRouter();
  const [userName, setUserName] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const token = readToken();
    if (token && token.userName) {
      setUserName(token.userName);
    } else {
      setUserName(null);
    }
  }, [router.pathname, mounted]);

  function logout() {
    removeToken();
    setUserName(null);
    router.push('/login');
  }

  if (!mounted) return null;

  return (
    <Navbar className="fixed-top navbar-dark bg-primary" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/">Nakul Ariwala</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">

          <Nav className="me-auto">
            {!userName && (
              <Nav.Link as={Link} href="/register">Register</Nav.Link>
            )}

            <Nav.Link as={Link} href="/about">About</Nav.Link>
          </Nav>

          <Nav>
            {userName ? (
              <NavDropdown title={userName} id="user-dropdown">
                <NavDropdown.Item as={Link} href="/favourites">
                  Favourites
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} href="/login">Login</Nav.Link>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
