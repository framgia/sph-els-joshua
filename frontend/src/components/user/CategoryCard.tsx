import Image from 'next/image'
import React, { useState } from 'react'
import { BsStarFill } from 'react-icons/bs'

import { classNames } from '~/utils/classNames'
import { ICategory, ILesson, IUser } from '~/data/interfaces'
import LessonConfirmationDialog from './LessonConfirmationDialog'

type Props = {
  category: ICategory
  author: IUser
  delay: number
}

const CategoryCard: React.FC<Props> = ({ category, author, delay }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const get_author_lessons = category?.lessons?.map(({ user_id }: ILesson) => user_id === author?.id)

  const is_already_taken: any = get_author_lessons?.filter(value => value)

  return (
    <section className="section-sm">
      <div className="flex flex-col lg:flex-row lg:gap-x-[33px] gap-y-24">
        <div
          className={classNames(
            'w-full max-w-[368px] px-[18px] pb-[26px] lg:px-[28px] lg:pb-[38px] bg-white',
            'hover:shadow-primary flex flex-col rounded-[14px] mx-auto transition'
          )}
          data-aos="fade-up"
          data-aos-delay={`${400+(delay+200)}`}
        >
          <div className="-mt-[38px] lg:-mt-12 mb-4 lg:mb-6">
            <Image 
              src="/img/category.jpg" 
              width={312}
              height={268}
              className="rounded-2xl" 
              alt="category"
              blurDataURL="/img/category.jpg"
              placeholder="blur"
              quality={100} 
              layout="intrinsic"
            />
          </div>
          <div>
            <h4 className="text-lg lg:text-xl font-semibold mb-2 lg:mb-4">
              {category.title}
            </h4>
            <p className="line-clamp-4">{category.description}</p>
          </div>
          <div className="flex items-center justify-between mt-8 mb-2 lg:mb-0">
            {/* stars */}
            <div className="flex gap-x-2 text-red-400">
              {[0,1,2,3,4].map((i) => <BsStarFill key={i} />)}
            </div>
            <button
              className="btn-sm btn-primary disabled:bg-opacity-50"
              data-aos="fade-up"
              data-aos-delay={`${600+(delay+200)}`}
              disabled={is_already_taken[0]}
              onClick={toggle}
            >
              {is_already_taken[0] ? 'Done' : 'Start'}
            </button>
            <LessonConfirmationDialog 
              isOpen={isOpen}
              closeModal={toggle}
              category_id={category?.id}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoryCard
