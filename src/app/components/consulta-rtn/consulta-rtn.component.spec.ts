import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaRTNComponent } from './consulta-rtn.component';

describe('ConsultaRTNComponent', () => {
  let component: ConsultaRTNComponent;
  let fixture: ComponentFixture<ConsultaRTNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaRTNComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaRTNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
