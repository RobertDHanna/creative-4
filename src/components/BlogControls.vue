<template>
  <section class="hero is-info is-fullheight">
    <div class="hero-body">
      <div class="container">
        <input class="input is-info" type="text" placeholder="Blog Title Here" v-model="blogTitle">
        <div class="editor-container">
          <div id="editor">
            <h1>Write something great.</h1>
            <p>You can do anything</p>
            <ul>
              <li>One</li>
              <li>Two</li>
              <li>Three</li>
            </ul>
          </div>
        </div>
        <a class="button is-white" v-on:click="createBlogPost">Create</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: function() {
    return {
      blogTitle: ""
    };
  },
  mounted: function() {
    this.quill = new Quill("#editor", {
      theme: "snow"
    });
  },
  methods: {
    createBlogPost: function() {
      console.log(
        this.blogTitle,
        this.quill.getContents(),
        document.querySelector("#editor").innerHTML
      );
    }
  }
};
</script>

<style scoped>
.editor-container {
  background-color: white;
  color: black;
}
a {
  margin-top: 10px;
  float: right;
}
input {
  width: 30%;
  min-width: 200px;
  margin-bottom: 10px;
}
</style>
