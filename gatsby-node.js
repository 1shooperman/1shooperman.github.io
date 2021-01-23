const path = require("path")

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  const postTemplate = path.resolve("src/components/post-layout.jsx")

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              author
              date
              path
              title
            }
          }
        }
      }
    }`).then(res => {
      if(res.errors) {
        return Promise.reject(res.errors)
      }

      res.data.allMarkdownRemark.edges.forEach(({node}) => {
        createPage({
          path: node.frontmatter.path,
          component: postTemplate
        })
      });
    })
}
