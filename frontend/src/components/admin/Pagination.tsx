import React from 'react'

const Pagination = () => {
  return (
    <section className="paginate-section">
      <nav>
        <ul className="inline-flex -space-x-px">
          <li>
            <a href="#" className="paginate-link rounded-l-lg">Previous</a>
          </li>
          <li>
            <a href="#" className="paginate-link">1</a>
          </li>
          <li>
            <a href="#" className="paginate-link">2</a>
          </li>
          <li>
            <a href="#" className="paginate-link rounded-r-lg">Next</a>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default Pagination