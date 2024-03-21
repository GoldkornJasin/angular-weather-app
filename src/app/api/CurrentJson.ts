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
  Current,
  Error400,
  Error401,
  Error403,
  Location,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class CurrentJson<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Current weather or realtime weather API method allows a user to get up to date current weather information in json and xml. The data is returned as a Current Object.<br /><br />Current object contains current or realtime weather information for a given city.
   *
   * @tags APIs
   * @name RealtimeWeather
   * @summary Realtime API
   * @request GET:/current.json
   * @secure
   */
  realtimeWeather = (
    query: {
      /** Pass US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name. Visit [request parameter section](https://www.weatherapi.com/docs/#intro-request) to learn more. */
      q: string;
      /** Returns 'condition:text' field in API in the desired language.<br /> Visit [request parameter section](https://www.weatherapi.com/docs/#intro-request) to check 'lang-code'. */
      lang?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        location?: Location;
        current?: Current;
      },
      Error400 | Error401 | Error403
    >({
      path: `/current.json`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
}
