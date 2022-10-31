import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <img width="300" src="/assets/under_construction.webp">
    </div>
    
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'vimm-frontend';
}
