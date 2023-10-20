import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { AuthGuard } from 'src/app/authGuard/auth.guard.guard';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProjectDetailsPageComponent } from './pages/project-details-page/project-details-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { ProjectMemberComponent } from './components/project-member/project-member.component';

const routes: Routes = [
  { path: 'project', component: ProjectPageComponent },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'projects/:id', component: ProjectDetailsPageComponent, canActivate: [AuthGuard] },
  { path: 'project-member', component: ProjectMemberComponent, canActivate: [AuthGuard] },
  { path: 'project-member/:id', component: ProjectMemberComponent, canActivate: [AuthGuard] },
  { path: 'newproject', component: NewProjectComponent, canActivate: [AuthGuard] },
  { path: '', component: LandingPageComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
