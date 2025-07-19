import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from "next-redux-wrapper";

const seoSlice = createSlice({
    name: "seo",
    initialState: {
        seoData: {},
        isLoading: false,
        error: null
    },
    reducers: {
        setSeoData(state, action) {
            state.seoData = action.payload;
        },
        updatePageSeo(state, action) {
            const { page, seoData } = action.payload;
            if (state.seoData.pages) {
                state.seoData.pages[page] = { ...state.seoData.pages[page], ...seoData };
            }
        },
        updateGlobalSeo(state, action) {
            state.seoData.global = { ...state.seoData.global, ...action.payload };
        },
        setSeoLoading(state, action) {
            state.isLoading = action.payload;
        },
        setSeoError(state, action) {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE, (state, action) => {
                return {
                    ...state,
                    ...action.payload.seo,
                };
            })
    },
});

export const { 
    setSeoData, 
    updatePageSeo, 
    updateGlobalSeo, 
    setSeoLoading, 
    setSeoError 
} = seoSlice.actions;

export default seoSlice.reducer;