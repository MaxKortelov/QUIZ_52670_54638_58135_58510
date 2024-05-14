export class makeUrl {
  constructor(private readonly url: string) {
    this.url = url;
  }

  get route() {
    return this.url;
  }

  path(params?: Record<string, number | string>) {
    let url = this.url;

    for (const key in params) {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(params[key]));
      }
    }

    if (url.includes('/:')) {
      console.error(`makeUrl error: ${url}`);
    }

    return url;
  }
}
