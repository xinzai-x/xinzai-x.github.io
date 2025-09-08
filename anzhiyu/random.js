var posts=["2025/09/08/0.Linux基础命令/","2025/09/02/技术积累/博客搭建相关/","2025/08/31/技术积累/博客CDN解析/","2025/08/29/软测/理论/","2025/08/29/工具分享/资源库/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };