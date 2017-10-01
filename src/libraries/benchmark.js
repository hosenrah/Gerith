/* eslint-disable */
let b = {
  done: false,
  isNumber : function (c) {
    return /^\d$/.test(c);
  },
  calculatePerformance : function (DNADecoded, DNA, goal, gen) {
    let DNAlength = DNADecoded.length, min = 0, performance = 0;

    while (min < DNAlength) {
      if (b.isNumber(DNADecoded[min])) {
        performance = DNADecoded[min];
        break;
      } else {
        min++;
      }
    }

    // break if no number found
    if (min === DNAlength) { return 0; }

    let operation, number;
    while (min < DNAlength) {
      let operand = DNADecoded[min];

      // Check for operations
      if (number && !b.isNumber(operand)) { min++; continue; }
      if (!number && b.isNumber(operand)) { min++; continue; }

      operand = parseInt(operand);
      performance = parseInt(performance);

      if (number) {
        switch (operation) {
          case "+": { performance += operand; break; }
          case "-": { performance -= operand; break; }
          case "*": { performance *= operand; break; }
          case "/": { if (DNADecoded[min] != "0") performance /= operand; break; }
        }
      } else { operation = DNADecoded[min]; }

      min++;
      number = !number;
    }
    if (performance === goal) {
      b.done = true;
      console.log("Success in generation: " + (gen + 1) + "! Goal: " + goal + ", Term: " + DNADecoded + "=" + performance + ", DNA: " + DNA);
    }
    return performance;
  },
  calculateFitness : function (goal, performance) {
    if (goal != performance) {
      return 1.001 / Math.abs(goal - performance);
    } else {
      return 1;
    }
  }
}

export default b;
