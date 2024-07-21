import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportsAutocompleteComponent } from './airports-autocomplete.component';

describe('AirportsAutocompleteComponent', () => {
  let component: AirportsAutocompleteComponent;
  let fixture: ComponentFixture<AirportsAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirportsAutocompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportsAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
