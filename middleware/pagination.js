export const paginatePhones = (req, res, next) => {
  const { page = 1, results = 10 } = req.query;
  req.pagination = {
    limit: Number(results) || 1,
    offset: (page - 1) * results,
  };
  next();
};
