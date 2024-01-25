from flask import Flask
from flask_mysqldb import MySQL
from config import Config


# Initialize MySQL outside of create_app to be imported in routes
mysql = MySQL()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Import and register blueprints here to avoid circular imports
    from app.api.routes import api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api')

    # Initialize MySQL with app
    mysql.init_app(app)
    return app




if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
