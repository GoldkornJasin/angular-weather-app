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
  Error400,
  Error401,
  Error403,
  Location,
  Marine,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class MarineJson<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Marine weather API method returns upto next 7 day (depending upon your price plan level) marine and sailing weather forecast and tide data (depending upon your price plan level) as json or xml. The data is returned as a Marine Object.<br /><br />Marine object, depending upon your price plan level, contains astronomy data, day weather forecast and hourly interval weather information and tide data for a given sea/ocean point.
   *
   * @tags APIs
   * @name MarineWeather
   * @summary Marine Weather API
   * @request GET:/marine.json
   * @secure
   */
  marineWeather = (
    query: {
      /** Pass Latitude/Longitude (decimal degree) which is on a sea/ocean. Visit [request parameter section](https://www.weatherapi.com/docs/#intro-request) to learn more. */
      q: string;
      /** Number of days of weather forecast. Value ranges from 1 to 7 */
      days: 1 | 2 | 3 | 4 | 5 | 6 | 7;
      /**
       * Date should be between today and next 7 day in yyyy-MM-dd format. e.g. '2023-05-20'
       * @format date
       */
      dt?: string;
      /** Please either pass 'dt' or 'unixdt' and not both in same request. unixdt should be between today and next 7 day in Unix format. e.g. 1490227200 */
      unixdt?: number;
      /** Must be in 24 hour. For example 5 pm should be hour=17, 6 am as hour=6 */
      hour?: number;
      /** Returns 'condition:text' field in API in the desired language.<br /> Visit [request parameter section](https://www.weatherapi.com/docs/#intro-request) to check 'lang-code'. */
      lang?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        location?: Location;
        forecast?: Marine;
      },
      Error400 | Error401 | Error403
    >({
      path: `/marine.json`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
}
