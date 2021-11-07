import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../service/medicine/medicine.service';
import { Medicine } from '../shared/medicine';

@Component({
  selector: 'app-relatorio-medicamento',
  templateUrl: './relatorio-medicamento.component.html',
  styleUrls: ['./relatorio-medicamento.component.css']
})
export class RelatorioMedicamentoComponent implements OnInit {
  public medicine: Medicine = new Medicine();
  public dataAtual = '';
  public dateFinal = '';
  public search;
  public typeControl = 1;
  public allMedicineLst: Array<Medicine> = new Array<Medicine>();

  constructor(
    private medicineSvc: MedicineService
  ) { }

  ngOnInit(): void {
    let dateIni = new Date();
    let dia = String(dateIni.getDate()).padStart(2, '0');
    let mes = String(dateIni.getMonth() + 1).padStart(2, '0');
    let ano = dateIni.getFullYear();
    this.dataAtual = ano + '-' + mes + '-' + dia;
    this.getMedicinesControl(this.typeControl);
  }

  async funcaoCadaTecla(search){
    if(search === ''){
      this.getMedicinesControl(this.typeControl);
    }
  }

  funcaoEnter(search){
    if(search !== ''){
      this.getMedicinesOne(search);
    }
    else{
      this.getMedicinesControl(this.typeControl);
    }
  }

  async getMedicinesOne(search){
    this.allMedicineLst = [];
    this.medicineSvc.getSpecificMedicines(search).subscribe((result) =>{ 
      this.allMedicineLst = result;
    });
  }

  async getMedicinesControl(typeControl){
    this.medicineSvc.getAllMedicinesControl(typeControl, this.dataAtual, this.dataAtual).subscribe((result) =>{
      this.allMedicineLst = result;   
    });
  }

  async downloadCsv(allMedicineLst, nameString){
    this.medicineSvc.downloadExcel(allMedicineLst, nameString);
  }

  async filterDate(filter){
    if(filter === 1){
      this.medicineSvc.getAllMedicinesControl(this.typeControl, this.dataAtual, this.dataAtual).subscribe((result) =>{
        this.allMedicineLst = result;   
      });
    }else if(filter === 7){
      let dateFim = new Date();
      dateFim.setDate(dateFim.getDate() - 7);
      let dia = String(dateFim.getDate()).padStart(2, '0');
      let mes = String(dateFim.getMonth() + 1).padStart(2, '0');
      let ano = dateFim.getFullYear();
      this.dateFinal = ano + '-' + mes + '-' + dia;

      this.medicineSvc.getAllMedicinesControl(this.typeControl, this.dataAtual, this.dateFinal).subscribe((result) =>{
        this.allMedicineLst = result;   
      });
    }else if(filter === 15){
      let dateFim = new Date();
      dateFim.setDate(dateFim.getDate() - 15);
      let dia = String(dateFim.getDate()).padStart(2, '0');
      let mes = String(dateFim.getMonth() + 1).padStart(2, '0');
      let ano = dateFim.getFullYear();
      this.dateFinal = ano + '-' + mes + '-' + dia;

      this.medicineSvc.getAllMedicinesControl(this.typeControl, this.dataAtual,this.dateFinal).subscribe((result) =>{
        this.allMedicineLst = result;   
      });    
    }else if(filter === 30){
      let dateFim = new Date();
      dateFim.setDate(dateFim.getDate() - 30);
      let dia = String(dateFim.getDate()).padStart(2, '0');
      let mes = String(dateFim.getMonth() + 1).padStart(2, '0');
      let ano = dateFim.getFullYear();
      this.dateFinal = ano + '-' + mes + '-' + dia;

      this.medicineSvc.getAllMedicinesControl(this.typeControl, this.dataAtual, this.dateFinal).subscribe((result) =>{
        this.allMedicineLst = result;   
      });    
    }
  }

}
