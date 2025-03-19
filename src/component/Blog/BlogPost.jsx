import React from "react";
import {
  Box,
  Typography,
  Container,
  Divider,
  Chip,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import SEO from "../Shared/SEO/SEO";

const BlogPost = ({
  post = {
    id: 1,
    title: "",
    slug: "",
    summary: "",
    content: "",
    publishDate: new Date(),
    author: {
      name: "",
      avatar: "",
      bio: "",
    },
    categories: [],
    tags: [],
    featuredImage: "",
    readTime: "",
  },
}) => {
  return (
    <Container
      maxWidth="md"
      component="article"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <SEO
        title={`${post.title} | ABADIQ Medical Billing Blog`}
        description={post.summary}
        keywords={post.tags.join(", ")}
        canonicalUrl={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.featuredImage}
      />

      {/* Hidden Schema.org metadata */}
      <div style={{ display: "none" }}>
        <span
          itemProp="publisher"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <span itemProp="name">ABADIQ Medical Billing</span>
          <span
            itemProp="logo"
            itemScope
            itemType="https://schema.org/ImageObject"
          >
            <meta itemProp="url" content="https://abadiq.com/logo.png" />
          </span>
        </span>
        <meta
          itemProp="datePublished"
          content={post.publishDate.toISOString()}
        />
        <meta
          itemProp="mainEntityOfPage"
          content={`https://abadiq.com/blog/${post.slug}`}
        />
      </div>

      <Box component="header" sx={{ mb: 4, mt: 4 }}>
        <Typography
          variant="h1"
          component="h1"
          itemProp="headline"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: 700,
            mb: 2,
            color: "#512da8",
          }}
        >
          {post.title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            src={post.author.avatar}
            alt={post.author.name}
            sx={{ mr: 2 }}
          />
          <Box>
            <Typography
              variant="subtitle1"
              component="span"
              itemProp="author"
              itemScope
              itemType="https://schema.org/Person"
            >
              By <span itemProp="name">{post.author.name}</span>
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
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
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
          {post.categories.map((category, idx) => (
            <Chip
              key={idx}
              label={category}
              color="primary"
              component={Link}
              to={`/blog/category/${category
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              clickable
              size="small"
              sx={{ mb: 1 }}
            />
          ))}
        </Box>

        {post.featuredImage && (
          <Box
            component="figure"
            sx={{
              margin: 0,
              mb: 3,
              width: "100%",
              borderRadius: 2,
              overflow: "hidden",
              height: { xs: "200px", md: "400px" },
            }}
          >
            <Box
              component="img"
              itemProp="image"
              src={post.featuredImage}
              alt={post.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        )}

        <Typography
          variant="subtitle1"
          component="div"
          itemProp="description"
          sx={{
            fontSize: "1.25rem",
            fontWeight: 500,
            mb: 3,
            fontStyle: "italic",
            color: "text.secondary",
          }}
        >
          {post.summary}
        </Typography>

        <Divider />
      </Box>

      <Box
        component="div"
        itemProp="articleBody"
        sx={{
          "& p": {
            mb: 2,
            lineHeight: 1.8,
          },
          "& h2": {
            mt: 4,
            mb: 2,
            color: "#512da8",
          },
          "& h3": {
            mt: 3,
            mb: 2,
            color: "#512da8",
          },
          "& ul, & ol": {
            ml: 3,
            mb: 2,
          },
          "& li": {
            mb: 1,
          },
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 1 }}>
        {post.tags.map((tag, idx) => (
          <Chip
            key={idx}
            label={`#${tag}`}
            size="small"
            variant="outlined"
            component={Link}
            to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
            clickable
          />
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box
        component="section"
        sx={{
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
          About the Author
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Avatar
            src={post.author.avatar}
            alt={post.author.name}
            sx={{ width: 80, height: 80 }}
          />

          <Box>
            <Typography variant="h6" component="h4">
              {post.author.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {post.author.bio}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 4 }}
      >
        For more information about medical billing and healthcare revenue cycle
        management, visit our <Link to="/services">services</Link> page or{" "}
        <Link to="/contact">contact us</Link>.
      </Typography>
    </Container>
  );
};

export default BlogPost;
