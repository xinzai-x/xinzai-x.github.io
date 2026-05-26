const Hexo = require('hexo');
const hexo = new Hexo('C:/Users/Administrator/Desktop/Blog', { silent: true });
hexo.init().then(() => {
  console.log('Category generator per_page:', hexo.config.category_generator?.per_page);
  console.log('Tag generator per_page:', hexo.config.tag_generator?.per_page);
  console.log('Archive generator per_page:', hexo.config.archive_generator?.per_page);
  console.log('Category generator enabled:', hexo.config.category_generator?.enable_index_page);
  console.log('Tag generator enabled:', hexo.config.tag_generator?.enable_index_page);
  return hexo.exit();
}).catch(err => console.error(err));
