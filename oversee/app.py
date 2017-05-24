from drongo import Drongo
from tinydb import Query
import copy
import json
import os

from .configure import configure, ASSETS_DIR
from .exceptions import InvalidDatabaseState

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
    state = json.loads(ctx.request.env['BODY'])

    last_layer_number = 0
    for layer in state.get('layers', []):
        last_layer_number = max(last_layer_number, layer['number'])
        Layer = Query()
        results = table.search(Layer.number == layer['number'])
        if len(results) > 1:
            raise InvalidDatabaseState()
        elif len(results) == 1:
            old_layer = copy.deepcopy(results[0])
            old_layer.update(layer)
            selected_column = None
            if 'selected_column' in old_layer:
                selected_column = old_layer.get('selected_column')
                del old_layer['selected_column']
            table.update(old_layer, Layer.number == layer['number'])
            column_numbers = [c['number'] for c in old_layer['columns']]
            if selected_column not in column_numbers:
                table.update(
                    dict(selected_column=None),
                    Layer.number == layer['number']
                )
        else:
            layer.update(dict(selected_column=None))
            table.insert(layer)

    table.remove(Layer.number > last_layer_number)
    ctx.response.set_json({})


@app.url('/api/screen/')
def screen_data(ctx):
    table = ctx.modules.db.table('layer')
    screen = {}
    for layer in table.all():
        screen[layer['number']] = layer['selected_column']
    ctx.response.set_json(dict(screen=screen))


@app.url('/api/screen/update/', method='POST')
def update_screen(ctx):
    table = ctx.modules.db.table('layer')
    state = json.loads(ctx.request.env['BODY'])
    for layer, column in state.get('screen', {}).items():
        Layer = Query()
        table.update(dict(selected_column=column), Layer.number == int(layer))
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
