import ClientComponent from "./ClientComponent";
import ServiceViewDetail from "../serviceDetails/ServiceViewDetail";
import Header from "@/components/common/Header";

export default  function ServicePage(){

  return(
    <>
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
             {/* <Header/> */}
            <ClientComponent />
            {/* <ServiceViewDetail/> */}
          </div>
    </>
  )

}