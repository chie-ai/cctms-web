
const oauth2Credentials = () => {
  const clientId = $nuxt.$config.OAUTH_TOOLKIT_CLIENT_ID
  const clientSecret = $nuxt.$config.OAUTH_TOOLKIT_CLIENT_SECRET
  const oauthCredentials = { username: clientId, password: clientSecret }
  return { auth: oauthCredentials }
}

const header = () => {
  const header = {
    headers: { 
      'Authorization': $nuxt.$store.state.oauth2.user_oauth2.token_type + ' ' + $nuxt.$store.state.oauth2.user_oauth2.access_token
    }
  }
  return header
}

const multipartHeader = () => {
  const header = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Authorization': $nuxt.$store.state.oauth2.user_oauth2.token_type + ' ' + $nuxt.$store.state.oauth2.user_oauth2.access_token
    }
  }
  return header
}

const oauth2HeaderKeys = () => {
  const { access_token } = $nuxt.$cookies.get('access_keys')
  const client_id = $nuxt.$config.OAUTH_TOOLKIT_CLIENT_ID
  const client_secret = $nuxt.$config.OAUTH_TOOLKIT_CLIENT_SECRET
  return new URLSearchParams({ 'token': access_token, 'client_id': client_id, 'client_secret': client_secret })
}

const pagination = (pageObj, searchPage) => {
  const page = searchPage
  const pages = []
  const jumpPrevious = []
  const jumpNext = []
  const nextPage = pageObj.next ? new URL(pageObj.next).searchParams.get('page') : null
  let previousPage = pageObj.previous ? new URL(pageObj.previous).searchParams.get('page') : null
  const currentPage = nextPage !== null ? (nextPage - 1) : nextPage === null ? Number(page) : (Number(previousPage) + 1)
  let totalPages = pageObj.count / $nuxt.$config.PAGE_ITEMS_NUMBER
  const nPage = nextPage
  const pPage = previousPage

  totalPages = Math.ceil(totalPages)

  if (totalPages >= 1) {
    const diff = (totalPages - currentPage)
    if (currentPage <= 2) {
      let ctr = 0
      for (let i = 0; i < 5; i++) {
        if (ctr < totalPages) {
          ctr++
          pages.push(ctr)
        } else {
          break
        }
      }
    } else if (currentPage >= 3) {
      if (totalPages >= currentPage) {
        let ctr = null
        if (diff <= 1) {
          ctr = diff === 0 ? totalPages !== 3 ? totalPages === 4 ? (currentPage - 3) : (currentPage - 4) : (currentPage - 2) : (currentPage === 3) ? (currentPage - 2) : (currentPage - 3)
        } else {
          ctr = (currentPage - 2)
        }
        const totalPages2 = totalPages + 1
        for (let i = 0; i < 5; i++) {
          if (ctr < totalPages2) {
            pages.push(ctr)
            ctr++
          } else {
            break
          }
        }
      }
    }

    // JUMP NEXT & JUMP PREVIOUS
    if (previousPage > 10) {
      let ctr = (Number(previousPage) - 10)
      for (let i = ctr; i > (Number(previousPage) - 12); i--) {
        jumpPrevious.push(ctr)
        ctr++
      }
    }
    if (diff > 11 && diff !== 2) {
      let ctr = (Number(nextPage) + 9)
      for (let i = ctr; i < (Number(nextPage) + 11); i++) {
        jumpNext.push(ctr)
        ctr++
      }
    }
  } else {
    pages.push(1)
  }
  if (currentPage === 2) {
    previousPage = 1
  }
  return { pages, jumpPrevious, jumpNext, nextPage, previousPage, currentPage, totalPages, nPage, pPage }
}

export default ({}, inject) => {
  inject('utils', {
    header,
    multipartHeader,
    oauth2Credentials,
    oauth2HeaderKeys,
    pagination
  })
}