module.exports = function isSpaceOnly(username, email, password, firstName, lastName) {
    const trimmedRegisterFormField = {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim()
    }
    return trimmedRegisterFormField.username && trimmedRegisterFormField.email && trimmedRegisterFormField.password && trimmedRegisterFormField.firstName && trimmedRegisterFormField.lastName == "" ? true : false
}