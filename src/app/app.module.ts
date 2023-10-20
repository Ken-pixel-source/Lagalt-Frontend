import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from './components/logo/logo.component';
import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { EditProfilComponent } from './components/edit-profile/edit-profile.component';
import { ProjectDetailsPageComponent } from './pages/project-details-page/project-details-page.component';
import { LandingComponentComponent } from './components/landing-component/landing-component.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ProjectTypesComponent } from './components/project-types/project-types.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';
import { ProjectMemberComponent } from './components/project-member/project-member.component';
import { HttpAuthInterceptor } from 'src/app/services/HttpAuthInterceptor';
import { RefreshTokenHttpInterceptor } from 'src/app/services/RefreshTokenHttpInterceptor';
import { MessageComponent } from './components/message/message.component';
import { NewMessageComponent } from './components/new-message/new-message.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectListComponent,
    ProjectItemComponent,
    ProjectPageComponent,
    ProfilePageComponent,
    LogoComponent,
    ButtonGroupComponent,
    EditProfilComponent,
    ProjectDetailsComponent,
    ProjectDetailsPageComponent,
    LandingComponentComponent,
    LandingPageComponent,
    ProjectTypesComponent,
    NewProjectComponent,
    MyProjectsComponent,
    ProjectMemberComponent,
    MessageComponent,
    NewMessageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenHttpInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
