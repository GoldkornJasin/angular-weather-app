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

import {
  Astronomy,
  Error400,
  Error401,
  Error403,
  Location,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class AstronomyJson<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Return Location and Astronomy Object
   *
   * @tags APIs
   * @name Astronomy
   * @summary Astronomy API
   * @request GET:/astronomy.json
   * @secure
   */
  astronomy = (
    query: {
      /** Pass US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name. Visit [request parameter section](https://www.weatherapi.com/docs/#intro-request) to learn more. */
      q: string;
      /**
       * Date on or after 1st Jan, 2015 in yyyy-MM-dd format
       * @format date
       */
      dt: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        location?: Location;
        astronomy?: Astronomy;
      },
      Error400 | Error401 | Error403
    >({
      path: `/astronomy.json`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
}
