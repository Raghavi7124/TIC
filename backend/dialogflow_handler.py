"""
Dialogflow integration handler for Thunai MVP
This is a placeholder implementation for the hackathon MVP
In production, this would integrate with Google Dialogflow API
"""

import json
from typing import Dict, Any

def detect_intent_texts(project_id: str, session_id: str, text: str, language_code: str = 'en') -> Dict[str, Any]:
    """
    Placeholder function for Dialogflow intent detection
    In production, this would make API calls to Google Dialogflow
    
    Args:
        project_id: Google Cloud project ID
        session_id: Unique session identifier
        text: User input text
        language_code: Language code (en, ta)
    
    Returns:
        Dict containing intent information and parameters
    """
    
    # For MVP, we'll use simple keyword matching
    # In production, this would be replaced with actual Dialogflow API calls
    
    text_lower = text.lower()
    
    # Simple intent detection based on keywords
    if any(word in text_lower for word in ['hello', 'hi', 'hey', 'start', 'begin']):
        intent = 'Default Welcome Intent'
        confidence = 0.9
        parameters = {}
    elif any(word in text_lower for word in ['exam', 'study', 'academic', 'test', 'exam stress']):
        intent = 'Triage Intent'
        confidence = 0.8
        parameters = {'stressor': 'ExamStress'}
    elif any(word in text_lower for word in ['family', 'relationship', 'parent', 'marriage', 'divorce']):
        intent = 'Triage Intent'
        confidence = 0.8
        parameters = {'stressor': 'FamilyStress'}
    elif any(word in text_lower for word in ['health', 'medical', 'illness', 'sick']):
        intent = 'Triage Intent'
        confidence = 0.8
        parameters = {'stressor': 'HealthStress'}
    elif any(word in text_lower for word in ['money', 'financial', 'job', 'employment', 'debt']):
        intent = 'Triage Intent'
        confidence = 0.8
        parameters = {'stressor': 'FinancialStress'}
    elif any(word in text_lower for word in ['lonely', 'alone', 'isolated', 'depressed', 'sad']):
        intent = 'Triage Intent'
        confidence = 0.8
        parameters = {'stressor': 'Loneliness'}
    else:
        intent = 'Default Fallback Intent'
        confidence = 0.3
        parameters = {}
    
    return {
        'intent': intent,
        'confidence': confidence,
        'parameters': parameters,
        'fulfillment_text': get_fulfillment_text(intent, parameters, language_code)
    }

def get_fulfillment_text(intent: str, parameters: Dict[str, Any], language_code: str) -> str:
    """
    Generate appropriate response text based on intent and language
    """
    
    if language_code == 'ta':  # Tamil
        responses = {
            'Default Welcome Intent': 'வணக்கம்! நான் துணை. உங்களுக்கு எந்த விதமான உதவி தேவை?',
            'Triage Intent': 'நான் உங்கள் உணர்வுகளை புரிந்துகொள்கிறேன். உங்களுக்கு சரியான ஆதரவைக் கண்டுபிடிக்க உதவுகிறேன்.',
            'Default Fallback Intent': 'மன்னிக்கவும், நான் உங்களை முழுமையாக புரிந்துகொள்ளவில்லை. மேலும் விளக்க முடியுமா?'
        }
    else:  # English (default)
        responses = {
            'Default Welcome Intent': 'Hello! I\'m Thunai, your companion. How can I help you today?',
            'Triage Intent': 'I understand what you\'re going through. Let me help you find the right support.',
            'Default Fallback Intent': 'I\'m sorry, I didn\'t quite understand that. Could you tell me more about what\'s troubling you?'
        }
    
    return responses.get(intent, responses['Default Fallback Intent'])

def setup_dialogflow_agent():
    """
    Placeholder function for Dialogflow agent setup
    In production, this would contain code to:
    1. Create Dialogflow agent
    2. Set up intents and entities
    3. Configure fulfillment webhook
    """
    print("Dialogflow agent setup would be implemented here")
    print("See dialogflow_setup_guide.md for manual setup instructions")

# Example usage for testing
if __name__ == "__main__":
    # Test the intent detection
    test_cases = [
        ("Hello", "en"),
        ("I'm stressed about exams", "en"),
        ("வணக்கம்", "ta"),
        ("பரீட்சை பற்றி கவலை", "ta")
    ]
    
    for text, lang in test_cases:
        result = detect_intent_texts("test-project", "test-session", text, lang)
        print(f"Text: {text} ({lang})")
        print(f"Intent: {result['intent']}")
        print(f"Response: {result['fulfillment_text']}")
        print("-" * 50)

