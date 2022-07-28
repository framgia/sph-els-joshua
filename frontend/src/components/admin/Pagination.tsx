import React from 'react'
import ReactPaginate from 'react-paginate'

type Props = {
  length: number
  pageNumber: number
  pageCount: number
  actions: {
    changePage: any
  }
}

const Pagination: React.FC<Props> = (props): JSX.Element => {
  const { pageNumber, pageCount, actions, length } = props
  const { changePage } = actions

  return (
    <section className="paginate-section flex justify-between text-gray-500">
      <h1 className="text-xs text-gray-600 font-medium">Showing {pageNumber + 1} to {pageCount} of {length} results</h1>
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageCount={pageCount}
        onPageChange={changePage}
        pageRangeDisplayed={5}
        containerClassName="inline-flex -space-x-px"
        previousLinkClassName="paginate-link rounded-l-lg"
        pageLinkClassName="paginate-link"
        activeClassName="paginate-link-active"
        nextLinkClassName="paginate-link rounded-r-lg"
      />
    </section>
  )
}

export default Pagination
