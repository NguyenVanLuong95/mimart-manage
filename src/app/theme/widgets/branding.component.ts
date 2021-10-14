import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="matero-branding" href="/">
      <img src="./assets/images/logo-mimart.jpg" class="matero-branding-logo-expanded" alt="logo" />
      <span class="matero-branding-name">MiMart</span>
    </a>
  `,
})
export class BrandingComponent {}
