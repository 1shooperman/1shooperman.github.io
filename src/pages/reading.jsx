import React, { useEffect } from "react"
import "./css/goodreads.css"

import Layout from "../components/layout"
import SEO from "../components/seo"


export default () => {

  useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://www.goodreads.com/review/grid_widget/59372161.Last%2020%20Read?cover_size=medium&hide_link=true&hide_title=true&num_books=20&order=d&shelf=read&sort=date_read&widget_id=1612119265";
      script.async = true;
      document.body.appendChild(script);
      return () => document.body.removeChild(script);
  }, []);

  return (  
    <Layout>
      <SEO title="Reading" />
      <div id="gr_grid_widget_1612117997"></div>
    </Layout>
  )
}
