PersonaOS

An AI-powered platform for managing digital personas and generating context-aware content across multiple social platforms through a modular connector architecture.

MVP features
✅ Login

✅ Dashboard

✅ Create Persona

✅ Select Persona

✅ Reddit Connector

✅ Read Reddit Posts

✅ Generate Comment

✅ Approve Comment

✅ Post Comment

✅ History

✅ Settings


System Arch
                 Frontend

                    │

          FastAPI Backend

                    │

    ----------------------------
    Persona Service
    Prompt Engine
    Memory Service
    Connector Service
    ----------------------------

          │             │

      PostgreSQL      OpenAI

          │

      Reddit Connector
	  
	  