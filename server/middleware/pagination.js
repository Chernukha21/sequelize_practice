const DEFAULT_LIMIT = 6;
const MAX_LIMIT = 50;

export const paginatePhones = (req, res, next) => {
  const parsedLimit = Number.parseInt(req.query.limit, 10);

  const parsedOffset = Number.parseInt(req.query.offset, 10);

  const limit =
    Number.isInteger(parsedLimit) && parsedLimit > 0
      ? Math.min(parsedLimit, MAX_LIMIT)
      : DEFAULT_LIMIT;

  const offset =
    Number.isInteger(parsedOffset) && parsedOffset >= 0 ? parsedOffset : 0;

  req.pagination = {
    limit,
    offset,
  };

  next();
};
