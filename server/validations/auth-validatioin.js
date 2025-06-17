const { z } = require('zod');

const registerSchema = z.object({
  fname: z.string().min(3, "First name must be at least 5 characters").nonempty("First name is required"),
  lname: z.string().min(3, "Last name must be at least 3 characters").nonempty("Last name is required"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password is required").nonempty("Password is required"),
});

module.exports = { registerSchema, loginSchema };
