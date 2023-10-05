import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        specialty: null,  // Use specialty if you need to store a single specialty.
        specialtiesContainer: [],
        ratingAVGCounters: [],
        apiSpecialtiesUrl: 'http://127.0.0.1:8000/api/specialties',
        apiRatingAVGCountUrl: 'http://127.0.0.1:8000/api/rating-counts'
    },
    mutations: {
        setSpecialty(state, specialty) {
            state.specialty = specialty;
        },
        SET_SPECIALTIES(state, specialtiesContainer) {
            state.specialtiesContainer = specialtiesContainer;
        },
        SET_RATING_AVG_COUNTERS(state, ratingCountData) {
            state.ratingAVGCounters = ratingCountData;
        }
    },
    actions: {
        getSpecialties({ commit, state }) {
            const params = {}

            axios.get(state.apiSpecialtiesUrl, { params }) 
              .then(response => {
                commit('SET_SPECIALTIES', response.data.results)
              })
              .catch(error => {
                console.error('Error fetching specialties:', error)
              })
        },
        getRatingAVGCount({ commit, state }) {
            const params = {};
    
            axios.get(state.apiRatingAVGCountUrl, { params })
                .then(response => {
                    commit('SET_RATING_AVG_COUNTERS', response.data.results);
                })
                .catch(error => {
                    console.error('Error fetching rating average counters:', error);
                })
        },
        getDoctorsBySpecialty({ commit, state }, payload) {
            // console.log("In store action, received payload:", payload);
        }
    }
});