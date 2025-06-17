const { z } = require('zod');

const boardvalidation = z.object({
  title: z.string().min(5, "Title is required").nonempty(""),
});

module.exports={boardvalidation}