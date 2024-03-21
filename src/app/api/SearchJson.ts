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

import { ArrayOfSearch, Error400, Error401, Error403 } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class SearchJson<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description WeatherAPI.com Search or Autocomplete API returns matching cities and towns as an array of Location object.
   *
   * @tags APIs
   * @name SearchAutocompleteWeather
   * @summary Search/Autocomplete API
   * @request GET:/search.json
   * @secure
   */
  searchAutocompleteWeather = (
    query: {
      /** Pass US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name. Visit [request parameter section](https://www.weatherapi.com/docs/#intro-request) to learn more. */
      q: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ArrayOfSearch, Error400 | Error401 | Error403>({
      path: `/search.json`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
}
