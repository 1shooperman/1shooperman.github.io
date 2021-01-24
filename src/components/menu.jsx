import React from "react"

import Link from "gatsby-link"

export default () => (
  <div
    style={{
      background: "#f4f4f4",
      paddingTop: "10px",
    }}
  >
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/brandonshoop/" rel="nofollow noreferrer" target="_new">Contact</a>
      </li>
    </ul>
  </div>
)
