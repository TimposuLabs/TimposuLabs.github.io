import React from 'react';
import Link from '@docusaurus/Link';

export default function BlogPostItemFooterReadMoreLink(props) {
  const {blogPostTitle, ...linkProps} = props;

  return (
    <Link
      {...linkProps}
      aria-label={
        blogPostTitle
          ? `Baca selengkapnya tentang ${blogPostTitle}`
          : 'Baca selengkapnya'
      }>
      <b>Baca selengkapnya</b>
    </Link>
  );
}
