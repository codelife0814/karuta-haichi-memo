<template>
  <div id="preview">
    <PreviewHeader :isDownload="isDownload" @change-isDownload="changeIsDownload" />
    <PreviewContent :isDownload="isDownload" />
  </div>
</template>

<script>
import PreviewHeader from "./../components/PreviewHeader";
import PreviewContent from "./../components/PreviewContent";

export default {
  components: {
    PreviewHeader,
    PreviewContent
  },
  data() {
    return {
      isDownload: false
    };
  },
  methods: {
    changeIsDownload(value) {
      this.isDownload = value;
    }
  }
};
</script>
