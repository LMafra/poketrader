<template lang="pug">
v-layout(row wrap justify-center class="my-5")
  v-flex(xs12 sm8)
    div(v-if="team.trainer === '0'" )
      v-card(class="elevation-0 transparent")
        v-card-title(primary-title class="layout justify-center") Time A
        div(v-for="(pokemon, index) in team.pokemons" :key="index")
          v-layout(justify-space-around justify-center)
            v-img(:src="pokemon.sprite" max-height="100" max-width="100")
    div(v-else)
      v-card(class="elevation-0 transparent")
        v-card-title(primary-title class="layout justify-center") Time B
        div(v-for="(pokemon, index) in team.pokemons" :key="index")
          v-layout(justify-space-around justify-center)
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
