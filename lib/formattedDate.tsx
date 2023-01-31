/**
 * This method used to use toLocaleDateString() but that caused react errors where the server hydration did not match the browser's version
 * https://reactjs.org/docs/error-decoder.html/?invariant=425
 *
 * @param d date string
 * @returns date string, but better
 */
export const formattedDate = (d: string) => new Date(d).toDateString();
// new Date(d).toLocaleDateString("en-us", {
//   weekday: "long",
//   year: "numeric",
//   month: "short",
//   day: "numeric",
// });
