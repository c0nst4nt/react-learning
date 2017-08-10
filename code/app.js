import api from './server/routes';

app.use(async function (req, res, next) {
    let flux = new Flux();

    // здесь создаётся роутер, который будет обрабатывать все запросы клиента
    let router = Router.create({
        routes: routes,
        location: req.url
    });
    let {Handler, state} = await new Promise((resolve, reject) => {
        router.run((Handler, state) =>
            resolve({Handler, state})
        );
    });

    // инициализация хранилища, см. шаг №4
    await performRouteHandlerStaticMethod(state.routes, 'routerWillRun', {state, flux});

    // рендеринг приложения в строку
    let html = React.renderToString(
        <FluxComponent flux={flux}>
            <Handler {...state} />
        </FluxComponent>
    );

    // неизменяемые части документа отдаются простой строкой, т.к. это повышает производительность
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>HabraIsoTODO</title>
                <link rel="stylesheet" href="/css/index.css">
            </head>
            <body>
                <div id="app">
                    ${html}
                </div>
            </body>
        </html>`
    );
});

app.use('/api', api);