export const errorHandler = (
  msg: string,
  trace = '',
  status: Number,
  route: string
) => {
  return {
    error: {
      msg: msg,
      trace: trace,
      status: status,
      route: route,
    },
  };
};
