import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

export const useFetchBlog = (id) => {
    return useQuery({
        queryKey: ['blog', id],
        queryFn: async () => {
            const blog = await blogService.getOne(id)
            console.log('fetching blog...');
            return blog
        },
        enabled: !!id, // Only run query when id exists
        refetchOnWindowFocus: false,
        retry: 1,
        initialData: {},
        // staleTime: 1000 * 60 * 30,
        // cacheTime: 1000 * 60 * 30,
    })
}