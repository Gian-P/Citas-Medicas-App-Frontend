import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { especialidad } from 'src/app/Core/Models/especialidades/especialidades.models';
import { Administrador } from 'src/app/Core/Models/users/administrador.models';
import { Medico } from 'src/app/Core/Models/users/medico.models';
import { Paciente } from 'src/app/Core/Models/users/paciente.models';
import { User } from 'src/app/Core/Models/users/users.models';
import { AdminService } from 'src/app/Core/Service/Admin/admin.service';
import { DoctorService } from 'src/app/Core/Service/Doctor/doctor.service';
import { EspecialidadService } from 'src/app/Core/Service/Especialidades/especialidades.service';
import { PacienteService } from 'src/app/Core/Service/Pacientes/pacientes.service';
import { SweetAlertService } from 'src/app/Miscelaneo/SweetAlert/sweet-alert.service';

@Component({
  selector: 'app-cuenta-form',
  templateUrl: './cuenta-form.component.html',
  styleUrls: ['./cuenta-form.component.scss'],
})
export class CuentaFormComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public rol: string = '';
  public id: string = '';
  public isLoading = false;
  public especialidades: especialidad[] = [];
  public medico!: Medico;
  public paciente!: Paciente;
  public administrador!: Administrador;

  constructor(
    private especialidadService: EspecialidadService,
    private medicoService: DoctorService,
    private pacienteService: PacienteService,
    private administradorService: AdminService,
    private sweetAlertService: SweetAlertService
  ) {
    this.rol = localStorage.getItem('rol') as string;
    this.id = localStorage.getItem('id') as string;
    this.getEspecialidades();
  }

  ngOnInit(): void {
    this.intializeForm();
    this.getData();
    this.form.disable();
  }

  private intializeForm() {
    this.form = new FormGroup({
      apellido: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      numeroTelefono: new FormControl('', Validators.required),
      idEspecialidad: new FormControl('', Validators.required),
    });
  }

  public getEspecialidades() {
    this.especialidadService.getListEspecialidades().subscribe(
      (res) => {
        this.especialidades = res;
      },
      (err) => {
        this.sweetAlertService.opensweetalerterror(
          'Error al obtener las especialidades'
        );
      }
    );
  }

  public getPaciente(id: number) {
    this.pacienteService.getPacienteById(id).subscribe(
      (res) => {
        this.paciente = res[0];
        this.form.patchValue({
          numeroTelefono: this.paciente.numero,
          ...this.paciente,
        });
      },
      (err) => {
        this.sweetAlertService.opensweetalerterror(
          'Error al obtener los datos del paciente'
        );
      }
    );
  }

  public getAdminstrador(id: number) {
    this.administradorService.getAdminById(id).subscribe(
      (res) => {
        this.administrador = res[0];
        this.form.patchValue({
          numeroTelefono: this.administrador.numero,
          ...this.administrador,
        });
      },
      (err) => {
        this.sweetAlertService.opensweetalerterror(
          'Error al obtener los datos del administrador'
        );
      }
    );
  }

  public getMedico(id: number) {
    this.medicoService.getDoctorById(id).subscribe(
      (res) => {
        this.medico = res[0];
        this.form.patchValue({
          numeroTelefono: this.medico.numero,
          ...this.medico,
        });
      },
      (err) => {
        this.sweetAlertService.opensweetalerterror(
          'Error al obtener los datos del medico'
        );
      }
    );
  }

  public submit() {
    this.isLoading = true;
    const id = parseInt(this.id);

    if (this.rol == 'Cliente') {
      const paciente = {
        ...this.form.value,
      } as User

      paciente.tipoTelefono = 'Celular';

      this.pacienteService.updatePaciente(id, paciente).subscribe(
        (res) => {
          this.sweetAlertService.opensweetalertsuccess(
            'Datos actualizados correctamente'
          );
          this.isLoading = false;
        },
        (err) => {
          this.sweetAlertService.opensweetalerterror(
            'Error al actualizar los datos'
          );
          this.isLoading = false;
        }
      );
    } else if (this.rol == 'Medico') {
      const medico = {
        ...this.form.value,
      } as Medico;

      medico.tipoTelefono = 'Celular';

      this.medicoService.updateDoctor(id, medico).subscribe(
        (res) => {
          this.sweetAlertService.opensweetalertsuccess(
            'Datos actualizados correctamente'
          );
          this.isLoading = false;
        },
        (err) => {
          this.sweetAlertService.opensweetalerterror(
            'Error al actualizar los datos'
          );
          this.isLoading = false;
        }
      );
    } else if (this.rol == 'Administrador') {
      const admin = {
        ...this.form.value,
      } as Administrador;

      admin.tipoTelefono = 'Celular';

      this.administradorService.updateAdmin(id, admin).subscribe(
        (res) => {
          this.sweetAlertService.opensweetalertsuccess(
            'Datos actualizados correctamente'
          );
          this.isLoading = false;
        },
        (err) => {
          this.sweetAlertService.opensweetalerterror(
            'Error al actualizar los datos'
          );
          this.isLoading = false;
        }
      );
    }
  }

  private getData() {
    const id = parseInt(this.id);

    if (this.rol == 'Cliente') {
      this.getPaciente(id);
    } else if (this.rol == 'Medico') {
      this.getMedico(id);
    } else if (this.rol == 'Administrador') {
      this.getAdminstrador(id);
    }
  }
}
