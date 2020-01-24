export class Admin {

    constructor(public _id: string, public name: string, public email: string, public password: string) {}

    
}

export interface SignUpDTO {

    name: string; 
    email: string;
    password: string;
    confirmPassword: string;
}

export interface SignInDTO {

    email: string;
    password: string;

}

export interface JWTTokenResponseDTO {
    id: string;
    token: string;
}