# Thunai MVP - Mental Health Companion

A suicide prevention chatbot MVP designed for a 12-hour hackathon. Thunai serves as an empathetic first responder and intelligent resource navigator for individuals in acute mental distress in Tamil Nadu, India.

## 🎯 Project Overview

**Thunai** (துணை) means "companion" in Tamil. This chatbot is designed to:

1. **Triage**: Quickly identify the user's primary stressor
2. **De-escalate**: Provide immediate psychological first aid
3. **Navigate**: Connect users to appropriate mental health resources in Tamil Nadu

## 🏗️ Architecture

- **Frontend**: React.js with Material-UI
- **Backend**: Python Flask with SQLite
- **Chatbot Engine**: Google Dialogflow (setup guide included)
- **Database**: SQLite with mental health resources
- **Languages**: Bilingual support (English & Tamil)

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd thunai-mvp/backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask application:
   ```bash
   python app.py
   ```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd thunai-mvp/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
thunai-mvp/
├── backend/
│   ├── app.py                 # Flask application
│   ├── database.py           # Database operations
│   ├── dialogflow_handler.py # Dialogflow integration
│   ├── schema.sql            # Database schema
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.js
│   │   │   ├── MessageBubble.js
│   │   │   ├── InputBar.js
│   │   │   └── TriageButtons.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── dialogflow_setup_guide.md
└── README.md
```

## 🔧 Features

### Backend Features
- RESTful API with Flask
- SQLite database with mental health resources
- CORS enabled for frontend communication
- Simple triage logic for MVP
- Dialogflow integration placeholder

### Frontend Features
- Modern React UI with Material-UI
- Real-time chat interface
- Triage button selection
- Bilingual support preparation
- Responsive design

### Database Schema
The `resources` table includes:
- Resource name and contact information
- Operating hours and specialization
- Language support tags
- Geographic location (city)

## 🧠 Mental Health Resources

The MVP includes sample resources for Tamil Nadu:
- **Tele MANAS**: 24/7 helpline (14416)
- **Sneha Foundation**: Chennai-based support
- **iCall Psychosocial Helpline**: Mumbai-based
- **Vandrevala Foundation**: 24/7 support
- **Chennai Rape Crisis Centre**: Specialized support

## 🔌 API Endpoints

### POST /api/chat
Send a message to the chatbot
```json
{
  "message": "I'm stressed about exams",
  "session_id": "user123",
  "language": "en"
}
```

### GET /api/health
Health check endpoint

## 🌐 Dialogflow Integration

See `dialogflow_setup_guide.md` for detailed instructions on:
- Creating a Dialogflow agent
- Setting up intents and entities
- Configuring bilingual support
- Webhook integration

## 🎨 UI Components

### ChatWindow
Main chat interface managing conversation state

### MessageBubble
Individual message display with user/bot styling

### InputBar
Text input with send functionality

### TriageButtons
Initial triage selection interface

## 🚧 MVP Limitations

This is a hackathon MVP with the following limitations:
- Simplified triage logic (keyword-based)
- Mock Dialogflow integration
- Basic resource matching
- Limited conversation context

## 🔮 Future Enhancements

- Full Dialogflow integration
- Advanced NLP for better triage
- Multi-turn conversation support
- Real-time resource availability
- Analytics and reporting
- Mobile app development

## 👥 Team Development

### For the 4-person hackathon team:

1. **Frontend Developer**: Focus on React components and UI/UX
2. **Backend Developer**: Flask API and database integration
3. **AI/NLP Developer**: Dialogflow setup and conversation logic
4. **DevOps/Integration**: Deployment and end-to-end testing

### Suggested Workflow:
1. Set up development environment
2. Configure Dialogflow (see guide)
3. Implement basic chat functionality
4. Add resource matching logic
5. Test bilingual support
6. Deploy and demo

## 📞 Emergency Resources

**Important**: This is an MVP for demonstration purposes. For real mental health emergencies, users should contact:

- **Tele MANAS**: 14416 (24/7)
- **Sneha Foundation**: +91-44-24640050
- **National Suicide Prevention Helpline**: 9152987821

## 📄 License

This project is created for hackathon purposes. Please ensure compliance with local regulations regarding mental health services.

## 🤝 Contributing

This is a hackathon project. For production use, please:
- Add proper error handling
- Implement security measures
- Add comprehensive testing
- Follow mental health service guidelines
- Ensure proper data privacy compliance

---

**Remember**: Thunai is a companion, not a replacement for professional mental health care. Always encourage users to seek professional help when needed.

