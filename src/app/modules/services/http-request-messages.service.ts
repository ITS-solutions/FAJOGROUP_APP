import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class HttpRequestMessagesService {
    constructor(private snackBar: MatSnackBar) { }

    /**
     * Mostrar mensaje basado en la respuesta HTTP
     * @param status Estado de la respuesta ('ok' o 'error')
     * @param message Mensaje personalizado (opcional)
     * @param operation Tipo de operación ('crear', 'editar', 'eliminar', etc.)
     * @param persistent Si es true, el mensaje no se cerrará automáticamente (opcional)
     */
    showMessage(status: string, message: string | null, operation: string, persistent: boolean = false): void {
        let finalMessage = '';

        // Determinar el mensaje final según el estado y la operación
        if (status === 'ok') {
            switch (operation) {
                case 'crear':
                    finalMessage = message || 'El registro se ha creado correctamente.';
                    break;
                case 'editar':
                    finalMessage = message || 'El registro se ha actualizado correctamente.';
                    break;
                case 'eliminar':
                    finalMessage = message || 'El registro se ha eliminado correctamente.';
                    break;
                default:
                    finalMessage = message || 'Operación realizada con éxito.';
            }
        } else if (status === 'error') {
            finalMessage = message || 'Ocurrió un error al realizar la operación.';
        }

        // Configurar la duración del mensaje
        const duration = persistent ? undefined : 3000; // Si es persistente, no se cierra automáticamente

        // Mostrar el mensaje con MatSnackBar
        this.snackBar.open(finalMessage, 'Cerrar', {
            duration, // Duración en milisegundos o indefinida si es persistente
            horizontalPosition: 'right', // Posición horizontal
            verticalPosition: 'top', // Posición vertical
            panelClass: status === 'ok' ? 'snackbar-success' : 'snackbar-error', // Clase CSS según el estado
        });
    }
}
