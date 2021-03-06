import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//Para bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';

//Componentes
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { EventComponent } from './event/event.component';
import { ProfileComponent } from './profile/profile.component';

//Servicios
import { AuthService } from './_services/auth.service'; 
import { GraphService } from './_services/graph.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './_interceptors/auth-interceptor'; 

//Guardian
import { AuthGuard } from './auth.guard';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ErrorComponent,
    LoginComponent,
    ProfileComponent,
    AlertComponent,
    EventComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    CookieService,
    GraphService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
