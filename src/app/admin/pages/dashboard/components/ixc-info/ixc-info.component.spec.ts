import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IxcInfoComponent } from './ixc-info.component';

describe('IxcInfoComponent', () => {
  let component: IxcInfoComponent;
  let fixture: ComponentFixture<IxcInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ IxcInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IxcInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
