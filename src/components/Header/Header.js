import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import cl from 'classnames';

import { LinkTo } from '../../helpers';
import { isActive } from '../../utils';

function Header({ isAuthenticated, currentUser, logoutUser }) {
  return (
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkTo className="navbar-brand" href="#">Leaf Admin</LinkTo>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {isAuthenticated ? (
            <Nav>
              {currentUser.is_admin ? (
                <NavItem active={isActive('bundles')} href="/bundles" onSelect={() => browserHistory.push('/bundles')}>
                  Bundles
                </NavItem>
              ) : null}
              {currentUser.is_admin ? (
                  <NavItem active={isActive('plans')} href="/plans" onSelect={() => browserHistory.push('/plans')}>
                    Plans
                  </NavItem>
                ) : null}
              {currentUser.is_admin || currentUser.is_partner ? (
                  <NavItem active={isActive('events')} href="/events" onSelect={() => browserHistory.push('/events')}>
                    Events
                  </NavItem>
                ) : null}
              {currentUser.is_admin || currentUser.is_partner ? (
                  <NavItem active={isActive('specials')} href="/specials" onSelect={() => browserHistory.push('/specials')}>
                    Specials
                  </NavItem>
                ) : null}
              {currentUser.is_admin ? (
                  <NavItem active={isActive('locations')} href="/locations" onSelect={() => browserHistory.push('/locations')}>
                    Locations
                  </NavItem>
                ) : null}
              {currentUser.is_admin ? (
                  <NavItem active={isActive('users')} href="/users" onSelect={() => browserHistory.push('/users')}>
                    Users
                  </NavItem>
                ) : null}
            </Nav>
          ) : (
            <Nav>
              <NavItem active={isActive('signin')} href="/auth/signin" onSelect={() => browserHistory.push('/auth/signin')}>Sign In</NavItem>
              <NavItem active={isActive('signup')} href="/auth/signup" onSelect={() => browserHistory.push('/auth/signup')}>Sign Up</NavItem>
            </Nav>
          )}
        {isAuthenticated ? (
            <Nav pullRight>
              <NavItem active={isActive('profile')} href="/profile" onSelect={() => browserHistory.push('/profile')}>
                Hello, {currentUser.full_name || (currentUser.first_name || currentUser.last_name ? [currentUser.first_name, currentUser.last_name].join(' ') : null) || currentUser.user_email || currentUser.email}
              </NavItem>
              <NavItem href="#" onSelect={() => logoutUser()}>
                Sign Out
              </NavItem>
            </Nav>
          ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;