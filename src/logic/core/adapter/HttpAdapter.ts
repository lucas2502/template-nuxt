import axios from 'axios';

interface GetParams {
  url: string;
  queryString?: string;
  headers?: object;
  options?: object;
  path?: any;
}

interface PostParams {
  url?: string;
  queryString?: string;
  headers?: object;
  options?: object;
  body?: any;
  path?: any;
}

export interface IHttpAdapter {
  get(p: GetParams): Promise<any>;
  post(p: PostParams): Promise<any>;
  request(p: any): Promise<any>;
  put(request?: any): Promise<any>;
  delete(request?: any): Promise<any>;
}

export class HttpAdapter implements IHttpAdapter {
  private baseUrl: string | undefined;
  private initialHeaders: object;
  private httpInstance: any;

  constructor(baseUrl?: string, initialHeaders?: object) {
    this.baseUrl = baseUrl ?? undefined;
    this.initialHeaders = initialHeaders || {};
    this.httpInstance = axios.create({
      headers: {}
    });
  }

  put(p: PostParams): Promise<any> {
    const qs = p.queryString ? `?${p.queryString}` : '';
    const urlCall = this.baseUrl
      ? `${this.baseUrl}${p.path}${qs}`
      : `${p.url}${qs}`;
    const headers = { ...this.initialHeaders, ...p.headers };

    return this.httpInstance.put(urlCall, p.body, {
      headers,
      timeout: 300000,
      ...p.options
    });
  }

  post(p: PostParams): Promise<any> {
    const qs = p.queryString ? `?${p.queryString}` : '';
    const urlCall = this.baseUrl
      ? `${this.baseUrl}${p.path}${qs}`
      : `${p.url}${qs}`;
    const headers = {
      ...this.initialHeaders,
      ...p.headers
    };

    return this.httpInstance.post(urlCall, p.body, {
      headers,
      timeout: 300000,
      ...p.options
    });
  }

  patch(p: PostParams): Promise<any> {
    const qs = p.queryString ? `?${p.queryString}` : '';
    const urlCall = this.baseUrl
      ? `${this.baseUrl}${p.path}${qs}`
      : `${p.url}${qs}`;
    const headers = {
      ...this.initialHeaders,
      ...p.headers
    };

    return this.httpInstance.patch(urlCall, p.body, {
      headers,
      timeout: 300000,
      ...p.options
    });
  }

  get(p: GetParams): Promise<any> {
    const qs = p.queryString ? `?${p.queryString}` : '';
    const urlCall = this.baseUrl
      ? `${this.baseUrl}${p.path}${qs}`
      : `${p.url}${qs}`;
    const headers = {
      ...this.initialHeaders,
      ...p.headers
    };
    return this.httpInstance.get(urlCall, { headers, ...p.options });
  }

  request(p: any): Promise<any> {
    return this.httpInstance.request(p);
  }

  delete(p: PostParams): Promise<any> {
    const qs = p.queryString ? `?${p.queryString}` : '';
    const urlCall = this.baseUrl
      ? `${this.baseUrl}${p.path}${qs}`
      : `${p.url}${qs}`;
    const headers = { ...this.initialHeaders, ...p.headers };

    return this.httpInstance.delete(urlCall, {
      headers,
      data: p.body,
      timeout: 300000,
      ...p.options
    });
  }
}
