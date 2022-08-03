import React from 'react'

const CategoryCard = (): JSX.Element => {
  return (
    <div className="bg-white rounded-lg shadow-md border">
      <div className="px-5 py-5">
          <div className="space-y-3">
            <h5 className="text-lg font-semibold tracking-tight text-gray-900">Basic 500</h5>
            <p className="text-sm line-clamp-6">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus possimus ab cum ipsam non eum perferendis adipisci qui impedit, modi quaerat sed. Necessitatibus nostrum quo sit provident esse sapiente perspiciatis! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea culpa at cum nisi quod est odio voluptate quo, possimus non quas nostrum quibusdam! Odio blanditiis, architecto magni ea itaque totam.</p>
          </div>
          <div className="mt-3 flex justify-end items-center">
            <button type="button" className="btn-success">Start</button>
          </div>
      </div>
    </div>
  )
}

export default CategoryCard
