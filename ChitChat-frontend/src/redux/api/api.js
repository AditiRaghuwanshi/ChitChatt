import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/configure";



const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}/api/v1/`,
         prepareHeaders: (headers) => {
      return headers;  // must return headers for the request to work
    },
}),
    tagTypes: ["Chat", "User", "Message"],
    endpoints: (builder) => ({
        
        
        myChats: builder.query({
            query: () => ({
                url: 'chat/my',
                credentials: "include"
            }),
            providesTags: ["Chat"],
        }),

        searchUser: builder.query({
            query: (namee) => ({
                url: `user/search?namee=${namee}`,
                credentials: "include",
            }),
            providesTags: ["User"],
        }),

        sendFriendRequest: builder.mutation({
            query: (data) => ({
                url: "user/sendRequest",
                method: "PUT",
                credentials: "include",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),

        GetNotification: builder.query({
            query: () => ({
                url: 'user/notification',
                credentials: "include"
            }),
            keepUnusedDataFor: 0,
        }),

        AcceptFriendRequest: builder.mutation({
            query: (data) => ({
                url: "user/acceptRequest",
                method: "PUT",
                credentials: "include",
                body: data,
            }),
            invalidatesTags: ["Chat"],
        }),


    
        //   AcceptFriendRequest: builder.mutation({
        //     query: ({ senderId, receiverId, accept }) => ({
        //       url: "user/acceptRequest", // ✅ NO requestId in URL
        //       method: "PUT",
        //       credentials: "include",
        //       body: { senderId, receiverId, accept },
        //     }),
        //     invalidatesTags: ["User", "Chat"],
        //   }),
          
          

        chatDetails: builder.query({
            query: ({ chatId, populate = false }) => {
                let url = `chat/${chatId}`;
                if (populate) url += "?populate=true";
                return {
                    url,
                    credentials: "include",
                }

            },
            providesTags: ["Chat"],
        }),

        getMessage: builder.query({
            query: ({ chatId, page }) => ({
                url: `chat/message/${chatId}?page=${page}`,
                credentials: "include",
            }),
            keepUnusedDataFor: 0,
        }),

        sendAttachments: builder.mutation({
            query: (data) => ({
                url: "chat/attachments",
                method: "POST",
                credentials: "include",
                body: data,
            }),

        }),

        myGroups: builder.query({
            query: () => ({
                url: "chat/my/groups",
                credentials: "include"
            }),
            providesTags: ["Chat"],
        }),


    



        //always use {} while using query and if we are using constructor or fun then {} as if someone is sending empty thing
        // availableFriends: builder.query({
        //     query: ({ chatId } = {}) => {
        //       let url = `user/friends`;
        //       if (chatId) url += `?chatId=${chatId}`;
        //       return {
        //         url,
        //         credentials: "include",
        //       };
        //     },
        //     providesTags: ["Chat"],
        //   }),



        availableFriends: builder.query({
            query: (chatId) => {
              let url = `user/friends`;
              if (chatId) url += `?chatId=${chatId}`;
              return {
                url,
                credentials: "include",
              };
            },
            providesTags: ["Chat"],
          }),


          

        newGroup: builder.mutation({
            query: ({namee, members }) => ({
                url: "chat/new",
                method: "POST",
                body: { namee, members },
                credentials: "include"
            }),
            invalidatesTags: ["Chat"],
        }),


        
        renameGroup: builder.mutation({
            query: ({namee, chatId }) => ({
                url: `chat/${chatId}`,
                method: "PUT",
                body: { namee },
                credentials: "include"
            }),
            invalidatesTags: ["Chat"],
        }),

        removeGroupMember: builder.mutation({
            query: ({ chatId, userId }) => ({
                url: `chat/removemembers`,
                method: "PUT",
                body: { chatId, userId },
                credentials: "include"
            }),
            invalidatesTags: ["Chat"],
        }),

        addGroupMembers: builder.mutation({
            query: ({ chatId, members }) => ({
                url: `chat/addmembers`,
                method: "PUT",
                body: { chatId, members },
                credentials: "include"
            }),
            invalidatesTags: ["Chat"],
        }),

            
        DeleteGroup: builder.mutation({
            query: (chatId) => ({
                url: `chat/${chatId }`,
                method: "DELETE",
                credentials: "include"
            }),
            invalidatesTags: ["Chat"],
        }),


         leaveGroup: builder.mutation({
            query: (chatId) => ({
                url: `chat/leave/${chatId}`,
                method: "DELETE",
                credentials: "include"
            }),
            invalidatesTags: ["Chat"],
        }),

    }),
});

export default api
export const
    {
        useMyChatsQuery,
        useLazySearchUserQuery,
        useSendFriendRequestMutation,
        useGetNotificationQuery,
        useAcceptFriendRequestMutation,
        useChatDetailsQuery,
        useGetMessageQuery,
        useSendAttachmentsMutation,
        useMyGroupsQuery,
        useAvailableFriendsQuery,
        useNewGroupMutation,
        useRenameGroupMutation,
        useRemoveGroupMemberMutation,
        useAddGroupMembersMutation,
        useDeleteGroupMutation,
        useLeaveGroupMutation,



    } = api;
// lazy me khud ko type krna pdega jbtk pura type ni krte tb tk api call ni
// hoga aur without it har keystroke pr api call hoga



















