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
        const KV = event.context.cloudflare.env.KV

        const code = url.pathname.substring(1)

        const value = await KV.get(code)

        if (!value) {
            return sendRedirect(event, '/404', 302)
        }

        if (isURL(value)) {
            return sendRedirect(event, value, 302)
        }

        return sendWebResponse(
            event,
            new Response(value, {
                headers: {
                    'Content-Type': 'text/plain; charset=utf-8',
                },
            }),
        )
    }
})

function isURL(str: string): boolean {
    try {
        new URL(str)
        return true
    } catch (e) {
        return false
    }
}
