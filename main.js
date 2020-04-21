// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Factory function to create multiple objects
const pAequorFactory = (specimenNum , dna) => {
  const pAequorSpecimen = {
    specimenNum,
    dna,
    mutate () {
      const randomBaseIndex = Math.floor(Math.random() * 4);
      let mutatedBase = returnRandBase();
      while (this.dna[randomBaseIndex] === mutatedBase) {
        mutatedBase = returnRandBase()
      }
      this.dna[randomBaseIndex] = mutatedBase;
      return this.dna;
    },
    compareDNA (pAequor) {
      let sharedDNAPercent = 0
      for (let i = 0; i < pAequor.dna.length ; i++) {
          if (pAequor.dna[i] === this.dna[i]) {
            sharedDNAPercent += 6.666666666666667
          }
        }
      return console.log(`Specimen ${pAequor.specimenNum} and Specimen ${this.specimenNum} have ${Math.round(sharedDNAPercent)}% DNA in common.`)
    },
    willLikelySurvive () {
      let survivalChance = 0
      for (let i = 0 ; i < this.dna.length ; i++) {
          if (this.dna[i] === 'C' || this.dna[i] === 'G') {
            survivalChance += 6.666666666666667;
        }
      }
      if (survivalChance > 59) {
        return true
      } else {
        return false
      }
    }
  }
  return pAequorSpecimen;
}

const generateSpecimens = () => {
  const survivableSpecimens = [];
  let specimenNumber = 1;
  while (survivableSpecimens.length < 30) {
    let specimen = pAequorFactory(specimenNumber, mockUpStrand());
    if (specimen.willLikelySurvive() === true) {
      survivableSpecimens.push(specimen);
      specimenNumber += 1;
    }
  }
  return survivableSpecimens
}

specimenOne = pAequorFactory(1, mockUpStrand())
specimenTwo = pAequorFactory(2, mockUpStrand())

console.log(specimenOne.mutate())
specimenOne.compareDNA(specimenTwo)
console.log(specimenOne.willLikelySurvive())
console.log(generateSpecimens())
