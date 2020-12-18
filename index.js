const formatUrl = require("./util");

const ID = "classification";
exports.name = ID;
exports.apply = (api) => {

  let config = api.config;
  if (!(config && config.plugins && config.plugins.find((e) => e.resolve === "saber-plugin-query-posts"))) {
    console.error("[saber-plugin-classification] Cannot find module 'my-package'.\n[saber-plugin-classification] 'saber-plugin-query-posts' is required for 'saber-plugin-classification'");
  }

  api.hooks.onCreatePages.tap(ID, () => {
    let categories = [];
    let tags = [];

    const pages = [...api.pages.values()].filter((page) => !page.draft);
    const posts = [...api.pages.values()].filter(
      (page) => !page.draft && page.layout === "post"
    );

    posts.forEach((p) => {
      const pcs = p.attributes.categories;
      const pts = p.attributes.tags;

      let current_post = {
        title:p.title,
        layout:p.layout,
        slug:p.slug,
        date:p.date,
        createdAt:p.createdAt,
        updatedAt:p.updatedAt,
        permalink:p.permalink,
        assets:p.assets,
        excerpt:p.excerpt,
        content:p.content,
        contentType:p.contentType,
        markdownHeadings:p.markdownHeadings,
      }
      // category
      if (pcs && Array.isArray(pcs)) {
        pcs.forEach((pc) => {
          let item = categories.find((o) => o.category === pc);
          if (item) {
            item.count += 1;
            item.list.push(current_post);
          } else {
            categories.push({
              category: pc,
              count: 1,
              list: [current_post],
              link: "/categories/" + formatUrl(pc),
            });
          }
        });
      } else if (pcs && typeof pcs == "string") {
        let item = categories.find((o) => o.category === pcs);
        if (item) {
          item.count += 1;
          item.list.push(current_post);
        } else {
          categories.push({
            category: pcs,
            count: 1,
            list: [current_post],
            link: "/categories/" + formatUrl(pcs),
          });
        }
      }
      // tag
      if (pts && Array.isArray(pts)) {
        pts.forEach((pt) => {
          let item = tags.find((o) => o.tag === pt);
          if (item) {
            item.count += 1;
            item.list.push(current_post);
          } else {
            tags.push({
              tag: pt,
              count: 1,
              list: [current_post],
              link: "/tags/" + formatUrl(pt),
            });
          }
        });
      } else if (pts && typeof pts == "string") {
        let item = tags.find((o) => o.tag === pts);
        if (item) {
          item.count += 1;
          item.list.push(current_post);
        } else {
          tags.push({
            tag: pts,
            count: 1,
            list: [current_post],
            link: "/tags/" + formatUrl(pts),
          });
        }
      }
    });

    // add property to pages.
    pages.forEach((p) => {
      p.allCategories = categories;
      p.allTags = tags;
    });
  });
};
