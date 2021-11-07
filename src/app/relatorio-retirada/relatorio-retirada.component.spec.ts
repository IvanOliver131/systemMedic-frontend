import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioRetiradaComponent } from './relatorio-retirada.component';

describe('RelatorioRetiradaComponent', () => {
  let component: RelatorioRetiradaComponent;
  let fixture: ComponentFixture<RelatorioRetiradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioRetiradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioRetiradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
