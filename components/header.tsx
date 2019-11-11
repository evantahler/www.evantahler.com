import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";

function HilightableNavLink({ href, text }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const active = window.location.pathname === href;
    setActive(active);
  }, []);

  return (
    <Nav.Link active={active} href={href}>
      {text}
    </Nav.Link>
  );
}

function Sidebar() {
  return (
    <Navbar fixed="top" bg="info" variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Brand href="/">Evan Tahler</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <HilightableNavLink href="/resume" text="Resume" />
          <HilightableNavLink href="/writing" text="Writing" />
          <HilightableNavLink href="/open-source" text="Open Source" />
          <HilightableNavLink href="/speaking" text="Speaking" />
          <HilightableNavLink href="/contact" text="Contact" />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Sidebar;
