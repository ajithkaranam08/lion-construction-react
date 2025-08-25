const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');
  
  try {
    // Create a default admin user
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@lionconstruction.com',
        name: 'Admin User',
        role: 'ADMIN',
        password: 'admin123' // In production, this should be hashed
      }
    });
    console.log('Admin user created:', adminUser.email);

    // Create sample construction projects
    const constructionProjects = await Promise.all([
      prisma.project.create({
        data: {
          title: 'Modern Residential Complex',
          description: 'A state-of-the-art residential complex featuring modern amenities and sustainable design.',
          shortDescription: 'Modern residential complex with sustainable design',
          category: 'Residential',
          status: 'IN_PROGRESS',
          featured: true,
          images: ['/img/projects/residential-1.jpg', '/img/projects/residential-2.jpg'],
          location: 'Chennai, Tamil Nadu',
          area: '50,000 sq ft',
          client: 'ABC Developers',
          startDate: new Date('2024-01-15'),
          endDate: new Date('2024-12-31'),
          budget: 25000000,
          tags: ['residential', 'modern', 'sustainable']
        }
      }),
      prisma.project.create({
        data: {
          title: 'Commercial Office Tower',
          description: 'A premium office tower designed for modern businesses with advanced facilities.',
          shortDescription: 'Premium office tower for modern businesses',
          category: 'Commercial',
          status: 'COMPLETED',
          featured: true,
          images: ['/img/projects/commercial-1.jpg', '/img/projects/commercial-2.jpg'],
          location: 'Chennai, Tamil Nadu',
          area: '75,000 sq ft',
          client: 'XYZ Corporation',
          startDate: new Date('2023-06-01'),
          endDate: new Date('2024-05-31'),
          budget: 45000000,
          tags: ['commercial', 'office', 'premium']
        }
      }),
      prisma.project.create({
        data: {
          title: 'Interior Design Project',
          description: 'Complete interior renovation and design for a luxury apartment.',
          shortDescription: 'Luxury apartment interior renovation',
          category: 'Interior Design',
          status: 'COMPLETED',
          featured: false,
          images: ['/img/projects/interior-1.jpg', '/img/projects/interior-2.jpg'],
          location: 'Chennai, Tamil Nadu',
          area: '2,500 sq ft',
          client: 'Private Client',
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-04-30'),
          budget: 3500000,
          tags: ['interior', 'renovation', 'luxury']
        }
      }),
      prisma.project.create({
        data: {
          title: 'Infrastructure Development',
          description: 'Road and bridge construction project connecting major districts.',
          shortDescription: 'Critical infrastructure connecting communities',
          category: 'Infrastructure',
          status: 'IN_PROGRESS',
          featured: false,
          images: ['/img/projects/infrastructure-1.jpg'],
          location: 'Chennai Metropolitan Area',
          area: '15 km',
          client: 'Government of Tamil Nadu',
          startDate: new Date('2024-03-01'),
          endDate: new Date('2025-02-28'),
          budget: 75000000,
          tags: ['infrastructure', 'roads', 'bridges']
        }
      }),
      prisma.project.create({
        data: {
          title: 'Sustainable Green Building',
          description: 'Eco-friendly commercial building with solar panels and rainwater harvesting.',
          shortDescription: 'Eco-friendly commercial building',
          category: 'Sustainability',
          status: 'COMPLETED',
          featured: true,
          images: ['/img/projects/green-building-1.jpg'],
          location: 'Chennai, Tamil Nadu',
          area: '25,000 sq ft',
          client: 'Green Tech Solutions',
          startDate: new Date('2023-09-01'),
          endDate: new Date('2024-08-31'),
          budget: 35000000,
          tags: ['sustainable', 'green', 'commercial', 'eco-friendly']
        }
      })
    ]);
    console.log(`${constructionProjects.length} construction projects created`);

    // Create sample blog posts
    const blogPosts = await Promise.all([
      prisma.blogPost.create({
        data: {
          title: 'Construction Best Practices 2024',
          slug: 'construction-best-practices-2024',
          content: 'Learn about the latest best practices in modern construction, including sustainable building methods and innovative technologies. This comprehensive guide covers everything from foundation work to finishing touches.',
          excerpt: 'Learn about the latest best practices in modern construction, including sustainable building methods and innovative technologies.',
          status: 'PUBLISHED',
          category: 'Construction',
          tags: ['construction', 'best-practices', '2024', 'sustainable'],
          authorId: adminUser.id,
          featuredImage: '/img/blog/construction.jpg',
          metaDescription: 'Discover the latest construction best practices for 2024',
          seoTitle: 'Construction Best Practices 2024 - Lion Construction',
          publishedAt: new Date(),
          views: 150
        }
      }),
      prisma.blogPost.create({
        data: {
          title: 'Interior Design Trends for Modern Homes',
          slug: 'interior-design-trends-modern-homes',
          content: 'Explore the latest interior design trends that are transforming modern homes in 2024. From minimalist aesthetics to sustainable materials, discover what\'s hot in home design.',
          excerpt: 'Explore the latest interior design trends that are transforming modern homes in 2024.',
          status: 'PUBLISHED',
          category: 'Interior Design',
          tags: ['interior-design', 'trends', 'modern-homes', '2024'],
          authorId: adminUser.id,
          featuredImage: '/img/blog/interior-design.jpg',
          metaDescription: 'Latest interior design trends for modern homes in 2024',
          seoTitle: 'Interior Design Trends 2024 - Lion Construction',
          publishedAt: new Date(),
          views: 89
        }
      }),
      prisma.blogPost.create({
        data: {
          title: 'Sustainable Building Materials Guide',
          slug: 'sustainable-building-materials-guide',
          content: 'A comprehensive guide to sustainable building materials that are eco-friendly, durable, and cost-effective. Learn about bamboo, recycled steel, and other green alternatives.',
          excerpt: 'A comprehensive guide to sustainable building materials that are eco-friendly and cost-effective.',
          status: 'DRAFT',
          category: 'Sustainability',
          tags: ['sustainability', 'building-materials', 'eco-friendly', 'green'],
          authorId: adminUser.id,
          featuredImage: '/img/blog/sustainable-materials.jpg',
          metaDescription: 'Guide to sustainable building materials for eco-friendly construction',
          seoTitle: 'Sustainable Building Materials Guide - Lion Construction'
        }
      })
    ]);
    console.log(`${blogPosts.length} blog posts created`);

    // Create sample contacts
    const contacts = await Promise.all([
      prisma.contact.create({
        data: {
          name: 'John Smith',
          email: 'john.smith@example.com',
          phone: '+91 98765 43210',
          subject: 'Residential Project Inquiry',
          message: 'I am interested in building a residential house in Chennai. Please provide more information about your services and pricing.',
          status: 'NEW'
        }
      }),
      prisma.contact.create({
        data: {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@company.com',
          phone: '+91 87654 32109',
          subject: 'Commercial Project Consultation',
          message: 'We are planning to construct a commercial building and would like to discuss the project with your team.',
          status: 'IN_PROGRESS'
        }
      }),
      prisma.contact.create({
        data: {
          name: 'Mike Wilson',
          email: 'mike.wilson@email.com',
          phone: '+91 76543 21098',
          subject: 'Interior Design Services',
          message: 'Looking for interior design services for my new apartment. Please share your portfolio and pricing.',
          status: 'RESPONDED'
        }
      })
    ]);
    console.log(`${contacts.length} contacts created`);

    // Create sample SEO entries
    const seoEntries = await Promise.all([
      prisma.sEO.create({
        data: {
          page: 'home',
          title: 'Lion Construction - Premier Construction Company in Chennai',
          description: 'Lion Construction is a leading construction company in Chennai, specializing in residential, commercial, and interior design projects.',
          keywords: ['construction', 'Chennai', 'residential', 'commercial', 'interior design'],
          ogImage: '/img/logo.png',
          canonical: 'https://lionconstruction.com'
        }
      }),
      prisma.sEO.create({
        data: {
          page: 'about',
          title: 'About Us - Lion Construction | Leading Builder in Chennai',
          description: 'Learn about Lion Construction, a premier construction company in Chennai with over 23 years of experience in building excellence.',
          keywords: ['about', 'construction company', 'Chennai', 'experience', 'excellence'],
          ogImage: '/img/about/construction-ceo.jpg',
          canonical: 'https://lionconstruction.com/about'
        }
      }),
      prisma.sEO.create({
        data: {
          page: 'services',
          title: 'Our Services - Construction, Interior Design & Real Estate | Lion Construction',
          description: 'Comprehensive construction services including residential, commercial, interior design, and real estate solutions in Chennai.',
          keywords: ['services', 'construction', 'interior design', 'real estate', 'Chennai'],
          ogImage: '/img/services/construction-services.jpg',
          canonical: 'https://lionconstruction.com/services'
        }
      })
    ]);
    console.log(`${seoEntries.length} SEO entries created`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nCreated:');
    console.log('- 1 Admin User');
    console.log('- 5 Construction Projects');
    console.log('- 3 Blog Posts');
    console.log('- 3 Contacts');
    console.log('- 3 SEO Entries');
    console.log('\n🎉 Your database is now populated with sample data!');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
