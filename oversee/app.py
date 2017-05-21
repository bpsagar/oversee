from drongo import Drongo

from .configure import configure


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
