import sqlite3
from flask import Flask,  jsonify, request
from flask_cors import CORS

DATABASE = 'proyectofinal'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def create_table():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS carta (
            codigo INTEGER PRIMARY KEY,
            nombre TEXT NOT NULL,
            descripcion TEXT NOT NULL,
            url TEXT NOT NULL,
            precio REAL NOT NULL
        )
    ''')
    conn.commit()
    cursor.close()
    conn.close()

def create_database():
    conn = sqlite3.connect(DATABASE)
    conn.close()
    create_table()

create_database()

class Plato:
    def __init__(self, codigo, nombre, descripcion, url, precio, cantidad = 0):
        self.codigo = codigo
        self.nombre = nombre
        self.descripcion = descripcion
        self.url = url
        self.precio = precio
        self.cantidad = cantidad

    def modificar(self, nuevo_nombre, nueva_descripcion, nueva_imagen, nuevo_precio):
        self.nombre = nuevo_nombre
        self.descripcion = nueva_descripcion
        self.url = nueva_imagen
        self.precio = nuevo_precio

class Carta:
    def __init__(self):
        self.conexion = get_db_connection()
        self.cursor = self.conexion.cursor()
        self.platos = []

    def agregar_plato(self, codigo, nombre, descripcion, url, precio):
        plato_existente = self.consultar_plato(codigo)
        if plato_existente:
            return jsonify({'message': 'Ya existe un plato con ese código.'}), 400

        nuevo_plato = Plato(codigo, nombre, descripcion, url, precio)
        self.platos.append(nuevo_plato)
        self.cursor.execute("INSERT INTO carta VALUES (?, ?, ?, ?,?)",
                            (codigo, nombre, descripcion, url, precio))
        self.conexion.commit()
        return jsonify({'message': 'Plato añadido correctamente.'}), 200

    def consultar_plato(self, codigo):
        self.cursor.execute(
            "SELECT * FROM carta WHERE codigo = ?", (codigo,))
        row = self.cursor.fetchone()
        if row:
            codigo, nombre, descripcion, url, precio = row
            return Plato(codigo, nombre, descripcion, url, precio)
        return None

    def modificar_plato(self, codigo, nuevo_nombre, nueva_descripcion, nueva_url, nuevo_precio):
        plato = self.consultar_plato(codigo)
        if plato:
            plato.modificar(nuevo_nombre, nueva_descripcion, nueva_url, nuevo_precio)
            self.cursor.execute("UPDATE carta SET nombre= ?, descripcion = ?, url = ?, precio = ? WHERE codigo = ?",
                                (nuevo_nombre, nueva_descripcion, nueva_url, nuevo_precio, codigo))
            self.conexion.commit()
            return jsonify({'message': 'Plato modificado correctamente.'}), 200
        return jsonify({'message': 'Plato no encontrado.'}), 404

    def listar_platos(self):
        self.cursor.execute("SELECT * FROM carta")
        rows = self.cursor.fetchall()
        platos = []
        for row in rows:
            codigo, nombre, descripcion, url, precio = row
            plato = {'codigo': codigo, 'nombre': nombre, 'descripcion': descripcion,
                        'URL': url, 'precio': precio}
            platos.append(plato)
        return jsonify(platos), 200

    def eliminar_plato(self, codigo):
        self.cursor.execute(
            "DELETE FROM carta WHERE codigo = ?", (codigo,))
        if self.cursor.rowcount > 0:
            self.conexion.commit()
            return jsonify({'message': 'Plato eliminado correctamente.'}), 200
        return jsonify({'message': 'Plato no encontrado.'}), 404

class Pedido:
    def agregar(self, codigo, cantidad, carta):
        plato = carta.consultar_plato(codigo)
        for item in self.items:
            if item.codigo == codigo:
                item.cantidad += cantidad
                return jsonify({'message': 'Plato agregado al carrito correctamente.'}), 200

        nuevo_item = Plato(codigo, plato.nombre, plato.descripcion, plato.precio, cantidad)
        self.items.append(nuevo_item)
        return jsonify({'message': 'Plato agregado al carrito correctamente.'}), 200

    def quitar(self, codigo, cantidad):
        for item in self.items:
            if item.codigo == codigo:
                if cantidad > item.cantidad:
                    return jsonify({'message': 'Cantidad a quitar mayor a la cantidad en el pedido.'}), 400
                item.cantidad -= cantidad
                if item.cantidad == 0:
                    self.items.remove(item)
                return jsonify({'message': 'Plato quitado del pedido correctamente.'}), 200
        return jsonify({'message': 'El plato no se encuentra en el pedido.'}), 404

    def mostrar(self):
        platos_pedido = []
        for item in self.items:
            plato = {'codigo': item.codigo, 'nombre': item.nombre, 'descripcion': item.descripcion, 'URL': item.url, 'cantidad': item.cantidad,
                        'precio': item.precio}
            platos_pedido.append(plato)
        return jsonify(platos_pedido), 200

app = Flask(__name__)
CORS(app)

pedido = Pedido()
carta = Carta()

@app.route('/platos/<int:codigo>', methods=['GET'])
def obtener_plato(codigo):
    plato = carta.consultar_plato(codigo)
    if plato:
        return jsonify({
            'codigo': plato.codigo,
            'nombre': plato.nombre,
            'descripcion': plato.descripcion,
            'imagen': plato.url,
            'precio': plato.precio
        }), 200
    return jsonify({'message': 'Producto no encontrado.'}), 404

@app.route('/platos', methods=['GET'])
def obtener_platos():
    return carta.listar_platos()

@app.route('/platos', methods=['POST'])
def agregar_plato():
    codigo = request.json.get('codigo')
    nombre = request.json.get('nombre')
    descripcion = request.json.get('descripcion')
    url = request.json.get('url')
    precio = request.json.get('precio')
    return carta.agregar_plato(codigo, nombre, descripcion, url , precio)

@app.route('/platos/<int:codigo>', methods=['PUT'])
def modificar_plato(codigo):
    nuevo_nombre = request.json.get('nombre')
    nueva_descripcion = request.json.get('descripcion')
    nueva_url = request.json.get('url')
    nuevo_precio = request.json.get('precio')
    return carta.modificar_plato(codigo, nuevo_nombre, nueva_descripcion, nueva_url, nuevo_precio)

@app.route('/platos/<int:codigo>', methods=['DELETE'])
def eliminar_plato(codigo):
    return carta.eliminar_plato(codigo)

@app.route('/pedido', methods=['POST'])
def agregar_item():
    codigo = request.json.get('codigo')
    cantidad = request.json.get('cantidad')
    carta = Carta()
    return pedido.agregar(codigo, cantidad, carta)

@app.route('/pedido', methods=['DELETE'])
def quitar_item():
    codigo = request.json.get('codigo')
    cantidad = request.json.get('cantidad')
    return pedido.quitar(codigo, cantidad)

@app.route('/pedido', methods=['GET'])
def obtener_pedido():
    return pedido.mostrar()

@app.route('/')
def index():
    return 'API del CRUD de platos'

if __name__ == '__main__':
    app.run()