const whiteList = ['/', '/404']

export default defineEventHandler(async (event) => {
    const url = getRequestURL(event)

    let white = false

    if (whiteList.includes(url.pathname)) {
        white = true
    }

    if (/[\._]+/.test(url.pathname)) {
        white = true
    }

    if (url.pathname.startsWith('/api/')) {
        white = true
    }

    if (!white) {
        await sendRedirect(event, '/404', 302)
        return
    }
})
