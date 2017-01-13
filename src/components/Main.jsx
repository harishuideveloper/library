import React, { Component } from 'react'
import filters from '../mocks/filters'
import books from '../mocks/books'


class Main extends Component {
  constructor () {
    super()
    this.state = {
      books,
      filters,
    }
  }

  selectTab = ( category ) => {
    this.setState({
      filters: filters.map(filter => {
        filter.selected = filter.category === category
        return filter
      }),
      books: category === 'All'? books : books.filter( book => (book.category === category) ),
    })
  }

  closeSideBar = () => {
    this.setState({
      navClosed: false
    })
  }

  openSideBar = () => {
    this.setState({
      navClosed: true
    })
  }

  search = (input) => {
    console.log(input.target.value)
  }

  render () {
    const { books, filters } = this.state

    const filterItems = filters.map(filter => (
      <li key={ filter.category } onClick={ this.selectTab.bind(null, filter.category) } style={{ display: 'inline-style' }}>
        <a className={ filter.selected? 'selected': '' } href="#0">{ filter.category }</a>
      </li>
    ))

    let className = 'gallery'

    if ( this.state.navClosed ) className += ' filter-is-visible'

    return (
      <main className="main-content">
        <div className="tab-filter-wrapper">
            <div className="tab-filter">
              <ul>
                <li className="placeholder">
                  <a data-type="all" href="#0">All</a>
                </li>
                { filterItems }
              </ul>
            </div>
          </div>

        <section className={ className }>
        { books.map( book => ( <li key={ book.title }><img src={ book.cover }/></li> )) }
        </section>

        <div className={ this.state.navClosed ? 'filter filter-is-visible' : 'filter' }>
          <form>
          <div className="filter-block">
            <h4>Search</h4>

            <div className="filter-content">
              <input type="search" placeholder="title, price..." onChange={ this.onChange }/>
            </div>
          </div>

          </form>
          <a href="#0" className="close" onClick={ this.closeSideBar }>Close</a>
        </div>

        <a href="#0" className="filter-trigger" onClick={ this.openSideBar }>Filters</a>
      </main>
   )
  }
}

export default Main
