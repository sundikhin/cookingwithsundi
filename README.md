# cooking with sundi

Recipe site for [cookingwithsundi.com](https://cookingwithsundi.com), served by GitHub Pages.
Plain HTML, CSS, and a little JS. There is no build step.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Layout

```
index.html                     home
recipes/index.html             all recipes (category rows + every card)
recipes/<slug>/index.html      one recipe page
mains/ sweets/ drinks/         category listings
about/index.html               about page
404.html                       not-found page
assets/css/styles.css          brand theme: colors, type, components
assets/js/main.js              phone menu, surprise me, share, print, ingredient ticks
assets/img/                    photos and favicon
```

## Add a recipe

1. Copy `recipes/dilly-red-potato-salad/` to `recipes/<new-slug>/` and edit the text.
2. Add a card for it to `recipes/index.html` and its category page (and the home page if it's new).
3. Add `"recipes/<new-slug>/"` to the `RECIPES` list in `assets/js/main.js` so "Surprise me" can pick it.
4. Put a photo in `assets/img/` and swap the `frame__placeholder` span for an `<img>`.

## Changing the CSS

Every page links `styles.css?v=4`. After editing `assets/css/styles.css`, bump that number on every page
(for example to `?v=5`) so browsers fetch the new stylesheet instead of a cached one.

## Analytics

Page views go to [GoatCounter](https://cookingwithsundi.goatcounter.com). Every public page has this
just before `</body>` (copying an existing recipe folder carries it over; add it by hand to any brand-new page):

```html
<script data-goatcounter="https://cookingwithsundi.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

Visits from `localhost` aren't counted. Leave it off `tools/` and `_og/`.

## Brand rules (short version)

- Cream page, cocoa text, terracotta leads; blush and sage support.
- Mustard only for "a note from sundi".
- Fraunces Black, lowercase, for names and titles; DM Sans for everything else.
- Never terracotta text on cocoa.
