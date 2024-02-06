import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveusuarioComponent } from './saveusuario.component';

describe('SaveusuarioComponent', () => {
  let component: SaveusuarioComponent;
  let fixture: ComponentFixture<SaveusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveusuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
