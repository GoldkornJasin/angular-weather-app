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

import { Error400, Error401, Error403, Location } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class TimezoneJson<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Return Location Object
   *
   * @tags APIs
   * @name TimeZone
   * @summary Time Zone API
   * @request GET:/timezone.json
   * @secure
   */
  timeZone = (
    query: {
      /** Pass US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name. Visit [request parameter section](https://www.weatherapi.com/docs/#intro-request) to learn more. */
      q: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<Location, Error400 | Error401 | Error403>({
      path: `/timezone.json`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
}
