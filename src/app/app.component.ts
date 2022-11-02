import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    
    <div style="text-align: center;">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'vimm-frontend';
}
