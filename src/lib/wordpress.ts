import {url, auth, endpoints} from '../config.json'
import {WP_REST_API_Post, WP_REST_API_Posts} from 'wp-types'

export const getAllPosts = async (): Promise<WP_REST_API_Posts> => {
    const response = await fetch(url + endpoints.posts)
    const data = await response.json()
    return data
}

export const getPost = async (id: number): Promise<WP_REST_API_Post> => {
    const response = await fetch(url + endpoints.posts + '/' + id)
    const data = await response.json()
    return data
}

export const deletePost = async (id: number): Promise<WP_REST_API_Post> => {
    const response = await fetch(url + endpoints.posts + '/' + id, {
        method: 'DELETE',
        credentials: 'omit',
        mode: 'cors',
        headers: {
            Authorization: 'Basic ' + btoa(auth.user + ':' + auth.pass),
            'Content-Type': 'application/json'
        },
    })
    const data = await response.json()
    return data;
}

export const createPost = async (body: any): Promise<WP_REST_API_Post> => {
    const response = await fetch(url + endpoints.posts, {
        method: 'POST',
        credentials: 'omit',
        mode: 'cors',
        headers: {
            Authorization: 'Basic ' + btoa(auth.user + ':' + auth.pass),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    })
    const data = await response.json()
    return data;
}

export const updatePost = async (id: number, body: any): Promise<WP_REST_API_Post> => {
    const response = await fetch(url + endpoints.posts + '/' + id, {
        method: 'POST',
        credentials: 'omit',
        mode: 'cors',
        headers: {
            Authorization: 'Basic ' + btoa(auth.user + ':' + auth.pass),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    })
    const data = await response.json()
    return data;
}