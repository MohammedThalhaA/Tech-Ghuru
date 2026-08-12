import ServiceLandingPage from "@/components/ServiceLandingPage";
import { servicesData } from "@/lib/servicesData";

export default function Page() {
  const data = servicesData["web-developing"];
  return <ServiceLandingPage data={data} />;
}
