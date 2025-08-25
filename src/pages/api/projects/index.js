import { prisma } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { status, category, featured } = req.query;
      
      const where = {};
      if (status) where.status = status;
      if (category) where.category = category;
      if (featured !== undefined) where.featured = featured === 'true';
      
      const projects = await prisma.project.findMany({
        where,
        orderBy: { createdAt: 'desc' }
      });
      
      res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  } else if (req.method === 'POST') {
    try {
      const project = await prisma.project.create({
        data: req.body
      });
      
      res.status(201).json(project);
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
