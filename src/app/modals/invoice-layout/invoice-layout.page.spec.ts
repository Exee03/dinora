import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvoiceLayoutPage } from './invoice-layout.page';

describe('InvoiceLayoutPage', () => {
  let component: InvoiceLayoutPage;
  let fixture: ComponentFixture<InvoiceLayoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceLayoutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceLayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
