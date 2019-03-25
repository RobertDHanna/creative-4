<template>
  <section class="hero is-info is-fullheight">
    <div class="Main--container hero-body">
      <div class="container">
        <h1 class="title">Smog</h1>
        <h2 class="subtitle">
          <i>Small Blogs For Busy People</i>
        </h2>
        <level/>
        <input
          class="input"
          type="text"
          placeholder="What should your blog be called?"
          v-model="previewLink"
          maxlength="75"
        >
        <a class="button is-dark" v-on:click="createBlog">Create</a>
        <p>http://smog.komfi.co/{{formattedPreviewLink}}</p>
      </div>
    </div>
  </section>
</template>

<script>
import Level from "./Level.vue";
export default {
  data: function() {
    return { previewLink: "" };
  },
  methods: {
    createBlog: function() {
      if (this.formattedPreviewLink.length > 0) {
        console.log("gucci");
        this.$router.push({ path: `/edit/${this.formattedPreviewLink}` });
      } else {
        console.log("nope");
      }
    }
  },
  computed: {
    formattedPreviewLink: function() {
      const slug = this.previewLink
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      return slug[slug.length - 1] === "-"
        ? slug.slice(0, slug.length - 1)
        : slug;
    }
  },
  components: { Level }
};
</script>


<style scoped>
.Main--container {
  align-items: flex-start !important;
  text-align: center;
}

.title {
  font-size: 112px;
}

input {
  width: 50%;
  min-width: 300px;
  margin-bottom: 15px;
}
.button {
  margin-left: 15px;
}
</style>
