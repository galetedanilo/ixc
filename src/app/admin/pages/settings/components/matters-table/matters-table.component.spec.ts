import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MattersTableComponent } from './matters-table.component';

describe('MattersTableComponent', () => {
  let component: MattersTableComponent;
  let fixture: ComponentFixture<MattersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MattersTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MattersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
