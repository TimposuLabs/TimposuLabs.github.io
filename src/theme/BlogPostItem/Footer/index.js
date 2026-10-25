import React from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import OriginalBlogPostItemFooter from '@theme-original/BlogPostItem/Footer';
import ShareButtons from '@site/src/components/ShareButtons';

export default function BlogPostItemFooter() {
  const {isBlogPostPage} = useBlogPost();

  return (
    <>
      <OriginalBlogPostItemFooter />
      {isBlogPostPage && <ShareButtons />}
    </>
  );
}
