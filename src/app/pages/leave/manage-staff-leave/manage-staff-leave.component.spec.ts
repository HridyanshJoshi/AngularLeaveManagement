import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStaffLeaveComponent } from './manage-staff-leave.component';

describe('ManageStaffLeaveComponent', () => {
  let component: ManageStaffLeaveComponent;
  let fixture: ComponentFixture<ManageStaffLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageStaffLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStaffLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
