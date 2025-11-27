/**
 * Umami Analytics Tracking Utility
 * Provides type-safe event tracking for conversion-focused metrics
 */

// Extend the Window interface to include umami
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, any>) => void;
    };
  }
}

/**
 * Event names for tracking
 */
export const AnalyticsEvents = {
  // Guestbook events
  GUESTBOOK_FORM_OPENED: 'guestbook_form_opened',
  GUESTBOOK_SUBMISSION: 'guestbook_submission',

  // Bookmark events
  BOOKMARK_CLICK: 'bookmark_click',

  // Navigation events
  NAV_CLICK: 'nav_click',
  SOCIAL_LINK_CLICK: 'social_link_click',

  // Engagement events
  THEME_TOGGLE: 'theme_toggle',
  COMPONENT_CODE_COPY: 'component_code_copy',

  // Content interaction events
  CRAFT_ITEM_CLICK: 'craft_item_click',
  EXTERNAL_LINK_CLICK: 'external_link_click',

  // Conversion events
  EMAIL_LINK_CLICK: 'email_link_click',
  BOOKMARK_SUBMISSION_FORM_OPENED: 'bookmark_submission_form_opened',
  BOOKMARK_SUBMISSION_COMPLETED: 'bookmark_submission_completed',
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];

/**
 * Event property types for each event
 */
export interface EventProperties {
  [AnalyticsEvents.GUESTBOOK_FORM_OPENED]: undefined;
  [AnalyticsEvents.GUESTBOOK_SUBMISSION]: {
    has_signature: boolean;
  };
  [AnalyticsEvents.BOOKMARK_CLICK]: {
    title: string;
    domain: string;
  };
  [AnalyticsEvents.NAV_CLICK]: {
    destination: string;
    label: string;
  };
  [AnalyticsEvents.SOCIAL_LINK_CLICK]: {
    platform: string;
    url: string;
  };
  [AnalyticsEvents.THEME_TOGGLE]: {
    from: string;
    to: string;
  };
  [AnalyticsEvents.COMPONENT_CODE_COPY]: {
    component: string;
  };
  [AnalyticsEvents.CRAFT_ITEM_CLICK]: {
    title: string;
    href: string;
    craft_type: string;
  };
  [AnalyticsEvents.EXTERNAL_LINK_CLICK]: {
    url: string;
    source: string;
  };
  [AnalyticsEvents.EMAIL_LINK_CLICK]: {
    email: string;
  };
  [AnalyticsEvents.BOOKMARK_SUBMISSION_FORM_OPENED]: undefined;
  [AnalyticsEvents.BOOKMARK_SUBMISSION_COMPLETED]: {
    url: string;
    type?: string;
  };
}

/**
 * Generic track event function
 */
export function trackEvent<T extends AnalyticsEventName>(
  eventName: T,
  properties?: EventProperties[T]
): void {
  if (typeof window === 'undefined') {
    return; // Don't track on server side
  }

  try {
    if (window.umami?.track) {
      window.umami.track(eventName, properties as Record<string, any>);
    } else {
      // Fallback for development or if umami hasn't loaded yet
      console.log('[Analytics]', eventName, properties);
    }
  } catch (error) {
    console.error('[Analytics] Error tracking event:', error);
  }
}

/**
 * Helper functions for common events
 */
export const analytics = {
  /**
   * Track guestbook form opened
   */
  trackGuestbookFormOpened: () => {
    trackEvent(AnalyticsEvents.GUESTBOOK_FORM_OPENED);
  },

  /**
   * Track guestbook submission
   */
  trackGuestbookSubmission: (hasSignature: boolean) => {
    trackEvent(AnalyticsEvents.GUESTBOOK_SUBMISSION, {
      has_signature: hasSignature,
    });
  },

  /**
   * Track bookmark click
   */
  trackBookmarkClick: (title: string, domain: string) => {
    trackEvent(AnalyticsEvents.BOOKMARK_CLICK, {
      title,
      domain,
    });
  },

  /**
   * Track navigation click
   */
  trackNavClick: (destination: string, label: string) => {
    trackEvent(AnalyticsEvents.NAV_CLICK, {
      destination,
      label,
    });
  },

  /**
   * Track social link click
   */
  trackSocialLinkClick: (platform: string, url: string) => {
    trackEvent(AnalyticsEvents.SOCIAL_LINK_CLICK, {
      platform,
      url,
    });
  },

  /**
   * Track theme toggle
   */
  trackThemeToggle: (from: string, to: string) => {
    trackEvent(AnalyticsEvents.THEME_TOGGLE, {
      from,
      to,
    });
  },

  /**
   * Track component code copy
   */
  trackComponentCodeCopy: (component: string) => {
    trackEvent(AnalyticsEvents.COMPONENT_CODE_COPY, {
      component,
    });
  },

  /**
   * Track craft item click
   */
  trackCraftItemClick: (title: string, href: string, craftType: string) => {
    trackEvent(AnalyticsEvents.CRAFT_ITEM_CLICK, {
      title,
      href,
      craft_type: craftType,
    });
  },

  /**
   * Track external link click
   */
  trackExternalLinkClick: (url: string, source: string) => {
    trackEvent(AnalyticsEvents.EXTERNAL_LINK_CLICK, {
      url,
      source,
    });
  },

  /**
   * Track email link click
   */
  trackEmailLinkClick: (email: string) => {
    trackEvent(AnalyticsEvents.EMAIL_LINK_CLICK, {
      email,
    });
  },

  /**
   * Track bookmark submission form opened
   */
  trackBookmarkSubmissionFormOpened: () => {
    trackEvent(AnalyticsEvents.BOOKMARK_SUBMISSION_FORM_OPENED);
  },

  /**
   * Track bookmark submission completed
   */
  trackBookmarkSubmissionCompleted: (url: string, type?: string) => {
    trackEvent(AnalyticsEvents.BOOKMARK_SUBMISSION_COMPLETED, {
      url,
      type,
    });
  },
};
