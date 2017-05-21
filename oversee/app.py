from drongo import Drongo
import json
import os

from .configure import configure, ASSETS_DIR


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
    table = ctx.modules.db.table('layer')
    layers = table.all()
    ctx.response.set_json(dict(layers=layers))


@app.url('/api/layers/update/', method='POST')
def update_layers(ctx):
    table = ctx.modules.db.table('layer')
    table.purge()
    state = json.loads(ctx.request.env['BODY'])
    for layer in state.get('layers', []):
        table.insert(layer)
    ctx.response.set_json({})


@app.url('/api/screen/')
def screen_data(ctx):
    table = ctx.modules.db.table('screen')
    screen_layers = table.all()
    screen = {}
    for item in screen_layers:
        screen[item['layer']] = item['column']
    ctx.response.set_json(dict(screen=screen))


@app.url('/api/screen/update/', method='POST')
def update_screen(ctx):
    table = ctx.modules.db.table('screen')
    table.purge()
    state = json.loads(ctx.request.env['BODY'])
    for layer, column in state.get('screen', {}).items():
        table.insert(dict(layer=int(layer), column=column))
    ctx.response.set_json({})


@app.url('/api/screen/assets/')
def screen_assets(ctx):
    screen = ctx.modules.db.table('screen').all()
    layers = ctx.modules.db.table('layer').all()
    screen = sorted(screen, key=lambda x: x['layer'])

    layer_column_map = {}

    for c in screen:
        layer_column_map[c['layer']] = c['column']

    screen_columns = []

    for layer in layers:
        layer_number = layer['number']
        if layer_number not in layer_column_map:
            screen_columns.append(dict(
                layer_number=layer['number'],
                column_number=None,
                layer=layer
            ))
        else:
            column_number = layer_column_map.get(layer_number)
            screen_columns.append(dict(
                layer_number=layer['number'],
                column_number=column_number,
                layer=layer
            ))

    ctx.response.set_json(dict(screen=screen_columns))
