# Dialogflow Setup Guide for Thunai MVP

This guide will help you set up Google Dialogflow for the Thunai mental health chatbot during the hackathon.

## Prerequisites

1. Google Cloud Platform account
2. Access to Dialogflow Console
3. Basic understanding of natural language processing concepts

## Step 1: Create a New Agent

1. Go to [Dialogflow Console](https://dialogflow.cloud.google.com/)
2. Click "Create Agent"
3. Fill in the details:
   - **Agent name**: `Thunai-Mental-Health-Bot`
   - **Default language**: English (en)
   - **Default time zone**: Asia/Kolkata
   - **Google Project**: Create a new project or select existing one

## Step 2: Enable Multiple Languages

1. In your agent settings, go to "Languages"
2. Add Tamil (ta) as a secondary language
3. This will allow the bot to understand both English and Tamil inputs

## Step 3: Create Intents

### 3.1 Default Welcome Intent

1. Go to "Intents" in the left sidebar
2. Click on "Default Welcome Intent"
3. Add training phrases in both languages:

**English:**
- "Hello"
- "Hi"
- "I need help"
- "I'm feeling down"
- "Can you help me?"

**Tamil:**
- "வணக்கம்"
- "உதவி தேவை"
- "எனக்கு உதவி செய்ய முடியுமா?"
- "நான் மன அழுத்தத்தில் இருக்கிறேன்"

### 3.2 Triage Intent

1. Create a new intent called "Triage Intent"
2. Add training phrases for different stress categories:

**Exam Stress:**
- "I'm stressed about exams"
- "Exam pressure is too much"
- "I can't handle my studies"
- "பரீட்சை பற்றி கவலை"
- "படிப்பு பிரச்சனை"

**Family Issues:**
- "Family problems"
- "Relationship issues"
- "Marriage problems"
- "குடும்ப பிரச்சனை"
- "திருமண பிரச்சனை"

**Health Concerns:**
- "Health problems"
- "Medical issues"
- "I'm sick"
- "ஆரோக்கிய பிரச்சனை"
- "மருத்துவ பிரச்சனை"

**Financial Stress:**
- "Money problems"
- "Financial stress"
- "Job issues"
- "பண பிரச்சனை"
- "வேலை பிரச்சனை"

**Loneliness:**
- "I feel lonely"
- "I'm isolated"
- "I have no one to talk to"
- "நான் தனிமையில் இருக்கிறேன்"
- "எனக்கு யாரும் இல்லை"

## Step 4: Create Custom Entity

1. Go to "Entities" in the left sidebar
2. Create a new entity called `@Stressor`
3. Add the following entries:

| Entry | Synonyms |
|-------|----------|
| ExamStress | exam, study, academic, test, exam stress, பரீட்சை, படிப்பு |
| FamilyStress | family, relationship, parent, marriage, divorce, குடும்பம், திருமணம் |
| HealthStress | health, medical, illness, sick, ஆரோக்கியம், மருத்துவம் |
| FinancialStress | money, financial, job, employment, debt, பணம், வேலை |
| Loneliness | lonely, alone, isolated, depressed, sad, தனிமை, மன அழுத்தம் |

## Step 5: Configure Fulfillment

1. Go to "Fulfillment" in the left sidebar
2. Enable "Webhook"
3. Set the webhook URL to your Flask backend: `https://your-domain.com/webhook`
4. For MVP, you can use the inline editor with this code:

```javascript
function fulfillmentHandler(agent) {
    const stressor = agent.parameters.stressor;
    const language = agent.locale;
    
    // Simple response based on stressor
    let response = "";
    
    if (language === 'ta') {
        response = "நான் உங்கள் உணர்வுகளை புரிந்துகொள்கிறேன். உங்களுக்கு சரியான ஆதரவைக் கண்டுபிடிக்க உதவுகிறேன்.";
    } else {
        response = "I understand what you're going through. Let me help you find the right support.";
    }
    
    agent.add(response);
}
```

## Step 6: Test Your Agent

1. Use the "Try it now" panel on the right side
2. Test with various phrases in both English and Tamil
3. Verify that the correct intents are triggered
4. Check that entities are properly extracted

## Step 7: Integration with Backend

1. In your Flask backend, install the Dialogflow client:
   ```bash
   pip install google-cloud-dialogflow
   ```

2. Update your `dialogflow_handler.py` to use the actual API:

```python
from google.cloud import dialogflow

def detect_intent_texts(project_id, session_id, text, language_code='en'):
    session_client = dialogflow.SessionsClient()
    session = session_client.session_path(project_id, session_id)
    
    text_input = dialogflow.TextInput(text=text, language_code=language_code)
    query_input = dialogflow.QueryInput(text=text_input)
    
    response = session_client.detect_intent(
        request={"session": session, "query_input": query_input}
    )
    
    return {
        'intent': response.query_result.intent.display_name,
        'confidence': response.query_result.intent_detection_confidence,
        'parameters': dict(response.query_result.parameters),
        'fulfillment_text': response.query_result.fulfillment_text
    }
```

## Step 8: Environment Setup

1. Create a service account in Google Cloud Console
2. Download the JSON key file
3. Set the environment variable:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/service-account-key.json"
   ```

## Tips for Hackathon

1. **Start Simple**: Begin with basic intents and add complexity gradually
2. **Test Frequently**: Use the test console to verify responses
3. **Use Fallback**: Ensure the Default Fallback Intent handles unexpected inputs
4. **Language Support**: Test both English and Tamil thoroughly
5. **Context**: Consider using follow-up intents for deeper conversations

## Common Issues

1. **Authentication**: Make sure your service account has Dialogflow API access
2. **Language Detection**: Ensure language codes match (en, ta)
3. **Entity Extraction**: Test that entities are properly captured
4. **Webhook Timeout**: Keep responses under 5 seconds

## Next Steps

1. Deploy your Flask backend to a cloud service
2. Update the webhook URL in Dialogflow
3. Test end-to-end integration
4. Add more sophisticated conversation flows
5. Implement context management for multi-turn conversations

Remember: This is an MVP for a hackathon. Focus on core functionality first, then add advanced features if time permits.

