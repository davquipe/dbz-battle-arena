import { api } from '../../api/api'
import type { CharactersResponse } from '../../types/character'
import type { CharacterDetail } from './charactersTypes'

export const charactersApi = api.injectEndpoints({
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
		getCharacterById: builder.query<CharacterDetail, string | number>({
			query: (id) => `/characters/${id}`,
		}),
	}),
	overrideExisting: false,
})

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = charactersApi
