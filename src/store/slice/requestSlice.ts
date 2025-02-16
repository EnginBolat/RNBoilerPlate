import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stateKeys } from '@store/states';
import axios, { HttpStatusCode } from 'axios';

export interface PostPayload {
    url: string;
    parameters?: Record<string, any>;
    stateKey: keyof GlobalState;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

interface PostResponse {
    stateKey: keyof GlobalState;
    data: any;
}

export interface StateValue<T = any> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

type GlobalState = {
    [K in typeof stateKeys[number]]: StateValue;
};

const requestSlice = createSlice({
    name: 'globalState',
    initialState: {} as GlobalState,
    reducers: {
        clearData: (state, action: PayloadAction<{ stateKey: keyof GlobalState }>) => {
            const { stateKey } = action.payload;
            if (state[stateKey]) {
                state[stateKey] = { data: null, loading: false, error: null };
            }
        },
        setData: (state, action: PayloadAction<{ stateKey: keyof GlobalState; data: any }>) => {
            const { stateKey, data } = action.payload;
            if (!state[stateKey]) {
                state[stateKey] = { data: null, loading: false, error: null };
            }
            state[stateKey].data = data;
            state[stateKey].loading = false;
            state[stateKey].error = null;
        },
        setLoading: (state, action: PayloadAction<{ stateKey: keyof GlobalState; loading: boolean }>) => {
            const { stateKey, loading } = action.payload;
            if (!state[stateKey]) {
                state[stateKey] = { data: null, loading: false, error: null };
            }
            state[stateKey].loading = loading;
        },
        setError: (state, action: PayloadAction<{ stateKey: keyof GlobalState; error: string }>) => {
            const { stateKey, error } = action.payload;
            if (!state[stateKey]) {
                state[stateKey] = { data: null, loading: false, error: null };
            }
            state[stateKey].error = error;
            state[stateKey].loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(request.pending, (state, action) => {
                const { stateKey } = action.meta.arg;
                if (!state[stateKey]) {
                    state[stateKey] = { data: null, loading: true, error: null };
                }
                state[stateKey].loading = true;
            })
            .addCase(request.fulfilled, (state, action) => {
                const { stateKey, data } = action.payload;
                if (!state[stateKey]) {
                    state[stateKey] = { data: null, loading: false, error: null };
                }
                state[stateKey] = { data, loading: false, error: null };
            })
            .addCase(request.rejected, (state, action) => {
                const { stateKey } = action.meta.arg;
                if (!state[stateKey]) {
                    state[stateKey] = { data: null, loading: false, error: null };
                }
                state[stateKey].loading = false;
                state[stateKey].error = action.payload as string;
            });
    },
});

export const { setData, setLoading, setError, clearData } = requestSlice.actions;
export default requestSlice.reducer;

export const request = createAsyncThunk<PostResponse, PostPayload>(
    'globalState/request',  // İstediğiniz ismi verebilirsiniz
    async ({ url, method, parameters, stateKey }: PostPayload, { rejectWithValue }) => {
        try {
            const { data, status } = await axios({
                url,
                method,    // HTTP metodunu burada kullanıyoruz
                data: parameters, // Parametreleri POST, PUT için gönderiyoruz
            });

            // Başarılı durumda response verisini dönüyoruz
            if (status === HttpStatusCode.Ok || status === HttpStatusCode.Created) {
                return { stateKey, data };
            }
            return rejectWithValue('Axios statuscode error');
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
