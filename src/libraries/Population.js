/* eslint-disable */
import o from './operations'
import b from './benchmark'

function Population (nuclids, size, goal, recombinationRate) {
  this.generations = [];
  this.currentGen = [];
  let stillBirths = 0;
  for (var i = 0; i < size; i++) {
   let DNA = o.generateRandomDNA(nuclids);
   if (DNA != 'kill me') {
     this.test(DNA, this.currentGen, goal);
   }
   else {
     stillBirths++;
   }
  }
  if (stillBirths > 0) {
   console.log("The start population had " + stillBirths + " still births out of " + size + " organisms that didn't survive complexity level " + nuclids + ".");
  }
  this.addGeneration(o.deepCopy(this.currentGen));
  console.log(this.generations);
}

Population.prototype.getGeneration = function(gen) {
  return generations[gen];
};
Population.prototype.addGeneration = function(gen) {
  this.generations.push(o.deepCopy(gen));
};
Population.prototype.test = function(DNA, gen, goal) {
  let DNADecoded = o.decodeDNA(DNA);
  if (DNADecoded == null) {
      return 0;
  }
  if (DNADecoded.includes('undefined')) {
      return 0;
  }
  let performance = Math.round(b.calculatePerformance(DNADecoded, DNA, goal, this.generations.length) * 1e2) / 1e2;
  let fitness = Math.round(b.calculateFitness(goal, performance) * 1e4) / 1e4;
  let organism = { 'dna': DNA, 'decoded': DNADecoded, 'fitness': fitness, 'performance': performance, 'goal': goal};
  gen.push(organism);
  gen.sort(o.sortDescending);
};
Population.prototype.live = function(goal, recombinationRate) {
    let newGen = o.deepCopy(this.currentGen);
    let max = 30;
    let pairs = o.deepCopy(this.currentGen).length;
    while (pairs >= 2 && max > 0) {
      max--;
      let organismIndex1 = Math.floor((Math.random() * this.currentGen.length));
      let organismIndex2 = Math.floor((Math.random() * this.currentGen.length));
      let firstOrganismDNA = this.currentGen[organismIndex1].dna;
      let secondOrganismDNA = this.currentGen[organismIndex2].dna;
      let newOrganismsDNA = o.geneticRecombination1(firstOrganismDNA, secondOrganismDNA, recombinationRate);
      if (newOrganismsDNA[0]) {
        this.test(newOrganismsDNA[0], newGen, goal);
        //this.currentGen.splice(0, 1);
        pairs--;
      }
      if (newOrganismsDNA[1]) {
        this.test(newOrganismsDNA[1], newGen, goal);
        //this.currentGen.splice(0, 1);
        pairs--;
      }
    }
    this.currentGen = o.deepCopy(newGen);
    this.addGeneration(o.deepCopy(newGen));
};

export default Population
