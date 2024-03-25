<template>
  <BContainer>
    <h3 class="list-title">{{ title }}</h3>
    <BRow>
      <template v-if="isExist">
        <BCol cols="3" v-for="(movie, key) in list" :key="key">
          <MovieItem
            :movie="movie"
            @removeMovie="onRemoveMovie"
            @mouseover.native="onMouseover(movie.Poster)"
          />
        </BCol>
      </template>
      <template v-else>
        <div>Empty List</div>
      </template>
    </BRow>
  </BContainer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MovieItem from "./MovieItem.vue";

export default {
  name: "MoviesList",
  components: {
    MovieItem,
  },
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters("movies", ["isSearch"]),
    isExist() {
      return Boolean(Object.keys(this.list).length);
    },
    title() {
      return this.isSearch ? "Search result" : "IMDB Top 250";
    },
  },
  methods: {
    ...mapActions("movies", ["deleteMovie"]),
    onMouseover(poster) {
      this.$emit("changePoster", poster);
    },
    async onRemoveMovie(id, title) {
      const confirm = await this.$bvModal.msgBoxConfirm(
        `Are you sure to remove "${title}"?`
      );
      if (confirm) {
        this.deleteMovie(id);
      }
    },
  },
};
</script>

<style scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
  color: #fff;
}
</style>
