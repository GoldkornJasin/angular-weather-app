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
  Forecast,
  Location,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class FutureJson<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Future weather API method returns weather in a 3 hourly interval in future for a date between 14 days and 365 days from today in the future.
   *
   * @tags APIs
   * @name FutureWeather
   * @summary Future API
   * @request GET:/future.json
   * @secure
   */
  futureWeather = (
    query: {
      /** Pass US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name. Visit [request parameter section](https://www.weatherapi.com/docs/#intro-request) to learn more. */
      q: string;
      /**
       * Date should be between 14 days and 300 days from today in the future in yyyy-MM-dd format (i.e. dt=2023-01-01)
       * @format date
       */
      dt?: string;
      /** Returns 'condition:text' field in API in the desired language.<br /> Visit [request parameter section](https://www.weatherapi.com/docs/#intro-request) to check 'lang-code'. */
      lang?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        location?: Location;
        forecast?: Forecast;
      },
      Error400 | Error401 | Error403
    >({
      path: `/future.json`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
}
