import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyBlogCardComponent } from './my-blog-card/my-blog-card.component';
import { MyBlogsComponent } from './my-blogs/my-blogs.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path:'myblogs',
  component: MyBlogsComponent,
  canActivate: [AuthGuardService]},
  {path: 'create', component: CreateBlogComponent,
  canActivate: [AuthGuardService]},
  {path: 'editblog/', component: EditBlogComponent,
  canActivate: [AuthGuardService]},
  {path: 'editblog/:id', component: EditBlogComponent,
  canActivate: [AuthGuardService]},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents= [HomeComponent, RegisterComponent, LoginComponent, MyBlogsComponent, CreateBlogComponent, PageNotFoundComponent, BlogCardComponent, MyBlogCardComponent]
