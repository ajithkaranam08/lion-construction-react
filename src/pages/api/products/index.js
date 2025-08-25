import { prisma } from '@/lib/db';

export default async function handler(req, res) {
try {

    if (req.method === 'GET') {
      try {
        const { status, category, featured } = req.query;
        
        const where = {};
        if (status) where.status = status;
        if (category) where.category = category;
        if (featured !== undefined) where.featured = featured === 'true';
        
        const products = await prisma.product.findMany({
          where,
          orderBy: { createdAt: 'desc' }
        });
        
        
        
        res.status(200).json(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
      }
    } else if (req.method === 'POST') {
      try {
        const product = await prisma.product.create({
          data: req.body
        });
        
        res.status(201).json(product);
      } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}
