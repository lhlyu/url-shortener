export default defineEventHandler(async (event) => {
    const body = await readBody<any>(event)

    const content = body.content

    const KV = event.context.cloudflare.env.KV

    let code = ''

    for (let size = 3; size < 9; size++) {
        let find = false
        for (let i = 0; i < 3; i++) {
            code = generateRandomString(size)
            const value = await KV.get(code)
            if (value) {
                continue
            }
            find = true
            break
        }
        if (find) {
            break
        }
    }

    await KV.put(code, content, {
        expiration: Date.now() / 1000 + 60 * 60 * 24 * 30,
    })

    return code
})

function generateRandomString(length: number) {
    const characters = 'abcdefghjkmnpqrstuvwxy0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}
