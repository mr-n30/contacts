from flask import request, jsonify
from config import app, db
from models import Contact

# Get all contacts from DB
@app.route("/contacts", methods=["GET"])
def get_contacts() -> jsonify:
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts": json_contacts})

# Get a contact from DB
@app.route("/contacts/<int:user_id>", methods=["GET"])
def get_contact(user_id) -> jsonify:
    contact = Contact.query.get(user_id)
    if not contact:
        return jsonify({"message": "User not found"}), 404
    return jsonify({"contacts": contact.to_json()}), 200

# Create a contact
@app.route("/create_contact", methods=["POST"])
def create_contact() -> jsonify:
    try:
        first_name = request.json.get("firstName")
        last_name = request.json.get("lastName")
        email = request.json.get("email")

        if not first_name or not last_name or not email:
            return(
                jsonify({"message": "You must include firstName, lastName, and email"}),
                400
            )
    
        new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
        db.session.add(new_contact)
        db.session.commit()

        return jsonify({"message": "User created!"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
# Update contact
@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id) -> jsonify:
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404
    
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    db.session.commit()

    return jsonify({"message": "User updated"}), 200

# Delete a contact
@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404
    
    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "User deleted"}), 200

# Entry
if __name__ == "__main__":
    # Init the DB
    with app.app_context():
        db.create_all()

    app.run(debug=True, host="0.0.0.0")