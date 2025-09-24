// This is based on the Drupal 10 API endpoint response.
const getApiResponse = (
  startDate = "2025-09-01T14:46:00-04:00",
  endDate = "2030-12-31T23:59:00-05:00"
) => ({
  meta: {
    arguments: [],
    filters: [],
    notices: {
      cache: {
        "last-refresh": "2025-09-01T14:47:24-04:00",
      },
    },
    count: 2,
  },
  data: [
    {
      id: "2859",
      administrative_title: "Test QA alert",
      location_ids: null,
      message_plain: "This is just a test for the D10 endpoint.\n",
      message_html: "<p>This is just a test for the D10 endpoint.</p>\n",
      scope: "all",
      alert_date_range: `${startDate} - ${endDate}`,
      closing_date_range: null,
      url: "https://qa-drupal.nypl.org/callout/2859",
      extended: null,
      type: "alert",
      location_slugs: null,
      location_codes: null,
      location_legacy_ids: null,
      alert_date_start: startDate,
      alert_date_end: endDate,
      closing_date_start: null,
      closing_date_end: null,
    },
    {
      id: "2860",
      administrative_title: "Test QA alert 2",
      location_ids: null,
      message_plain: "Masks are encouraged at all NYPL locations.",
      message_html: "<p>Masks are encouraged at all NYPL locations.</p>\n",
      scope: "all",
      alert_date_range: `${startDate} - ${endDate}`,
      closing_date_range: null,
      url: "https://qa-drupal.nypl.org/callout/2860",
      extended: null,
      type: "alert",
      location_slugs: null,
      location_codes: null,
      location_legacy_ids: null,
      alert_date_start: startDate,
      alert_date_end: endDate,
      closing_date_start: null,
      closing_date_end: null,
    },
  ],
});

export const drupalResponse = getApiResponse();
export const expiredAlertsResponse = getApiResponse(
  "2020-03-14T00:00:00-04:00",
  "2020-12-31T23:59:00-05:00"
);
