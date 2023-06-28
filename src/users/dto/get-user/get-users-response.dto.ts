import { ApiProperty } from '@nestjs/swagger';

export class GetUserReponseDto {
  @ApiProperty({
    description: 'the status of the request',
    example: 'Success',
  })
  public readonly status: string;
  @ApiProperty({
    description: 'the message of the request',
    example: 'user retrived successfully',
  })
  public readonly message: string;
  @ApiProperty({
    description: 'the responseCode of the request',
    example: 200,
  })
  public readonly responseCode: number;

  @ApiProperty({
    description: 'the responseData of the request',
    example: {
      id: 2,
      email: "dev@gmail.com",
      username: "devtdi",
      displaypicture: "url",
      bio: "full stack dev",
      lastLogin: "2023-06-27 14:21:19"
    },
  })
  public readonly data: responseData;

  constructor(response: userResponse ) {
    this.status = response.status;
    this.message = response.message;
    this.responseCode = response.responseCode;
    this.data = response.data

  }

}
interface userResponse {
  status: string;
  responseCode: number;
  message: string;
  data: responseData
}
interface responseData {
  id: number;
  email: string;
  username: string;
  displayPicture: string;
  bio: string;
  lastLogin: Date;


}