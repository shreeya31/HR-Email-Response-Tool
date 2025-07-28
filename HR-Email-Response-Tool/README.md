# Simple HR Email Response Tool

### Task Title
Build a Simple HR Candidate Email Response Tool

### Task Description
Create a simple web application that helps HR send email responses to job candidates. The application should allow users to input candidate details, select their status (Selected/Rejected), and send appropriate email responses using predefined templates.

### Technical Requirements
- Frontend: HTML, CSS, and JavaScript
- Backend: Any language of choice (PHP, Python, Node.js, etc.)
- Simple form handling
- Email sending functionality
- No database required (use predefined templates in code)

### Steps to Complete

1. **Create the Form Interface**
   - Create a simple form with:
     - Radio buttons for status (Selected/Rejected)
     - Input field for candidate name
     - Input field for candidate email
     - Input field for position applied
   - Add basic form validation

2. **Set Up Email Templates**
   - Create two simple email templates in your code:
     - Selection email template
     - Rejection email template
   - Templates should include placeholders for candidate name and position

3. **Implement Email Functionality**
   - Set up email sending functionality using your chosen backend language
   - Replace template placeholders with form data
   - Add a preview before sending
   - Implement the send functionality

4. **Add Basic Styling**
   - Make the form look clean and professional
   - Add success/error messages
   - Make it mobile-responsive

### Example Templates

**Selection Template:**
```
Dear [Candidate Name],

We are pleased to inform you that you have been selected for the position of [Position].

Please reply to this email to confirm your acceptance.

Best regards,
HR Team
```

**Rejection Template:**
```
Dear [Candidate Name],

Thank you for applying for the position of [Position].

We regret to inform you that we have decided to move forward with other candidates.

Best regards,
HR Team
```

### Notes
- Keep the code simple and well-organized
- Focus on making the tool functional rather than fancy
- Use proper error handling for email sending
- Test the email functionality thoroughly
- Comment your code appropriately

### Submission Requirements
- Source code uploaded to GitHub
- README file with:
  - Setup instructions
  - How to configure email settings
  - How to run the application

### Time Estimate
- Estimated completion time: 2-3 hours

### Technical Tips
- Use a simple email library/function in your chosen language
- Store email templates as constants/variables
- Keep styling simple but professional
- Test with different email providers
