---
title: "Front-end Legos: Keeping your CSS maintainable!"
date: 2013-06-13

---

It doesn't take long for a project to get unwieldy if you don't have a good system for creating your styles. I recently attended [Webvisions](http://webvisionsevent.com) where [Shay Howe](https://shayhowe.com) ran a workshop titled "Front-end Legos" that gave some pretty good advice on keeping CSS clean and maintainable. Here's the run down of the best tips I took away from the workshop:

## Organize

It's wise to start with a good foundation by organizing your CSS with sections, headers and comments.

Sections and headers will make navigating your CSS much easier for you and especially for other developers in your team. Comments help someone new to your CSS figure out what something is used for. It's particularly useful to comment on styles that seem unusual or styles that are a hack or browser fix.

Here's a good starting point for organizing your CSS:

- **Core** - Your typography, layout and normalize/resets
- **Components** - Buttons, forms, sliders, callouts etc.
- **Modules** - Header, footer

Check out this [CSS organization example](https://gist.github.com/pietvanzoen/d2c1ca48248d5a3a38b0).

## Stop thinking about pages and start thinking about components.

A big piece of keeping your CSS tidy involves changing the way you think about a website. Rather than viewing a website as a collection of pages (or even page templates), begin to look at a page as a collection of components. Even components that seem to only occur on one page should be built to be reusable on other pages, there may be a time when you want to export that component to another page.

[Checkout this annotated example](http://cl.ly/PlxB) where I've highlighted some of the main components on this page. The purple and orange differentiate presentational and layout components which I'll talk about later. Together all of these components build the whole page. But every component can be used on any page to build a new unique page.

This leads to a more 'modular' way of thinking about your CSS. Break your pages into little chunks and identify chunks on other pages that match, even if they vary slightly. Then build your CSS in components. If a component is slightly different somewhere else, give it a modifier class and adjust what needs to be adjusted rather than duplicating CSS.

## Separate layout from presentation

Try to keep layout styling such as widths and floats separate from presentational styling. The aim here is to create separate CSS classes that deal with layout that can be shared by multiple components on your site. This helps to reduce code repetition within your components.

Eg. Rather than:

```css
.news {
  width: 480px;
  margin: 0 10px;
  color: #333;
  background: #eee;
}
<div class="news"></div>
```

Try:

```css
.col_6 {
  margin: 0 10px;
  width: 480px
}
.feat_box {
  color: #333;
  background: #eee;
}
<div class="col_6 feat_box"></div>
```

In the first example `.news` has a specific use and probably a specific placement in a layout. In the second example we've created a layout class that can be used for multiple components and a `.feat_box` which can be used on more than just a news article.

Use a CSS grid system (such as [foundation's grid system](http://foundation.zurb.com/grid.php)) or create your own grid system, then keep your components reusable throughout your layout by focusing on presentation/theme only.

## Keep specificity low

High specificity makes it much harder to modify elements without writing long strings of selectors, which in turn makes your CSS bloated, more complicated and harder to maintain.

```css
#primary #main div.media ul li span {
  color: #ccc;
}
```

Here we have two IDs, a few element selectors and a class. To modify this style we'll need all of these selectors plus one or use `!important` to trump everything. Typing out all these selectors again just to overwrite the first style easily leads to code bloat and is frustrating to maintain. Use of `!important` should never be used reactively, but rather proactively such as for a class which you know will always need a particular style. E.g. `.error { color: red !important; }`.

Avoid IDs. IDs are 255 times more specific than a class and a class can do everything that an ID can do. Finally, avoid using element selectors in your CSS. Doing this frees your CSS from a specific HTML elements and maintains reusability. Here's a better approach to the previous example:

```css
.media-date {
  color: #ccc;
}
```

This is much nicer. It's descriptive, clean and reusable.

## Conclusion

All of these techniques are going to help you end up with cleaner code, fewer lines of CSS to manage, and some wonderfully modular code that is easier to maintain. "The Pipe Dream", as Shay Howe put it, is to build everything in HTML with your arsenal of classes at hand. The dream is that you'll never need to touch your CSS because you'll have created all the classes you need to build anything. It's quite a grand Pipe Dream but definitely worth striving for. Focusing on the organization, reusability and modularization of your CSS is the key.

Check out these great resources for more info on this theme.

- [Shay Howe's Learning site](https://learn.shayhowe.com) - A great resource for learning more about HTML &amp; CSS.
- [OOCSS (Object-Oriented CSS)](http://oocss.org) and [SMACSS (Scalable and Modular Architecture for CSS)](http://smacss.com).
- [Code smells in CSS](https://csswizardry.com/2012/11/code-smells-in-css/) - Great article from Harry Roberts on this subject.
