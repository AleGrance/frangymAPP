import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  public usuarios: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get('users')
      .subscribe(data => {
        this.usuarios = data;
        console.log(this.usuarios);
      })
  }

}
