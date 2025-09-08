/**
 * Sanity Integration Configuration
 * 
 * This file provides a proper initialization of the Sanity client
 * to connect with your Sanity.io backend.
 */

// Initialize the Sanity client
function createSanityClient() {
  // Check if the sanityClient global is available
  if (typeof sanityClient === 'undefined') {
    console.error('Sanity client library not loaded');
    return null;
  }

  // Create and return the configured client
  try {
    return sanityClient({
      projectId: "uj000ju6",
      dataset: "production",
      apiVersion: "2025-01-07", 
      useCdn: true
    });
  } catch (error) {
    console.error('Error creating Sanity client:', error);
    return null;
  }
}

// Utility function to fetch projects
async function fetchProjects() {
  const client = createSanityClient();
  
  if (!client) {
    console.error('Sanity client not available');
    return [];
  }
  
  try {
    return await client.fetch(`
      *[_type == "project"] | order(_createdAt desc) {
        _id,
        title,
        description,
        category,
        date,
        image{
          asset->{
            _id,
            url
          }
        },
        video{
          asset->{
            _id,
            url
          }
        },
        gallery[]{
          asset->{
            _id,
            url
          }
        }
      }
    `);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Utility function to fetch featured projects for homepage
async function fetchFeaturedProjects(limit = 3) {
  const client = createSanityClient();
  
  if (!client) {
    console.error('Sanity client not available');
    return [];
  }
  
  try {
    return await client.fetch(`
      *[_type == "project" && featured == true] | order(_createdAt desc)[0...${limit}] {
        _id,
        title,
        description,
        category,
        date,
        image{
          asset->{
            _id,
            url
          }
        }
      }
    `);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

// Test connection function
async function testSanityConnection() {
  const client = createSanityClient();
  
  if (!client) {
    return false;
  }
  
  try {
    const test = await client.fetch('*[_type == "project"][0...1]{title}');
    console.log('Sanity connection successful:', test);
    return true;
  } catch (error) {
    console.error('Sanity connection failed:', error);
    return false;
  }
}