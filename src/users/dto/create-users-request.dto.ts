import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUsersDTO {

@IsNotEmpty()
username: string;

@IsEmail()
@IsNotEmpty()
email:string;


@IsNotEmpty()
bio: string;

@IsNotEmpty()
displayPicture:string;


@IsNotEmpty()
password:string

}