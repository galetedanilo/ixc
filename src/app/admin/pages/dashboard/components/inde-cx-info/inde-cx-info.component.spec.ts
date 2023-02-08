import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndeCxInfoComponent } from './inde-cx-info.component';

describe('IndeCxInfoComponent', () => {
  let component: IndeCxInfoComponent;
  let fixture: ComponentFixture<IndeCxInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ IndeCxInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndeCxInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
