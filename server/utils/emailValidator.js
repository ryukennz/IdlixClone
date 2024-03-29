const regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const emailValidator = (email) => {
    const trueEmail = regex.test(email)
    return trueEmail
}

module.exports = emailValidator