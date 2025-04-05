import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../../services/users.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-add-user-modal',
    standalone: true,
    templateUrl: './add-user-modal.component.html',
    styleUrls: ['./add-user-modal.component.scss'],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class AddUserModalComponent {
    userForm: FormGroup;

    identificationTypes = [
        { id: 1, name: 'Cédula de Ciudadanía' },
        { id: 2, name: 'Tarjeta de Identidad' },
        { id: 3, name: 'Pasaporte' },
    ];

    roles = [
        { id: 1, name: 'Administrador' },
        { id: 2, name: 'Usuario' },
    ];

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddUserModalComponent>,
        private usersService: UsersService,
        @Inject(MAT_DIALOG_DATA) public data: any // Recibir los datos enviados al modal
    ) {
        // Inicializar el formulario con valores predeterminados o los datos proporcionados
        this.userForm = this.fb.group({
            name: [data?.name || '', Validators.required],
            lastname: [data?.lastname || '', Validators.required],
            identification: [data?.type_identification_id || '', Validators.required],
            phone_number: [data?.phone_number || ''],
            address: [data?.address || ''],
            email: [data?.email || '', [Validators.required, Validators.email]],
            password: ['', data ? [] : Validators.required], // Solo requerido si es un nuevo usuario
            password_confirmation: ['', data ? [] : Validators.required], // Solo requerido si es un nuevo usuario
            type_identification_id: [data?.type_identification_id || null, Validators.required],
            roles: [data?.roles || [], Validators.required],
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    async onSubmit(): Promise<void> {
        if (this.userForm.valid) {
            try {
                const formData = {
                    ...this.userForm.value,
                    identification: String(this.userForm.value.identification),
                };

                if (this.data) {
                    // Si hay datos, es una edición
                    await this.usersService.updateUser(this.data.id, formData);
                    console.log('Usuario actualizado:', formData);
                } else {
                    // Si no hay datos, es una creación
                    const response = await this.usersService.createUser(formData);
                    console.log('Usuario creado:', response);
                }

                this.dialogRef.close(true);
            } catch (error) {
                console.error('Error al guardar usuario:', error);
            }
        }
    }
}
