import ServiceLandingPage from "@/components/ServiceLandingPage";
import { servicesData } from "@/lib/servicesData";

export default function Page() {
  const data = servicesData["video-ads"];
  return <ServiceLandingPage data={data} />;
}
