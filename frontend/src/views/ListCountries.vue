<template>
  <v-container class="scroll-y" style="height: 100vh;">
    <v-row class="justify-center mt-10" v-if="loading">
      <div class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </v-row>
    <div v-else>
      <v-row>
        <v-text-field
          label="Search"
          filled
          rounded
          dense
          v-model="searchTerm"
          placeholder="Search"
          @input="searchCountry"
          class="mt-5"
        ></v-text-field>
      </v-row>
      <v-row class="justify-space-between p-4">
        <CountryCard v-for="(c, index) in data" :key="index" :country="c" />
      </v-row>
          <v-btn
            v-scroll="onScroll"
            v-show="showBtn"
            fab
            dark
            fixed
            bottom
            right
            color="primary"
            @click="toTop"
          >
            <v-icon>mdi-arrow-up-bold-box-outline</v-icon>
          </v-btn>
    </div>
  </v-container>
</template>
<script>
import CountryCard from "../components/CountryCard.vue";
import api from "../services/index.js";
export default {
  components: {
    CountryCard,
  },
  created() {
    this.getAllcountries();
  },
  // updated() {this.searchCountry()},
  methods: {
    async getAllcountries() {
      var res = await api.index();
      var url = "url";
      var detail_link = "detail_link";
      // console.log(res.data.data.countries);
      await res.data.data.countries.forEach((el) => {
        el[url] =
          "https://flagcdn.com/128x96/" + el.code.toLowerCase() + ".png";
        el[detail_link] =
          process.env.VUE_APP_BASE_URL + "/country/" + el.code;
        return this.dataCopy.push(el);
      });
      this.dataCopy.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      this.data = this.dataCopy;
      // this.data = this.dataCopy.slice(0, 5);
      this.loading = false;
    },
    searchCountry() {
      if (!this.searchTerm) {
        this.data = this.dataCopy;
      }

      this.data = this.dataCopy.filter((c) => {
        return c.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
    },
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset ||   e.target.scrollTop || 0
      this.showBtn = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    }
  },
  data() {
    return {
      loading: true,
      data: [],
      dataCopy: [],
      showBtn: false
    };
  },
};
</script>