import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorialsComponent } from './memorials.component';

describe('MemorialsComponent', () => {
  let component: MemorialsComponent;
  let fixture: ComponentFixture<MemorialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemorialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemorialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
