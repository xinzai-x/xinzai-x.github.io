var posts=["2025/08/29/工具分享/资源库/","2025/08/29/软测/理论/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };