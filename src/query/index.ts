/**
 * Formats a single URL query
 *
 * @param value Right-hand side of the query
 * @param key Left-hand side of the query
 * @returns  URL query string
 * @private
 */
const queryFormat = (value: string, key: string): string => {
  if (value !== null && typeof value === "object") return query(value, key);
  return encodeURIComponent(key) + "=" + encodeURIComponent(value);
};

/**
 * Constructs a URL query string for JSON:API parameters
 *
 * @param params Parameters to parse
 * @param prefix Prefix for nested parameters - used internally
 * @returns {string} URL query string
 *
 * @example
 * query({
 *   filter: {
 *     slug: 'cowboy-bebop',
 *     title: {
 *       value: 'foo'
 *     }
 *   }
 *  sort: '-id'
 * })
 * // filter%5Bslug%5D=cowboy-bebop&filter%5Btitle%5D%5Bvalue%5D=foo&sort=-id
 */
export function query(
  params: QueryParams,
  prefix: string | null = null
): string {
  const str = [];
  for (const param in params) {
    if (params.include) {
      if (params.include instanceof Array) {
        str.push(queryFormat("include", params.include.join(",")));
      } else {
        str.push(queryFormat("include", params.include));
      }
    } else {
      str.push(queryFormat(param, prefix ? `${prefix}[${param}]` : param));
    }
  }

  return str.join("&");
}
