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
        <h2>Brandon Shoop</h2>
        <p>
          I am a software and management professional, having operated as an
          individual contributor, lead, manager, and director. I provide value
          to teams as a coach and mentor, and to organizations by identifing
          both short- and long-term technological solutions.
        </p>
        <p>
          I consider myself a jack-of-all (and master of very little.)
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
