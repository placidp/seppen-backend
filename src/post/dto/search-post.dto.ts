export class SearchPostDto {
  title?: string;
  body?: string;
  views?: 'DESC' | 'ASC';
  limit?: number;
  tag?: string;
}
