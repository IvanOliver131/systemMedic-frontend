import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../service/medicine/medicine.service';
import { Medicine } from '../shared/medicine';

@Component({
  selector: 'app-relatorio-reposicao',
  templateUrl: './relatorio-reposicao.component.html',
  styleUrls: ['./relatorio-reposicao.component.css']
})
export class RelatorioReposicaoComponent implements OnInit {
  public medicine: Medicine = new Medicine();
  public search;
  public allMedicineLst: Array<Medicine> = new Array<Medicine>();

  constructor(
    private medicineSvc: MedicineService
  ) { }

  ngOnInit(): void {
    this.getMedicinesQtd();
  }

  async funcaoCadaTecla(search){
    if(search === ''){
      this.getMedicinesQtd();
    }
  }

  funcaoEnter(search){
    if(search !== ''){
      this.getMedicinesOne(search);
    }
    else{
      this.getMedicinesQtd();
    }
  }

  async getMedicinesOne(search){
    this.allMedicineLst = [];
    this.medicineSvc.getSpecificMedicines(search).subscribe((result) =>{ 
      this.allMedicineLst = result;
    });
  }

  async getMedicinesQtd(){
    this.medicineSvc.getAllMedicinesQtd().subscribe((result) =>{
      this.allMedicineLst = result;   
    });
  }

  async downloadCsv(allMedicineLst, nameString){
    this.medicineSvc.downloadExcel(allMedicineLst, nameString);
  }
}
