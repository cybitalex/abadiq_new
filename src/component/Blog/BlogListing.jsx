import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import SEO from "../Shared/SEO/SEO";
import blogPosts from "./sampleBlogData";

const BlogListing = () => {
  // Extract all unique categories and tags for SEO
  const allCategories = [
    ...new Set(blogPosts.flatMap((post) => post.categories)),
  ];
  const allTags = [...new Set(blogPosts.flatMap((post) => post.tags))];

  return (
    <Container maxWidth="lg">
      <SEO
        title="Medical Billing & RCM Blog | ABADIQ Healthcare Insights"
        description="Explore expert insights on medical billing, coding, and revenue cycle management from ABADIQ's healthcare finance professionals."
        keywords={`medical billing blog, healthcare RCM articles, medical coding resources, ${allTags.join(
          ", "
        )}`}
        canonicalUrl="/blog"
      />

      <Box component="section" sx={{ py: 6 }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            fontWeight: 700,
            textAlign: "center",
            mb: 2,
            color: "#512da8",
          }}
        >
          Healthcare Billing Insights
        </Typography>

        <Typography
          variant="subtitle1"
          component="p"
          sx={{
            textAlign: "center",
            mb: 6,
            maxWidth: "800px",
            mx: "auto",
            color: "text.secondary",
          }}
        >
          Expert resources on medical billing, coding, and revenue cycle
          management to help healthcare providers optimize their financial
          performance.
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Popular Topics:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {allCategories.map((category, index) => (
              <Chip
                key={index}
                label={category}
                component={Link}
                to={`/blog/category/${category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                clickable
                color="primary"
                sx={{ mb: 1 }}
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ mb: 6 }} />

        <Grid container spacing={4}>
          {blogPosts.map((post) => (
            <Grid item xs={12} md={6} key={post.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
                  },
                }}
                component="article"
                itemScope
                itemType="http://schema.org/BlogPosting"
              >
                <CardActionArea
                  component={Link}
                  to={`/blog/${post.slug}`}
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                  }}
                >
                  {post.featuredImage && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={post.featuredImage}
                      alt={post.title}
                      itemProp="image"
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        mb: 1,
                      }}
                    >
                      {post.categories.slice(0, 2).map((category, idx) => (
                        <Chip
                          key={idx}
                          label={category}
                          size="small"
                          sx={{ fontSize: "0.7rem" }}
                        />
                      ))}
                    </Box>

                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      itemProp="headline"
                      sx={{
                        fontWeight: 600,
                        color: "#512da8",
                        minHeight: "4rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {post.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      <time
                        dateTime={post.publishDate.toISOString()}
                        itemProp="datePublished"
                      >
                        {post.publishDate.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      • {post.readTime} read
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      itemProp="description"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        mb: 2,
                      }}
                    >
                      {post.summary}
                    </Typography>

                    {/* Hidden Schema.org metadata */}
                    <div style={{ display: "none" }}>
                      <span
                        itemProp="author"
                        itemScope
                        itemType="https://schema.org/Person"
                      >
                        <meta itemProp="name" content={post.author.name} />
                      </span>
                      <span
                        itemProp="publisher"
                        itemScope
                        itemType="https://schema.org/Organization"
                      >
                        <meta
                          itemProp="name"
                          content="ABADIQ Medical Billing"
                        />
                      </span>
                    </div>

                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ fontWeight: 500 }}
                    >
                      Read More →
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
            Looking for specific information?
          </Typography>
          <Typography paragraph>
            Browse our articles by topic or contact us for personalized guidance
            on optimizing your medical billing and revenue cycle management.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: "center",
              mt: 3,
            }}
          >
            {allTags.slice(0, 12).map((tag, idx) => (
              <Chip
                key={idx}
                label={`#${tag}`}
                component={Link}
                to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                clickable
                variant="outlined"
                size="small"
                sx={{ mb: 1 }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default BlogListing;
