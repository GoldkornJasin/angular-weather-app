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
  Alerts,
  Current,
  Error400,
  Error401,
  Error403,
  Forecast,
  Location,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class ForecastJson<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Forecast weather API method returns, depending upon your price plan level, upto next 14 day weather forecast and weather alert as json or xml. The data is returned as a Forecast Object.<br /><br />Forecast object contains astronomy data, day weather forecast and hourly interval weather information for a given city.
   *
   * @tags APIs
   * @name ForecastWeather
   * @summary Forecast API
   * @request GET:/forecast.json
   * @secure
   */
  forecastWeather = (
    query: {
      /** Pass US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name. Visit [request parameter section](https://www.weatherapi.com/docs/#intro-request) to learn more. */
      q: string;
      /** Number of days of weather forecast. Value ranges from 1 to 14 */
      days: number;
      /**
       * Date should be between today and next 14 day in yyyy-MM-dd format. e.g. '2015-01-01'
       * @format date
       */
      dt?: string;
      /** Please either pass 'dt' or 'unixdt' and not both in same request. unixdt should be between today and next 14 day in Unix format. e.g. 1490227200 */
      unixdt?: number;
      /** Must be in 24 hour. For example 5 pm should be hour=17, 6 am as hour=6 */
      hour?: number;
      /** Returns 'condition:text' field in API in the desired language.<br /> Visit [request parameter section](https://www.weatherapi.com/docs/#intro-request) to check 'lang-code'. */
      lang?: string;
      /** Enable/Disable alerts in forecast API output. Example, alerts=yes or alerts=no. */
      alerts?: string;
      /** Enable/Disable Air Quality data in forecast API output. Example, aqi=yes or aqi=no. */
      aqi?: string;
      /** Get 15 min interval or 24 hour average data for Forecast and History API. Available for Enterprise clients only. E.g:- tp=15 */
      tp?: number;
      /** Authentication to the WeatherAPI.com API is provided by passing your API key as request parameter through an API . */
      key?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        location?: Location;
        current?: Current;
        forecast?: Forecast;
        alerts?: Alerts;
      },
      Error400 | Error401 | Error403
    >({
      path: `/forecast.json`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
}
