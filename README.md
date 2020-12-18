# saber-plugin-classification

Classification plugin for [Saber.js](https://saberjs.org/).

Ejecting all tags and all categories in Saber.

## Install

```bash
$ cd path/to/your-blog
$ npm install saber-plugin-classification
```

## Caution

`saber-plugin-query-posts` **IS REQUIRED** for this plugin.

Although without `saber-plugin-query-posts`, no error will be thrown out and Node will not be stopped, but you will still receive a error message in console window.

## Usage

In your `saber-config.yml`:

```yml
plugins:
  - resolve: saber-plugin-classification
```

After pages all being created, `allCategories` and `allTags` property will be bound on `page`.

You can access these properties via `this.page.allCategories` and `this.page.allTags`

e.g. in layout template component:

```html
<div class="tags" :key="index" v-for="(item,index) in page.allTags">
  <saber-link class="post-link" :to="item.link">
    Tag:{{ item.tag }} Count:{{item.count}}
  </saber-link>
  <ul>
    <li class="tag-post-item" :key="k" v-for="(t,k) in item.list">
      <saber-link :to="t.permalink">
        {{t.title}}
      </saber-link>
    </li>
  </ul>
</div>
```
## Front Matters
```yaml
---
title: sample post
date: 2020-01-01 00:00:00
layout: post
tags: [tag1,tag2,] # tags adapts to String and Array
categories: category # categories adapts to String and Array
---
```

## Variables Description
```
allTags:{Array}
  tag: {String} tagname
  count: {Number} total sum of posts containing tagname
  list: {Array} list of posts containing tagname
  link: {String} a relative path to tagname
```
```javascript
this.page.allTags = [
  {
    tag: "sample",
    count: 16,
    list: [
      {
        title: post_title,
        layout: post_layout,
        slug: post_slug,
        date: post_date,
        createdAt: post_createdAt,
        updatedAt: post_updatedAt,
        permalink: post_permalink,
        assets: post_assets,
        excerpt: post_excerpt,
        content: post_content,
        contentType: post_contentType,
        markdownHeadings: post_markdownHeadings,
      },
    ],
    link: "/tags/sample",
  },
];
```
`allCategories` data figure is same as `allTags`.

## License

MIT © [Sirice](https://github.com/siricee)
