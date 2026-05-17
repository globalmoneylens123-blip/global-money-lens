window.getPostsByCategory = function(category) {
  return (window.BLOG_POSTS || []).filter(post => post.category === category);
};