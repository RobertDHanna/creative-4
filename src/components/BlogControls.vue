<template>
  <div>
    Create your blog here
    <div id="editor">
      <p>hi there</p>
    </div>
  </div>
</template>

<script>
export default {
  mounted: function() {
    this.quill = new Quill("#editor", {
      theme: "snow"
    });
  }
};
</script>
