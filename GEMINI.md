Project: Smart Overlap Scheduler - MVP Context
This GEMINI.md file serves as the primary and persistent context for the Gemini AI agent working on the "Smart Overlap Scheduler" web application. Its purpose is to ensure consistent understanding of the project's goals, scope, and technical conventions across all interactions.

1. Project Overview
   Goal: To develop a minimalist, intuitive web application that allows users to manually manage and visually discover optimal overlapping availability windows for themselves and their contacts across various time zones.

Core Problem Solved (MVP): Eliminating the manual mental arithmetic and back-and-forth communication required to find suitable times for international conversations, meetings, or social calls, purely based on declared availability.

2. Minimum Viable Product (MVP) Scope
   The MVP focuses on delivering the absolute core value proposition with the fewest external dependencies.

2.1. Key Functionality:
Self-Defined Availability: Users can set their own current time zone and define their typical daily/weekly availability (e.g., "Monday-Friday, 9 AM to 5 PM").

Manual Contact Management: Users can add multiple contacts by name, assign each a specific time zone, and define their typical availability, similar to their own.

Interactive Overlap Grid: A central visual grid displays a span of days (e.g., a week) with time slots. Each row represents a person/time zone, and the grid cells are color-coded to indicate periods of mutual availability.

Color Key:

Green: All selected individuals are available.

Yellow: A majority of selected individuals are available.

Grey/Red: Few to none of the selected individuals are available.

"Propose Time" Feature: Users can click on any grid cell to generate a clear, copyable text snippet showing the selected time translated into the local time for all participating individuals.

Client-Side Persistence: All user data (configured time zones, availability, contact list) will be stored directly in the browser's Local Storage to ensure data persists across sessions without a backend.

2.2. Deliberately Excluded from MVP (for future phases):
NO External Calendar API Integrations: This MVP will explicitly not connect to Google Calendar, Outlook Calendar, or any other external scheduling APIs. All availability data is user-input.

NO Backend/Database: The application will be purely client-side, relying solely on Local Storage.

NO User Accounts/Authentication: No login or user management system will be implemented.

NO Advanced Event Overlays: Features like real-time financial market hours, public holidays, or sports schedules will not be included.

NO Meeting Invitation/Polling Tools: The "propose time" is a simple text output.

3. Technical Stack & Conventions
   Frontend Framework: React (using Vite for project setup and development).

Language: JavaScript (ES6+).

Styling: Simple CSS Modules for component-level styling, augmented by a global src/index.css for app-wide defaults. Avoid external UI component libraries like Material-UI or Ant Design in this phase.

Time Zone Handling: luxon library for all date, time, and time zone calculations to ensure accuracy and simplify manipulation.

Folder Structure (src/):

components/: Reusable React components (e.g., TimeZoneSelect, AvailabilityInput, ContactManager, OverlapGrid, TimeProposerModal).

utils/: Helper functions (e.g., time zone conversion logic, local storage helpers).

styles/: Global CSS.

hooks/: (Optional, if custom hooks become necessary)

Code Quality: Prioritize clean, readable, modular code with appropriate comments for complex logic.

4. Gemini AI Interaction Directives
   Refer to this GEMINI.md: Always use this document as the primary source of truth for project scope and technical decisions.

Task-Oriented Output: Provide code and explanations for one checklist item at a time.

Actionable Commands: When creating/modifying files, suggest the use of Gemini CLI tools (e.g., write-file <filepath> <content>). For shell commands, use the ! prefix (e.g., !npm install).

Maintain Checklist: Crucially, update the provided checklist at the start of each response.

Clarification First: If an instruction is ambiguous or requires more detail, ask clarifying questions before proceeding with code generation.

Focus on the MVP: Resist the urge to add features outside the defined MVP scope unless explicitly requested and approved.
