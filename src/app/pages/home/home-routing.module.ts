import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/auth/guard/auth.guard';
import { MangaListResolverService } from '@services/manga/resolver/manga-list-resolver.service';
import { HomePage } from './home.page';
import { WrapperComponent } from './wrapper/wrapper.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all', 
    pathMatch: 'full'
  },
  {
    path: '',
    component: WrapperComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':mangaByStatus',
        component: HomePage,
        resolve: {
          manga: MangaListResolverService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class HomeRoutingModule { }
