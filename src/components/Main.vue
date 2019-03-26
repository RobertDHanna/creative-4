<template>
  <section class="hero is-info is-fullheight">
    <div class="Main--container hero-body">
      <div class="container" v-if="userSlug.length === 0 && customId.length === 0">
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
        <p>http://smog.komfi.co/{{blogSlug}}</p>
      </div>
      <div class="container" v-else>
        <div class="input-container">
          <p>
            This is the link to your blog.
            <br>Feel free to share it and post it publicly.
          </p>
          <input class="input is-rounded" type="text" :value="`${baseUrl}#/${userSlug}`">
          <hr>
          <p>
            This is the link to edit your blog.
            <br>Keep this link a
            <strong>secret</strong> and do not post it publicly.
            <br>If you lose this link you will no longer be able to edit your blog. :(
          </p>
          <input class="input is-rounded" type="text" :value="`${baseUrl}#/edit/${customId}`">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Level from "./Level.vue";
import { getBaseApiUrl, getBaseUrl } from "../utils";
export default {
  data: function() {
    return {
      previewLink: "",
      userSlug: "",
      customId: "",
      baseUrl: getBaseUrl()
    };
  },
  methods: {
    createBlog: async function() {
      if (this.blogSlug.length > 0) {
        const result = await fetch(`${getBaseApiUrl()}user`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            slug: this.blogSlug
          })
        }).then(r => r.json());
        if (result.error) {
          console.log("yikes");
        } else {
          this.userSlug = result.slug;
          this.customId = result.customId;
        }
      } else {
        console.log("nope");
      }
    }
  },
  computed: {
    blogSlug: function() {
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

.input-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input-container p {
  font-size: 22px;
  margin: 10px;
}
hr {
  background-color: white;
  width: 75%;
}
</style>
