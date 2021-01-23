import { useStaticQuery, graphql } from "gatsby"

export const siteTitle = useStaticQuery(graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`)
