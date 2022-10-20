import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  nombre: string;
  ci: string;
  status: string;
  periodo: string;

  public clientes: any;
  public fecha = new Date();
  public fechaRegistro: any;

  constructor(private api: ApiService, private toastController: ToastController) { }

  ngOnInit() {
    this.api.get('cliente')
      .subscribe(data => {
        this.clientes = data;
        //console.log(this.clientes);
      })

    // Set the date
    const mes = this.fecha.getMonth() + 1;
    this.fechaRegistro = this.fecha.getFullYear() + "-" + mes + "-" + this.fecha.getDate();

  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    const clienteNuevo = {
      nombre_cliente: this.nombre,
      ci_cliente: this.ci,
      estado_cliente: this.status,
      fecha_registro: this.fechaRegistro,
      fecha_vencimiento: this.periodo,
      UserUserId: 1
    }

    //console.log(clienteNuevo);

    this.api.post('cliente', clienteNuevo)
      .subscribe(result => {
        if (typeof result === 'object') {
          this.presentToast('top', 'Cliente registrado');

          this.api.get('cliente')
            .subscribe(data => {
              this.clientes = data;
              //console.log(this.clientes);
            })

          this.modal.dismiss();
        } else {
          this.presentToast('bottom', result);
        }
      }, error => {
        console.log('Si hay error en el post: ', error);
      });

  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {

    }
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
