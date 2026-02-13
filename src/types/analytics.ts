export type AnalyticsResponse = {
  totalEvents: number;
  totalTicketsSold: number;
  totalRevenue: { _sum: { price: number | null } };
  totalCheckIns: number;
  events: Event[]; // Array de eventos
};