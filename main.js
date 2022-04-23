// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
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

//---- Factoy function
const pAequorFactory = (number, arrayOfDna) => {
  return {
    specimenNum: number,
    dna: arrayOfDna,
    mutate() {
      let i = Math.floor(Math.random() * this.dna.length);
      let dnaBase = this.dna[i];
      let baseChanged = "";
      do {
        baseChanged = returnRandBase();
      } while (dnaBase == baseChanged);
      this.dna.splice(i, 1, baseChanged);
      console.log(
        `Selected base is ${
          i + 1
        } and it is ${dnaBase} changed to ${baseChanged}`
      );
      console.log(`Specimen #${pDna01.specimenNum}.mutate = [${pDna01.dna}]`);
    },
    compareDNA(model) {
      let seqOfDiff = [];
      for (let i = 0; i < model.dna.length; i++) {
        if (this.dna[i] == model.dna[i]) {
          seqOfDiff.push(this.dna[i]);
        }
      }
      let percenOfSamePlace = ((seqOfDiff.length / 15) * 100).toFixed(2);
      console.log(
        `specimen #${this.specimenNum} and specimen #${model.specimenNum} have ${percenOfSamePlace}% DNA in common`
      );
    },
    willLikelySurvive() {
      let arrayOfCandG = this.dna.filter(
        (letter) => letter == "C" || letter == "G"
      );
      if (arrayOfCandG.length / 15 > 0.6) {
        return true;
      } else {
        return false;
      }
    },
    complementStrand() {
      console.log(`Specimen #${this.specimenNum} = [${this.dna}]`);
      for (let i = 0; i < this.dna.length; i++) {
        switch (this.dna[i]) {
          case "A":
            this.dna.splice(i, 1, "T");
            break;
          case "T":
            this.dna.splice(i, 1, "A");
            break;
          case "C":
            this.dna.splice(i, 1, "G");
            break;
          case "G":
            this.dna.splice(i, 1, "C");
            break;
        }
      }
      console.log(`complementary DNA strand = [${this.dna}]`);
    },
  };
};
// -- my test result

let pDna01 = pAequorFactory(1, mockUpStrand());
console.log("Specimen #1 = [" + pDna01.dna + "]");
pDna01.mutate();
console.log("--------------------------------------");
let pDna02 = pAequorFactory(2, mockUpStrand());
let pDna03 = pAequorFactory(3, mockUpStrand());
console.log("Specimen #2 = [" + pDna02.dna + "]");
console.log("Specimen #3 = [" + pDna03.dna + "]");
console.log("--------------------------------------");
pDna02.compareDNA(pDna03);
console.log("--------------------------------------");
let pDna04 = pAequorFactory(4, mockUpStrand());
console.log(pDna04.willLikelySurvive());
console.log("--------------------------------------");
let pDna05 = pAequorFactory(5, mockUpStrand());
pDna05.complementStrand();
console.log("----------create 30 instances---------");
let create30 = [];
let i = 1;
while (i < 31) {
  let sample = pAequorFactory(i, mockUpStrand());
  if (sample.willLikelySurvive() == true) {
    create30.push(sample);
    i += 1;
  }
}
console.log(create30);
