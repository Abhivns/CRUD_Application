export function formatApiError(error, fallbackMessage) {
  return error?.response?.data?.message || fallbackMessage;
}
