import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterModalComponent } from './matter-modal.component';

describe('MatterModalComponent', () => {
  let component: MatterModalComponent;
  let fixture: ComponentFixture<MatterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatterModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
