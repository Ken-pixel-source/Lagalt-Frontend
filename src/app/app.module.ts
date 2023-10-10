import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ProjectListComponent,
    ProjectItemComponent,
    ProjectPageComponent,
    ProfilePageComponent,
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
