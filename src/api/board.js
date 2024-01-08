import customAxios from '.';

const boardAPI = {
    fetchAll: async () => {
        const { data } = await customAxios.get('/posts');

        return data;
    },

    fetchDetail: async (id) => {
        const { data } = await customAxios.get(`/posts/${id}`);

        return data;
    },

    createPost: async (request) => {
        const { data } = await customAxios.post('/posts', request);

        return data;
    },

    updatePost: async (id, request) => {
        const { data } = await customAxios.patch(`/posts/${id}`, request);

        return data;
    },

    deletePost: async (id) => {
        const { data } = await customAxios.delete(`/posts/${id}`);

        return data;
    },
};

export default boardAPI;
