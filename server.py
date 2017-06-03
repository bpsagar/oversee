from nest import Nest
from oversee.app import app


nest = Nest(app=app)
try:
    nest.run()
except KeyboardInterrupt as e:
    print('Shutting down...')
finally:
    nest.shutdown()
