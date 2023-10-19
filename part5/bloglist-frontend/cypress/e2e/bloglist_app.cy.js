

describe('Bloglist app', function() {

	beforeEach( function() {

		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

		const user1 = {

			name: 'Eduardo Barbosa',
			username: 'edo',
			password: 'obladioblada'
		}

		const user2 = {

			name: 'Jack London',
			username: 'jack',
			password: 'fishandchips'
		}

		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)

		cy.visit('')
	})
	

	it('front page can be opened', function() {
		cy.contains('Blogs')
	})


	it('login form can be opened', function() {

		cy.contains('log in').click()

	})

	describe('Login', function() {

		it('succeeds with correct credentials', function() {

			cy.contains('log in').click()
			cy.get('#username').type('edo')
			cy.get('#password').type('obladioblada')
			cy.get('#login-button').click()

			cy.contains('Eduardo Barbosa logged')	

		})


		it('fails with wrong credentials', function() {

			cy.contains('log in').click()
			cy.get('#username').type('edo')
			cy.get('#password').type('forgot...')
			cy.get('#login-button').click()

			cy.contains('invalid username or password')
		})

	})


	describe('when logged in', function() {

		beforeEach( function() {

			cy.login( { username: 'edo', password: 'obladioblada' } )
				
		})

		it('can create a new blog entry', function() {

			cy.contains('add blog').click()

			cy.get('#blogTitle').type('The History of Italian Opera')
			cy.get('#blogAuthor').type('Marco Bellini')
			cy.get('#blogUrl').type('https://belliniOperaBlog.it/history-of-italian-opera')

			cy.contains('save').click()
			cy.contains('The History of Italian Opera')

		})

		describe('and a blog entry exists', function() {

			beforeEach( function() {

				cy.addBlog({

					title: "Unlocking the Mysteries of Dark Matter",
    				author: "Tatiana Ivanova",
    				url: "https://ivanovaCosmosBlog.ru/dark-matter-mysteries"
				})
			})

			it('existing blog entry is displayed', function() {

				cy.contains('Unlocking the Mysteries of Dark Matter')
			})

		})

		describe('and several blog entries exist', function() {

			beforeEach( function() {

				cy.addBlog({

					title: "Blockchain: Beyond Cryptocurrencies",
    				author: "Ahmed Al-Zahid",
    				url: "https://blockchainMiddleEastBlog.sa/blockchain-beyond-crypto",
				})

				cy.addBlog({

					title: "Exploring Data Science in Healthcare",
    				author: "Krish Patel",
    				url: "https://patelDataScience.in/healthcare-data-science",
				})

				cy.login( { username: 'jack', password: 'fishandchips' } )

				cy.addBlog({

					 title: "Evolving Trends in Brazilian Literature",
   					 author: "Lucia Santos",
   					 url: "https://santosLiteratureBlog.com.br/trends-in-brazilian-literature",
				})

				cy.login( { username: 'edo', password: 'obladioblada' } )
			})

			it('all entries are displayed', function() {

				cy.contains('Blockchain: Beyond Cryptocurrencies')
				cy.contains('Exploring Data Science in Healthcare')
				cy.contains('Evolving Trends in Brazilian Literature')
			})

			it('user can like a blog', function() {

				cy.get('.blogEntry').first().contains('view').click()
				cy.contains('like').click()

				cy.get('#likeCounter').should('not.contain', '0')
			})

			it('only the creator can see the delete button', function() {

				cy.contains('Evolving Trends in Brazilian Literature').should('not.contain', 'delete')
			})

			it('the creator can delete the blog entries they created', function() {

				cy.contains('Exploring Data Science in Healthcare')
					.parent().parent().find('button').contains('delete').click()

				cy.get('html').should('not.contain', 'Exploring Data Science in Healthcare')
			})

			it.only('blogs are ordered by number of likes', function() {

				cy.get('.blogEntry').eq(1).as('dataBlog')

				cy.get('@dataBlog').contains('view').click()
				cy.get('@dataBlog').contains('like').click()
				cy.get('@dataBlog').contains('like').click()
				cy.get('@dataBlog').contains('like').click()
				
				cy.get('.blogEntry').eq(1).as('cryptoBlog')
				cy.get('@cryptoBlog').contains('view').click()
				cy.get('@cryptoBlog').contains('like').click()
				
				cy.get('.blogEntry').eq(2).as('literatureBlog')
				cy.get('@literatureBlog').contains('view').click()
				cy.get('@literatureBlog').contains('like').click()
				cy.get('@literatureBlog').contains('like').click()

				cy.get('.blogEntry').eq(0).should('contain', 'Exploring Data Science in Healthcare')
				cy.get('.blogEntry').eq(1).should('contain', 'Evolving Trends in Brazilian Literature')
			})

		})

	})
})