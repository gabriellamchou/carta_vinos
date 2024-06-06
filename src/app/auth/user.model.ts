enum roles {
    USUARIO,
    ADMIN
}

export class User {
    id!: number;
    email!: string;
    rol!: roles;
}