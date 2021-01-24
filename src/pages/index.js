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
          I am an experienced Software Development Manager with a demonstrated
          history of success in internet technology. Skilled in Web
          Applications, Databases, Mobile Applications, Agile Methodologies, and
          Team Building / Facilitation.
        </p>
        <p>
          I am a strong engineering professional with a Bachelor of Science in
          Computer Science from the <a href="https://www.umw.edu/">University of Mary Washington.</a>
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
