import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

// Запрос на получение всех статей + тип вывода
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (type) => {
    const { data } = await axios.get(`/posts/${type}`);
    return data
});




// Коменты 
// export const fetchComments = createAsyncThunk('posts/fetchComments', async (type) => {
//     const { data } = await axios.post(`/posts/${type.id}`);
//     return data
// });




export const fetchFilteredPosts = createAsyncThunk('posts/fetchFilteredPosts', async (type) => {
    const { data } = await axios.get(`/SortedPosts/${type}`);
    return data
});


// Запрос на получение тегов 
export const fetchTegs = createAsyncThunk('posts/fetchTegs', async () => {
    const { data } = await axios.get('/tags');
    return data
});


// Вывод тегов через поисковик 
export const fetchFilteredTags = createAsyncThunk('posts/fetchFilteredTags', async (type) => {
    const { data } = await axios.get(`/tags/${type}`);
    return data
});


// Запрос на получение постов по фильтру с тегом  
export const fetchTegedPosts = createAsyncThunk('posts/fetchTegedPosts', async (id) => {
    const { data } = await axios.get(`/TagedPosts/${id}`);
    return data
});


// Удаление постов 
export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
    axios.delete(`/posts/${id}`);
});


// Запрос на получение постов определенного пользователя  
export const fetchUsersPosts = createAsyncThunk('posts/fetchUsersPosts', async (id) => {
    const { data } = await axios.get(`/UsersPosts/${id}`);
    return data
});


const initialState = {
    posts: {
        items: [],
        status: 'loading',
        id: 0,
    },
    UsersPost: {
        items: [],
        status: 'loading',
        id: 0,
    },
    tags: {
        items: [],
        status: 'loading'
    },
    comments: {
        items: [],
        status: 'loading'
    }
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        //---Посты---//

        // Идет загрузка
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        // Загрузка завершилась  
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        // Ошибка 
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },


        [fetchFilteredPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        // Загрузка завершилась  
        [fetchFilteredPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        // Ошибка 
        [fetchFilteredPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },

        //---Теги---//

        // Идет загрузка
        [fetchTegs.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        // Загрузка завершилась  
        [fetchTegs.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        // Ошибка 
        [fetchTegs.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },

        //---Коменты---//

        // // Идет загрузка
        // [fetchComments.pending]: (state) => {
        //     // state.comments.items = [];
        //     state.comments.status = 'loading';
        // },
        // // Загрузка завершилась  
        // [fetchComments.fulfilled]: (state, action) => {
        //     state.comments.items.push(action.payload);
        //     state.comments.status = 'loaded';
        // },
        // // Ошибка 
        // [fetchComments.rejected]: (state) => {
        //     // state.comments.items = [];
        //     state.comments.status = 'error';
        // },

        //---Фильтрованные теги---//

        // Идет загрузка
        [fetchFilteredTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        // Загрузка завершилась  
        [fetchFilteredTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        // Ошибка 
        [fetchFilteredTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },


        //---Удаление постов---//

        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id != action.meta.arg)
        },

        //---Посты с условием по тэгу---//

        // Идет загрузка
        [fetchTegedPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        // Загрузка завершилась  
        [fetchTegedPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        // Ошибка 
        [fetchTegedPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },

        
        //---Посты определеноого пользователя---//

        // Идет загрузка
        [fetchUsersPosts.pending]: (state) => {
            state.UsersPost.items = [];
            state.UsersPost.status = 'loading';
        },
        // Загрузка завершилась  
        [fetchUsersPosts.fulfilled]: (state, action) => {
            state.UsersPost.items = action.payload;
            state.UsersPost.status = 'loaded';
        },
        // Ошибка 
        [fetchUsersPosts.rejected]: (state) => {
            state.UsersPost.items = [];
            state.UsersPost.status = 'error';
        },

    },
});

export const postReducer = postsSlice.reducer;