# Svelte + Vite apps for WebOS televisions

This template should help get you started developing WebOS TV apps.

This application will show the current time by having it slide in from the right, stay visible for a second or three, then fade out and close the application.

TODO: I _really_ want a proxy to all luna interfaces (as if rooted) from a remote host when developing. I have started work on it, but never finished.

TODO: Things to write more about here:
- versioning
- appinfo.json
- IPK
- ares utilities and installing them
- inline code (for compatibility reasons)
- about "ui30"
	- intended useage for _this_ example is to have it bound under a "long press button", that said, it's just a matter of removing 'window.close' in App.svelte and it will stay alive.
- Screenshot of the app in dev and a clip of it on a live tv
- how to deploy to tv
- how to launch app on tv

## Creating a new project
```
npx degit romland/webos-svelte my-webos-app
cd my-webos-app
npm install
```

### Development
Vite will handle live recompiling, so just start in dev-mode and modify the project to your hearts content.
```
npm run dev
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## TypeScript

The (very little) code in App.svelte is currently plain JavaScript, but nothing is preventing you from using TypeScript should you prefer that.

## Need routing or more of a complete framework?

Check out [SvelteKit](https://github.com/sveltejs/kit#readme), which is also powered by Vite. Deploy anywhere with its serverless-first approach and adapt to various platforms, with out of the box support for TypeScript, SCSS, and Less, and easily-added support for mdsvex, GraphQL, PostCSS, Tailwind CSS, and more.

## Technical considerations

**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**

Setting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/rixo/svelte-hmr#svelte-hmr).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```js
// store.js
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
```
