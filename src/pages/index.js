import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div class="row">
      <div class="col">
        <Image />
      </div>
      <div class="col">
        <h2>Second Column</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
          nihil? Fugit corporis dignissimos earum magnam pariatur quos id
          ducimus dolor! Laboriosam tempora repudiandae amet dolorum assumenda.
          Nam, animi doloremque. Inventore!
        </p>
      </div>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}></div>
    </div>
  </Layout>
)

export default IndexPage
