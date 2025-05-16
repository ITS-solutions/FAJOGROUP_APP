import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import {
    FormGroup,
    AbstractControl,
    FormControl,
    ReactiveFormsModule
} from '@angular/forms';
import { RoleFormService } from '../../services/role-form.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-permission-group',
    templateUrl: './permission-group.component.html',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule]
})
export class PermissionGroupComponent implements AfterViewInit {
    @Input() id: string | number | null = null;
    permissionsGroup!: FormGroup;
    private subscription: Subscription = new Subscription();

    constructor(
        private roleFormService: RoleFormService,
        private cdr: ChangeDetectorRef
    ) { }
    ngAfterViewInit(): void {
        throw new Error('Method not implemented.');
    }

    ngOnInit(): void {
        // Nos suscribimos al observable del formulario
        this.subscription.add(
            this.roleFormService.form$.subscribe(form => {
                const permissions = form?.get('permissions');
                if (permissions instanceof FormGroup) {
                    this.permissionsGroup = permissions;
                    this.cdr.detectChanges();
                }
            })
        );
    }

    getPermissionModules(group: FormGroup): string[] {
        return Object.keys(group.controls);
    }

    getPermissionActions(control: AbstractControl | null): string[] {
        if (control instanceof FormGroup) {
            return Object.keys(control.controls);
        }
        return [];
    }

    getGroupKeys(control: AbstractControl | null): string[] {
        if (control instanceof FormGroup) {
            return Object.keys(control.controls);
        }
        return [];
    }

    isFormGroup(control: AbstractControl | null): boolean {
        return control instanceof FormGroup;
    }

    isGroupOfGroups(control: AbstractControl | null): boolean {
        if (control instanceof FormGroup) {
            const firstChild = Object.values(control.controls)[0];
            return firstChild instanceof FormGroup;
        }
        return false;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
