const { z } = require('zod')

const categorySchema = z.object({
      name: z.string().min(3).max(30),
      description: z.string().max(255)
})

module.exports = categorySchema