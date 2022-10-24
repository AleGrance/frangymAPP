import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marcador',
  templateUrl: './marcador.page.html',
  styleUrls: ['./marcador.page.scss'],
})
export class MarcadorPage implements OnInit {
  public texto = "";

  constructor() { }

  ngOnInit() {
  }

  onClick(event: any) {
    const text = event.target.innerText;

    this.texto += text;

    ((<HTMLInputElement>document.getElementById("input")).value) = this.texto;
  }

  borrar() {
    this.texto = this.texto.slice(0, this.texto.length - 1);

    ((<HTMLInputElement>document.getElementById("input")).value) = this.texto;
  }

  enviar() {
    console.log(this.texto);
  }
}
