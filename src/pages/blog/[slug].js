import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { FaArrowLeft, FaCalendar, FaUser, FaEye, FaTag } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import LayoutTwo from '@/layouts/LayoutTwo';

const BlogPostDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      loadBlogPost();
    }
  }, [slug]);

  const loadBlogPost = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First, get all blog posts to find the one with matching slug
      const response = await fetch('/api/blog?status=PUBLISHED');
      if (response.ok) {
        const allPosts = await response.json();
        const currentPost = allPosts.find(p => p.slug === slug);
        
        if (currentPost) {
          setPost(currentPost);
          
          // Get related posts (same category, excluding current post)
          const related = allPosts
            .filter(p => p.id !== currentPost.id && p.category === currentPost.category)
            .slice(0, 3);
          setRelatedPosts(related);
          
          // Increment view count
          incrementViewCount(currentPost.id);
        } else {
          setError('Blog post not found');
        }
      } else {
        throw new Error('Failed to fetch blog posts');
      }
    } catch (error) {
      console.error('Error loading blog post:', error);
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const incrementViewCount = async (postId) => {
    try {
      await fetch(`/api/blog/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          views: (post.views || 0) + 1
        }),
      });
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <LayoutTwo>
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading blog post...</p>
          </div>
        </div>
      </LayoutTwo>
    );
  }

  if (error || !post) {
    return (
      <LayoutTwo>
        <div className="container py-5">
          <div className="text-center">
            <h2>Blog Post Not Found</h2>
            <p className="text-muted mb-4">
              {error || 'The blog post you are looking for does not exist.'}
            </p>
            <Button variant="primary" onClick={() => router.push('/blog')}>
              <FaArrowLeft className="me-2" />
              Back to Blog
            </Button>
          </div>
        </div>
      </LayoutTwo>
    );
  }

  return (
    <LayoutTwo>
      <div className="ltn__blog-area pt-120 pb-70">
        <Container>
          {/* Back Button */}
          <Row className="mb-4">
            <Col xs={12}>
              <Button 
                variant="outline-secondary" 
                onClick={() => router.push('/blog')}
                className="mb-4"
              >
                <FaArrowLeft className="me-2" />
                Back to Blog
              </Button>
            </Col>
          </Row>

          {/* Blog Post Content */}
          <Row>
            <Col lg={8}>
              <article className="blog-post-detail">
                {/* Post Header */}
                <header className="mb-4">
                  <div className="mb-3">
                    <Badge bg="primary" className="me-2">
                      {post.category}
                    </Badge>
                    <small className="text-muted">
                      <FaCalendar className="me-1" />
                      {formatDate(post.publishedAt || post.createdAt)}
                    </small>
                  </div>
                  
                  <h1 className="h2 mb-3">{post.title}</h1>
                  
                  <div className="d-flex align-items-center text-muted mb-4">
                    <FaUser className="me-2" />
                    <span className="me-3">{post.author?.name || 'Admin'}</span>
                    <FaEye className="me-2" />
                    <span>{post.views || 0} views</span>
                  </div>
                </header>

                {/* Featured Image */}
                {post.featuredImage && (
                  <div className="blog-featured-image mb-4">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      width={800}
                      height={400}
                      className="img-fluid rounded"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}

                {/* Post Content */}
                <div className="blog-content mb-5">
                  {post.excerpt && (
                    <div className="lead mb-4">
                      <p>{post.excerpt}</p>
                    </div>
                  )}
                  
                  <div className="content-body">
                    {post.content.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-3">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="blog-tags mb-4">
                    <h6 className="mb-3">
                      <FaTag className="me-2" />
                      Tags:
                    </h6>
                    <div className="d-flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} bg="light" text="dark" className="px-3 py-2">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Meta Information */}
                {post.metaDescription && (
                  <div className="blog-meta bg-light p-3 rounded mb-4">
                    <h6>Meta Description:</h6>
                    <p className="mb-0 text-muted">{post.metaDescription}</p>
                  </div>
                )}
              </article>
            </Col>

            {/* Sidebar */}
            <Col lg={4}>
              <div className="blog-sidebar">
                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <Card className="mb-4">
                    <Card.Header>
                      <h5 className="mb-0">Related Posts</h5>
                    </Card.Header>
                    <Card.Body>
                      {relatedPosts.map((relatedPost) => (
                        <div key={relatedPost.id} className="related-post mb-3 pb-3 border-bottom">
                          <h6 className="h6 mb-2">
                            <Link 
                              href={`/blog/${relatedPost.slug}`}
                              className="text-decoration-none"
                            >
                              {relatedPost.title}
                            </Link>
                          </h6>
                          <small className="text-muted">
                            {formatDate(relatedPost.publishedAt || relatedPost.createdAt)}
                          </small>
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                )}

                {/* Blog Info */}
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">Blog Information</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Category:</span>
                      <Badge bg="primary">{post.category}</Badge>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Status:</span>
                      <Badge bg="success">{post.status}</Badge>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Created:</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    {post.publishedAt && (
                      <div className="d-flex justify-content-between mb-2">
                        <span>Published:</span>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    )}
                    <div className="d-flex justify-content-between">
                      <span>Views:</span>
                      <span>{post.views || 0}</span>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutTwo>
  );
};

export default BlogPostDetail;

