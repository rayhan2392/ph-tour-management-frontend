import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { ITourPackage } from "@/types/tour.type";

export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTour: builder.mutation({
            query: (tourData) => ({
                url: "/tour/create",
                method: "POST",
                data: tourData,
            }),
            invalidatesTags: ["TOUR"],
        })
        ,
        getAllTours: builder.query<ITourPackage[],unknown>({
            query: (params) => ({
                url: "/tour",
                method: "GET",
                params:params
            }),
            providesTags:["TOUR"],
            transformResponse: (res:IResponse<ITourPackage[]>) => res.data,
        })
        ,
        addTourType: builder.mutation({
            query: (tourTypeName) => ({
                url: "/tour/create-tour-type",
                method: "POST",
                data: tourTypeName
            }),
            invalidatesTags: ["TOUR"]
        }),

        removeTourType: builder.mutation({
            query: (tourTypeId) => ({
                url: `/tour/tour-types/${tourTypeId}`,
                method: "DELETE",

            }),
            invalidatesTags: ["TOUR"]
        }),

        getTourTypes: builder.query({
            query: () => ({
                url: "/tour/tour-types",
                method: "GET",
            }),
            providesTags: ["TOUR"],
            transformResponse: (res) => res.data,

        }),
    })
})




export const {
    useAddTourTypeMutation,
    useGetTourTypesQuery,
    useRemoveTourTypeMutation,
    useAddTourMutation,
    useGetAllToursQuery
} = tourApi