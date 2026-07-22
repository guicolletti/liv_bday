from flask import Flask, render_template, request, redirect, session
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
import random

load_dotenv()

app = Flask(__name__)

app.secret_key = os.getenv("SECRET_KEY", "area51")

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


# -------------------------
# MODELOS
# -------------------------

class Confirmado(db.Model):

    __tablename__ = "confirmados"

    id = db.Column(db.Integer, primary_key=True)

    nome = db.Column(db.String(100), nullable=False)

    cartaz = db.Column(db.Integer, nullable=False)


# -------------------------
# ROTAS
# -------------------------

@app.route("/")
def index():

    return render_template("index.html")


@app.route("/infos")
def infos():

    if "cartaz" not in session:

        session["cartaz"] = random.randint(1, 3)

    return render_template(
        "infos.html",
        cartaz=session["cartaz"]
    )


@app.route("/confirmar", methods=["POST"])
def confirmar():

    nome = request.form.get("nome")

    cartaz = session.get("cartaz", random.randint(1, 3))

    convidado = Confirmado(

        nome=nome,
        cartaz=cartaz

    )

    db.session.add(convidado)

    db.session.commit()

    return redirect("/obrigado")


@app.route("/obrigado")
def obrigado():

    return render_template("obrigado.html")


@app.route("/confirmados")
def confirmados():

    pessoas = Confirmado.query.order_by(
        Confirmado.nome
    ).all()

    return render_template(

        "confirmados.html",

        pessoas=pessoas

    )


if __name__ == "__main__":

    with app.app_context():
        db.create_all()

    app.run(debug=True)