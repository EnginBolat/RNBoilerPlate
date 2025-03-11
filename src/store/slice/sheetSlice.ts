import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISheet {
    id: string;
    metadata?: {
        content?: string;
    };
    page: string;
}

interface IInitial {
    queue: ISheet[] | null;
    activeSheet: ISheet | null;
    activePage: string;
}

const initialState: IInitial = {
    queue: [],
    activeSheet: null,
    activePage: 'Home',
};

const sheetSlice = createSlice({
    name: 'bottomSheetQueue',
    initialState,
    reducers: {
        // Yeni bir sheet ekler
        enqueueSheetList: (state, action: PayloadAction<ISheet[]>) => {
            // Sheet'leri kuyruğa ekleyelim
            action.payload.forEach((item: ISheet) => {
                state.queue?.push(item);
                console.log('added');
            });

            // Kuyruğun ilk elemanını aktif sheet yapalım ve onu kuyruktan çıkaralım
            if (state.queue && state.queue.length > 0) {
                state.activeSheet = state.queue.shift()!; // İlk elemanı alıyoruz ve aktif yapıyoruz
                console.log(state.queue);
            }
        },

        // Sheet ekler ve açar
        enqueueSheet: (state, action: PayloadAction<ISheet>) => {
            const { id, metadata, page } = action.payload;
            if (state.activeSheet) {
                // Aktif sheet varsa kuyruğa ekle
                state.queue?.push({ id, metadata, page });
            } else {
                // Aktif sheet yoksa direkt aç
                state.activeSheet = { id, metadata, page };
            }
        },
        // Aktif sheet’i kapatır, sıradaki sheet’i açar
        dequeueSheet: state => {
            if ((state.queue?.length ?? 0) > 0) {
                const nextSheet = state.queue?.shift(); // Kuyruktan ilk sheet çıkarılır
                state.activeSheet = nextSheet || null; // Eğer sheet varsa aktif sheet olarak atanır, yoksa null yapılır
            } else {
                state.activeSheet = null; // Kuyruk boşsa aktif sheet kapanır
            }
        },

        // Belirli bir sheet’i kuyruktan çıkarır (iptal etmek için)
        removeSheetFromQueue: (state, action) => {
            const sheetId = action.payload;
            if (state.queue) {
                state.queue = state.queue?.filter(sheet => sheet.id !== sheetId);
            }
        },
        // Aktif sayfayı güncelle
        setActivePage: (state, action: PayloadAction<string>) => {
            state.activePage = action.payload;
        },
        // Tüm kuyruğu temizler
        clearQueue: state => {
            state.queue = [];
            state.activeSheet = null;
        },
    },
});

export const {
    enqueueSheetList,
    enqueueSheet,
    dequeueSheet,
    removeSheetFromQueue,
    clearQueue,
    setActivePage,
} = sheetSlice.actions;
export default sheetSlice.reducer;
