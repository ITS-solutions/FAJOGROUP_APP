import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { RoleService } from './services/role.service';
import { ConfirmDialogComponent } from 'app/modules/components/comfirm-dialog/comfirm-dialog.component';
import { AddRoleModalComponent } from './components/add-role-modal/add-role-modal.component';
import { Role } from './types/Role.type';

@Component({
    selector: 'app-roles',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatMenuModule,
    ],
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
    public roles: Role[] = [];
    public displayedColumns: string[] = ['id', 'name', 'created_at', 'updated_at', 'actions'];

    private roleService = inject(RoleService);
    private dialog = inject(MatDialog);

    ngOnInit(): void {
        this.loadRoles();
    }

    /**
     * Cargar roles desde el servicio
     */
    loadRoles(): void {
        this.roleService.getRoles().then((roles) => {
            console.log('Roles cargados:', roles);
            this.roles = roles;
        });
    }

    /**
     * Abrir el modal para añadir o editar un rol
     * @param data Datos del rol (opcional)
     */
    openAddRoleModal(data?: Role): void {
        const dialogRef = this.dialog.open(AddRoleModalComponent, {
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
                this.loadRoles(); // Recargar la lista de roles después de cerrar el modal
            }
        });
    }

    /**
     * Confirmar eliminación de un rol
     * @param roleId ID del rol a eliminar
     */
    confirmDelete(roleId: number): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            minWidth: '300px',
            data: {
                title: 'Confirmar eliminación',
                message: '¿Estás seguro de que deseas eliminar este rol?',
            },
        });

        dialogRef.afterClosed().subscribe((confirmed) => {
            if (confirmed) {
                this.roleService.deleteRole(roleId).then(() => {
                    this.loadRoles(); // Recargar la lista de roles después de eliminar
                });
            }
        });
    }
}
