<template>
  <BContainer>
    <h3 class="list-title">{{ title }}</h3>
    <BRow>
      <template v-if="isExist">
        <BCol cols="3" v-for="(movie, key) in list" :key="key">
          <MovieItem
            :movie="movie"
            @showModal="onShowMovieInfo"
            @removeMovie="onRemoveMovie"
            @mouseover.native="onMouseover(movie.Poster)"
          />
        </BCol>
      </template>
      <template v-else>
        <div>Empty List</div>
      </template>
    </BRow>
    <BModal
      :id="movieInfoModalId"
      body-class="movie-modal-body"
      size="xl"
      hide-footer
      hide-header
    >
      <MovieInfoModalContent
        :movie="selectedMovie"
        @closeModal="onCloseModal"
      />
    </BModal>
  </BContainer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MovieItem from "./MovieItem.vue";
import MovieInfoModalContent from "./MovieInfoModalContent.vue";

export default {
  name: "MoviesList",
  components: {
    MovieItem,
    MovieInfoModalContent,
  },
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    movieInfoModalId: "movie-info",
    selectedMovieId: "",
  }),
  computed: {
    ...mapGetters("movies", ["isSearch", "searchTitle"]),
    isExist() {
      return Boolean(Object.keys(this.list).length);
    },
    title() {
      return this.isSearch
        ? `Search result: ${this.searchTitle}`
        : "IMDB Top 250";
    },
    selectedMovie() {
      return this.selectedMovieId ? this.list[this.selectedMovieId] : null;
    },
  },
  methods: {
    ...mapActions("movies", ["deleteMovie"]),
    ...mapActions(["showNotify"]),
    onMouseover(poster) {
      this.$emit("changePoster", poster);
    },
    async onRemoveMovie(id, title) {
      const confirm = await this.$bvModal.msgBoxConfirm(
        `Are you sure to remove "${title}"?`
      );
      if (confirm) {
        this.deleteMovie(id);
        this.showNotify({
          msg: `"${title}" deleted successful!`,
          variant: "success",
          title: "Success",
        });
      }
    },
    onShowMovieInfo(id) {
      this.selectedMovieId = id;
      this.$bvModal.show(this.movieInfoModalId);
    },
    onCloseModal() {
      this.selectedMovieId = null;
      this.$bvModal.hide(this.movieInfoModalId);
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

<style>
.movie-modal-body {
  padding: 0 !important;
}
</style>
