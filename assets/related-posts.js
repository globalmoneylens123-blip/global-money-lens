window.renderRelatedPosts = function(currentLink, containerSelector) {
  const current = (window.BLOG_POSTS || []).find(p => p.link === currentLink);
  if (!current) return;
  const related = window.BLOG_POSTS.filter(
    p => p.category === current.category && p.link !== currentLink
  ).slice(0, 3);
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.innerHTML = related.map(post => `
    <div class="related-post-card">
      <a href="${post.link}">
        <img src="${post.image}" alt="${post.title}">
        <div class="related-title">${post.title}</div>
      </a>
    </div>
  `).join("");
};