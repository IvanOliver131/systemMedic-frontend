import { Component, OnInit } from '@angular/core';
import { PacientService } from '../service/pacient/pacient.service';
import { RetiradaService } from '../service/retirada/retirada.service';
import { Medicine } from '../shared/medicine';
import { Pacient } from '../shared/pacient';

@Component({
  selector: 'app-relatorio-retirada',
  templateUrl: './relatorio-retirada.component.html',
  styleUrls: ['./relatorio-retirada.component.css']
})
export class RelatorioRetiradaComponent implements OnInit {
  public medicine: Medicine = new Medicine();
  public pacient: Pacient = new Pacient();

  public dataAtual = '';
  public dateFinal = '';
  public search;
  public typeControl = 1;

  public allRetiradaLst: any = [];
  public allRetiradaLstExportFinal: any = [];
  public allRetiradaLstExport: any = {
    id_paciente: "",
    nome_paciente: "",
    id_medicamento: "", 
    nome_medicamento: "",
    qtd_retirada: "",
    data_retirada: ""
  };

  public allPacientLst: Array<Pacient> = new Array<Pacient>();

  constructor(
    private pacientSvc: PacientService,
    private retiradaSvc: RetiradaService
  ) { }

  ngOnInit(): void {
    let dateIni = new Date();
    let dia = String(dateIni.getDate()).padStart(2, '0');
    let mes = String(dateIni.getMonth() + 1).padStart(2, '0');
    let ano = dateIni.getFullYear();
    this.dataAtual = ano + '-' + mes + '-' + dia;
    this.getPacients();
    this.getAllRetirada();
  }

  async funcaoCadaTecla(search){
    if(search === ''){
      this.getAllRetirada();
    }
  }

  funcaoEnter(search){
    if(search !== ''){
      this.getRetiradaOne(search);
    }
    else{
      this.getAllRetirada();
    }
  }

  async getRetiradaOne(search){
    this.allRetiradaLst = [];
    this.retiradaSvc.getSpecificRetirada(search).subscribe((result) =>{ 
      this.allRetiradaLst = result;
    });
  }

  async downloadCsv(allRetiradaLst, nameString){
    this.allRetiradaLstExportFinal = [];

    allRetiradaLst.forEach((retirada) => {
      this.allRetiradaLstExport.id_paciente = retirada.id_pacient;
      this.allRetiradaLstExport.nome_paciente = retirada.name;
      this.allRetiradaLstExport.id_medicamento = retirada.id_medicine;
      this.allRetiradaLstExport.nome_medicamento = retirada.medicines.name;
      this.allRetiradaLstExport.qtd_retirada = retirada.qtd_medicine;
      this.allRetiradaLstExport.data_retirada = retirada.created_at;

      console.log(this.allRetiradaLstExport)

      this.allRetiradaLstExportFinal.push(this.allRetiradaLstExport);

      this.allRetiradaLstExport = { 
        id_paciente: "",
        nome_paciente: "",
        id_medicamento: "", 
        nome_medicamento: "",
        qtd_retirada: "",
        data_retirada: ""
      };
    });

    this.retiradaSvc.downloadExcel(this.allRetiradaLstExportFinal, nameString);
  }

  async filterDate(filter){
    if(filter === 1){
      this.retiradaSvc.getAllRetiradaDate(this.dataAtual, this.dataAtual).subscribe((result) =>{
        this.allRetiradaLst = result;
        this.allRetiradaLst.forEach((retirada) => {
          this.allPacientLst.forEach((paciente) => {
            if(retirada.id_pacient == paciente.id){
              retirada.name = paciente.name;
            }
          });
        });   
      });
    }else if(filter === 7){
      let dateFim = new Date();
      dateFim.setDate(dateFim.getDate() - 7);
      let dia = String(dateFim.getDate()).padStart(2, '0');
      let mes = String(dateFim.getMonth() + 1).padStart(2, '0');
      let ano = dateFim.getFullYear();
      this.dateFinal = ano + '-' + mes + '-' + dia;

      this.retiradaSvc.getAllRetiradaDate(this.dataAtual, this.dateFinal).subscribe((result) =>{
        this.allRetiradaLst = result; 
        this.allRetiradaLst.forEach((retirada) => {
          this.allPacientLst.forEach((paciente) => {
            if(retirada.id_pacient == paciente.id){
              retirada.name = paciente.name;
            }
          });
        });  
      });
    }else if(filter === 15){
      let dateFim = new Date();
      dateFim.setDate(dateFim.getDate() - 15);
      let dia = String(dateFim.getDate()).padStart(2, '0');
      let mes = String(dateFim.getMonth() + 1).padStart(2, '0');
      let ano = dateFim.getFullYear();
      this.dateFinal = ano + '-' + mes + '-' + dia;

      this.retiradaSvc.getAllRetiradaDate(this.dataAtual, this.dateFinal).subscribe((result) =>{
        this.allRetiradaLst = result; 
        this.allRetiradaLst.forEach((retirada) => {
          this.allPacientLst.forEach((paciente) => {
            if(retirada.id_pacient == paciente.id){
              retirada.name = paciente.name;
            }
          });
        });  
      });    
    }else if(filter === 30){
      let dateFim = new Date();
      dateFim.setDate(dateFim.getDate() - 30);
      let dia = String(dateFim.getDate()).padStart(2, '0');
      let mes = String(dateFim.getMonth() + 1).padStart(2, '0');
      let ano = dateFim.getFullYear();
      this.dateFinal = ano + '-' + mes + '-' + dia;

      this.retiradaSvc.getAllRetiradaDate(this.dataAtual, this.dateFinal).subscribe((result) =>{
        this.allRetiradaLst = result; 
        this.allRetiradaLst.forEach((retirada) => {
          this.allPacientLst.forEach((paciente) => {
            if(retirada.id_pacient == paciente.id){
              retirada.name = paciente.name;
            }
          });
        });  
      });    
    }else if(filter === 0){
      this.getAllRetirada();
    }
  }

  async getPacients(){
    this.pacientSvc.getAllPacients().subscribe((result) =>{
      this.allPacientLst = result; 
    });
  }
  
  async getAllRetirada(){
    this.retiradaSvc.getAllPacientMedicine().subscribe((result)=>{
      this.allRetiradaLst = result;
      this.allRetiradaLst.forEach((retirada) => {
        this.allPacientLst.forEach((paciente) => {
          if(retirada.id_pacient == paciente.id){
            retirada.name = paciente.name;
          }
        });
      });
    });      
  }

}
