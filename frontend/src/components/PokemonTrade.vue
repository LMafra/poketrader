<template lang="pug">
v-container
  v-row(cols="12" lg="4")
    v-col(align="center")
      v-card
        v-card-text
          div(v-if="team.trainer === '0'" cols="6")
              h4 Team A
          div(v-else cols="6")
              h4 Team B
          v-row(class="text-center")
            v-col(v-for="(pokemon, index) in team.pokemons" :key="index" cols="2")
                  v-img(:src="pokemon.sprite" max-height="100" max-width="100")
</template>

<script>
export default {
  name: 'PokemonTrade',
  props: {
    team: {
      type: Object,
      required: false,
    },
  },
};
</script>
