import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Character, CharactersResponse } from '../../types/character'

export const charactersApi = createApi({
	reducerPath: 'charactersApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dragonball-api.com/api/' }),
	endpoints: (builder) => ({
		getCharacters: builder.query<
			CharactersResponse,
			{ page?: number; limit?: number; search?: string }
		>({
			query: ({ page = 1, limit = 24, search = '' }) =>
				`/characters?page=${page}&limit=${limit}${
					search ? `&search=${search}` : ''
				}`,
		}),
		getCharacterById: builder.query<Character, string | number>({
			query: (id) => `/characters/${id}`,
		}),
	}),
})

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = charactersApi
