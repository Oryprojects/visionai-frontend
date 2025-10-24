import express from 'express';
import Contact from '../models/Contact.js';
import { sendContactEmail } from '../utils/emailService.js';

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    // Send email notification using Brevo
    try {
      await sendContactEmail({ name, email, subject, message });
      console.log('Contact emails sent successfully via Brevo');
    } catch (emailError) {
      console.error('Brevo email sending failed:', emailError);
    }

    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      id: contact._id 
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ message: 'Error submitting contact form' });
  }
});

// Get all contacts (for admin purposes)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ 
      message: 'Error fetching contacts' 
    });
  }
});

// Update contact status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'in-progress', 'resolved'].includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status value' 
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ 
        message: 'Contact not found' 
      });
    }

    res.json(contact);
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({ 
      message: 'Error updating contact status' 
    });
  }
});

export default router;