export interface JSONDB  {
  row_to_json: unknown;
}

export function asJSONDB(data:unknown): JSONDB {
  if (typeof data === 'object' && data !== null) {
    if ('row_to_json' in data) {
      return data;
    }
  }
  throw new Error('data is not an JSONDB');

}