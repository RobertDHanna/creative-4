<template>
  <section class="hero is-info is-fullheight">
    <div class="BV--hero-body hero-body">
      <h1 class="blog-header">{{this.$route.params.id}}</h1>
      <hr class="blog-header-hr">
      <div class="container">
        <div class="blog-container" v-for="blog in blogs" :key="blog.id">
          <h1 class="blog-title-view">{{blog.title}}</h1>
          <div class="blog-created-at">
            <small>
              <i>Last Updated: {{new Date(blog.createdAt).toString()}}</i>
            </small>
          </div>
          <hr>
          <div v-html="blog.html"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getBaseApiUrl } from "../utils";
export default {
  data: function() {
    return {
      blogs: []
    };
  },
  created: async function() {
    const { id } = this.$route.params;
    const result = await fetch(`${getBaseApiUrl()}blog/${id}`).then(r =>
      r.json()
    );

    this.blogs = result.slice().sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }
};
</script>

<style>
.blog-header-hr {
  background-color: white;
  width: 100%;
}
.blog-header {
  font-size: 64px;
  text-align: center;
  width: 100%;
}
.BV--hero-body {
  align-items: flex-start !important;
  text-align: center;
  flex-direction: column;
}
.blog-container {
  background: white;
  color: black;
  margin: 10px;
  padding-bottom: 20px;
}
.ql-tooltip {
  display: none !important;
}
.blog-title-view {
  padding-top: 15px;
  font-size: 32px;
}

.blog-container h1 {
  font-size: 28px;
}
</style>
