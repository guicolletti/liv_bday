from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Confirmado(db.Model):
    __tablename__ = "confirmado"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)


@app.route("/")
def inicio():
    return render_template("index.html")


@app.route("/infos")
def informacoes():
    return render_template("infos.html")


@app.route("/confirmar", methods=["POST"])
def confirmar():

    nome = request.form["nome"]

    pessoa = Confirmado(nome=nome)

    db.session.add(pessoa)
    db.session.commit()

    return redirect("/obrigado")


@app.route("/obrigado")
def obrigado():
    return render_template("obrigado.html")


if __name__ == "__main__":
    app.run(debug=True)