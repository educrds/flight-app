import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesAutocompleteComponent } from './states-autocomplete.component';

describe('StatesAutocompleteComponent', () => {
  let component: StatesAutocompleteComponent;
  let fixture: ComponentFixture<StatesAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatesAutocompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatesAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
