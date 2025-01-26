import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'
import blogService from '../services/blogs'
import { useUserContext } from '../components/context/UserContext'

const useUserBlogs = (searchUsername) => {
  const user = useUserContext()

  return useQuery({
    queryKey: ['blogs', user?.username],
    queryFn: async () => {
      if (!user) return []
      try {
        const userData = await userService.getUser(searchUsername || user.username)
        console.log('fetching blogs...')
        return userData.blogs.sort((a, b) => b.likes - a.likes)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
        window.localStorage.removeItem('loggedBlogAppUser')
        blogService.setToken(null)
        throw error
      }
    },
    enabled: !!user, // Only run query when user exists
    refetchOnWindowFocus: false,
    retry: 1,
    initialData: [],
    // staleTime: 1000 * 60 * 30,
    // cacheTime: 1000 * 60 * 30,
  })
}

export default useUserBlogs