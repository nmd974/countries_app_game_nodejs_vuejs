<template>
  <v-col cols="12" lg="6">
    <v-card color="dark" white>
      <div class="d-flex flex-lg-row flex-column-reverse justify-lg-space-between justify-center align-center">
        <div>
          <v-card-title class="text-h5">{{ country.name.toUpperCase() }}</v-card-title>

          <v-card-subtitle v-if="country.capital !== null" v-text="country.capital"></v-card-subtitle>
          <v-card-subtitle class="red--text" v-else v-text="'Pas de capitale'"></v-card-subtitle>

          <v-card-actions>
            <v-btn class="ml-2 mt-5" outlined rounded small link :href="country.detail_link">
              VOIR PLUS
              <v-icon>mdi-visibility</v-icon>
            </v-btn>
          </v-card-actions>
        </div>

        <v-avatar class="ma-3" width="128" height="96" tile>
          <v-img :src="country.url"></v-img>
        </v-avatar>
      </div>
    </v-card>
  </v-col>
</template>
<script>
export default {
  name: "CountryCard",
  props: ["country"],
  data: () => ({
    show: false,
  }),
  created() {
    console.log(this.country);
  },
};
</script>