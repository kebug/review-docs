import { defineConfig } from 'vitepress';

import golangInfo from '../src/review-golang/info.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/review-docs/",
  title: "Review",
  srcDir: "./src",
  description: "For your salary",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'Golang', link: '/review-golang/' }
    ],

    sidebar: {
      "/review-golang/": 
        [
          {
            text: 'Golang',
            items: [
              ...golangInfo
            ]
          }
        ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
