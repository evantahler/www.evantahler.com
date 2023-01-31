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
    <Navbar fixed="top" bg="primary" variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Brand href="/">&nbsp;&nbsp;&nbsp;Evan Tahler</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <HilightableNavLink href="/resume" text="&nbsp;Resume" />
          <HilightableNavLink href="/blog" text="&nbsp;Blog" />
          <HilightableNavLink href="/open-source" text="&nbsp;Open Source" />
          <HilightableNavLink href="/speaking" text="&nbsp;Speaking" />
          <HilightableNavLink href="/contact" text="&nbsp;Contact" />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Sidebar;
