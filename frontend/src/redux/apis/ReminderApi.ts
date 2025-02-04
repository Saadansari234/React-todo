import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reminderApi = createApi({
  //   reducerPath: "reminderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8081" }),
  tagTypes: ["reminders"],
  endpoints: (builder) => ({
    getReminder: builder.query<Reminders_temp[], void>({
      query: () => "/reminders",
      transformResponse: (reminders: Reminders_temp[]) => reminders.reverse(),
      providesTags: ["reminders"],
    }),
    addReminder: builder.mutation({
      query: (reminder) => ({
        url: "/add-reminder",
        method: "POST",
        body: { reminder: reminder },
      }),
      invalidatesTags: ["reminders"],
    }),
    deleteReminder: builder.mutation({
      query: (id) => ({
        url: `/reminder/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reminders"],
    }),
    updateReminder: builder.mutation({
      query: ({dataParams,newData}) => ({
        url: `/reminder/${dataParams}`,
        method: "PATCH",
        body: newData,
      }),
      invalidatesTags: ["reminders"],
    }),
  }),
});

export const { useGetReminderQuery, useAddReminderMutation, useUpdateReminderMutation,useDeleteReminderMutation } = reminderApi;
