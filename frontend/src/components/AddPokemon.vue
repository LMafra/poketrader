<template lang="pug">
div(@submit.prevent="submit").addPokemon
  input(v-model="form.pokemonName")
  button(type="submit" @click="add") Adicionar
</template>

<script>

export default {
  pokemonName: 'AddPokemon',
  data() {
    return {
      form: {
        pokemonName: '',
      },
      submitting: false,
    };
  },
  methods: {

    async add() {
      try {
        this.submitting = true;
        this.$emit('addPokemon', this.form.pokemonName);
      } catch (err) {
        this.$notify(err);
        this.submitting = false;
      }
    },
  },
};
</script>
