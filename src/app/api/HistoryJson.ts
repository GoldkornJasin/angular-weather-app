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

export class HistoryJson<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description History weather API method returns historical weather for a date on or after 1st Jan, 2010 as json. The data is returned as a Forecast Object.
   *
   * @tags APIs
   * @name HistoryWeather
   * @summary History API
   * @request GET:/history.json
   * @secure
   */
  historyWeather = (
    query: {
      /** Pass US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name. Visit [request parameter section](https://www.weatherapi.com/docs/#intro-request) to learn more. */
      q: string;
      /**
       * Date on or after 1st Jan, 2015 in yyyy-MM-dd format
       * @format date
       */
      dt: string;
      /** Please either pass 'dt' or 'unixdt' and not both in same request.<br />unixdt should be on or after 1st Jan, 2015 in Unix format */
      unixdt?: number;
      /**
       * Date on or after 1st Jan, 2015 in yyyy-MM-dd format<br />'end_dt' should be greater than 'dt' parameter and difference should not be more than 30 days between the two dates.
       * @format date
       */
      end_dt?: string;
      /** Date on or after 1st Jan, 2015 in Unix Timestamp format<br />unixend_dt has same restriction as 'end_dt' parameter. Please either pass 'end_dt' or 'unixend_dt' and not both in same request. e.g. unixend_dt=1490227200 */
      unixend_dt?: number;
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
        forecast?: Forecast;
      },
      Error400 | Error401 | Error403
    >({
      path: `/history.json`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
}
