import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisconsultasComponent } from './misconsultas.component';

describe('MisconsultasComponent', () => {
  let component: MisconsultasComponent;
  let fixture: ComponentFixture<MisconsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisconsultasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisconsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
