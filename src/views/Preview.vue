<template>
  <div id="preview">
    <PreviewHeader />
    <PreviewContent />
  </div>
</template>

<script>
import PreviewHeader from "./../components/PreviewHeader";
import PreviewContent from "./../components/PreviewContent";

export default {
  components: {
    PreviewHeader,
    PreviewContent
  }
};
</script>
