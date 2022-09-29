import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {

  transform(value: string, metadata: ArgumentMetadata) {
  console.log("🚀 ~ file: parse-mongo-id.pipe.ts ~ line 7 ~ ParseMongoIdPipe ~ transform ~ metadata", metadata)
  console.log("🚀 ~ file: parse-mongo-id.pipe.ts ~ line 7 ~ ParseMongoIdPipe ~ transform ~ value", value)

    if(!isValidObjectId(value)){
      throw new BadRequestException(`${value } is not a valid MongoId`)
    }

    return value;
  }
}
