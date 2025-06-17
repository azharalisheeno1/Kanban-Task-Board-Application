const { z } = require('zod');

const cardvalidation = z.object({
  title: z.string().min(5, "Title is required").nonempty(""),
  description: z.string().min(10).optional(),
});
module.exports={cardvalidation}