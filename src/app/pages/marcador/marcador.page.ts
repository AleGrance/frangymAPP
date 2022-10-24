import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-marcador',
  templateUrl: './marcador.page.html',
  styleUrls: ['./marcador.page.scss'],
})
export class MarcadorPage implements OnInit {
  public texto = "";
  public clienteSeleccionado: any;

  constructor(private api: ApiService, private toastController: ToastController) { }

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
    this.api.get('cliente/' + this.texto)
      .subscribe(data => {
        // Si retorna null porque el nro de ci ingresado no esta registrado entonces muestra el mensaje de abajo
        if (!data) {
          this.presentToast('bottom', 'El clente no esta registrado');
        // De lo contrario muestra el estado
        } else {
          this.clienteSeleccionado = data;
          this.presentToast('middle', this.clienteSeleccionado.estado_cliente);
        }
      })

  }

  async presentToast(position: 'top' | 'middle' | 'bottom', mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: position
    });

    await toast.present();
  }
}
