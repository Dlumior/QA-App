export const errorHandler = (trace = '', status: Number) => {
  return {
    error: {
      trace: trace,
      status: status,
    },
  };
};
