const Hexo = require('hexo');
const path = require('path');
const fs = require('fs');

const baseDir = 'C:/Users/Administrator/Desktop/Blog';
const hexo = new Hexo(baseDir, { silent: true });

hexo.init().then(async () => {
  console.log('=== Hexo initialized ===');
  
  // Load all posts
  await hexo.load();
  
  console.log('Total posts:', hexo.locals.get('posts').length);
  console.log('Total categories:', hexo.locals.get('categories').length);
  console.log('Total tags:', hexo.locals.get('tags').length);
  
  // Check each category
  const categories = hexo.locals.get('categories');
  console.log('\n=== Categories ===');
  categories.each(cat => {
    console.log('Category:', cat.name, 'Path:', cat.path, 'Posts:', cat.length);
  });
  
  // Check each tag
  const tags = hexo.locals.get('tags');
  console.log('\n=== Tags ===');
  tags.each(tag => {
    console.log('Tag:', tag.name, 'Path:', tag.path, 'Posts:', tag.length);
  });
  
  // Try to run the generators
  console.log('\n=== Running category generator ===');
  const catGen = require(path.join(baseDir, 'node_modules/hexo-generator-category/lib/generator.js'));
  const catPages = catGen.call(hexo, hexo.locals);
  console.log('Category pages generated:', catPages.length);
  catPages.forEach(p => console.log('  Path:', p.path, 'Layout:', p.layout));
  
  console.log('\n=== Running tag generator ===');
  const tagGen = require(path.join(baseDir, 'node_modules/hexo-generator-tag/lib/generator.js'));
  const tagPages = tagGen.call(hexo, hexo.locals);
  console.log('Tag pages generated:', tagPages.length);
  tagPages.forEach(p => console.log('  Path:', p.path, 'Layout:', p.layout));
  
  console.log('\n=== Running archive generator ===');
  const archiveGen = require(path.join(baseDir, 'node_modules/hexo-generator-archive/lib/generator.js'));
  const archivePages = archiveGen.call(hexo, hexo.locals);
  console.log('Archive pages generated:', archivePages.length);
  archivePages.forEach(p => console.log('  Path:', p.path, 'Layout:', p.layout));
  
  return hexo.exit();
}).catch(err => {
  console.error('Error:', err);
});
