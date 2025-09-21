from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from database import get_best_resource, get_all_resources

# Create the Flask application
app = Flask(__name__)
# Enable CORS for all routes, allowing the frontend to connect
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Main chat endpoint that processes user messages.
    For the MVP, it acknowledges the user's problem and finds a relevant helpline.
    """
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        # For the MVP, we will assume a default city to find statewide resources.
        # A future version could ask the user for their city.
        city = data.get('city', 'Statewide') 
        language = data.get('language', 'Tamil') # Default to Tamil

        if not user_message:
            return jsonify({'error': 'No message provided'}), 400

        # Create the bot's response
        # 1. Acknowledge the user's message
        response_text = "Thank you for sharing. It takes courage to reach out. I've found a resource that can provide immediate support."

        # 2. Find the best resource based on location and language
        triage_params = {'city': city, 'language': language}
        resource = get_best_resource(triage_params)

        # 3. Add the resource information to the response
        if resource:
            # Note the change from 'resource_name' to 'name' to match your database
            response_text += f"\n\nOrganization: {resource['name']}"
            response_text += f"\nContact: {resource['contact']}"
            response_text += f"\nHours: {resource['operating_hours']}"
            response_text += f"\nDescription: {resource['description']}"
        else:
            response_text = "I'm sorry, I couldn't find a specific resource right now, but please know that support is available. You are not alone."

        return jsonify({
            'response': response_text,
            'resource': resource,
            'timestamp': datetime.now().isoformat()
        })

    except Exception as e:
        print(f"Error in /api/chat: {e}") # Log the error to the terminal
        return jsonify({'error': 'An internal error occurred'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint to confirm the server is running."""
    return jsonify({'status': 'healthy'})

# This block allows you to run the app directly
if __name__ == '__main__':
    app.run(debug=True)