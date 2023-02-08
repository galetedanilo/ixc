import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuntimeTableComponent } from './runtime-table.component';

describe('RuntimeTableComponent', () => {
  let component: RuntimeTableComponent;
  let fixture: ComponentFixture<RuntimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RuntimeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuntimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
