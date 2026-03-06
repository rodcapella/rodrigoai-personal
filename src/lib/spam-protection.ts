/**
 * Spam Protection Module
 * Implements rate limiting, content validation, and IP tracking
 */

interface RateLimitEntry {
  count: number;
  firstRequestTime: number;
  lastRequestTime: number;
}

interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
  score: number;
}

// In-memory rate limiting (in production, use Redis)
const rateLimitMap = new Map<string, RateLimitEntry>();

// Configuration
const SPAM_CONFIG = {
  // Rate limiting
  MAX_REQUESTS_PER_HOUR: 5,
  MAX_REQUESTS_PER_DAY: 20,
  RATE_LIMIT_WINDOW_MS: 60 * 60 * 1000, // 1 hour
  
  // Content validation
  MAX_MESSAGE_LENGTH: 5000,
  MIN_MESSAGE_LENGTH: 10,
  MAX_URLS_PER_MESSAGE: 3,
  SUSPICIOUS_KEYWORDS: [
    'viagra', 'cialis', 'casino', 'lottery', 'bitcoin',
    'click here', 'buy now', 'limited offer', 'act now',
    'free money', 'work from home', 'make money fast'
  ],
  
  // Spam score thresholds
  SPAM_SCORE_THRESHOLD: 5,
  
  // Honeypot field (hidden field that should remain empty)
  HONEYPOT_FIELD: 'website_url'
};

/**
 * Get client identifier (IP or fingerprint)
 */
export function getClientIdentifier(userAgent: string, referrer: string): string {
  // In a real app, you'd get the actual IP from the request
  // For now, use a combination of user agent and referrer
  return `${userAgent}-${referrer}`.substring(0, 100);
}

/**
 * Check if client has exceeded rate limit
 */
export function checkRateLimit(clientId: string): { allowed: boolean; reason?: string } {
  const now = Date.now();
  const entry = rateLimitMap.get(clientId);

  if (!entry) {
    // First request from this client
    rateLimitMap.set(clientId, {
      count: 1,
      firstRequestTime: now,
      lastRequestTime: now
    });
    return { allowed: true };
  }

  // Check if window has expired
  if (now - entry.firstRequestTime > SPAM_CONFIG.RATE_LIMIT_WINDOW_MS) {
    // Reset the window
    rateLimitMap.set(clientId, {
      count: 1,
      firstRequestTime: now,
      lastRequestTime: now
    });
    return { allowed: true };
  }

  // Check if limit exceeded
  if (entry.count >= SPAM_CONFIG.MAX_REQUESTS_PER_HOUR) {
    return {
      allowed: false,
      reason: `Rate limit exceeded. Maximum ${SPAM_CONFIG.MAX_REQUESTS_PER_HOUR} requests per hour.`
    };
  }

  // Increment counter
  entry.count++;
  entry.lastRequestTime = now;
  rateLimitMap.set(clientId, entry);

  return { allowed: true };
}

/**
 * Calculate spam score based on content analysis
 */
export function calculateSpamScore(
  name: string,
  email: string,
  subject: string,
  message: string,
  honeypot?: string
): SpamCheckResult {
  let score = 0;
  const reasons: string[] = [];

  // Check honeypot field
  if (honeypot && honeypot.trim() !== '') {
    return {
      isSpam: true,
      reason: 'Honeypot field was filled',
      score: 10
    };
  }

  // Check message length
  if (message.length < SPAM_CONFIG.MIN_MESSAGE_LENGTH) {
    score += 2;
    reasons.push('Message too short');
  }

  if (message.length > SPAM_CONFIG.MAX_MESSAGE_LENGTH) {
    score += 3;
    reasons.push('Message too long');
  }

  // Count URLs
  const urlMatches = message.match(/https?:\/\//gi) || [];
  if (urlMatches.length > SPAM_CONFIG.MAX_URLS_PER_MESSAGE) {
    score += 3;
    reasons.push(`Too many URLs (${urlMatches.length})`);
  }

  // Check for suspicious keywords
  const lowerMessage = message.toLowerCase();
  const lowerSubject = subject.toLowerCase();
  
  SPAM_CONFIG.SUSPICIOUS_KEYWORDS.forEach(keyword => {
    if (lowerMessage.includes(keyword) || lowerSubject.includes(keyword)) {
      score += 2;
      reasons.push(`Contains suspicious keyword: "${keyword}"`);
    }
  });

  // Check for excessive caps
  const capsRatio = (message.match(/[A-Z]/g) || []).length / message.length;
  if (capsRatio > 0.3) {
    score += 2;
    reasons.push('Excessive capitalization');
  }

  // Check for repeated characters
  if (/(.)\1{4,}/.test(message)) {
    score += 2;
    reasons.push('Repeated characters detected');
  }

  // Check for email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    score += 3;
    reasons.push('Invalid email format');
  }

  // Check for suspicious email domains
  const suspiciousDomains = ['tempmail', 'throwaway', '10minutemail', 'guerrillamail'];
  const emailDomain = email.split('@')[1]?.toLowerCase() || '';
  if (suspiciousDomains.some(domain => emailDomain.includes(domain))) {
    score += 3;
    reasons.push('Suspicious email domain');
  }

  // Check name validity
  if (name.length < 2 || name.length > 100) {
    score += 2;
    reasons.push('Invalid name length');
  }

  // Check for email in message (potential spam indicator)
  const emailsInMessage = message.match(/[^\s@]+@[^\s@]+\.[^\s@]+/g) || [];
  if (emailsInMessage.length > 1) {
    score += 2;
    reasons.push('Multiple emails in message');
  }

  const isSpam = score >= SPAM_CONFIG.SPAM_SCORE_THRESHOLD;

  return {
    isSpam,
    reason: reasons.length > 0 ? reasons.join('; ') : undefined,
    score
  };
}

/**
 * Validate form data
 */
export function validateContactForm(
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
  honeypot?: string
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Name validation
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Invalid email address');
  }

  // Phone validation (if provided)
  if (phone && phone.trim()) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
      errors.push('Invalid phone number');
    }
  }

  // Subject validation
  if (!subject || subject.trim().length < 3) {
    errors.push('Subject must be at least 3 characters');
  }

  // Message validation
  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  if (message && message.length > SPAM_CONFIG.MAX_MESSAGE_LENGTH) {
    errors.push(`Message must not exceed ${SPAM_CONFIG.MAX_MESSAGE_LENGTH} characters`);
  }

  // Honeypot check
  if (honeypot && honeypot.trim() !== '') {
    errors.push('Invalid form submission');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .substring(0, 5000); // Limit length
}

/**
 * Clean up old rate limit entries (run periodically)
 */
export function cleanupRateLimitMap(): void {
  const now = Date.now();
  const entriesToDelete: string[] = [];

  rateLimitMap.forEach((entry, clientId) => {
    if (now - entry.lastRequestTime > SPAM_CONFIG.RATE_LIMIT_WINDOW_MS * 2) {
      entriesToDelete.push(clientId);
    }
  });

  entriesToDelete.forEach(clientId => rateLimitMap.delete(clientId));
}

// Run cleanup every hour
setInterval(cleanupRateLimitMap, 60 * 60 * 1000);

export default SPAM_CONFIG;
