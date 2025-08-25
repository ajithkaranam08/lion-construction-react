import { prisma } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { status, read } = req.query;
      
      const where = {};
      if (status) where.status = status;
      if (read !== undefined) where.read = read === 'true';
      
      const contacts = await prisma.contact.findMany({
        where,
        orderBy: { createdAt: 'desc' }
      });
      
      res.status(200).json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  } else if (req.method === 'POST') {
    try {
      const contact = await prisma.contact.create({
        data: req.body
      });
      
      res.status(201).json(contact);
    } catch (error) {
      console.error('Error creating contact:', error);
      res.status(500).json({ error: 'Failed to create contact' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
