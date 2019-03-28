<template>
  <section class="hero is-info is-fullheight">
    <div class="BC--hero-body hero-body">
      <div class="container" v-if="state === 'new'">
        <input
          class="input is-info"
          type="text"
          placeholder="Blog Title Here"
          v-model="blogTitle"
          maxlength="35"
        >
        <div class="editor-container">
          <div id="editor">
            <h1>Creation Starts Here</h1>
            <p>Tell your fans what you are doing.</p>
            <ul>
              <li>Try</li>
              <li>Adding</li>
              <li>A List!</li>
            </ul>
          </div>
        </div>
        <a class="cancel-button button is-white" v-on:click="state = 'pick'">Cancel</a>
        <a class="create-button button is-white" v-on:click="createBlogPost">Create</a>
      </div>
      <div class="container" v-if="state === 'pick'">
        <p class="edit-message">Edit/View an old blog</p>
        <ul class="blog-items">
          <li class="blog-item" v-for="blog in blogs" :key="blog.id">
            <span class="blog-title">{{blog.title}}</span>
            <div>
              <a class="edit-button button" v-on:click="deleteBlogPost(blog)">
                <i class="far fa-trash-alt"></i>
              </a>
              <a class="edit-button button" v-on:click="editBlogPost(blog)">
                <i class="far fa-edit"></i>
              </a>
            </div>
          </li>
        </ul>
        <hr>
        <a class="button is-primary" v-on:click="makeNewBlog">
          <i class="fas fa-plus"></i> Post
        </a>
      </div>
      <div class="container" v-if="state === 'edit'">
        <input
          class="input is-info"
          type="text"
          placeholder="Blog Title Here"
          v-model="blogTitle"
          maxlength="35"
        >
        <div class="editor-container">
          <div id="editor"></div>
        </div>
        <a class="cancel-button button is-white" v-on:click="state = 'pick'">Cancel</a>
        <a class="create-button button is-white" v-on:click="createBlogPost">Update</a>
      </div>
    </div>
  </section>
</template>

<script>
import { getBaseApiUrl } from "../utils";
import { setTimeout, setInterval, clearInterval } from "timers";

export default {
  created: async function() {
    this.getBlogPosts();
  },
  data: function() {
    return {
      blogs: [],
      blogTitle: "",
      state: "pick",
      activeBlog: null
    };
  },
  methods: {
    getBlogPosts: async function() {
      const { id } = this.$route.params;
      const result = await fetch(`${getBaseApiUrl()}blog/${id}`).then(r =>
        r.json()
      );
      this.blogs = result.slice().sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    },
    deleteBlogPost: function(blog) {
      const id = blog._id;
      const result = fetch(`${getBaseApiUrl()}blog`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      }).then(result => {
        this.getBlogPosts();
      });
    },
    createBlogPost: async function() {
      if (this.blogTitle.length === 0) {
        this.$router.app.$emit("error-message", "Blog titles can't be empty!");
        return;
      }
      if (document.querySelector("#editor").textContent.length === 0) {
        this.$router.app.$emit("error-message", "Your blog can't be empty!");
        return;
      }
      const html = document.querySelector("#editor").innerHTML;
      const userId = this.$route.params.id;
      const title = this.blogTitle;
      const delta = this.quill.getContents();
      let data = {
        userId,
        title,
        delta,
        html
      };
      if (this.activeBlog) {
        data = { ...data, id: this.activeBlog._id };
      }
      const result = await fetch(`${getBaseApiUrl()}blog`, {
        method: this.state === "new" ? "POST" : "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(r => r.json());
      this.resetState();
      await this.getBlogPosts();
      this.state = "pick";
    },
    editBlogPost: function(blog) {
      this.state = "edit";
      this.activeBlog = blog;
      this.blogTitle = this.activeBlog.title;
      this.mountQuillEditor().then(() => {
        this.quill.setContents(this.activeBlog.delta);
      });
    },
    makeNewBlog: function() {
      this.state = "new";
      this.blogTitle = "";
      this.activeBlog = null;
      this.mountQuillEditor();
    },
    mountQuillEditor: function() {
      return new Promise(resolve => {
        const interval = setInterval(() => {
          if (document.querySelector("#editor")) {
            clearInterval(interval);
            this.quill = new Quill("#editor", {
              theme: "snow"
            });
            resolve();
          }
        }, 10);
      });
    },
    resetState: function() {
      this.blogTitle = "";
      this.activeBlog = null;
      this.blogs = [];
    }
  }
};
</script>

<style scoped>
.edit-message {
  font-size: 22px;
  margin-bottom: 10px;
}
.cancel-button {
  margin-top: 10px;
  float: left;
}
.fa-plus {
  margin-right: 10px;
}
.blog-items {
  margin: 0 auto;
  width: 50%;
  min-width: 250px;
}
.blog-item {
  background-color: white;
  border-radius: 15px;
  margin: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.edit-button {
  margin-left: 10px;
  background-color: transparent;
  border: transparent;
  color: black;
  float: right;
}
.blog-title {
  padding-left: 10px;
  font-size: 35px;
  color: black;
  word-break: break-all;
}
.BC--hero-body {
  align-items: flex-start !important;
  text-align: center;
}
.editor-container {
  background-color: white;
  color: black;
}
.create-button {
  margin-top: 10px;
  float: right;
}
input {
  width: 30%;
  min-width: 200px;
  margin-bottom: 10px;
}
</style>
