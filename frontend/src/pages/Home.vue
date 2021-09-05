<template lang="pug">
  div#Home
    add-pokemon(@addPokemon="addPokemon")
    selected-pokemon(
                    :pokemon="selectedPokemon"
                    @addTeamA="fillTeamA"
                    @addTeamB="fillTeamB")
    display-team(:teamA="teamA"
      :teamB="teamB")
    pokemon-card(v-for="(pokemon, index) in pokemons"
                :key="index"
                :pokemon="pokemon"
                @click.native="selectPokemonToTeam(pokemon)")
</template>

<script>

import api from '../services/api';
import PokemonCard from '../components/PokemonCard';
import AddPokemon from '../components/AddPokemon';
import SelectedPokemon from '../components/SelectedPokemon';
import DisplayTeam from '../components/DisplayTeam';

export default {
  name: 'Home',
  components: {
    PokemonCard,
    AddPokemon,
    SelectedPokemon,
    DisplayTeam,
  },
  data() {
    return {
      pokemons: [],
      limitA: false,
      limitB: false,
      selectedPokemon: {},
      teamA: {
        trainer: 0,
        teamPokemons: [],
      },
      teamB: {
        trainer: 0,
        teamPokemons: [],
      },
      trade: {
        pokemonId: 0,
        tradeId: 0,
        trainer: 0,
      },
    };
  },
  computed: {
  },
  methods: {
    loadPokemons() {
      api
        .get('/pokemons')
        .then((res) => {
          this.pokemons = res.data;
        })
        .catch((err) => {
          this.$notify(err);
        });
    },
    addPokemon(name) {
      api
        .post(`/pokemons/${name}`)
        .then(() => {
          this.$notify('Sucesso');
        })
        .catch((err) => {
          this.$notify(err);
        });
    },
    tradePokemon(team) {
      api
        .post('/trades', team)
        .then(() => {
          this.$notify('Sucesso');
        })
        .catch((err) => {
          this.$notify(err);
        });
    },
    selectPokemonToTeam(pokemon) {
      this.selectedPokemon = pokemon;
    },
    fillTeamA(pokemon) {
      if (this.teamA.teamPokemons.length >= 6) {
        this.limitA = true;
        return;
      }
      this.teamA.trainer = 0;
      this.teamA.teamPokemons
        .push({ pokemon });
    },
    fillTeamB(pokemon) {
      if (this.teamB.teamPokemons.length >= 6) {
        this.limitB = true;
        return;
      }
      this.teamB.trainer = 1;
      this.teamB.teamPokemons
        .push({ pokemon });
    },
  },
  async mounted() {
    this.loadPokemons();
  },
  // updated() {
  //   this.loadPokemons();
  // },
};
</script>

<style>
  #home {
    display: flex;
  }
  #pokemon-card {
    margin: 15px
  }
</style>
