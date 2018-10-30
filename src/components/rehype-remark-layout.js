import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Header from "./header";
import "./layout.css";

var unified = require("unified");
var markdown = require("remark-parse");
var remark2rehype = require("remark-rehype");
var rehype2react = require("rehype-react");

const PReplacement = ({ children, ...props }) => (
  <p {...props} data-mine="true" style={{ color: "blue" }}>
    {children}
  </p>
);

var processor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(rehype2react, {
    createElement: React.createElement,
    components: { p: PReplacement }
  });

const Layout = ({ data, ...props }) => (
  <>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: "description", content: "Sample" },
        { name: "keywords", content: "sample, something" }
      ]}
    >
      <html lang="en" />
    </Helmet>
    <Header siteTitle={data.site.siteMetadata.title} />
    <div
      style={{
        margin: "0 auto",
        maxWidth: 960,
        padding: "0px 1.0875rem 1.45rem",
        paddingTop: 0
      }}
    >
      {processor.processSync(data.markdownRemark.rawMarkdownBody).contents}
    </div>
  </>
);

export default Layout;

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      rawMarkdownBody
    }
  }
`;
