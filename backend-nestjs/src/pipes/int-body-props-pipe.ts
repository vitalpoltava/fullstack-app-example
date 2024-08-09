import {PipeTransform, Injectable} from '@nestjs/common';

@Injectable()
export class IntBodyPropsPipe implements PipeTransform {
  transform(value: any) {
    if (value) {
      if (value.id && typeof value.id === 'string') {
        value.id = parseInt(value.id, 10);
      }
      if (value.productId && typeof value.productId === 'string') {
        value.productId = parseInt(value.productId, 10);
      }
      if (value.price && typeof value.price === 'string') {
        value.price = parseInt(value.price, 10);
      }
      if (value.ids && Array.isArray(value.ids)) {
        value.ids = value.ids.map((id: string) => parseInt(id, 10));
      }
    }
    return value;
  }
}
