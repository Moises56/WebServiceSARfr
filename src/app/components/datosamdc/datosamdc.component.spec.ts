import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosamdcComponent } from './datosamdc.component';

describe('DatosamdcComponent', () => {
  let component: DatosamdcComponent;
  let fixture: ComponentFixture<DatosamdcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosamdcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosamdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
