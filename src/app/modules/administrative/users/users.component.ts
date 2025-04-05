import { Component, OnInit, inject } from '@angular/core';
import { User } from './types/users.types';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from './components/add-user-modal/add-user-modal.component';
import { UsersService } from './services/users.service';
import { ConfirmDialogComponent } from 'app/modules/components/comfirm-dialog/comfirm-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { PermissionsService } from 'app/modules/services/permissions.service';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatMenuModule,
    ],
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    public users: User[] = [];
    public displayedColumns: string[] = [
        'id',
        'name',
        'lastname',
        'identification',
        'phone_number',
        'address',
        'email',
        'created_at',
        'updated_at',
        'actions',
    ];
    public userPermissions: any = {}; // Almacena los permisos del usuario

    private usersService = inject(UsersService); // Inyección del servicio
    private dialog = inject(MatDialog); // Inyección del MatDialog
    private _permissionsService = inject(PermissionsService);

    ngOnInit(): void {
        const permissions = this._permissionsService.getPermissionsSync();

        // Guardar los permisos relacionados con usuarios
        this.userPermissions = permissions?.data?.permissions?.administrative?.users || {};

        // Actualizar las columnas mostradas dinámicamente
        if (!this.userPermissions.edit?.assigned && !this.userPermissions.delete?.assigned) {
            this.displayedColumns = this.displayedColumns.filter(column => column !== 'actions');
        }

        this.load(); // Llamar al método load al inicializar el componente
    }

    /**
     * Cargar usuarios desde el servicio
     */
    load(): void {
        this.usersService.getUsers().then((users) => {
            console.log("🚀 ~ UsersComponent ~ this.usersService.getUsers ~ users:", users)
            this.users = users;
        })
    }

    /**
     * Abrir el modal para añadir o editar un usuario
     * @param data Datos del usuario (opcional)
     */
    openAddUserModal(data?: User): void {
        const dialogRef = this.dialog.open(AddUserModalComponent, {
            minWidth: '400px',
            width: '70%',
            maxWidth: '800px',
            height: 'auto',
            data: { ...data },
            disableClose: true,
            hasBackdrop: true,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                // Maneja el resultado del modal, como añadir un nuevo usuario
                this.load(); // Recargar la lista de usuarios después de cerrar el modal
            }
        });
    }

    /**
 * Editar un usuario
 * @param user Usuario a editar
 */
    editUser(user: User): void {
        const dialogRef = this.dialog.open(AddUserModalComponent, {
            minWidth: '400px',
            width: '70%',
            maxWidth: '800px',
            height: 'auto',
            data: { ...user }, // Pasar los datos del usuario al modal
            disableClose: true,
            hasBackdrop: true,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.load(); // Recargar la lista de usuarios después de editar
            }
        });
    }

    /**
     * Confirmar eliminación de un usuario
     * @param userId ID del usuario a eliminar
     */
    confirmDelete(userId: number): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            minWidth: '300px',
            data: {
                title: 'Confirmar eliminación',
                message: '¿Estás seguro de que deseas eliminar este usuario?',
            },
        });

        dialogRef.afterClosed().subscribe((confirmed) => {
            if (confirmed) {
                this.usersService.deleteUser(userId).then(() => {
                    this.load(); // Recargar la lista de usuarios después de eliminar
                });
            }
        });
    }
}
