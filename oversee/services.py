from tinydb import Query


Layer = Query()


class LayerService(object):
    def __init__(self, db):
        self.table = db.table('layer')

    def get_layer(self, number):
        layer = self.table.search(Layer.number == number)
        return (layer and layer[0]) or None

    def get_layers(self):
        return self.table.all()

    def get_screen(self):
        screen = {}
        for layer in self.table.all():
            screen[layer['number']] = layer['selected_column']
        return screen

    def insert_layer(self, layer):
        self.table.insert(layer)

    def remove_layer(self, number):
        self.table.remove(Layer.number == number)

    def update_layer(self, number, params):
        self.table.update(params, Layer.number == number)

    def fix_layers(self):
        """Fixing selected column value for layers"""
        for layer in self.table.all():
            column_number = layer['selected_column']
            column_numbers = [c['number'] for c in layer['columns']]

            if column_number not in column_numbers:
                self.table.update(
                    dict(selected_column=None),
                    Layer.number == layer['number']
                )

    def update_layers(self, layers):
        current_layer_numbers = [l['number'] for l in layers]
        db_layer_numbers = [l['number'] for l in self.table.all()]

        for layer in layers:
            db_layer = self.get_layer(number=layer['number'])
            if db_layer:
                # Not updating selected column
                del layer['selected_column']
                db_layer.update(layer)
                self.update_layer(number=layer['number'], params=db_layer)
            else:
                db_layer = layer
                db_layer.update(dict(selected_column=None))
                self.insert_layer(layer=db_layer)

        for number in db_layer_numbers:
            if number not in current_layer_numbers:
                self.remove_layer(number=number)
        self.fix_layers()

    def update_screen(self, screen):
        for layer_number, column_number in screen.items():
            layer_number = int(layer_number)
            self.update_layer(
                number=layer_number,
                params=dict(selected_column=column_number)
            )
