const { z } = require('zod')

const subcategorySchema = z.object({
      name: z.string().min(3).max(30),
      description: z.string().max(255),
      category: z.string().min(24).max(24)
})

module.exports = subcategorySchema