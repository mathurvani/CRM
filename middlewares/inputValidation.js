const z = require("zod")

const UserValidator = z.object({
    firstName : z.string(),
    lastName : z.string(),
    email : z.string().email(),
    password : z.string()
})

const loginCredentialsValidation = z.object({
    email : z.string().email(),
    password : z.string()
})
module.exports = 
{
    parseUser : UserValidator.safeParse,
    parseLoginDetails : loginCredentialsValidation.safeParse
}