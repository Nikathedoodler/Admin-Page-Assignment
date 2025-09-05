# Project Scope: Simple Admin Page

## Overview

Build a React.js admin page with authentication, two main sections (Captions and Countries), and responsive design.

## Technical Requirements

-   **Framework**: React.js
-   **Styling**: No restrictions (choose preferred approach)
-   **Responsive**: Must work on different screen sizes
-   **Deadline**: 4 days
-   **Submission**: GitHub repository or ZIP file

## Project Structure

### Authentication System

-   **API**: `https://app.swaggerhub.com/apis-docs/goodwell/my-external_api/1.0.0`
-   **Method**: JWT token-based authentication
-   **Flow**: Registration → Login → Redirect to Captions page
-   **UI Requirements**:
    -   Display logged-in user's name
    -   Provide logout option

### Page 1: Captions Management

**API**: `https://app.swaggerhub.com/apis-docs/goodwell/my-external_api/1.0.0`

**Features**:

-   **Input Section**:

    -   First input: Key field (e.g., "page.captions.title")
    -   Second input: Property field (e.g., "Captions")
    -   Submit button (calls AddWord method)

-   **Data Table**:

    -   Display GetAllWords data
    -   Columns: key, property
    -   Actions per row: Edit, Delete buttons

-   **Edit Functionality**:
    -   Popup modal with pre-filled values
    -   Save changes capability
    -   Dynamic table updates after operations

### Page 2: Countries Data

**API**: `https://restcountries.com/v3.1/all`

**Features**:

-   **Data Table**:

    -   Columns: Region, Country, Capital, Currency, Language
    -   Pagination: Max 15 rows per page

-   **Filtering System**:
    -   Checkbox: "Independent" (filter by independent field)
    -   Dropdown: Currency selection (USD, EUR options)
    -   Dynamic table updates based on filters

## Implementation Approach

### Phase 1: Project Setup ✅

-   Initialize React project
-   Set up routing (React Router)
-   Configure API integration
-   Basic styling setup

### Phase 2: Authentication

-   Create login/register forms
-   Implement JWT token handling
-   Set up protected routes
-   User session management

### Phase 3: Captions Page

-   Build input form for adding captions
-   Implement data table with CRUD operations
-   Create edit modal popup
-   Handle API integration for all operations

### Phase 4: Countries Page

-   Fetch and display countries data
-   Implement pagination logic
-   Build filtering system
-   Handle independent/currency filters

### Phase 5: Polish & Testing

-   Responsive design implementation
-   Error handling
-   Loading states
-   Final testing across devices

## Development Approach

### Collaborative Development

-   **Interview Context**: This project is for a potential employer interview
-   **Participation Required**: Developer must actively participate in coding to understand and explain the implementation
-   **Code Style**: Should look like it was written by a middle-level React developer
-   **Natural Variations**: Include some inconsistencies and human-like coding patterns
-   **Functionality First**: Focus on working features over perfect code structure

### Development Process

-   **Planning Phase**: Discuss approach and architecture decisions together
-   **Implementation**: Collaborative coding with explanations for each component
-   **Code Review**: Walk through each feature to ensure understanding
-   **Documentation**: Add comments and structure that can be explained during interview

## Key Considerations

-   Make it look human-coded (not AI-generated)
-   Avoid overly professional/clean appearance
-   Focus on functionality over perfect design
-   Ensure all API endpoints work correctly
-   Handle edge cases and error states
-   **Interview Ready**: Code should be explainable and demonstrate React knowledge
