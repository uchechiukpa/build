import { ApiProperty } from '@nestjs/swagger';

export class CreatedProjectReponseDto {
  @ApiProperty({
    description: 'the status of the request',
    example: 'Success',
  })
  public readonly status: string;
  @ApiProperty({
    description: 'the message of the request',
    example: 'project created successfully',
  })
  public readonly message: string;
  @ApiProperty({
    description: 'the responseCode of the request',
    example: 201,
  })
  public readonly responseCode: number;

  constructor(response: projectResponse ) {
    this.status = response.status;
    this.message = response.message;
    this.responseCode = response.responseCode;

  }

}
interface projectResponse {
  status: string;
  responseCode: number;
  message: string;
}