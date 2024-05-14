function isSpaceOnlyRegister(username, email, password, firstName, lastName) {
    if (!username || !email || !password || !firstName || !lastName) {
        return true;
    }
    const trimmedRegisterFormField = {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim()
    }
    return trimmedRegisterFormField.username && trimmedRegisterFormField.email && trimmedRegisterFormField.password && trimmedRegisterFormField.firstName && trimmedRegisterFormField.lastName == "" ? true : false
}

function isSpaceOnlyLogin(username, password) {
    const trimmedLoginField = {
        username: username.trim(),
        password: password.trim()
    }

    return trimmedLoginField.username && trimmedLoginField.password === "" ? true : false
}

module.exports = {
    isSpaceOnlyRegister,
    isSpaceOnlyLogin
}