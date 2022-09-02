import tw from 'twin.macro'
import Head from 'next/head'
import Image from 'next/image'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { styles } from '~/twin/404.styles'

const NotFound: NextPage = (): JSX.Element => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Page Not Found</title>
        <meta name="description" content="404 Page Not Found" />
      </Head>
      <div css={styles.wrapper}>
        <div css={styles.container}>
          <div css={tw`flex items-center`}>
            <h1 css={tw`font-bold text-9xl -mr-6`}>4</h1>
            <div css={tw`flex-shrink-0 z-50`}>
              <Image
                src="/img/404.png"
                alt="Cry Emoji Image"
                width={192}
                height={192}
                blurDataURL="/images/emoji.png"
                placeholder="blur"
                layout="intrinsic"
              />
            </div>
            <h1 css={tw`font-bold text-9xl -ml-8`}>4</h1>
          </div>
          <div css={tw`flex flex-col items-center`}>
            <h2 css={tw`text-xl uppercase font-semibold`}>
              Oops! Page not be found
            </h2>
            <div css={tw`max-w-md text-center`}>
              <p css={tw`text-gray-500 text-sm`}>
                Sorry but the page you are looking for does not exist, have been removed. name
                changed or is temporarily unavailable
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={() => router.push('/')}
              css={styles.btn_homepage}
            >
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound
