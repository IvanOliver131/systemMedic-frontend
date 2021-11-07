import { Component, OnInit } from '@angular/core';
import { PacientService } from '../service/pacient/pacient.service';
import { Pacient } from '../shared/pacient';

@Component({
  selector: 'app-pacient',
  templateUrl: './pacient.component.html',
  styleUrls: ['./pacient.component.css']
})
export class PacientComponent implements OnInit {
  public pacient: Pacient = new Pacient();
  public search;
  public allPacientLst: Array<Pacient> = new Array<Pacient>();

  constructor(
    private pacientSvc: PacientService,
  ) { }

  ngOnInit(): void {
    this.getPacients();
  }

  verifyInputs() {
    let msg = ``
    let success = true;
    if (!this.pacient.name) {
      msg += `O campo nome do paciente é requerido\n\n`;
      success = false;
    }
    if (!this.pacient.age) {
      msg += `O campo idade do paciente é requerido\n\n`;
      success = false;
    }
    if (!this.pacient.bairro) {
      msg += `O campo bairro do paciente é requerido\n\n`;
      success = false;
    }
    if (!this.pacient.cartaoSUS_RG) {
      msg += `O campo cartao do SUS ou RG do paciente é requerido\n\n`;
      success = false;
    }
    if (!this.pacient.cpf) {
      msg += `O campo CPF do paciente é requerido\n\n`;
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
      this.getPacients();
    }
  }

  funcaoEnter(search){
    if(search !== ''){
      this.getPacientOne(search);
    }
    else{
      this.getPacients();
    }
  }

  async getPacientOne(search){
    this.allPacientLst = [];
    this.pacientSvc.getSpecificPacients(search).subscribe((result) =>{ 
      this.allPacientLst = result;
    });
  }

  async addPacient(){
    if (this.verifyInputs()) {
      this.pacientSvc.registerPacient(this.pacient).subscribe(()=>{
        this.ngOnInit(); 
      });
      this.pacient = new Pacient();
    }
  }

  async getPacients(){
    this.pacientSvc.getAllPacients().subscribe((result) =>{
      this.allPacientLst = result; 
    });
  }

  async deletePacient(pacient){
    this.pacientSvc.deletePacient(pacient).subscribe(() =>{
      this.ngOnInit();  
    });
    this.pacient = new Pacient();
  }
  
  async updatePacient(){
    if (this.verifyInputs()) {
      this.pacientSvc.updatePacient(this.pacient).subscribe();
      this.pacient = new Pacient();
    }
  }

  setPacient(pacient){
    this.pacient = pacient;
  }

}
