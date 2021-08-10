module.exports = (err, req, res, next) => {
  //   if (err?.original?.errno === 1452) {
  //     err.messages = [`${err.table} not found`];
  //     err.statusCode = 400;
  //     console.log(err);
  //   }

  res.status(err.statusCode || 500).json({
    errors: err.messages || [err.message],
  });
};
