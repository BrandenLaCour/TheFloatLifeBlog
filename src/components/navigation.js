import React, { useContext } from "react";
import { graphql, StaticQuery } from "gatsby";
import { Link } from "gatsby";
import styles from "./navigation.module.css";
import Img from "gatsby-image";
import get from "lodash/get";

const Navigation = (props) => {
  const logo = get(props, "props.data.allContentfulCompany.edges");

  return (
    <nav role="navigation">
      <ul className={styles.navigation}>
        <li className={styles.navigationItemLogo}>
          <StaticQuery
            query={graphql`
              query BlogQuery2 {
                allContentfulCompany(filter: { contentful_id: {} }) {
                  edges {
                    node {
                      name
                      shortBio {
                        shortBio
                      }
                      title
                      heroImage: image {
                        fluid(
                          maxWidth: 600
                          maxHeight: 100
                          resizingBehavior: PAD
                        ) {
                          ...GatsbyContentfulFluid
                        }
                      }
                    }
                  }
                }
              }
            `}
            render={(props) => (
              <Img
                style={{ height: "50px", width: "100px" }}
                alt={props.allContentfulCompany.edges[0].node.name}
                fluid={props.allContentfulCompany.edges[0].node.heroImage.fluid}
              />
            )}
          />
          {/* <Img
              className={styles.heroImage}
              alt={logo.data.name}
              fluid={logo.data.heroImage.fluid}
            /> */}
        </li>
        <li className={styles.navigationItem}>
          <Link to="/">Home</Link>
        </li>
        {/* <li className={styles.navigationItem}>
        <Link to="/blog/">Recent Posts</Link>
      </li> */}
        <li className={styles.navigationItem}>
          <Link to="/categories/">Categories</Link>
        </li>
        <li className={styles.navigationItem}>
          <Link to="/Submit/">Submit a Post</Link>
        </li>
      </ul>
    </nav>
  );
};
// export const query = graphql`
//   query BlogQuery {
//     allContentfulCompany(filter: { contentful_id: {} }) {
//       edges {
//         node {
//           name
//           shortBio {
//             shortBio
//           }
//           title
//           heroImage: image {
//             fluid(maxWidth: 600, maxHeight: 100, resizingBehavior: PAD) {
//               ...GatsbyContentfulFluid_tracedSVG
//             }
//           }
//         }
//       }
//     }
//   }
// `;

export default Navigation;
