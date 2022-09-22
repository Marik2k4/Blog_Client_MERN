import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

// вход
export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data
});

// получение личной информации 
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data
});

// обновление информации 
export const fetchUpdatehMe = createAsyncThunk('auth/fetchUpdatehMe', async (params) => {
    const { data } = await axios.patch(`/auth/update/${params.userId}`, params);
    return data
});

// регистрация 
export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data
});

// получение всех пользователей
export const fetchUsers = createAsyncThunk('auth/getAllUsers', async () => {
    const { data } = await axios.get('/auth/getAllUsers');
    return data
});


const initialState = {
    data: null,
    usersMas: [],
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: {
        
        // --- Вход --- //

        // Идет загрузка
        [fetchAuth.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        // Загрузка завершилась  
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        // Ошибка 
        [fetchAuth.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },

        // --- Получение личной информации  --- //

        // Идет загрузка
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        // Загрузка завершилась  
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        // Ошибка 
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },

        // --- Обновление информации --- //

        // Идет загрузка
        [fetchUpdatehMe.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        // Загрузка завершилась  
        [fetchUpdatehMe.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        // Ошибка 
        [fetchUpdatehMe.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },

        // --- Регистрация --- //

        // Идет загрузка
        [fetchRegister.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        // Загрузка завершилась  
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        // Ошибка 
        [fetchRegister.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },

        // --- Получениеи всех пользователей --- //

        // Идет загрузка
        [fetchUsers.pending]: (state) => {
            state.status = 'loading';
            state.usersMas = [];
        },
        // Загрузка завершилась  
        [fetchUsers.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.usersMas = action.payload;
        },
        // Ошибка 
        [fetchUsers.rejected]: (state) => {
            state.status = 'error';
            state.usersMas = [];
        },

       
    }
});

// Авторизован ли пользователь 
export const selectIsAuth = state => Boolean(state.auth.data);

// Состояние выхода
export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

