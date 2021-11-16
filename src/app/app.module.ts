import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './service/user/user.service';
import { AuthGuard } from './shared/auth.guard';
import { RouterModule } from '@angular/router';
import { PainelComponent } from './painel/painel.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { PacientComponent } from './pacient/pacient.component';
import { NgxMaskModule } from 'ngx-mask';
import { RetiradaComponent } from './retirada/retirada.component';
import { RelatorioMedicamentoComponent } from './relatorio-medicamento/relatorio-medicamento.component';
import { RelatorioReposicaoComponent } from './relatorio-reposicao/relatorio-reposicao.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { RelatorioRetiradaComponent } from './relatorio-retirada/relatorio-retirada.component';
import { MedicineService } from './service/medicine/medicine.service';
import { RetiradaService } from './service/retirada/retirada.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PainelComponent,
    SingInComponent,
    PacientComponent,
    RetiradaComponent,
    RelatorioMedicamentoComponent,
    RelatorioReposicaoComponent,
    RegistrarUsuarioComponent,
    RelatorioRetiradaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    UserService,
    AuthGuard,
    MedicineService,
    RetiradaService
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
