import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('../app/index/index.module').then(m => m.IndexModule) },
  { path: '', loadChildren: () => import('../app/dashboard/dashboard.module').then(m => m.DashboardModule) },
  // { path: '**', component:  NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
