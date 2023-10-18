import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LoginPageComponent   } from './pages/login-page/login-page.component';
import { ProjectDetailsPageComponent } from './pages/project-details-page/project-details-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { ProjectMemberComponent } from './components/project-member/project-member.component';

const routes: Routes = [
  { path: 'project', component: ProjectPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'projects/:id', component: ProjectDetailsPageComponent },
  {path:'project-member', component: ProjectMemberComponent},
  {path:'project-member/:id', component: ProjectMemberComponent},
  { path: 'login', component: LoginPageComponent },
  {path: 'newproject', component: NewProjectComponent},
  { path: '', component: LandingPageComponent }, // Redirect to login page by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
