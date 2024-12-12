/* eslint-disable max-len */
/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill, PersonCircle } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href={currentUser ? '/home' : '/'}>JAM SESSION</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser && (
              [
                <Nav.Link id="view-sessions-nav" href="/sessions" key="view-sessions" active={pathName === '/sessions'}>
                  View Sessions
                </Nav.Link>,
                <Nav.Link id="my-sessions-nav" href="/my-sessions" key="my-sessions" active={pathName === '/my-sessions'}>
                  My Sessions
                </Nav.Link>,
                <Nav.Link id="add-session-nav" href="/add-session" key="add-session" active={pathName === '/add-session'}>
                  Add Session
                </Nav.Link>,
              ]
            )}
            {currentUser && role === 'ADMIN' ? (
              <Nav.Link id="admin-nav" href="/admin" key="admin" active={pathName === '/admin'}>
                Admin
              </Nav.Link>
            ) : (
              ''
            )}
          </Nav>
          <Nav>
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item id="profile-dropdown" href="/profile">
                  <PersonCircle />
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item id="signout-dropdown" href="/api/auth/signout">
                  <BoxArrowRight />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="change-password-dropdown" href="/auth/change-password">
                  <Lock />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="signin-dropdown" href="/auth/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="signup-dropdown" href="/auth/signup">
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
