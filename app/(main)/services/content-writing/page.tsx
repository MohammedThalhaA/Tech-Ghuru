import ServiceLandingPage from "@/components/ServiceLandingPage";
import { servicesData } from "@/lib/servicesData";

export default function Page() {
  const data = servicesData["content-writing"];
  return <ServiceLandingPage data={data} />;
}
