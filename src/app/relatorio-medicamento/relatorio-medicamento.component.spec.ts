import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioMedicamentoComponent } from './relatorio-medicamento.component';

describe('RelatorioMedicamentoComponent', () => {
  let component: RelatorioMedicamentoComponent;
  let fixture: ComponentFixture<RelatorioMedicamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioMedicamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
