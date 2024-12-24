export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name
    this.expiresIn = expiresIn
    this.benefit = benefit
  }
}

export const DrugType = Object.freeze({
  MagicPill: "Magic Pill",
  HerbalTea: "Herbal Tea",
  Fervex: "Fervex",
  Dafalgan: "Dafalgan",
  Doliprane: "Doliprane"
})

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs
  }

  updateBenefitValue() {
    
    this.drugs = this.drugs.map((drug, _index) => {
      const {benefit, name, expiresIn} = drug
      let updatedBenefit = benefit
      let updatedExpiresIn = expiresIn  

      
      if ( updatedBenefit < 0)  { throw new Error("Benefit can not be inferior to 0") }
      if ( updatedBenefit > 50 )  { throw new Error("Benefit can not be superior to 50") }

        switch(name) {
          case DrugType.MagicPill: 
            return drug
          case DrugType.HerbalTea:
            updatedBenefit = this.updateHerbalTeaBenefit(updatedBenefit, updatedExpiresIn)
            break
          case DrugType.Fervex:
            updatedBenefit = this.updateFervexBenefit(updatedBenefit, updatedExpiresIn)
            break
          case DrugType.Dafalgan:
            updatedBenefit = this.updateDafalganBenefit(updatedBenefit, updatedExpiresIn)
            break
          default: 
            updatedBenefit = this.updateNormalDrugsBenefit(updatedBenefit, updatedExpiresIn)
            break
        }

      updatedExpiresIn--

      return {
        ...drug,
        expiresIn: updatedExpiresIn,
        benefit: updatedBenefit,
      }
    })

    return this.drugs
  }

  updateHerbalTeaBenefit(benefit, expiresIn) {
    if (benefit < 50) {
      benefit = benefit + 1
      if (expiresIn <= 0 && benefit < 50) {
        benefit = benefit + 1
      }
    }
    return Math.min(benefit, 50)
  }

  updateFervexBenefit(benefit, expiresIn) {
    if (expiresIn <= 0) {
      benefit = 0
    } else {
      if (benefit < 50) { 
        benefit = benefit + 1
        if (expiresIn <= 10 && benefit < 50) benefit = benefit + 1
        if (expiresIn <= 5 && benefit < 50) benefit = benefit + 1
      }
    }
    return benefit
  }

  updateDafalganBenefit(benefit, expiresIn) {
    if (benefit < 50) {
      if (expiresIn <= 0) {
        benefit = Math.max(benefit - 4, 0)
      } else {
        benefit = Math.max(benefit - 2, 0)
      }
    }
    return benefit
  }

  updateNormalDrugsBenefit(benefit, expiresIn) {
    if (benefit < 50) {
      return expiresIn > 0 ? Math.max(benefit - 1, 0) : Math.max(benefit - 2, 0)
    }
  }

}
