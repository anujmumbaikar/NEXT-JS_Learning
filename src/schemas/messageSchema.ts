import {z} from 'zod'

export const messageSchema  = z.object({
    content: z.string().min(1, { message: 'Content is required' }).max(300, { message: 'Content must be less than 300 characters' }),

})