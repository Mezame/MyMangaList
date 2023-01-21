import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'manga', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'page-not-found', loadChildren: () => import('./pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  },
  { path: '', redirectTo: 'manga', pathMatch: 'full' },
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, {
    scrollPositionRestoration: 'enabled',
    paramsInheritanceStrategy: 'always',
    relativeLinkResolution: 'corrected',
    malformedUriErrorHandler: (_error: URIError, UrlSerializer, _url: string) =>
      UrlSerializer.parse('page-not-found')
  }
  )],
  exports: [RouterModule]
})
export class MmlRoutingModule { }
