import React from 'react';
import {
  useVisibleBlogSidebarItems,
  BlogSidebarItemList,
} from '@docusaurus/plugin-content-blog/client';
import {NavbarSecondaryMenuFiller} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import BlogSidebarContent from '@theme/BlogSidebar/Content';

const ListComponent = ({items}) => {
  return (
    <BlogSidebarItemList
      items={items}
      ulClassName="menu__list"
      liClassName="menu__list-item"
      linkClassName="blog-sidebar-link"
      linkActiveClassName="blog-sidebar-link--active"
    />
  );
};

function BlogSidebarMobileSecondaryMenu({sidebar}) {
  const items = useVisibleBlogSidebarItems(sidebar.items);

  return (
    <>
      <div className="blog-sidebar-title margin-bottom--md">{sidebar.title}</div>
      <BlogSidebarContent
        items={items}
        ListComponent={ListComponent}
        yearGroupHeadingClassName="margin-top--lg margin-bottom--xs"
      />
      <div className="margin-top--md">
        <Link className="blog-sidebar-more" to="/blog/archive">
          More &gt;&gt;&gt;
        </Link>
      </div>
    </>
  );
}

export default function BlogSidebarMobile(props) {
  return (
    <NavbarSecondaryMenuFiller
      component={BlogSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}
