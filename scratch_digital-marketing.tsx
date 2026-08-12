import ServiceLandingPage from "@/components/ServiceLandingPage";
import { servicesData } from "@/lib/servicesData";

export default function Page() {
  const data = servicesData["digital-marketing"];
  return <ServiceLandingPage data={data} />;
}
