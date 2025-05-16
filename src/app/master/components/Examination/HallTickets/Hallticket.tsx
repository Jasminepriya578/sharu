import HallTicketGenerator from './Hallticket';
export default function HallTicketPage() {
  try {
    return <HallTicketGenerator />;
  } catch (error) {
    console.error("Error rendering HallTicket:", error);
    return <div>Something went wrong loading the Hall Ticket generator. Please try again.</div>;
  }
}