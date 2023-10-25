import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`

	query {
		allAuthors {
			name
			born
			bookCount
		}
	}

`

export const ALL_BOOKS = gql`

	query {
		allBooks {
			title
			author {
				name
			}
			published
		}
	}

`

export const NEW_BOOK = gql`

	mutation newBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
		addBook(
			title: $title,
			author: $author,
			published: $published,
			genres: $genres
		) {
			id
			title
			author {
				name
			}
			published
			genres
		}
	}
`

export const EDIT_AUTHOR = gql`

	mutation editAuthor($name: String!, $year: Int!) {
		editAuthor(
			name: $name
			year: $year
		) {
			id
			name
			born
		}
	}
`