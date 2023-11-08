
import type { Link } from '#ui-pro/types'

export const useNavPosts = async () => {
    const { data: posts, error: postsError } = await useFetch<{ id: string, title: string, description: string, number: number }[]>(`/api/posts`);
    if (postsError.value) {
      throw createError(postsError.value)
    } 
    return posts;
}


export const useNavTree = async () => {
    const posts = await useNavPosts();
    return [<Link>{
      label: 'Blog Posts',
      icon: '@dust:fa6-pro-solid:blog',
      children: posts.value.map((item: any) => (<Link>{
        to: '/posts/' + item.number,
        label: item.title,
      }))
    }];
}