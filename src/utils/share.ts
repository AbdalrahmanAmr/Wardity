/**
 * Share functionality utilities
 */

/**
 * Share product to Facebook
 */
export function shareToFacebook(url: string, text: string): void {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
  window.open(facebookUrl, "_blank", "width=600,height=400");
}

/**
 * Share product to X (Twitter)
 */
export function shareToX(url: string, text: string): void {
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  window.open(twitterUrl, "_blank", "width=600,height=400");
}

/**
 * Generic share using Web Share API (mobile) or fallback
 */
export async function shareGeneric(
  url: string,
  title: string,
  text: string
): Promise<void> {
  const shareData = {
    title,
    text,
    url,
  };

  // Check if Web Share API is available (mobile browsers)
  if (navigator.share && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      // User cancelled or error occurred, fall through to clipboard
      if ((error as Error).name !== "AbortError") {
        console.error("Error sharing:", error);
      }
    }
  }

  // Fallback: Copy to clipboard
  try {
    await navigator.clipboard.writeText(url);
    // You might want to show a toast notification here
    alert("Link copied to clipboard!");
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    // Final fallback: open in new window
    window.open(url, "_blank");
  }
}

/**
 * Get share URL for current product
 */
export function getProductShareUrl(productId: string): string {
  return `${window.location.origin}/product/${productId}`;
}

