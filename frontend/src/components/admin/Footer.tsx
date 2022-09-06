import React from 'react'

import { styles } from '~/twin/admin.footer.styles'

const Footer: React.FC = (): JSX.Element => {
  return (
    <footer css={styles.footer}>
      <hr />
      <span>© 2022. All Rights Reserved.</span>
   </footer>
  )
}

export default Footer
