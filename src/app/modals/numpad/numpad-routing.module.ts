import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NumpadPage } from './numpad.page';

const routes: Routes = [
  {
    path: '',
    component: NumpadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NumpadPageRoutingModule {}
