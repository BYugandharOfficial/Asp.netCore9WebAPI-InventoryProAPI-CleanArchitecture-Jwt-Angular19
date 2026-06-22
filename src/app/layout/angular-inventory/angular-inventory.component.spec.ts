import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularInventoryComponent } from './angular-inventory.component';

describe('AngularInventoryComponent', () => {
  let component: AngularInventoryComponent;
  let fixture: ComponentFixture<AngularInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
