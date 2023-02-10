import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IxcCxInfoComponent } from './ixc-cx-info.component';

describe('IxcCxInfoComponent', () => {
  let component: IxcCxInfoComponent;
  let fixture: ComponentFixture<IxcCxInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ IxcCxInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IxcCxInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
