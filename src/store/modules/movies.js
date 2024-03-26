import IDs from "@/store/mock/imdb_top250";
import axios from "@/pluging/axios";
import mutations from "../mutations";

const serializedResponse = (movies) =>
  movies.reduce((acc, movie) => ((acc[movie.imdbID] = movie), acc), {});

const { MOVIES, CURRENT_PAGE, DELETE_MOVIE } = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    moviesPerPage: 12,
    currentPage: 1,
    movies: {},
  },
  getters: {
    slicesIDs:
      ({ top250IDs }) =>
      (from, to) =>
        top250IDs.slice(from, to),
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    totalMovie: ({ top250IDs }) => top250IDs.length,
    moviesList: ({ movies }) => movies,
    top250IDs: ({ top250IDs }) => top250IDs,
  },
  mutations: {
    [MOVIES](state, value) {
      state.movies = value;
    },
    [CURRENT_PAGE](state, value) {
      state.currentPage = value;
    },
    [DELETE_MOVIE](state, index) {
      state.top250IDs.splice(index, 1);
    },
  },
  actions: {
    async fetchMovies({ getters, commit, dispatch }) {
      try {
        dispatch("toggleLoader", true, { root: true });
        const { currentPage, moviesPerPage, slicesIDs } = getters;
        const from = currentPage * moviesPerPage - moviesPerPage;
        const to = currentPage * moviesPerPage;
        const moviesToFetch = slicesIDs(from, to);

        const requests = moviesToFetch.map((id) => axios.get(`/?i=${id}`));
        const response = await Promise.all(requests);
        const movies = serializedResponse(response);

        commit(MOVIES, movies);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }
    },
    changeCurrentPage({ commit, dispatch }, pageNumber) {
      commit(CURRENT_PAGE, pageNumber);
      dispatch("fetchMovies");
    },
    deleteMovie({ commit, getters, dispatch }, id) {
      const index = getters.top250IDs.indexOf(id);
      if (index !== -1) {
        commit(DELETE_MOVIE, index);
        dispatch("fetchMovies");
      }
    },
    async searchMovie({ commit, dispatch }, query) {
      try {
        dispatch("toggleLoader", true, { root: true });

        const response = await axios.get(`/?s=${query}`);

        if (response.Error) {
          throw Error(response.Error);
        }

        const movies = serializedResponse(response.Search);
        commit(MOVIES, movies);
      } catch (err) {
        console.log(err);
        dispatch(
          "showNotify",
          {
            msg: err.message,
            title: "Error",
            variant: "danger",
          },
          { root: true }
        );
        dispatch("toggleSearch", false, { root: true });
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }
    },
  },
};

export default moviesStore;
