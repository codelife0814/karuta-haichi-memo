<template>
  <div id="home">
    <Header />
    <HomeContent />
    <Footer />
  </div>
</template>

<script>
import Header from "./../components/Header";
import HomeContent from "./../components/HomeContent";
import Footer from "./../components/Footer";

export default {
  name: "Home",
  components: {
    Header,
    HomeContent,
    Footer
  }
};
</script>
