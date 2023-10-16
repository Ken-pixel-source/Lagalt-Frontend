import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProjectDetailsPageComponent } from './pages/project-details-page/project-details-page.component';
import { LandingComponentComponent } from './components/landing-component/landing-component.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ProjectTypesComponent } from './components/project-types/project-types.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ProjectListComponent,
    ProjectItemComponent,
    ProjectPageComponent,
    ProfilePageComponent,
    LoginPageComponent,
    ProjectDetailsPageComponent,
    ProjectDetailsComponent,
    LandingComponentComponent,
    LandingPageComponent,
    ProjectTypesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
