# Lesson 8.5. Task: How to Start

To get started, clone the repository: `git clone https://github.com/Habsida-Projects/webpack-static-template.git`. Installation and commands are described in the [README](README.md).

The repository already has:

- webpack
- Sass (SCSS)
- autoprefixer
- Babel

[What is webpack?](https://www.freecodecamp.org/news/an-intro-to-webpack-what-it-is-and-how-to-use-it-8304ecdc3c60/)

[Webpack documentation](https://webpack.js.org/)

### What is Autoprefixer?

Autoprefixer is a tool that automatically adds vendor prefixes to CSS properties.

[See it in action](https://autoprefixer.github.io/).

## How to Start Development?

Previously, you wrote your HTML in the `index.html` file and CSS in the `style.css` file, which you linked to the page using a link tag.

Now, everything works the same way, but webpack links the styles and scripts to the page for you. You specify an entry point, and webpack goes through all the imports from this point, compiles them into one file, and links it to the page.

- The entry point for **JS** is `src/js/index.js`.
- The entry point for **styles** is `src/scss/style.scss`.
- HTML is in `src/index.html`.

## How to Split SCSS into Files?

Split based on BEM blocks: one file per block, in `src/scss/blocks/`. The file name starts with `_` (a _partial_): `_menu.scss`, `_header.scss`.

Add each block to the entry point `src/scss/style.scss` with `@use`:

```scss
// src/scss/style.scss
@use 'fonts';
@use 'blocks/page';
@use 'blocks/menu';
```

You write the path without `_` and without `.scss`.

### Variables need their own `@use` in every file

Shared variables live in `src/scss/_variables.scss`. A variable loaded in `style.scss` is **not** visible inside the block files: `@use` only works in the file where it is written. So every block that uses variables loads them itself:

```scss
// src/scss/blocks/_menu.scss
@use '../variables' as vars;

.menu {
  background: vars.$background;

  &__item {
    &--active {
      color: vars.$accent;
    }
  }
}
```

If you forget the `@use` line, the build fails with `Undefined variable`.

> You may see `@import` in older tutorials. It is deprecated in Sass and will be removed, so use `@use`.

### Paths in `url()`

Paths in `url()` are relative to **`src/scss/style.scss`**, even inside a block file. For example, a background image from `src/img/hero.jpg` is always written like this:

```scss
// src/scss/blocks/_hero.scss
.hero {
  background-image: url('../img/hero.jpg');
}
```

Webpack copies images and fonts used in styles into the build for you.

## How to Split JS into Files?

To add a file to the build, import it in `src/js/index.js`:

```js
import { myVariable } from './path/to/filename'
```

In the other file (the one you import), you need to export functions, variables, etc.:

```js
export const myVariable = 'Block 7'
```

[Imports and Exports](https://javascript.info/import-export)

P.S: If you write another `import` inside a file already imported in `src/js/index.js`, webpack will include it as well.

## Using Libraries with CSS (Swiper example)

You can import both `.scss` and plain `.css` files in JS. Many libraries ship plain CSS that you import this way.

1. Install the library:

   ```bash
   npm install swiper
   ```

2. Add the markup. The classes `swiper`, `swiper-wrapper` and `swiper-slide` are required; your own BEM classes can sit next to them:

   ```html
   <div class="brands__swiper swiper">
     <div class="swiper-wrapper">
       <div class="brands__item swiper-slide">Lenovo</div>
       <div class="brands__item swiper-slide">Samsung</div>
       <div class="brands__item swiper-slide">Apple</div>
     </div>
     <div class="swiper-pagination"></div>
   </div>
   ```

3. Import Swiper, its styles and the modules you use in `src/js/index.js`. The core does not include optional modules like pagination: you import the module **and** its CSS separately.

   ```js
   import Swiper from 'swiper'
   import { Pagination } from 'swiper/modules'
   import 'swiper/css'
   import 'swiper/css/pagination'

   // Only on mobile: decided once, when the page loads
   if (window.matchMedia('(max-width: 767px)').matches) {
     new Swiper('.brands__swiper', {
       modules: [Pagination],
       slidesPerView: 'auto',
       spaceBetween: 16,
       pagination: {
         el: '.swiper-pagination',
         clickable: true
       }
     })
   }
   ```

4. Style both states. Swiper adds the class `swiper-initialized` when it starts. If the page was loaded on a wide screen, Swiper never starts, so the slides keep Swiper's default flex row and overflow. Lay them out yourself on **`.swiper-wrapper`** (the slides are its children, not children of `.brands__swiper`):

   ```scss
   // src/scss/blocks/_brands.scss
   .brands__item {
     width: 240px; // slide width while Swiper is running
   }

   // Swiper was not started (the page was loaded on a wide screen)
   .brands__swiper:not(.swiper-initialized) {
     .swiper-wrapper {
       display: grid;
       grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
       gap: 16px;
     }

     .brands__item {
       width: auto;
     }

     .swiper-pagination {
       display: none;
     }
   }
   ```

   Use `:not(.swiper-initialized)` instead of a `@media` query: Swiper is started or not once, on page load, so the layout must follow that decision, not the current window width. With a media query, a slider loaded on mobile would turn into a broken grid when the window is widened.

## Where to Place Images?

Add images to the `src/img` folder and reference them in HTML as `./img/...`:

```html
<img src="./img/logo.svg" alt="Logo" />
```

Always start with `./`, never with `/`. Paths starting with `/` break on GitHub Pages.

## How to View the Result?

While developing, run `npm start`: the site opens at http://localhost:9000 and updates when you save.

`npm run build` puts the finished site into the `dist` folder:

- `dist/index.html`
- `dist/js/bundle.js`: all your JS
- `dist/style.css`: all your styles
- `dist/img`, `dist/fonts`, `dist/static`: images and fonts

## Questions

### Why is the entry point specifically `src/js/index.js`?

Because it is set in the `entry` option of [webpack.config.js](webpack.config.js).

You can change the entry point and rename files to see what happens.

### Why is the entry point for SCSS specifically `src/scss/style.scss`?

Because it is imported in the JS entry point, [src/js/index.js](src/js/index.js).

### How does webpack understand what to do with `*.scss` and `*.css` imports?

Through the `module.rules` section of [webpack.config.js](webpack.config.js). Each rule says which files it applies to (`test`) and which loaders process them. There are separate rules for SCSS, plain CSS, fonts and images.

### Do I need to configure Autoprefixer?

No. It is already set up in the `postcss` section of [package.json](package.json), and the supported browsers are listed in `browserslist` there.
