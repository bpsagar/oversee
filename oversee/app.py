from drongo import Drongo
import json
import os

from .configure import configure, ASSETS_DIR
from .services import LayerService

app = Drongo()
configure(app)


@app.url('/')
def screen(ctx):
    return ctx.modules.jinja2.get_template('screen.html').render(ctx)


@app.url('/remote/')
def remote(ctx):
    return ctx.modules.jinja2.get_template('remote.html').render(ctx)


@app.url('/setup/')
def setup(ctx):
    return ctx.modules.jinja2.get_template('setup.html').render(ctx)


@app.url('/api/assets/')
def assets(ctx):
    files = os.listdir(ASSETS_DIR)
    assets = []
    for file in files:
        file_type = 'image'
        if file.endswith('.mp4'):
            file_type = 'video'
        assets.append({
            'filename': file,
            'name': file.rsplit('.', 1)[0],
            'type': file_type,
            'url': '/assets/{name}'.format(name=file)
        })
    ctx.response.set_json({
        'assets': assets
    })


@app.url('/api/layers/')
def layers(ctx):
    service = LayerService(db=ctx.modules.db)
    layers = service.get_layers()
    ctx.response.set_json(dict(layers=layers))


@app.url('/api/layers/update/', method='POST')
def update_layers(ctx):
    state = json.loads(ctx.request.env['BODY'])
    service = LayerService(db=ctx.modules.db)
    service.update_layers(layers=state.get('layers'))
    ctx.response.set_json({})


@app.url('/api/screen/')
def screen_data(ctx):
    service = LayerService(db=ctx.modules.db)
    screen = service.get_screen()
    ctx.response.set_json(dict(screen=screen))


@app.url('/api/screen/update/', method='POST')
def update_screen(ctx):
    service = LayerService(db=ctx.modules.db)
    state = json.loads(ctx.request.env['BODY'])
    service.update_screen(screen=state.get('screen'))
    ctx.response.set_json({})


@app.url('/api/screen/assets/')
def screen_assets(ctx):
    layers = ctx.modules.db.table('layer').all()
    screen_columns = []

    for layer in layers:
        screen_columns.append(dict(
            layer_number=layer['number'],
            column_number=layer['selected_column'],
            layer=layer
        ))

    ctx.response.set_json(dict(screen=screen_columns))
