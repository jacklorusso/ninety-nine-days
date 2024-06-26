import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import GridItem from "../components/GridItem";

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;

    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;

    return (
      <Layout>
        <Helmet title={`${tag} | ${title}`} />
        <div className="flex items-center justify-center mt4 black-60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="w1 mr2"
          >
            <title>view tags</title>
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          </svg>{" "}
          <h1 className="f4 tc helvetica fw3">{tag}</h1>
        </div>
        <Link
          className="black-60 f6 helvetica fw3 flex mb4 justify-center link"
          to="/tags"
        >
          view all tags
        </Link>
        <section className="center mt3">
          <div class="grid">
            {posts.map(({ node: post }) => (
              <GridItem
                key={post.id}
                featuredImage={post.frontmatter.featuredImage}
                link={post.fields.slug}
                title={post.frontmatter.title}
                description={post.frontmatter.description}
              />
            ))}
          </div>
        </section>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`query TagPage($tag: String) {
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(
    limit: 1000
    sort: {frontmatter: {date: DESC}}
    filter: {frontmatter: {tags: {in: [$tag]}}}
  ) {
    totalCount
    edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          title
          templateKey
          description
          date(formatString: "MMMM DD, YYYY")
          featuredImage
        }
      }
    }
  }
}`;
