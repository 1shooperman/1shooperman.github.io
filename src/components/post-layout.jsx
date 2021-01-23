import React from "react"
import Link from "gatsby-link"
import { graphql } from "gatsby"

import { siteTitle } from "./queries/metadata"

import Header from "./header"
import Menu from "./menu"
import "./layout.css"

export default function Template({ data }) {
  const post = data.markdownRemark
  const { site } = siteTitle

  return (
    <div>
      <Header siteTitle={site.siteMetadata?.title || `Title`} />
      <Menu />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>
          <Link to="/about">Go Back</Link>
          <h1>{post.frontmatter.title}</h1>
          <h4>
            Posted by {post.frontmatter.author} on {post.frontmatter.date}
          </h4>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </main>
        <footer
          style={{
            marginTop: `1rem`,
          }}
        >
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </div>
  )
}

export const postQuery = graphql`
  query AboutPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        author
        date
      }
    }
  }
`
