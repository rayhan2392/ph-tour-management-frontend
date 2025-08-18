import { baseApi } from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation({
            query: (bookingData) => ({
                url: "/booking",
                method: "POST",
                data: bookingData
            }),
            invalidatesTags: ["BOOKING"]
        }),

       
        getDivisions: builder.query({
            query: () => ({
                url: "/division",
                method: "GET",
            }),
            providesTags: ["BOOKING"],
            transformResponse: (res) => res.data,

        }),
    })
})




export const {
   useCreateBookingMutation
} = bookingApi