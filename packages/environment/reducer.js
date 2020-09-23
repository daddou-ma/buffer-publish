/**
 * Just a simple reducer that will provide the current
 * Node environment (`process.env.NODE_ENV` gets replaced
 * at build time.)
 */
const environment = process.env.NODE_ENV;
export default (state = { environment }) => {
  return state;
};
