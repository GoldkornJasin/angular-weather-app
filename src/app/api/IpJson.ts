/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { Error400, Error401, Error403, Ip } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class IpJson<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description IP Lookup API method allows a user to get up to date information for an IP address.
   *
   * @tags APIs
   * @name IpLookup
   * @summary IP Lookup API
   * @request GET:/ip.json
   * @secure
   */
  ipLookup = (
    query: {
      /** Pass IP address. */
      q: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<Ip, Error400 | Error401 | Error403>({
      path: `/ip.json`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
}
