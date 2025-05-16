import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../services/role.service';
import { CommonModule } from '@angular/common';
import { RoleFormService } from '../../services/role-form.service';
import { PermissionGroupComponent } from '../permission-group/permission-group.component';
import { PermissionsService } from '../../services/permissions.service';

@Component({
    selector: 'app-add-role-modal',
    templateUrl: './add-role-modal.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        PermissionGroupComponent,
    ],
})

export class AddRoleModalComponent implements OnInit {
    roleForm: FormGroup;
    private permissionsTreeOriginal: any;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddRoleModalComponent>,
        private roleService: RoleService,
        private cdr: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private roleFormService: RoleFormService,
        private permissionsService: PermissionsService,
    ) {
        this.roleForm = this.fb.group({
            name: [data?.name || '', Validators.required],
            permissions: this.fb.group({})
        });

        this.roleFormService.form = this.roleForm;
    }

    ngOnInit(): void {
        if (this.data?.id) {
            this.loadRolePermissions();
        } else {
            this.permissionsService.getPermissionsTree().then(tree => {
                this.permissionsTreeOriginal = tree;
                const permissionsFormGroup = this.createPermissionsFormGroup(tree);
                this.roleForm.setControl('permissions', permissionsFormGroup);
                this.roleFormService.form = this.roleForm;
                this.cdr.detectChanges();
            });
        }
    }

    private loadRolePermissions(): void {
        this.roleService.getRoleById(this.data.id)
            .then(role => {
                setTimeout(() => {
                    this.initializePermissions(role.permissions);
                    this.cdr.detectChanges();
                });
            })
            .catch(error => {
                console.error('Error al obtener el rol:', error);
            });
    }

    private initializePermissions(permissions: any): void {
        const permissionsFormGroup = this.createPermissionsFormGroup(permissions);
        this.roleForm.setControl('permissions', permissionsFormGroup);

        this.roleFormService.form = this.roleForm;
    }

    private createPermissionsFormGroup(permissions: any): FormGroup {
        const group = this.fb.group({});
        for (const key of Object.keys(permissions)) {
            const value = permissions[key];
            if (value && typeof value === 'object' && 'assigned' in value) {
                // Solo asigna el booleano, no el objeto completo
                group.addControl(key, this.fb.control(value.assigned));
            } else {
                group.addControl(key, this.createPermissionsFormGroup(value));
            }
        }
        return group;
    }

    save(): void {
        if (this.roleForm.valid) {
            const formValue = this.roleForm.value;
            const payload = {
                name: formValue.name,
                permissions: this.transformPermissions(formValue.permissions)
            };
            if (this.data?.id) {
                this.roleService.updateRole(this.data?.id, payload)
                    .then(() => this.dialogRef.close(true))
                    .catch(error => console.error('Error al guardar el rol:', error));
            } else {
                this.roleService.createRole(payload)
                    .then(() => this.dialogRef.close(true))
                    .catch(error => console.error('Error al crear el rol:', error));
            }
        }
    }

    private transformPermissions(permissions: any, path: string[] = []): any {
        const result = {};
        for (const key of Object.keys(permissions)) {
            const currentPath = [...path, key];
            const value = permissions[key];
            if (typeof value === 'boolean') {
                result[key] = {
                    name: currentPath.join('.'),
                    assigned: value
                };
            } else {
                result[key] = this.transformPermissions(value, currentPath);
            }
        }
        return result;
    }

    close(): void {
        this.dialogRef.close();
    }
}
