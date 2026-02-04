// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TimposuLabs',
  tagline: 'Tempat Belajar Yang Asik dan Menyenangkan',
  url: 'https://timposulabs.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  markdown: {
    // @ts-ignore
    hooks: {
      onBrokenMarkdownLinks: 'warn', // or 'throw', 'ignore', or a custom function
    },
  },
  favicon: 'img/timposulabs.png',
  organizationName: 'TimposuLabs', // Usually your GitHub org/user name.
  projectName: 'TimposuLabs.github.io', // Usually your repo name.
  trailingSlash: false, // custom Github Pages

  // Import custom script
  scripts: [
    // Google Ads
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4504493660273886',
      async: true,
      crossorigin: 'anonymous',
    }
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/TimposuLabs/TimposuLabs.github.io/tree/main/',
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 10,
          // Please change this to your repo.
          // editUrl: 'https://github.com/TimposuLabs/TimposuLabs.github.io/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-5NK2V38RCW',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // // algolia search
      // algolia: {
      //   apiKey: "86bb44d643cacc23505267e5049716b9",
      //   indexName: "TimposuLabs",
      //   appId: "EA5OG72GYH",
      // },
      navbar: {
        title: 'TimposuLabs',
        logo: {
          alt: 'TimposuLabs Logo',
          src: 'img/logo-topekox.svg',
        },
        items: [
          // {
          //   position: 'left',
          //   to: 'https://udemy.com/',
          //   label: 'Kelas Online',
          // },
          // {
          //   position: 'left',
          //   label: 'Promo',
          //   items: [
          //       {
          //           to: 'https://udemy.com/',
          //           label: 'Promo Kelas Online',
          //       },
          //       {
          //           to: 'https://udemy.com/',
          //           label: 'Promo Kelas Online di Udemy',
          //       },               
          //   ]
          // },
          // {
          //   type: 'doc',
          //   docId: 'intro',
          //   position: 'left',
          //   label: 'Docs',
          // },
          {
            position: 'left',
            label: 'Tutorial',
            items: [
              {
                to: '/java/',
                label: 'Java',
              },
              {
                to: '/kotlin/',
                label: 'Kotlin',
              },
              {
                to: '/nodejs/',
                label: 'Node.js',
              },
              {
                to: '/spring/',
                label: 'Spring',
              },
              {
                to: '/docker/',
                label: 'Docker',
              },
              {
                to: '/networking/',
                label: 'Networking',
              },
              // {
              //   to: '#',
              //   label: 'Python',
              // }
            ],
          },
          // {
          //   position: 'left',
          //   label: 'Linux Server',
          //   items: [
          //     {
          //       to: '#',
          //       label: 'Fedora 35',                
          //     },
          //     {
          //       to: '#',
          //       label: 'Ubuntu Server 20.04',
          //     },
          //   ],
          // },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://saweria.co/TimposuLabs',
            label: 'Donasi',
            position: 'right',
          },               
          {
            href: 'https://www.youtube.com/@TimposuLabs',
            label: 'Youtube',
            position: 'right',
          },
          {
            href: 'https://github.com/TimposuLabs',
            label: 'Github',
            position: 'right',
          },     
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Pages',
            items: [
              {
                label: 'About',
                to: '/about',
              },
              {
                label: 'Contact',
                to: '/contact',
              },
              {
                label: 'Archive',
                to: '/blog/archive',
              },
              {
                label: 'Terms & Conditions',
                to: '/terms-conditions',
              },
              {
                label: 'Privacy Policy',
                to: '/privacy-policy',
              },
            ],
          },
          {
            title: 'Social Media',
            items: [
              {
                label: 'Youtube',
                href: 'https://www.youtube.com/@TimposuLabs',
              },    
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/TimposuLabs',
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/timposulabs',
              },             
            ],
          },
          {
            title: 'Link',
            items: [
              {
                label: 'Donasi',
                href: 'https://saweria.co/TimposuLabs',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/TimposuLabs',
              },
              {
                label: 'Diskusi',
                href: 'https://github.com/TimposuLabs/forum/discussions/categories/tanya-jawab',
              },
            ],
          },
        ],
        copyright: `🐒 ${new Date().getFullYear()} &bull; TimposuLabs &bull; Build with Love 🚀`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['java', 'properties'],
      },
    }),

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
          id: 'java',
          path: 'tutorial/java/',
          routeBasePath: 'java',
          sidebarPath: require.resolve('./sidebars.js'),
          // editUrl: 'https://github.com/TimposuLabs/TimposuLabs.github.io/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
          id: 'kotlin',
          path: 'tutorial/kotlin/',
          routeBasePath: 'kotlin',
          sidebarPath: require.resolve('./sidebars.js'),
          // editUrl: 'https://github.com/TimposuLabs/TimposuLabs.github.io/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
          id: 'nodejs',
          path: 'tutorial/nodejs/',
          routeBasePath: 'nodejs',
          sidebarPath: require.resolve('./sidebars.js'),
          // editUrl: 'https://github.com/TimposuLabs/TimposuLabs.github.io/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
          id: 'htmx',
          path: 'tutorial/htmx/',
          routeBasePath: 'htmx',
          sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
          id: 'spring',
          path: 'tutorial/spring/',
          routeBasePath: 'spring',
          sidebarPath: require.resolve('./sidebars.js'),
      },
    ],   
    [
      '@docusaurus/plugin-content-docs',
      {
          id: 'docker',
          path: 'tutorial/docker/',
          routeBasePath: 'docker',
          sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
          id: 'networking',
          path: 'tutorial/networking/',
          routeBasePath: 'networking',
          sidebarPath: require.resolve('./sidebars.js'),
      },
    ],     
    [
      '@docusaurus/plugin-content-docs',
      {
          id: 'python',
          path: 'tutorial/python',
          routeBasePath: 'python',
          sidebarPath: require.resolve('./sidebars.js'),
          // editUrl: 'https://github.com/TimposuLabs/TimposuLabs.github.io/tree/main/',
      },
    ],
    // search local plugin
    // https://github.com/easyops-cn/docusaurus-search-local
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
       ({
         hashed: true,
         docsRouteBasePath: '/',
         searchResultLimits: 10,
      }),
    ],
  ],
};

module.exports = config;
