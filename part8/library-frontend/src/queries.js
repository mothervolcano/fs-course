import { gql } from '@apollo/client'


export const LOGIN = gql`
	
	mutation login($username: String!, $password: String! ) {
		login( username: $username, password: $password ) {
			value
		}
	}
`

export const ME = gql`

	query {
		me {
			username
			favoriteGenre
		}
	}

`

export const ALL_AUTHORS = gql`

	query {
		allAuthors {
			name
			born
			bookCount
		}
	}

`

export const USER_BOOKS = gql`

	query {
		userBooks {
			title
			author {
				name
			}
			published
			genres
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
			genres
		}
	}

`

export const ALL_BOOKS_AND_GENRES = gql`

	query($genre: String) {
		allGenres
		allBooks(genre: $genre) {
			title
			author {
				name
			}
			published
			genres
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

export const BOOK_ADDED = gql`

	subscription {
		bookAdded {
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
