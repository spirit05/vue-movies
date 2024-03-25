<template>
  <div class="loader-wrap" v-if="isShowLoader">
    <b-spinner style="width: 3rem; height: 3rem" variant="light"></b-spinner>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Loader",
  computed: {
    ...mapGetters(["isShowLoader"]),
  },
};
</script>

<style scoped>
.loader-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
}
</style>
