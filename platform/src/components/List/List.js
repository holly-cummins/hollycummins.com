import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { icon } from "../../utils/type";

const List = props => {
  const { edges, theme, showIcon, useShortDate } = props;

  return (
    <React.Fragment>
      <ul data-testid="post-list-wrapper">
        {edges.map(edge => {
          const {
            node: {
              frontmatter: { title, url, type },
              fields: { slug, prefix, shortDate }
            }
          } = edge;

          const Icon = showIcon ? icon(type) : null;
          const formattedDate = useShortDate ? shortDate : prefix;

          const divs = (
            <div className="row">
              {Icon && <Icon />}
              <div className="date">{formattedDate}</div>
              <div className="title">{title}</div>
            </div>
          );

          return (
            <li key={slug} className="post-list">
              {url ? (
                <a href={url} className="link">
                  {divs}
                </a>
              ) : (
                <Link to={slug}>{divs}</Link>
              )}
            </li>
          );
        })}
      </ul>

      {/* --- STYLES --- */}
      <style jsx>{`
        ul {
          margin: ${theme.space.stack.m};
          padding: ${theme.space.m};
          list-style: none;
        }

        li {
          font-size: ${theme.font.size.s};
          line-height: ${theme.font.lineHeight.l};
        }

        .row {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 20px;
          padding-bottom: 20px;
        }

        .date {
          color: ${theme.color.brand.light};
          flex: ${useShortDate ? "7%" : "15%"};
        }

        .title {
          text-align: left;
          flex: ${useShortDate ? "93%" : "85%"};
        }

        li :global(svg) {
          position: relative;
          top: 4px;
          left: -10px;
          color: ${theme.text.color.primary};
          stroke-width: 40;
          animation-duration: ${theme.time.duration.long};
          animation-name: buttonIconMove;
          animation-iteration-count: infinite;
        }
      `}</style>
    </React.Fragment>
  );
};

List.propTypes = {
  edges: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
  useShortDate: PropTypes.bool,
  showIcon: PropTypes.bool
};

List.defaultProps = {
  showIcon: true
};

export default List;
