import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioReposicaoComponent } from './relatorio-reposicao.component';

describe('RelatorioReposicaoComponent', () => {
  let component: RelatorioReposicaoComponent;
  let fixture: ComponentFixture<RelatorioReposicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioReposicaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioReposicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
