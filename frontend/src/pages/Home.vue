<template lang="pug">
  div#Home
    add-pokemon(@addPokemon="addPokemon")
    selected-pokemon(
                    :pokemon="selectedPokemon"
                    @addTeamA="fillTeamA"
                    @addTeamB="fillTeamB")
    display-team(
                :teamA="teamA"
                :teamB="teamB"
                @tradeSuccess="tradePokemon")
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
      tradeId: 0,
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
        trainer: 0,
        pokemonId: 0,
        tradeId: 0,
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
    getLastTrade() {
      api
        .get('/trades/last')
        .then((res) => {
          this.tradeId = res.data;
        })
        .catch((err) => {
          this.$notify(err);
        });
    },
    tradePokemon() {
      this.trade.tradeId = this.tradeId + 1;
      if (!this.teamA && !this.teamB) {
        this.$notify('Preencha os times');
        return;
      }
      if (this.teamA) {
        this.teamA.teamPokemons.forEach((teamA) => {
          this.trade.pokemonId = teamA.pokemon.id;
          this.trade.trainer = this.teamA.trainer;
          api.post('/trades', this.trade)
            .then(() => {
              this.$notify('Sucesso');
            })
            .catch((err) => {
              this.$notify(err);
            });
        });
      }
      if (this.teamB) {
        this.teamB.teamPokemons.forEach((teamB) => {
          this.trade.pokemonId = teamB.pokemon.id;
          this.trade.trainer = this.teamB.trainer;
          api.post('/trades', this.trade)
            .then(() => {
              this.$notify('Sucesso');
            })
            .catch((err) => {
              this.$notify(err);
            });
        });
      }
    },
    selectPokemonToTeam(pokemon) {
      this.selectedPokemon = pokemon;
    },
    fillTeamA(pokemon) {
      if (this.teamA.teamPokemons.length >= 6) {
        return;
      }
      this.teamA.trainer = 0;
      this.teamA.teamPokemons.push({ pokemon });
    },
    fillTeamB(pokemon) {
      if (this.teamB.teamPokemons.length >= 6) {
        return;
      }
      this.teamB.trainer = 1;
      this.teamB.teamPokemons.push({ pokemon });
    },
  },
  async mounted() {
    this.loadPokemons();
    this.getLastTrade();
  },
  // updated() {
  //   this.loadPokemons();
  //   this.getLastTrade();
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
