const { z } = require('zod');

const listvalidation = z.object({
  title: z.string().min(3, "Title is required").nonempty(""),
});

module.exports={listvalidation}
