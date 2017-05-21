from feathers_jinja2 import Jinja2
from feathers_static import Static
from tinydb import TinyDB
import os


BASE_DIR = os.path.dirname(os.path.dirname(__file__))
PROJECT_DIR = os.path.dirname(__file__)

ASSETS_DIR = os.path.join(BASE_DIR, 'assets')
DATABASE_FILE = os.path.join(BASE_DIR, 'db.json')
STATIC_DIR = os.path.join(PROJECT_DIR, 'static', 'dist')
TEMPLATES_DIR = os.path.join(PROJECT_DIR, 'templates')

# Create Assets directory if not exists
if not os.path.exists(ASSETS_DIR):
    os.makedirs(ASSETS_DIR)


def _load_jinja2(app):
    app.context.modules.jinja2 = Jinja2(app=app, root_dir=TEMPLATES_DIR)


def _load_static(app):
    app.context.modules.static = Static(
        app=app, root_dir=ASSETS_DIR, base_url='/assets'
    )
    app.context.modules.static = Static(
        app=app, root_dir=STATIC_DIR, base_url='/static'
    )


def _load_db(app):
    app.context.modules.db = TinyDB(DATABASE_FILE)


def configure(app):
    _load_db(app)
    _load_jinja2(app)
    _load_static(app)
