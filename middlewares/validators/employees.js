exports.nameFieldValidator = async (req, res, next) => {
	try {
		if (!req.body.name) {
			return next({
				message: "Name cannot be empty",
				status: 400,
			});
		}
		if (req.body.name.match(/[^ \w]/)) {
			return next({
				message: "Name can only contain alphanumeric characters",
				status: 400,
			});
		}
		if (req.body.name.match(/^\s|\s$/)) {
			return next({
				message: "Name cannot be enclosed by whitespaces",
				status: 400,
			});
		}
		next();
	} catch (err) {
		next(err);
	}
};
