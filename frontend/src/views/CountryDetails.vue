<template>
  <v-container class="scroll-y">
    <v-row class="justify-center mt-10" v-if="loading">
      <div class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </v-row>
    <div v-else>
      <v-row class="flex-column justify-center p-4">
        <v-list-item>
          <v-list-item-action>
            <span class="group pa-2 teal">
              <v-icon large dark>flag</v-icon>
            </span>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              <v-avatar class="ma-3" width="128" height="96" tile>
                <v-img :src="country.url"></v-img> </v-avatar
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-action>
            <span class="group pa-2 teal">
              <v-icon large dark>home</v-icon>
            </span>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title><strong>Capitale : </strong>{{ country.capital }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>
        
        <v-list-item>
          <v-list-item-action>
            <span class="group pa-2 teal">
              <v-icon large dark>public</v-icon>
            </span>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title><strong>Continent : </strong>{{ country.continent.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-action>
            <span class="group pa-2 teal">
              <v-icon large dark>account_balance</v-icon>
            </span>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title><strong>Monnaie : </strong>{{ country.currency }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-action>
            <span class="group pa-2 teal">
              <v-icon large dark>call</v-icon>
            </span>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title><strong>Indicatif téléphonique : </strong>+{{ country.phone }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-action>
            <span class="group pa-2 teal">
              <v-icon large dark>translate</v-icon>
            </span>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title><strong>Langue(s) : </strong>{{ country.languages.map(l => l.name).join(", ") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>

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
import api from "../services/index.js";
export default {
  props: ["code"],
  created() {
    this.getDetails();
  },
  // updated() {this.searchCountry()},
  methods: {
    async getDetails() {
      var res = await api.getDetailsCountry(this.code);
      var url = "url";
      console.log(res.data.data.country);
      this.country = res.data.data.country;
      this.country[url] =
        "https://flagcdn.com/128x96/" +
        this.country.code.toLowerCase() +
        ".png";
      this.loading = false;
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.showBtn = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
  data() {
    return {
      loading: true,
      country: null,
      showBtn: false,
    };
  },
};
</script>