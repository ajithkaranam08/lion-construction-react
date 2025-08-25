import { prisma } from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const contact = await prisma.contact.findUnique({
        where: { id }
      });
      
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      
      res.status(200).json(contact);
    } catch (error) {
      console.error('Error fetching contact:', error);
      res.status(500).json({ error: 'Failed to fetch contact' });
    }
  } else if (req.method === 'PUT') {
    try {
      const contact = await prisma.contact.update({
        where: { id },
        data: req.body
      });
      
      res.status(200).json(contact);
    } catch (error) {
      console.error('Error updating contact:', error);
      res.status(500).json({ error: 'Failed to update contact' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.contact.delete({
        where: { id }
      });
      
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting contact:', error);
      res.status(500).json({ error: 'Failed to delete contact' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
