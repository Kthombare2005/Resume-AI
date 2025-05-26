const allowCors = fn => async (req, res) => {
  try {
    // Log incoming request
    console.log('Incoming request:', {
      method: req.method,
      url: req.url,
      origin: req.headers.origin,
      headers: req.headers
    });

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'https://resume-ai-tawny.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );

    // Handle preflight
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    // Process the request
    console.log('Processing request...');
    const result = await fn(req, res);
    console.log('Request processed successfully');
    return result;
  } catch (error) {
    console.error('Error in middleware:', error);
    
    // Ensure CORS headers are set even in case of error
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'https://resume-ai-tawny.vercel.app');
    
    // Send error response
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = allowCors; 