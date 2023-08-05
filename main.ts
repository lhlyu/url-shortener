import { Application, Router, send } from 'https://deno.land/x/oak@v12.6.0/mod.ts'
import { addUrlShortener, getUrlShortener } from "./mongo.ts";

const router = new Router()

router.get('/', async (ctx) => {
	await ctx.send({
		root: `${Deno.cwd()}/static`,
		index: 'index.html',
        gzip: true
	})
})

router.post('/create', async (ctx) => {
    const { url } = await ctx.request.body({ type: 'json'}).value
    const newUrl = await addUrlShortener(url)
    ctx.response.body = JSON.stringify({
        url: newUrl
    })
})

router.get('/:code', async (ctx) => {
    const { code } = ctx.params
    const url = await getUrlShortener(code)
    ctx.response.redirect(url)
})

router.get('/static/:path+', async (ctx) => {
    await send(ctx, ctx.request.url.pathname, {
        root: Deno.cwd(),
    });
});


const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

console.log('0.0.0.0:8000')
await app.listen({ port: 8000 })
