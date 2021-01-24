import React from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import IconBar from "../components/icon-bar"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div class="row">
      <div class="col">
        <Image />
      </div>
      <div class="col">
        <h2>Brandon Shoop (he/him)</h2>
        <p>
          Sorry about the mess! I spun up this (Gatsby) site to point my domain to, but I haven't quite settled on the design.
        </p>
        <p>
          <IconBar />
        </p>
      </div>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}></div>
    </div>
  </Layout>
)

export default IndexPage
