import React from 'react';
import Link from '@docusaurus/Link';

export default function BlogPostItemFooterReadMoreLink(props) {
  const {blogPostTitle, ...linkProps} = props;

  return (
    <Link
      {...linkProps}
      aria-label={
        blogPostTitle
          ? `Read more about ${blogPostTitle}`
          : 'Read more'
      }>
      <b>Read more</b>
    </Link>
  );
}
