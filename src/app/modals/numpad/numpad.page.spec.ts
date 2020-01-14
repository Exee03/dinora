import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NumpadPage } from './numpad.page';

describe('NumpadPage', () => {
  let component: NumpadPage;
  let fixture: ComponentFixture<NumpadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumpadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NumpadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
