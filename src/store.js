import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        specialty: null,  // Use specialty if you need to store a single specialty.
        specialtiesContainer: [],
        ratingAVGCounters: [],
        itemDoctor: {},
        apiSpecialtiesUrl: 'http://127.0.0.1:8000/api/specialties',
        apiRatingAVGCountUrl: 'http://127.0.0.1:8000/api/rating-counts',
        apiDoctor: 'http://127.0.0.1:8000/api/doctors'
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
        },
        setItemDoctor(state, doctor) {
            state.itemDoctor = doctor;
        },
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
        getDoctorsBySpecialty({ commit, state }, payload) {
            // console.log("In store action, received payload:", payload);
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
        async getSingleDoctor({ commit, state }, slug) {
            try {
              const response = await axios.get(`${state.apiDoctor}/${slug}`);
              const doctor = response.data.results;
              commit('setItemDoctor', doctor);  // Update the itemDoctor state
              return doctor;
            } catch (error) {
              console.error('Error fetching single doctor information:', error);
              throw error;  // Re-throw the error
            }
        },
    }
});