export const APP_STORE_URL =
  "https://apps.apple.com/app/zatch-live-interactive-shop/id6761607900";
export const PLAYSTORE_URL =
  "https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share";
export const DOWNLOAD_PAGE_PATH = "/download";
export const DOWNLOAD_PAGE_URL = "https://zatch.shop/download";

export function buildQrCodeUrl(data: string, size = 240) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
}

export const DOWNLOAD_PAGE_QR_URL = buildQrCodeUrl(DOWNLOAD_PAGE_URL);
