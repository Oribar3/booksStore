import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormForAdminComponent } from './book-form-for-admin.component';

describe('BookFormForAdminComponent', () => {
  let component: BookFormForAdminComponent;
  let fixture: ComponentFixture<BookFormForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookFormForAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookFormForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
