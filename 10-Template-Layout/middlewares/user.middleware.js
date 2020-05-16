function validateAddUser(req, res, next) {
    var errors = [];

    if (req.body.newName === "") {
        errors.push("Name is required.");
    }

    if (req.body.newPassword === "") {
        errors.push("Password is required.");
    }

    if (req.body.newEmail === "") {
        errors.push("Email is required.");
    }

    if (req.body.newPhone === "") {
        errors.push("Phone is required.");
    }

    if (errors.length >= 1) {
        res.render('user/add', {
            errors: errors,
            data: req.body
        });
        return;
    }

    next();
}

module.exports = {
    validateAddUser
};
