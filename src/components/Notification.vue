<template>
  <div></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Notification",
  computed: {
    ...mapGetters(["messagesPool"]),
  },
  watch: {
    messagesPool: "showNotification",
  },
  methods: {
    showNotification({ variant, msg, title }) {
      this.$bvToast.toast(msg, {
        toastClass: "app-toast",
        solid: true,
        variant,
        title,
      });
    },
  },
};
</script>

<style>
.app-toast:not(.show) {
  display: block !important;
}
.app-toast .toast-header {
  justify-content: space-between;
}

.app-toast .toast-header button.close {
  padding: 0;
  background-color: transparent;
  border: 0;
}
.app-toast .toast-header .close {
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
}
</style>
