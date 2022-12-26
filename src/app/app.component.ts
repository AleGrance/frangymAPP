import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    //{ title: 'Marcador', url: '/marcador', icon: 'calculator' },
    { title: 'Turnos', url: '/cliente', icon: 'body' },
    //{ title: 'Usuarios', url: '/usuario', icon: 'people' }    
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
