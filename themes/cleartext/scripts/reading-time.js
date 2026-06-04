/**
 * Cleartext Theme ?Reading Time & Word Count
 * Adds word_count and reading_time to post/page data
 */
'use strict';

hexo.extend.filter.register('before_post_render', function (data) {
  if (!data.content) return data;

  // Strip HTML tags and decode entities for accurate word count
  var text = data.content
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  // Word count: split by whitespace, filter CJK characters
  var englishWords = text.match(/[a-zA-Z0-9]+/g) || [];
  var cjkChars = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g) || []).length;

  // CJK characters count as words, English words count as words
  var wordCount = englishWords.length + cjkChars;
  data.word_count = wordCount;

  // Reading time: default 200 words per minute
  var speed = (hexo.theme.config && hexo.theme.config.article && hexo.theme.config.article.reading_speed) || 200;
  var minutes = Math.max(1, Math.ceil(wordCount / speed));
  data.reading_time = minutes;

  return data;
});