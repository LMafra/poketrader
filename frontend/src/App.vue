<template>
  <v-app>
    <v-main>
      <notifications group="notification" />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
