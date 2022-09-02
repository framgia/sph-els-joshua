import Image from 'next/image'
import React, { useState } from 'react'
import { BsStarFill } from 'react-icons/bs'

import { styles } from '~/twin/user.category_card.styles'
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

  const defaultNumberOfStars = [0,1,2,3,4]

  return (
    <section css={styles.card}>
      <div
        css={styles.container}
        data-aos="fade-up"
        data-aos-delay={`${400+(delay+200)}`}
      >
        <div css={styles.image}>
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
        <div css={styles.card_details}>
          <h4>
            {category.title}
          </h4>
          <p>{category.description}</p>
        </div>
        <div css={styles.card_footer}>
          <div css={styles.ratings}>
            {defaultNumberOfStars.map((i) => <BsStarFill key={i} />)}
          </div>
          <button
            className="btn-sm btn-primary"
            css={styles.btn_start}
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
    </section>
  )
}

export default CategoryCard
