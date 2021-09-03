import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialExtensionsModule } from '@ng-matero/extensions';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ErrorCodeComponent } from '@shared/components/error-code/error-code.component';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { DisableControlDirective } from '@shared/directives/disable-control.directive';
import { SafeUrlPipe } from '@shared/pipes/safe-url.pipe';
import { ToObservablePipe } from '@shared/pipes/to-observable.pipe';
import { MaterialModule } from 'app/material.module';

const MODULES: any[] = [
  MaterialModule,
  MaterialExtensionsModule,
  FlexLayoutModule,
  FormlyModule,
  FormlyMaterialModule,
  NgProgressModule,
  NgProgressRouterModule,
  NgProgressHttpModule,
  NgSelectModule,
  NgxPermissionsModule,
  ToastrModule,
  TranslateModule,
];
const COMPONENTS: any[] = [BreadcrumbComponent, PageHeaderComponent, ErrorCodeComponent];
const COMPONENTS_DYNAMIC: any[] = [];
const DIRECTIVES: any[] = [DisableControlDirective];
const PIPES: any[] = [SafeUrlPipe, ToObservablePipe];

@NgModule({
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, ...DIRECTIVES, ...PIPES],
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, ...MODULES],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...MODULES,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class SharedModule {}
