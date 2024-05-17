# My Blog Project 🤘

Welcome to my blog! This is a simple site where I share what I've been working on. If you enjoy markdown files and static site generators, you'll feel right at home.

## What is this?

This blog was built to practice creating applications with React and TypeScript. Here's how it works:
- **Next.js App Router**: Generates all static pages during the build process.
- **Markdown Content**: All posts are written in markdown files.

## Why should you care?

This setup results in a site that's fast and secure. I even achieved a perfect score on Google Lighthouse at one point! That was before adding Google Analytics, which brought it down to 94. Still, not too shabby!

![Lighthouse score](/public/lighthouse.png)

## Features

- **Static Generation**: All pages are pre-rendered at build time.
- **Markdown Content**: Easy to write, though setting up metadata manually is required for proper relationships.
- **React and TypeScript**: Built with modern web technologies.
- **Performance**: Almost perfect Google Lighthouse score (94 after adding Google Analytics).

## How to Use

To check out the code or run your own version of this blog, clone the repo:

```bash
git clone https://github.com/rcmonteiro/rcmonteiro-web
cd rcmonteiro-web
pnpm i
pnpm run build
pnpm start
```

And there you go! Your very own markdown-powered blog.

## Conclusion

Thanks for visiting! If you encounter any issues, have suggestions, or just want to provide feedback, please open an issue. Feel free to modify the code as you wish—it's all under the MIT license.