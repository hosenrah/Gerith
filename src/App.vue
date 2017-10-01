<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Population from './libraries/Population'
import benchmark from './libraries/benchmark'

export default {
  name: 'app',
  mounted: function () {
    // Visualisierungidee: Stammbaum

    let DNAcomplexity = 5 // starts with 1 increases by 2
    let populationSize = 10
    let goal = 42
    let recombinationRate = 0.001
    let lifecycles = 50

    console.clear()

    let population = new Population(DNAcomplexity, populationSize, goal, recombinationRate)

    for (var i = 0; i < lifecycles; i++) {
      population.live(goal, recombinationRate)
      if (benchmark.done) {
        break
      }
    }
  }
}
</script>

<style>
</style>
