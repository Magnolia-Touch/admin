import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorialDetailComponent } from './memorial-detail.component';

describe('MemorialDetailComponent', () => {
  let component: MemorialDetailComponent;
  let fixture: ComponentFixture<MemorialDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemorialDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemorialDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
