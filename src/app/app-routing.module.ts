import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { DashboardComponent }   from './dashboard/dashboard.component';
import { NavbarComponent }   from './navbar/navbar.component';
import { ErrorComponent }   from './error/error.component';
import { LoginComponent }   from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
  //{ path: 'detail/:id', component: NavbarComponent }, esto lo dejo como muestra de q puedo pasar un parametro. por la url
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
