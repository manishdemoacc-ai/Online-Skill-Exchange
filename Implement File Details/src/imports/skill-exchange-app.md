Develop a fully functional, production-level Online Skill Exchange Marketplace Web Application focused entirely on Indian users.

The system must support real-time multi-user interaction, persistent database storage, live online presence detection, and smooth performance without lag.

This must NOT be a static demo. It must behave like a real-time running web application.

🌍 Localization Requirements (India-Based)

Use Indian names (Praveena, Arjun, Sneha, Rahul, Divya)

Locations: Chennai, Bangalore, Mumbai, Coimbatore, Hyderabad

Timezone: IST

Skills relevant to India:

Java, Python, React

UI/UX Design

Digital Marketing

GST & Tally

UPSC Preparation

Bharatanatyam

Carnatic Music

Spoken Hindi/Tamil

👤 Default Logged-in User

The system must automatically log in:

Name: Praveena S
Location: Chennai, Tamil Nadu

Skills Offered:

UI/UX Design

Frontend Development

Skills Wanted:

Digital Marketing

Public Speaking

Dashboard must show:

“Welcome back, Praveena 👋”

🎨 UI Theme

Clean White background

Blue gradient accents (#2563EB to #1E40AF)

Rounded corners (16px)

Soft shadows

Modern SaaS layout

Smooth hover animations

Fully responsive (Desktop + Mobile)

Clean minimal UI

No clutter

Fast loading

🏠 Pages Required

Landing Page

Login / Register Page

Dashboard

Explore Skills Page

Profile Page

Real-Time Chat Page

Settings Page

All navigation buttons must work correctly.
No broken links.
No static UI elements.

🧠 Skill Matching Logic

Matching must be dynamic:

If:
User A offers Skill X
User B requests Skill X

→ They appear in match suggestions.

Dashboard must show real Indian users like:

Arjun R – Bangalore – Digital Marketing
Sneha K – Mumbai – Public Speaking

Each card must include:

View Profile (must open profile page)

Start Chat (must open chat window)

💬 REAL-TIME CHAT SYSTEM (Critical Requirement)

This must be real WebSocket-based communication.

No fake chatbot.
No static predefined replies.

When:

Praveena logs in
Arjun logs in

They must:

See each other online instantly

Green online indicator (🟢)

Be able to chat live

Messages must appear instantly

Typing indicator must work

Message timestamps in IST

Smooth scrolling

No lag

🔴 Real-Time Presence System

When a user logs in:

Their name must appear in online users list instantly.

When they logout, status must change immediately.

Must use WebSocket presence broadcasting.

💾 Persistent Storage (No Data Loss)

If page refresh:

Chat messages must reload from database.

User session must persist (JWT).

Skill listings must remain.

Online presence must reconnect automatically.

No data should disappear after refresh.

🗄 Database Structure (MongoDB)

Users

user_id

name

email

password_hash

location

skills_offered[]

skills_wanted[]

rating

Messages

message_id

sender_id

receiver_id

message

timestamp

Conversations

participants[]

last_message

updated_at

OnlineUsers

socket_id

user_id (temporary in memory)

🔄 Real-Time Data Flow

User logs in
→ Socket connection established
→ Broadcast user online event

User sends message
→ Emit socket event
→ Save message to MongoDB
→ Broadcast to receiver
→ Update UI instantly

If refresh:
→ Reconnect socket
→ Validate JWT
→ Fetch message history
→ Restore chat session

⚙ Functional Requirements

✅ All buttons must work
✅ All routing must work
✅ Real-time messaging
✅ Live online status
✅ Persistent chat storage
✅ Smooth animations
✅ No lag
✅ Automatic socket reconnection
✅ Optimistic UI updates
✅ Responsive layout
✅ PWA support

⚡ Performance Requirements

Debounced typing events

Lazy loading chat history

Efficient socket broadcasting

Minimal re-renders

Clean state management

Fast UI transitions

Everything must feel smooth and clean.

🏗 Required Tech Stack

Frontend:

React.js

Tailwind CSS

Socket.io Client

React Router

Context API / Redux

Backend:

Node.js

Express.js

Socket.io Server

JWT Authentication

bcrypt password hashing

Database:

MongoDB

Deployment ready.

🧾 Extra Features

Rating system (⭐ 4.5)

Skill tag badges

Online/offline indicator

Clean blue theme

Smooth transitions

No static placeholders

Real working system simulation