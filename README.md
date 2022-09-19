## Intro

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started - Local Development

1. `npm install`
2. Run the development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Directory and Files Structure

**EVERY FILE AND DIRECTORY SHOULD BE NAMED IN kebab-case.**

- core - files related to whole project, reusable across whole project
- modules
  - files split into modules, like posts, comments, auth etc.
  - in every module directory should be placed files that connected only to this module,
  - for example: all components related only to posts should be in `modules/posts/components`, types related to posts should be in `modules/posts/types.ts` or in directory `modules/posts/types` depending on module types complexity.
