import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'invoice',
    loadChildren: () => import('./pages/invoice/invoice.module').then( m => m.InvoicePageModule)
  },
  {
    path: 'invoice-layout',
    loadChildren: () => import('./modals/invoice-layout/invoice-layout.module').then( m => m.InvoiceLayoutPageModule)
  },
  {
    path: 'numpad',
    loadChildren: () => import('./modals/numpad/numpad.module').then( m => m.NumpadPageModule)
  },  {
    path: 'keypad',
    loadChildren: () => import('./modals/keypad/keypad.module').then( m => m.KeypadPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
