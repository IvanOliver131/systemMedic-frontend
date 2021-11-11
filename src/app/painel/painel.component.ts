import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../service/medicine/medicine.service';
import { Medicine } from '../shared/medicine';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {
  public medicine: Medicine = new Medicine();
  public search;
  public medicineSpecific;
  public allMedicineLst: Array<Medicine> = new Array<Medicine>();

  constructor(
    private medicineSvc: MedicineService,
  ) { }

  ngOnInit(): void {
    this.medicine.type = false;
    this.getMedicines();
  }

  verifyInputs() {
    let msg = ``
    let success = true;
    if (!this.medicine.name) {
      msg += ` O campo nome do medicamento é requerido\n\n`;
      success = false;
    }
    if (!this.medicine.fornecedor) {
      msg += ` O campo fornecedor do medicamento é requerido\n\n`;
      success = false;
    }
    if (!this.medicine.estoque) {
      msg += ` O campo estoque do medicamento é requerido\n\n`;
      success = false;
    }
    if (!this.medicine.nota_fiscal) {
      msg += ` O campo nota fiscal do medicamento é requerido\n\n`;
      success = false;
    }
    if (!success) {
      console.log(msg, `Ok`, {
        duration: 3000,
      });
      alert(msg)
    }
    return success;
  }

  async funcaoCadaTecla(search){
    if(search === ''){
      this.getMedicines();
    }
  }

  funcaoEnter(search){
    if(search !== ''){
      this.getMedicinesOne(search);
    }
    else{
      this.getMedicines();
    }
  }

  async getMedicinesOne(search){
    this.allMedicineLst = [];
    this.medicineSvc.getSpecificMedicines(search).subscribe((result) =>{ 
      this.allMedicineLst = result;
    });
  }

  async addMedicine(){
    if (this.verifyInputs()) {
      this.medicineSvc.registerMedicine(this.medicine).subscribe(()=>{
        this.ngOnInit(); 
      },
      (error) => {
        alert(error.message);
      });
      this.medicine = new Medicine();
    }    
  }

  async getMedicines(){
    this.medicineSvc.getAllMedicines().subscribe((result) =>{
      this.allMedicineLst = result;   
    });
  }

  async deleteMedicine(medicine){
    this.medicineSvc.deleteMedicine(medicine).subscribe(() =>{
      this.ngOnInit();  
    });
    this.medicine = new Medicine();
  }

  async updateMedicine(){
    if (this.verifyInputs()) {
      this.medicineSvc.updateMedicine(this.medicine).subscribe();
      this.medicine = new Medicine();
    }
  }

  setMedicine(medicine){
    this.medicine = medicine;
  }
}
