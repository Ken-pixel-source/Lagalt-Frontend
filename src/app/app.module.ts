import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    ProjectListComponent,
    ProjectItemComponent,
    ProjectPageComponent,
    ProfilePageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
