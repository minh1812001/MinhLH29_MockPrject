import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionGuard } from './permission-guard';

describe('PermissionGuard', () => {
  let component: PermissionGuard;
  let fixture: ComponentFixture<PermissionGuard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionGuard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionGuard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
