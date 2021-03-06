import React from "react"
import Link from "gatsby-link"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const AboutPage = ({ data }) => (
  <Layout>
    <SEO title="about" />
    <div style={{marginTop:"1.5em"}}>
      {/* <h1>Random Info About Me</h1> */}
      {data.allMarkdownRemark.edges.map(post => (
        <div key={post.node.id}>
          <h3>{post.node.frontmatter.title}</h3>
          <small>
            {post.node.frontmatter.date}
          </small>
          <br />
          <br />
          <Link to={post.node.frontmatter.path}>Read More</Link>
          <br />
          <br />
          <hr />
        </div>
      ))}
    </div>
  </Layout>
)

export const pageQuery = graphql`
  query AboutIndexQuery {
    allMarkdownRemark(sort: {fields: frontmatter___order}) {
      edges {
        node {
          id
          frontmatter {
            author
            date
            path
            title
            order
          }
        }
      }
    }
  }
`

export default AboutPage
