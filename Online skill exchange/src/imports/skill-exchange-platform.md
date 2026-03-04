Create a fully functional Online Skill Exchange Platform web application designed for users in India to share skills, learn from others, and collaborate. The system must allow users to create accounts, log in, list skills they can teach, request skills they want to learn, and communicate through a chat system.

The application must be fully interactive and not just a UI prototype. All buttons, forms, and navigation must work correctly. User data must be stored in the database so that changes remain saved even after page refresh.

Core Requirements

The system must support the following:

• User registration and login
• Username creation and profile management
• Skill listing and skill requests
• Skill exchange matching
• Real-time chat system
• Persistent user data
• Custom themes including white-blue theme and dark-light theme
• Fully responsive design

All buttons must work properly, and all updates must be saved instantly.

Authentication System

Implement a complete registration and login system.

Users must be able to:

• Register a new account
• Create a username
• Enter email and password
• Login using the same credentials
• Logout securely

Important requirements:

• After registration, users must be able to login using the entered details
• Login must validate credentials from the database
• Invalid login attempts must show error messages
• After login, users must be redirected to their dashboard

Default demo user:

Username: Praveena

Example Indian usernames for demo accounts:

• Rishi Prakash
• Shiny
• Aji Sharmila
• Bagyalakshmi

Dashboard

After login, users should see a personalized dashboard displaying:

• Welcome message with username
• Skills they offer
• Skills they want to learn
• Suggested skill exchange matches
• Recent messages
• Quick action buttons

The dashboard must update dynamically when users add or change skills.

Skill Exchange Module

Users must be able to:

• Add skills they can teach
• Add skills they want to learn
• Edit skills
• Delete skills
• Browse other users' skills

The system should suggest possible skill exchanges between users.

Example:

User A teaches Python and wants Graphic Design
User B teaches Graphic Design and wants Python

The system suggests collaboration.

User Profiles

Each user profile must display:

• Username
• Skills offered
• Skills requested
• Short bio
• Option to connect or message

Users must be able to edit their profile details.

Chat System

Implement a real-time chat system similar to a campus networking platform.

Chat features must include:

• One-to-one messaging
• Send and receive messages instantly
• Message timestamps
• Chat history
• Notification for new messages

Users must be able to chat with other users for collaboration.

Theme System

Implement two types of themes:

White-Blue Theme (Default)

Clean modern interface using white background with blue highlights.

Dark Mode Theme

Dark background with modern UI elements.

Users must be able to toggle between:

• White-blue theme
• Dark mode theme

Theme preference must be saved for each user.

User Interface Requirements

The interface must be modern and clean.

Design requirements:

• Card-based layout
• Rounded UI components
• Soft shadows
• Smooth hover animations
• Responsive grid layouts
• Fully responsive for desktop, tablet, and mobile devices

Navigation bar must include:

• Dashboard
• Skills
• Messages
• Profile
• Logout

Frontend Technologies

Build the frontend using modern technologies:

• React.js
• Vite
• Tailwind CSS
• React Router

Reusable components must include:

• Navbar
• Skill cards
• Profile cards
• Chat interface
• Dashboard widgets

Backend Technologies

Implement a backend for data management.

Recommended stack:

• Node.js
• Express.js
• MongoDB database
• Socket.io for real-time chat

Backend must manage:

• User accounts
• Skills database
• Messages
• Skill exchange requests

Database Structure

Users collection
• username
• email
• password
• profile bio
• theme preference

Skills collection
• skill name
• skill type (teach or learn)
• user ID

Messages collection
• sender
• receiver
• message content
• timestamp

Data Persistence

All user actions must remain saved including:

• user accounts
• skills listed
• chat messages
• profile updates
• theme preferences

Data must remain stored after refresh or logout.

Performance Requirements

The application must provide:

• fast page loading
• smooth UI interactions
• efficient database queries
• real-time messaging without lag

Final Goal

Create a professional Online Skill Exchange Platform where users can share knowledge, learn new skills, and collaborate through messaging.

The final application must look modern, interactive, and suitable for a final year project demonstration with working login, skill matching, chat system, and persistent database storage.