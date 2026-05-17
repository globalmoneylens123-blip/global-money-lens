document.addEventListener("DOMContentLoaded", () => {

  const blogPosts = window.BLOG_POSTS || [];

  const grid = document.getElementById("blogGrid");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const searchInput = document.querySelector(".sidebar-search");

  let visibleCount = 6;
  let currentCategory = "All";
  let filteredPosts = [];

  function filterPosts() {

    filteredPosts = blogPosts.filter(post => {

      if (
        currentCategory !== "All" &&
        post.category !== currentCategory
      ) {
        return false;
      }

      const q = (searchInput?.value || "").toLowerCase();

      return (
        post.title.toLowerCase().includes(q) ||
        post.desc.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q)
      );

    });

  }

  function renderPosts() {

    filterPosts();

    grid.innerHTML = "";

    const posts = filteredPosts.slice(0, visibleCount);

    if (posts.length === 0) {

      grid.innerHTML = `
        <div style="
          background:white;
          padding:30px;
          border-radius:20px;
          text-align:center;
        ">
          No articles found.
        </div>
      `;

      loadMoreBtn.style.display = "none";

      return;
    }

    posts.forEach(post => {

      grid.innerHTML += `

      <article class="blog-card">

        <div class="blog-img-wrap">
          <img
            class="blog-img"
            src="${post.image}"
            alt="${post.title}"
          >
        </div>

        <div class="blog-card-content">

          <span class="blog-category">
            ${post.category}
          </span>

          <h3 class="blog-title">
            ${post.title}
          </h3>

          <div class="blog-desc">
            ${post.desc}
          </div>

          <div class="blog-date">
            ${post.date}
          </div>

          <a href="${post.link}" class="read-btn">
            Read More
          </a>

        </div>

      </article>

      `;

    });

    loadMoreBtn.style.display =
      visibleCount >= filteredPosts.length
      ? "none"
      : "block";

  }

  /* LOAD MORE */

  loadMoreBtn?.addEventListener("click", () => {

    visibleCount += 3;

    renderPosts();

  });

  /* SEARCH */

  searchInput?.addEventListener("keyup", () => {

    visibleCount = 6;

    renderPosts();

  });

  /* CATEGORY BUTTONS */

  window.setCategory = function(category, btn) {

    currentCategory = category;

    visibleCount = 6;

    document
      .querySelectorAll(".category-btn")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    renderPosts();

  }

  /* START */

  renderPosts();

});