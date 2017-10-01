/* eslint-disable */
let o = {
  chromosomePoolDecoded: ["1","2","3","4","5","6","7","8","9","0","+","-","*","/"],
  chromosomePool: ["0000","0001","0010","0011","0100","0101","0110","0111","1000","1001","1010","1011","1100","1110"],
  mutationRate: 0.000001,
  deepCopy: function (array) {
    return JSON.parse(JSON.stringify(array));
  },
  generateRandomDNA : function (nuclids) {
    let randomDNA = '';
    let decodedRandomDNA = '';
    let maxOut = 100;
    do {
      randomDNA = '';
      decodedRandomDNA = '';
      for (var i = 0; i < nuclids; i++) {
        let randomIndex = Math.floor((Math.random() * o.chromosomePool.length));
        randomDNA += o.chromosomePool[randomIndex];
      }
      decodedRandomDNA = o.decodeDNA(randomDNA);
      maxOut--;
    }
    while (!o.validateDNA(decodedRandomDNA) && maxOut > 0);
    if (o.validateDNA(decodedRandomDNA)) {
      return randomDNA;
    }
    else {
      return 'kill me';
    }
  },
  geneticRecombination1 : function (chromosomeA, chromosomeB, recombinationRate) {
    if (Math.random() * 10 > recombinationRate) {
      let splicePosition = Math.floor((Math.random() * chromosomeA.length));
      let newChromosome = chromosomeA.slice(0, splicePosition) + chromosomeB.slice(splicePosition, chromosomeB.length);

      newChromosome = o.mutate(newChromosome, o.mutationRate);

      let chromosomeValid = o.validateDNA(o.decodeDNA(newChromosome));

      if (chromosomeValid) {
        return [newChromosome];
      }
      else {
        return [];
      }
    }
    else {
      return [];
    }
  },
  geneticRecombination2 : function (chromosomeA, chromosomeB, recombinationRate) {
    if (true) {
      let splicePosition = Math.floor((Math.random() * chromosomeA.length));
      let newChromosomeA = chromosomeA.slice(0, splicePosition) + chromosomeB.slice(splicePosition, chromosomeB.length);
      let newChromosomeB = chromosomeB.slice(0, splicePosition) + chromosomeA.slice(splicePosition, chromosomeA.length);

      newChromosomeA = o.mutate(newChromosomeA, o.mutationRate);
      newChromosomeB = o.mutate(newChromosomeB, o.mutationRate);

      let chromosomeAValid = o.validateDNA(o.decodeDNA(newChromosomeA));
      let chromosomeBValid = o.validateDNA(o.decodeDNA(newChromosomeB));

      if (chromosomeAValid) {
        if (chromosomeBValid) {
          return [newChromosomeA, newChromosomeB];
        }
        else {
          return [newChromosomeA];
        }
      }
      else if (chromosomeBValid) {
        if (chromosomeAValid) {
          return [newChromosomeA, newChromosomeB];
        }
        else {
          return [newChromosomeB];
        }
      }
      else {
        return [chromosomeA, chromosomeB];
      }
    }
    else {
      return [chromosomeA, chromosomeB];
    }
  },
  mutate : function (DNA, mutationRate) {
    let mutatedDNA = '';
    let mutationHappened = false;
    for (var i = 0; i < DNA.length; i++) {
      if (Math.random() > 1 - mutationRate) {
        mutatedDNA += (+ !Boolean(parseInt(DNA[i]))).toString();
        mutationHappened = true;
      }
      else {
        mutatedDNA += DNA[i];
      }
    }
    if (mutationHappened) {
      //console.log("Mutation happened! DNA: " + DNA + ", mutated DNA: " + mutatedDNA);
    }
    return mutatedDNA;
  },
  decodeDNA: function (DNA) {
    if (DNA) {
      let chromosomes = DNA.match(/.{1,4}/g);
      let decodedDNA = '';
      chromosomes.forEach(function(chromosome, index) {
        let indexOfChromosome = o.chromosomePool.indexOf(chromosome);
        let decodedChromosome = o.chromosomePoolDecoded[indexOfChromosome];
        decodedDNA += decodedChromosome;
      });
      if (decodedDNA == undefined) {
        console.log("decoded DNA length wrong!");
      }
      return decodedDNA;
    }
  },
  validateDNA : function (decodedDNA) {
    let number = true;
    for (let i = 0; i < decodedDNA.length; i++) {
      if (number != o.isNumber(decodedDNA[i])) {return false;}
      if (i > 0 && decodedDNA[i] == "0" && decodedDNA[i - 1] == "/") {return false;}
      if (i == decodedDNA.length - 1 && !o.isNumber(decodedDNA[i])) {return false;}
      number = !number;
    }
    return true;
  },
  isNumber : function (c) {
    return /^\d$/.test(c);
  },
  sortDescending: function (a,b) {
    if (a.fitness < b.fitness) {
      return 1;
    }
    if (a.fitness > b.fitness) {
      return -1;
    }
    return 0;
  }
};

export default o;
