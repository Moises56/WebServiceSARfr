import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentabrutaComponent } from './ventabruta.component';

describe('VentabrutaComponent', () => {
  let component: VentabrutaComponent;
  let fixture: ComponentFixture<VentabrutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentabrutaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentabrutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
