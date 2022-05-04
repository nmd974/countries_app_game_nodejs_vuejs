<template>
  <v-app>
    <v-app-bar app color="primary" dark>
        <a class="d-flex align-center" href="/" style="color:white;text-decoration:none">
          <v-img
            alt="Countries app logo"
            class="shrink mr-2"
            contain
            src="./assets/logo.png"
            transition="scale-transition"
            width="40"
          />COUNTRIES APP
        </a>
      <v-spacer></v-spacer>

      <v-btn
        href="/play"
        text
      >
        <span class="mr-2">Play</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    //
  }),
};
</script>
