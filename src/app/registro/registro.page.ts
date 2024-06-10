import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; 
import { DbserviceService } from '../dbservice.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
 

  nombre: any='';
  apellido: any='';
  usuario: any='';
  password: any='';
  selectedOption: any='';
  selectedDate: any='';

  isDBReady: boolean = false;
  

  constructor(private router:Router,
              private activateroute:ActivatedRoute, 
              private alertController:AlertController,
              private dbService: DbserviceService) { }

  ngOnInit() {
    this.dbService.getIsDBReady().subscribe(isReady => {
      this.isDBReady = isReady;
      if (isReady) {
        // Aquí puedes llamar a funciones para cargar datos, etc. desde la base de datos
      }
    });
  }

    
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


  guardar() {
    if (this.nombre.trim() === '' || this.apellido.trim() === '') {
      this.presentAlert('Error: nombre y apellido vacios');
    } else {
      this.guardarDatos();  
    }
  } 
  
  guardarDatos() {
    this.dbService.insertUsuario(this.nombre, this.apellido, this.usuario, this.password, this.selectedOption, this.selectedDate)
      .then(() => {
        this.presentAlert('Datos guardados exitosamente');
        // Aquí puedes añadir lógica adicional, como mostrar un mensaje de éxito al usuario.
      })
      .catch(error => {
        this.presentAlert('Error al guardar datos:'+ error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario.
      });
  }


  
  volver() {
    this.router.navigate(['/login']);
  }


}
