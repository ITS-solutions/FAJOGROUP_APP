export interface Role {
    id: number; // ID único del rol
    name: string; // Nombre del rol
    guard_name: string; // Nombre del guard (por ejemplo, "web")
    created_at: string; // Fecha de creación en formato ISO
    updated_at: string; // Fecha de actualización en formato ISO
}
