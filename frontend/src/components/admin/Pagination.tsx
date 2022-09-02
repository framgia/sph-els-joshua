import React from 'react'
import tw from 'twin.macro'
import ReactPaginate from 'react-paginate'

type Props = {
  length: number
  pageNumber: number
  pageCount: number
  actions: {
    changePage: any
  }
}

const styles = {
  wrapper: [
    tw`
      flex justify-between text-gray-500
      [> h1]:(text-xs text-gray-600 font-medium)
    `
  ]
}

const Pagination: React.FC<Props> = (props): JSX.Element => {
  const { pageNumber, pageCount, actions, length } = props
  const { changePage } = actions

  return (
    <section className="paginate-section" css={styles.wrapper}>
      <h1>Showing {pageNumber + 1} to {pageCount} of {length} results</h1>
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
