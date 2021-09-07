import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import './index.scss'

export const Footer = () => (
  <StaticQuery
  query={footerQuery}
  render={
    data => {
      const {author, social: {github}} = data.site.siteMetadata;
      
      return (
          <footer className="footer">
            ©<a href={github}>{author}</a>, Built with{' '}
            <a href="https://github.com/JaeYeopHan/gatsby-starter-bee">
              Gatsby-starter-bee
            </a>
          </footer>
        )
    }
  }
  />
)



const footerQuery = graphql`
  query FooterQuery {
    site {
      siteMetadata {
        author
        social {
          github
        }
      }
    }
  }
`

export default Footer;